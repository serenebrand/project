import fs from "node:fs";
import path from "node:path";
import type { PhotoKind, PhotoSet } from "./photo-types";

const PHOTO_DIR = path.join(process.cwd(), "public", "photos");
const PHOTO_FILE = /^(interior|food|exterior)-(\d+)\.(?:jpe?g|png|webp|avif)$/i;

// Read at build time: drop files into /public/photos and rebuild to publish them.
export function getPhotos(): PhotoSet {
  const photos: PhotoSet = { interior: [], food: [], exterior: [] };

  let files: string[];
  try {
    files = fs.readdirSync(PHOTO_DIR);
  } catch {
    return photos;
  }

  for (const file of files) {
    const match = PHOTO_FILE.exec(file);
    if (!match) continue;
    const kind = match[1].toLowerCase() as PhotoKind;
    photos[kind].push({ src: `/photos/${file}`, kind, index: Number(match[2]) });
  }

  for (const list of Object.values(photos)) {
    list.sort((a, b) => a.index - b.index);
  }

  return photos;
}
