"use client";

import type { ArtworkRecord } from "@/lib/artworks";
import ArtworkPopupContact from "@/components/ArtworkPopupContact";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SimilarGallery({ artworks, initialIndex, intercepted }: { artworks: ArtworkRecord[]; initialIndex: number; intercepted: boolean }) {
  const router = useRouter();
  const [active, setActive] = useState(initialIndex);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const work = artworks[active];
  const move = useCallback((direction: number) => {
    setActive((index) => (index + direction + artworks.length) % artworks.length);
  }, [artworks.length]);
  const close = useCallback(() => {
    if (intercepted) router.back();
    else router.replace("/");
  }, [intercepted, router]);

  useEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    let delta = 0;
    let lastMove = 0;
    let lastWheel = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastMove < 450) return;
      if (now - lastWheel > 180) delta = 0;
      lastWheel = now;
      delta += (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 300 : 1);
      if (Math.abs(delta) >= 60) {
        move(delta > 0 ? 1 : -1);
        delta = 0;
        lastMove = now;
      }
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
      element.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [move]);

  return (
    <>
      {!intercepted && <div className="similar-gallery-backdrop" aria-hidden="true"><Image src={work.image} alt="" fill sizes="100vw" /></div>}
      <dialog ref={dialog} className="similar-gallery" aria-labelledby="similar-gallery-heading" onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      }}>
        <header className="similar-gallery__header">
          <div><p>Các chữ tương tự</p><h1 id="similar-gallery-heading">{work.group}</h1></div>
          <button className="similar-gallery__close" type="button" onClick={close} aria-label="Đóng gallery và quay lại trang trước" autoFocus>×</button>
        </header>
        <div className="similar-gallery__stage" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
          if (touchStart.current !== null) {
            const distance = touchStart.current - event.changedTouches[0].clientX;
            if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1);
          }
          touchStart.current = null;
        }} onTouchCancel={() => { touchStart.current = null; }}>
          <button type="button" onClick={() => move(-1)} aria-label="Tác phẩm trước" disabled={artworks.length < 2}>‹</button>
          <div className="similar-gallery__image"><Image key={work.slug} src={work.image} alt={work.title} fill priority sizes="(max-width: 720px) 80vw, 75vw" /></div>
          <button type="button" onClick={() => move(1)} aria-label="Tác phẩm tiếp theo" disabled={artworks.length < 2}>›</button>
        </div>
        <footer className="similar-gallery__caption"><div aria-live="polite" aria-atomic="true"><h2>{work.title}</h2><p>{active + 1} / {artworks.length}</p></div><ArtworkPopupContact artwork={work} /></footer>
      </dialog>
    </>
  );
}
