import type { ArtworkRecord } from "@/lib/artworks";
import ArtworkContact from "@/components/ArtworkContact";
import MessengerIcon from "@/components/MessengerIcon";

export default function ArtworkPopupContact({ artwork }: { artwork: ArtworkRecord }) {
  return <ArtworkContact artwork={artwork} className="popup-artwork-contact"><MessengerIcon /><span className="contact-label--full">Liên hệ tác phẩm này</span><span className="contact-label--mobile">LIÊN HỆ</span></ArtworkContact>;
}
