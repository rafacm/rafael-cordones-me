import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PHOTOBLOG_DIR = path.join(ROOT, "src/assets/images/blog/photoblog");

// Configuration
const TILE_SIZE = 300;
const GAP = 6;
const COLS = 4;
const ROWS = 4;
const ROTATION_DEG = -25;
const BG_COLOR = { r: 30, g: 41, b: 59, alpha: 1 }; // #1e293b
const FINAL_WIDTH = 1200;
const FINAL_HEIGHT = 630;
const OUTPUT = path.join(ROOT, "public", "astropaper-og.jpg");

// Curated photo selection for visual variety
const PHOTOS = [
  "autumn-leaves.jpg",
  "blue-danube.jpg",
  "call-of-the-wild.jpg",
  "dont-let-the-sun-go-down-on-me.jpg",
  "fields-of-gold.jpg",
  "fly-me-to-the-moon.jpg",
  "for-all-the-love-you-have-left-behind.jpg",
  "ground-control-to-major-tom.jpg",
  "i-am-from-barcelona-1.jpg",
  "la-mer.jpg",
  "let-the-river-run.jpg",
  "moonlight-drive.jpg",
  "off-the-shoulder-of-orion.jpg",
  "sunrise-sunrise.jpg",
  "the-fractal-geometry-of-trees.jpg",
  "we-choose-to-go-to-the-moon-1.jpg",
];

async function main() {
  console.log("Generating default OG image...");

  // 1. Resize each photo to a square tile
  const tiles = await Promise.all(
    PHOTOS.map(async photo => {
      const filePath = path.join(PHOTOBLOG_DIR, photo);
      return sharp(filePath)
        .resize(TILE_SIZE, TILE_SIZE, { fit: "cover", position: "centre" })
        .toBuffer();
    })
  );

  // 2. Compose tiles into a grid
  const gridWidth = COLS * TILE_SIZE + (COLS - 1) * GAP;
  const gridHeight = ROWS * TILE_SIZE + (ROWS - 1) * GAP;

  const compositeOps = tiles.map((tile, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return {
      input: tile,
      left: col * (TILE_SIZE + GAP),
      top: row * (TILE_SIZE + GAP),
    };
  });

  const gridBuffer = await sharp({
    create: {
      width: gridWidth,
      height: gridHeight,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite(compositeOps)
    .png()
    .toBuffer();

  // 3. Place grid on oversized canvas for rotation headroom
  const canvasSize = 2400;
  const offsetX = Math.round((canvasSize - gridWidth) / 2);
  const offsetY = Math.round((canvasSize - gridHeight) / 2);

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

  // 4. Rotate for the 3D tilt effect
  const rotated = await sharp(largeCanvas)
    .rotate(ROTATION_DEG, { background: BG_COLOR })
    .png()
    .toBuffer();

  // 5. Apply affine skew for perspective/3D depth
  const skewed = await sharp(rotated)
    .affine([[1, 0.15], [-0.1, 1]], {
      background: BG_COLOR,
      interpolator: sharp.interpolators.bicubic,
    })
    .png()
    .toBuffer();

  // 6. Crop to final OG dimensions from center
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
