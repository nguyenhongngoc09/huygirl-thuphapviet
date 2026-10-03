"use client";

import type { ArtworkRecord } from "@/lib/artworks";
import ArtworkContact from "@/components/ArtworkContact";
import ArtworkPopupContact from "@/components/ArtworkPopupContact";
import ArtworkSeal from "@/components/ArtworkSeal";
import GalleryAtmosphere from "@/components/GalleryAtmosphere";
import MessengerIcon from "@/components/MessengerIcon";
import { siteLinks } from "@/lib/site-links";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={direction === "right" ? "M5 12h14M14 6l6 6-6 6" : "M19 12H5m5 6-6-6 6-6"} /></svg>;
}

function ExpandIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5M3 8l6-6M21 8l-6-6M3 16l6 6M21 16l-6 6" /></svg>;
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case "facebook":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.931-1.956 1.887v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" /></svg>;
    case "youtube":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" /></svg>;
    case "tiktok":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2" /></svg>;
  }
}

function isValidChannelUrl(value: string, platform: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return url.protocol === "https:" && (platform === "tiktok" ? host === "tiktok.com" : host === "youtube.com" || host === "youtu.be");
  } catch {
    return false;
  }
}

function Lightbox({ artworks, active, setActive, onClose }: { artworks: ArtworkRecord[]; active: number | null; setActive: (index: number) => void; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const work = active === null ? null : artworks[active];

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setActive((active + 1) % artworks.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + artworks.length) % artworks.length);
      if (event.key === "Tab") {
        const controls = document.querySelectorAll<HTMLElement>(".paper-lightbox button, .paper-lightbox a");
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, artworks.length, onClose, setActive]);

  if (!work || active === null) return null;
  return (
    <div className="paper-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-label={`Xem toàn ảnh tác phẩm ${work.title}`}>
        <div className="paper-lightbox__top"><span>{String(active + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}</span><strong>{work.title}</strong><button ref={closeButton} type="button" onClick={onClose} aria-label="Đóng ảnh xem trước">Đóng <span aria-hidden="true">×</span></button></div>
        <div className="paper-lightbox__image"><Image src={work.image} alt={`Toàn cảnh tác phẩm ${work.title}`} fill priority sizes="94vw" /></div>
        <div className="paper-lightbox__controls"><button type="button" onClick={() => setActive((active - 1 + artworks.length) % artworks.length)} aria-label="Ảnh trước"><Arrow direction="left" /></button><ArtworkPopupContact artwork={work} /><button type="button" onClick={() => setActive((active + 1) % artworks.length)} aria-label="Ảnh tiếp theo"><Arrow /></button></div>
      </section>
    </div>
  );
}

export default function ArtworkGallery({ artworks }: { artworks: ArtworkRecord[] }) {
  const [active, setActive] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const room = useRef<HTMLElement>(null);
  const work = artworks[active];
  const channelLinks = (["tiktok", "youtube"] as const).flatMap((platform) => {
    const configuredUrl = siteLinks[platform];
    if (configuredUrl && isValidChannelUrl(configuredUrl, platform)) return [{ platform, url: configuredUrl }];
    return [];
  });
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  if (!work) return <main className="paper-gallery paper-gallery--empty"><h1>Chưa có tác phẩm</h1><p>Bộ sưu tập đang được cập nhật. Mời bạn ghé lại sau.</p></main>;

  const artworkSocialLinks = work.socialLinks;
  const otherGroups = [...new Map(artworks.map(({ group, groupSlug }) => [groupSlug, { group, groupSlug }])).values()]
    .filter(({ groupSlug }) => groupSlug !== work.groupSlug)
    .sort((a, b) => a.group.localeCompare(b.group, "vi"));

  function openLightbox(index: number, button: HTMLButtonElement) {
    trigger.current = button;
    setLightbox(index);
  }

  function showArtwork(index: number) {
    setActive(index);
    requestAnimationFrame(() => room.current?.focus({ preventScroll: true }));
    room.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <main className="paper-gallery">
        <GalleryAtmosphere />
        <header className="paper-header">
          <a href={siteLinks.facebookPage} className="paper-brand" target="_blank" rel="noreferrer" aria-label="Mở Facebook Page Huygirl Thư pháp Việt"><span className="paper-brand__avatar"><img src={siteLinks.facebookAvatar} alt="" /></span><b><span className="paper-brand__name">Huygirl</span><span className="paper-brand__descriptor">Thư pháp Việt</span></b></a>
          <p><strong>Thư viện tác phẩm</strong><span>Nghệ thuật chữ Việt</span></p>
          <nav className="paper-header__nav" aria-label="Liên kết chính">
            <a className="paper-collection-link" href="#collection" aria-label="Xem toàn bộ tác phẩm" title="Toàn bộ tác phẩm"><span className="paper-collection-link__full">Toàn bộ tác phẩm</span><span className="paper-collection-link__short">Tác phẩm</span><b aria-hidden="true">↓</b></a>
            <div className="paper-header__socials"><a href={siteLinks.facebookPage} target="_blank" rel="noreferrer" aria-label="Mở Facebook Page Huygirl Thư pháp Việt" title="Facebook"><SocialIcon platform="facebook" /></a>{channelLinks.map(({ platform, url }) => <a key={platform} href={url} target="_blank" rel="noreferrer" aria-label={`Mở kênh ${platform === "tiktok" ? "TikTok" : "YouTube"}`} title={platform === "tiktok" ? "TikTok" : "YouTube"}><SocialIcon platform={platform} /></a>)}</div>
          </nav>
        </header>

        <section ref={room} className="paper-room" aria-labelledby="active-artwork-title" tabIndex={-1}>
          <aside className="paper-index">
            <div className="paper-index__heading"><span>Bộ sưu tập<span className="paper-index__mobile-label"> nghệ thuật chữ Việt</span></span><b>{String(artworks.length).padStart(2, "0")} tác phẩm</b></div>
            <div className="paper-index__list">
              {artworks.map((artwork, index) => (
                <button key={artwork.slug} type="button" onClick={() => setActive(index)} className={active === index ? "is-active" : ""} aria-pressed={active === index}>
                  <span className="paper-index__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="paper-index__thumb"><Image src={artwork.image} alt="" fill sizes="(max-width: 720px) 112px, 46px" /></span>
                  <b>{artwork.title}</b>
                </button>
              ))}
            </div>
          </aside>

          <div className="paper-art-column">
            <ArtworkContact artwork={work} className="paper-messenger paper-art-contact">
              <span><small>Qua Messenger</small><strong>Liên hệ tác phẩm này</strong></span>
              <span className="paper-art-contact__messenger"><MessengerIcon /></span>
              <svg className="paper-art-contact__touch" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V6a2 2 0 0 1 4 0v6l1-1a2 2 0 0 1 2.7 0l.3.3a2 2 0 0 1 2.6.2l.4.4a2 2 0 0 1 2 2V17c0 3-2 5-5 5h-3c-1.7 0-3-1-4-2.5l-4-6a1.6 1.6 0 0 1 2.5-2L8 13Z" />
                <path className="paper-art-contact__touch-rays" d="M3 6H1m3-4L2.5.5M16 3l1.5-1.5M18 7h3" />
              </svg>
            </ArtworkContact>
            <div className="paper-art-wrap">
              <ArtworkSeal />
              <span className="paper-tape paper-tape--top" aria-hidden="true" />
              <button className="paper-art" type="button" onClick={(event) => openLightbox(active, event.currentTarget)} aria-label={`Mở ảnh toàn màn hình: ${work.title}`}>
                <Image key={work.image} src={work.image} alt={`Tác phẩm thư pháp ${work.title}`} fill loading="eager" sizes="(max-width: 720px) 92vw, (max-width: 1100px) 60vw, 36vw" />
                <span><ExpandIcon /> Xem toàn ảnh</span>
              </button>
              <span className="paper-tape paper-tape--bottom" aria-hidden="true" />
            </div>
          </div>

          <article className="paper-story" aria-live="polite">
            <p className="paper-story__eyebrow">Tác phẩm {String(active + 1).padStart(2, "0")}</p>
            <h1 id="active-artwork-title">{work.title}</h1>
            <div className="paper-materials" aria-label="Chất liệu">{work.materials.map((material) => <span key={material}>{material}</span>)}</div>
            <p className="paper-description">{work.description}</p>
            <nav className="paper-related" aria-label="Khám phá các chữ thư pháp">
              <p><span>Các chữ tương tự:</span> <Link href={`/chu/${work.groupSlug}?tac-pham=${work.slug}`} scroll={false}>{work.group}</Link></p>
              {otherGroups.length > 0 && <p><span>Các chữ khác:</span> {otherGroups.map(({ group, groupSlug }, index) => <span key={groupSlug}><Link href={`/chu/${groupSlug}`} scroll={false}>{group}</Link>{index < otherGroups.length - 1 ? ", " : ""}</span>)}</p>}
            </nav>
            {artworkSocialLinks.length > 0 && <nav className="paper-socials" aria-label={`Video về tác phẩm ${work.title}`}><p>Xem video tác phẩm tại:</p>{artworkSocialLinks.map((link) => <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} title={link.platform}><SocialIcon platform={link.platform} /></a>)}</nav>}
            <div className="paper-controls"><button type="button" onClick={() => setActive((active - 1 + artworks.length) % artworks.length)} aria-label="Tác phẩm trước"><Arrow direction="left" /></button><span>{active + 1} / {artworks.length}</span><button type="button" onClick={() => setActive((active + 1) % artworks.length)} aria-label="Tác phẩm tiếp theo"><Arrow /></button></div>
          </article>
        </section>

        <section className="paper-collection" id="collection">
          <div className="paper-collection__grid" id="artwork-grid">
            {artworks.slice(0, visibleCount).map((artwork, index) => (
              <article key={artwork.slug}>
                {index < 2 && <ArtworkSeal variant={index === 0 ? "peace" : "good-fortune"} />}
                <button type="button" onClick={(event) => openLightbox(index, event.currentTarget)} aria-label={`Mở ảnh toàn màn hình: ${artwork.title}`}><Image src={artwork.image} alt={`Tác phẩm ${artwork.title}`} fill sizes="(max-width: 760px) 72vw, 24vw" /><span><ExpandIcon /></span></button>
                <div className="paper-card-info"><h3><button type="button" onClick={() => showArtwork(index)} aria-label={`Xem tác phẩm ${artwork.title} ở khung chính`}>{artwork.title}</button></h3></div>
                <ArtworkContact artwork={artwork} className="paper-card-messenger"><MessengerIcon /><span className="contact-label--full">Liên hệ tác phẩm này</span><span className="contact-label--mobile">LIÊN HỆ</span></ArtworkContact>
              </article>
            ))}
          </div>
          {visibleCount < artworks.length && <button className="paper-load-more" type="button" aria-controls="artwork-grid" onClick={() => setVisibleCount((count) => count + 10)}>Xem thêm <span>({artworks.length - visibleCount} tác phẩm)</span></button>}
        </section>
      </main >
      <Lightbox artworks={artworks} active={lightbox} setActive={setLightbox} onClose={closeLightbox} />
    </>
  );
}
