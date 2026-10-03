import { getArtworks } from "@/lib/artworks";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import SimilarGallery from "@/components/SimilarGallery";

export type SimilarArtworksPageProps = {
  params: Promise<{ group: string }>;
  searchParams: Promise<{ "tac-pham"?: string | string[] }>;
};

export default async function SimilarArtworksPage({ params, searchParams, intercepted }: SimilarArtworksPageProps & { intercepted: boolean }) {
  await connection();
  const { group } = await params;
  const selected = (await searchParams)["tac-pham"];
  const artworks = (await getArtworks()).filter((artwork) => artwork.groupSlug === group);
  if (!artworks.length) notFound();
  const initialIndex = Math.max(0, artworks.findIndex((artwork) => artwork.slug === selected));
  return <SimilarGallery artworks={artworks} initialIndex={initialIndex} intercepted={intercepted} />;
}
