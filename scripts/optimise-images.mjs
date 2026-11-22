import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
for (const [name, width] of [["hero-cover-img", 1920], ["2-post-ramp-a", 1200], ["2-post-ramp-b", 1200], ["4-post-ramp-c", 1200]]) {
  const source = await readFile(`public/${name}.jpg`);
  const output = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toBuffer();
  const hash = createHash("sha256").update(output).digest("hex").slice(0, 10);
  const path = `images/${name}.${hash}.webp`;
  await writeFile(`public/${path}`, output);
  console.log(`/${path}: ${Math.round(source.length / 1024)}KB → ${Math.round(output.length / 1024)}KB`);
}
