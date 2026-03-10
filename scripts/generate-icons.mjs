import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, "../src/public/icons");
const sourcePath = join(iconsDir, "Generated_image-removebg-preview.png");
const sizes = [16, 32, 48, 128];

const image = sharp(sourcePath);
const metadata = await image.metadata();
const { width, height } = metadata;

// Zoom: cropar quadrado do centro (80% da menor dimensao para dar mais zoom)
const cropSize = Math.min(width, height) * 0.8;
const left = Math.round((width - cropSize) / 2);
const top = Math.round((height - cropSize) / 2);

const zoomed = await image
  .extract({ left, top, width: Math.round(cropSize), height: Math.round(cropSize) })
  .resize(128, 128)
  .toBuffer();

for (const size of sizes) {
  await sharp(zoomed)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, `icon-${size}.png`));
  console.log(`Generated icon-${size}.png`);
}
