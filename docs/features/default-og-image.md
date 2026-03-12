# Default OG Image Generator

## Purpose

Generates a personalized default Open Graph image for the site by compositing square tiles from blog photos into a 3D-perspective mosaic on a dark slate background. Replaces the stock AstroPaper OG image with one that showcases the blog's own photography.

## Usage

```bash
npm run generate:og
```

This produces `public/astropaper-og.jpg` (1200×630px progressive JPEG), which is used as the default OG image for non-post pages (homepage, about, tags, etc.).

## Configuration

All settings are constants at the top of the script:

| Constant | Default | Description |
|----------|---------|-------------|
| `TILE_SIZE` | `300` | Width/height of each square tile in pixels |
| `GAP` | `6` | Space between tiles (filled with background color) |
| `COLS` / `ROWS` | `4` / `4` | Grid dimensions (16 tiles total) |
| `ROTATION_DEG` | `-25` | Rotation angle in degrees (negative = clockwise) |
| `BG_COLOR` | `#1e293b` | Dark slate background color |
| `PHOTOS` | 16 entries | Curated list of photoblog filenames to include |

### Changing the photo selection

Edit the `PHOTOS` array in `scripts/generate-og-image.mjs`. Photos are sourced from `src/assets/images/blog/photoblog/` and must be valid filenames in that directory. The array length should equal `COLS × ROWS`.

### Adjusting the 3D effect

- **Rotation**: Change `ROTATION_DEG` (e.g., `-15` for a subtler tilt, `-35` for more dramatic).
- **Perspective skew**: Modify the affine matrix in the `sharp.affine()` call. The default `[[1, 0.15], [-0.1, 1]]` applies a vertical shear and slight horizontal compression.

## Examples

Regenerate after adding new photos to the selection:

```bash
# Edit PHOTOS array in scripts/generate-og-image.mjs, then:
npm run generate:og
```

## Implementation details

- **Script**: `scripts/generate-og-image.mjs`
- **Output**: `public/astropaper-og.jpg`
- **Dependency**: `sharp` (npm, already in project dependencies)
- **Config reference**: `src/config.ts` defines `ogImage: "astropaper-og.jpg"` which layouts resolve to this file
- **Pipeline**: Resize photos to square tiles → composite into grid → place on oversized canvas → rotate → affine skew → crop center to 1200×630 → save as progressive JPEG
