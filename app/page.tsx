import ArtworkGallery from "@/components/ArtworkGallery";
import { getArtworks } from "@/lib/artworks";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const artworks = await getArtworks();
  return <ArtworkGallery artworks={artworks} />;
}
