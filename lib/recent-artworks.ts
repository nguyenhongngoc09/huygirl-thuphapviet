export function recentArtworks<T extends { addedAt?: string }>(artworks: T[], now: number) {
  return artworks.map((artwork, index) => ({
    artwork, index, added: Date.parse(artwork.addedAt ?? ""),
  })).filter(({ added }) => added <= now && added > now - 7 * 24 * 60 * 60 * 1000)
    .sort((a, b) => b.added - a.added);
}
