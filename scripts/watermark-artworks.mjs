import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "artworks-source");
const publicDir = path.join(root, "public", "artworks");
const outputDir = process.argv[2] ? path.resolve(process.argv[2]) : publicDir;
const artworkData = JSON.parse(await fs.readFile(path.join(publicDir, "data.json"), "utf8"));
const images = [...new Set(artworkData.map(({ image }) => {
  if (typeof image !== "string" || !/^\.\/[\w.-]+\.(png|jpe?g|webp)$/i.test(image)) {
    throw new Error(`Invalid artwork image path: ${image}`);
  }
  return image.slice(2);
}))];

function watermarkSvg(width, height) {
  const fontSize = Math.round(Math.max(28, Math.min(52, width / 24)));
  const stepX = Math.round(width / 2.65);
  const stepY = Math.round(fontSize * 4.3);
  const marks = [];
  for (let row = -1, y = -stepY; y < height + stepY; row++, y += stepY) {
    for (let x = -stepX; x < width + stepX; x += stepX) {
      const offset = row % 2 ? Math.round(stepX / 2) : 0;
      marks.push(`<text x="${x + offset}" y="${y}" transform="rotate(-20 ${x + offset} ${y})">@huygirl-tpv</text>`);
    }
  }
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><g font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="600" fill="#713e35" fill-opacity=".16" stroke="#fffaf0" stroke-opacity=".18" stroke-width="1.5" paint-order="stroke" letter-spacing="1">${marks.join("")}</g></svg>`);
}

await fs.mkdir(outputDir, { recursive: true });
for (const image of images) {
  const source = path.join(sourceDir, image);
  const output = path.join(outputDir, image);
  const { width, height, orientation } = await sharp(source).metadata();
  if (!width || !height) throw new Error(`Cannot read image dimensions: ${source}`);
  const sideways = [5, 6, 7, 8].includes(orientation ?? 1);
  const outputWidth = sideways ? height : width;
  const outputHeight = sideways ? width : height;

  const format = path.extname(image).toLowerCase();
  let pipeline = sharp(source).rotate().composite([{ input: watermarkSvg(outputWidth, outputHeight) }]);
  pipeline = format === ".png" ? pipeline.png({ compressionLevel: 9 }) : format === ".webp" ? pipeline.webp({ quality: 90 }) : pipeline.jpeg({ quality: 90, mozjpeg: true });
  const temporary = `${output}.tmp-${process.pid}`;
  try {
    await pipeline.toFile(temporary);
    await fs.rename(temporary, output);
  } catch (error) {
    await fs.rm(temporary, { force: true });
    throw error;
  }
  console.log(`Watermarked ${image}`);
}
