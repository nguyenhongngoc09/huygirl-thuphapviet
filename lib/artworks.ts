import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

export type ArtworkSocialLink = {
  platform: string;
  label: string;
  url: string;
};

export type ArtworkRecord = {
  slug: string;
  title: string;
  group: string;
  groupSlug: string;
  description: string;
  materials: string[];
  socialLinks: ArtworkSocialLink[];
  image: string;
};

type DataArtwork = {
  title?: unknown;
  image?: unknown;
  description?: unknown;
  materials?: unknown;
  social_links?: unknown;
};

const PLATFORM_NAMES: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  tiktock: "TikTok",
  youtube: "YouTube",
  threads: "Threads",
};

function titleFromKey(key: string) {
  const labels: Record<string, string> = { chat_lieu: "Chất liệu", kich_thuoc: "Kích thước" };
  return labels[key] ?? key.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
}

function slugify(value: string, index: number) {
  const slug = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return slug || `tac-pham-${index + 1}`;
}

function resolvePublicImage(image: string, index: number) {
  if (/^https?:\/\//i.test(image)) throw new Error(`public/artworks/data.json: tác phẩm ${index + 1} phải dùng ảnh cục bộ trong public/artworks.`);
  const normalized = path.posix.normalize(image.replace(/^\.\//, "").replace(/^\/artworks\//, ""));
  if (!normalized || normalized.startsWith("../") || normalized === ".." || path.posix.isAbsolute(normalized)) throw new Error(`public/artworks/data.json: đường dẫn ảnh không hợp lệ ở tác phẩm ${index + 1}.`);
  return `/artworks/${normalized.split("/").map(encodeURIComponent).join("/")}`;
}

function parseArtwork(value: DataArtwork, index: number): ArtworkRecord {
  const prefix = `public/artworks/data.json: tác phẩm ${index + 1}`;
  if (typeof value.title !== "string" || !value.title.trim()) throw new Error(`${prefix} thiếu "title" hợp lệ.`);
  if (typeof value.image !== "string" || !value.image.trim()) throw new Error(`${prefix} thiếu "image" hợp lệ.`);
  if (typeof value.description !== "string" || !value.description.trim()) throw new Error(`${prefix} thiếu "description" hợp lệ.`);
  if (!value.materials || typeof value.materials !== "object" || Array.isArray(value.materials)) throw new Error(`${prefix}: "materials" phải là object.`);
  if (value.social_links != null && (typeof value.social_links !== "object" || Array.isArray(value.social_links))) throw new Error(`${prefix}: "social_links" phải là object.`);

  const materials = Object.entries(value.materials as Record<string, unknown>).map(([key, material]) => {
    if (typeof material !== "string") throw new Error(`${prefix}: materials.${key} phải là chuỗi.`);
    return `${titleFromKey(key)}: ${material}`;
  });
  const socialLinks = Object.entries((value.social_links ?? {}) as Record<string, unknown>).flatMap(([platform, url]) => {
    if (url == null || (typeof url === "string" && !url.trim())) return [];
    if (typeof url !== "string") throw new Error(`${prefix}: social_links.${platform} phải là URL dạng chuỗi.`);
    const name = PLATFORM_NAMES[platform.toLowerCase()] ?? titleFromKey(platform);
    return [{ platform: name, label: `Xem câu chuyện tác phẩm trên ${name}`, url: url.trim() }];
  });

  return {
    slug: slugify(value.title, index),
    title: value.title,
    group: value.title.split(/\s+[–—-]\s+/)[0].trim(),
    groupSlug: slugify(value.title.split(/\s+[–—-]\s+/)[0].trim(), index),
    description: value.description,
    materials,
    socialLinks,
    image: resolvePublicImage(value.image, index),
  };
}

export async function getArtworks(): Promise<ArtworkRecord[]> {
  const file = path.join(process.cwd(), "public", "artworks", "data.json");
  const raw = await fs.readFile(file, "utf8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) throw new Error("public/artworks/data.json phải chứa một mảng tác phẩm.");
  return data.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`public/artworks/data.json: tác phẩm ${index + 1} phải là object.`);
    return parseArtwork(item as DataArtwork, index);
  });
}
