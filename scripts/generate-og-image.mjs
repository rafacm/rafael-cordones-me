import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PHOTOBLOG_DIR = path.join(ROOT, "src/assets/images/blog/photoblog");

// Configuration
const TILE_SIZE = 200;
const GAP = 40;
const COLS = 6;
const ROWS = 6;
const TILE_COUNT = COLS * ROWS;
const ROTATION_DEG = -25;
const BG_COLOR = { r: 255, g: 255, b: 255, alpha: 1 };
const SHADOW_OFFSET = 8;
const SHADOW_BLUR = 14;
const FINAL_WIDTH = 1200;
const FINAL_HEIGHT = 630;
const OUTPUT = path.join(ROOT, "public", "astropaper-og.jpg");

/**
 * Pick images from the photoblog directory sorted by newest mtime.
 * Cycles through images if more tiles are needed than available photos.
 */
function pickPhotos() {
  const files = fs
    .readdirSync(PHOTOBLOG_DIR)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .map(f => ({
      name: f,
      mtime: fs.statSync(path.join(PHOTOBLOG_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime)
    .map(f => f.name);

  if (files.length === 0) {
    throw new Error(`No images found in ${PHOTOBLOG_DIR}`);
  }

  // Cycle through images if we need more than available
  const result = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    result.push(files[i % files.length]);
  }
  return result;
}

/** Create a gradient drop-shadow image for a single tile. */
async function createTileShadow() {
  // Semi-transparent grey rectangle, blurred to create a natural gradient
  // that fades from grey at the center to transparent at the edges
  const shadow = await sharp({
    create: {
      width: TILE_SIZE,
      height: TILE_SIZE,
      channels: 4,
      background: { r: 160, g: 160, b: 160, alpha: 180 },
    },
  })
    .blur(SHADOW_BLUR)
    .png()
    .toBuffer();

  return shadow;
}

async function main() {
  const photos = pickPhotos();
  console.log(
    `Generating OG image with ${COLS}x${ROWS} grid (${TILE_COUNT} tiles)...`
  );

  // 1. Resize each photo to a square tile
  const tiles = await Promise.all(
    photos.map(async photo => {
      const filePath = path.join(PHOTOBLOG_DIR, photo);
      return sharp(filePath)
        .resize(TILE_SIZE, TILE_SIZE, { fit: "cover", position: "centre" })
        .png()
        .toBuffer();
    })
  );

  // 2. Create shadow template
  const shadowBuf = await createTileShadow();

  // 3. Compose tiles with shadows into a grid
  const gridWidth = COLS * TILE_SIZE + (COLS - 1) * GAP;
  const gridHeight = ROWS * TILE_SIZE + (ROWS - 1) * GAP;

  const compositeOps = [];
  for (let i = 0; i < tiles.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * (TILE_SIZE + GAP);
    const y = row * (TILE_SIZE + GAP);

    // Shadow (semi-transparent, composited with alpha blending)
    compositeOps.push({
      input: shadowBuf,
      left: x + SHADOW_OFFSET,
      top: y + SHADOW_OFFSET,
      blend: "over",
    });
    // Photo tile
    compositeOps.push({
      input: tiles[i],
      left: x,
      top: y,
    });
  }

  const gridBuffer = await sharp({
    create: {
      width: gridWidth + SHADOW_OFFSET + SHADOW_BLUR * 2,
      height: gridHeight + SHADOW_OFFSET + SHADOW_BLUR * 2,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite(compositeOps)
    .png()
    .toBuffer();

  // 4. Place grid on oversized canvas for rotation headroom
  const canvasSize = 3200;
  const gridMeta = await sharp(gridBuffer).metadata();
  const offsetX = Math.round((canvasSize - gridMeta.width) / 2);
  const offsetY = Math.round((canvasSize - gridMeta.height) / 2);

  const largeCanvas = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: gridBuffer, left: offsetX, top: offsetY }])
    .png()
    .toBuffer();

  // 5. Rotate for the 3D tilt effect
  const rotated = await sharp(largeCanvas)
    .rotate(ROTATION_DEG, { background: BG_COLOR })
    .png()
    .toBuffer();

  // 6. Apply affine skew for perspective/3D depth
  const skewed = await sharp(rotated)
    .affine(
      [
        [1, 0.15],
        [-0.1, 1],
      ],
      {
        background: BG_COLOR,
        interpolator: sharp.interpolators.bicubic,
      }
    )
    .png()
    .toBuffer();

  // 7. Crop to final OG dimensions from center
  const meta = await sharp(skewed).metadata();
  const extractLeft = Math.round((meta.width - FINAL_WIDTH) / 2);
  const extractTop = Math.round((meta.height - FINAL_HEIGHT) / 2);

  await sharp(skewed)
    .extract({
      left: extractLeft,
      top: extractTop,
      width: FINAL_WIDTH,
      height: FINAL_HEIGHT,
    })
    .jpeg({ quality: 85, progressive: true })
    .toFile(OUTPUT);

  console.log(`OG image saved to ${OUTPUT}`);
}

main().catch(err => {
  console.error("Error generating OG image:", err);
  process.exit(1);
});
