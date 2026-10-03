import SimilarArtworksPage from "@/components/SimilarArtworksPage";
import type { SimilarArtworksPageProps } from "@/components/SimilarArtworksPage";

export default function Page(props: SimilarArtworksPageProps) {
  return <SimilarArtworksPage {...props} intercepted={false} />;
}
