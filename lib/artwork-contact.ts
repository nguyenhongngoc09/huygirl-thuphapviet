import type { ArtworkRecord } from "@/lib/artworks";
import { siteLinks } from "@/lib/site-links";

export function getArtworkMessage(artwork: ArtworkRecord, origin: string) {
  const url = new URL(`/chu/${encodeURIComponent(artwork.groupSlug)}`, origin);
  url.searchParams.set("tac-pham", artwork.slug);
  return `Tôi thích tác phẩm này\n${url.href}`;
}

export function getMessengerHref(artwork: ArtworkRecord, mobile = false) {
  const configuredUrl = siteLinks.facebookPage.trim();
  if (!configuredUrl) return null;
  let page: string;
  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" || !["facebook.com", "www.facebook.com", "m.me", "www.m.me"].includes(url.hostname.toLowerCase())) return null;
    page = url.pathname.split("/").filter(Boolean)[0] ?? "";
  } catch {
    return null;
  }
  if (!page) return null;
  // Mobile uses Messenger's app link; desktop opens the web conversation.
  const base = mobile ? "https://m.me/" : "https://www.facebook.com/messages/t/";
  return `${base}${encodeURIComponent(page)}?ref=${encodeURIComponent(`artwork_${artwork.slug}`)}`;
}
