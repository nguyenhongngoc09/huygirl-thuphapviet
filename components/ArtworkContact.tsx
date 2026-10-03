"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { ArtworkRecord } from "@/lib/artworks";
import { getMessengerHref, getArtworkMessage } from "@/lib/artwork-contact";

export default function ArtworkContact({ artwork, className, children }: { artwork: ArtworkRecord; className: string; children: ReactNode }) {
  const [notice, setNotice] = useState<{ message: string; copied: boolean } | null>(null);
  const href = getMessengerHref(artwork);
  if (!href) return null;

  function copyMessage(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (mobile) {
      // Follow the app link in the same tab, within the original tap gesture.
      event.currentTarget.href = getMessengerHref(artwork, true)!;
      event.currentTarget.target = "_self";
    } else {
      event.currentTarget.href = href!;
      event.currentTarget.target = "_blank";
    }
    const message = getArtworkMessage(artwork, window.location.origin);
    // Keep native link navigation synchronous so browsers allow the new tab.
    if (!navigator.clipboard?.writeText) {
      setNotice({ message, copied: false });
      return;
    }
    void navigator.clipboard.writeText(message).then(
      () => setNotice({ message, copied: true }),
      () => setNotice({ message, copied: false }),
    );
  }

  return <>
    <a className={className} href={href} target="_blank" rel="noreferrer" onClick={copyMessage} title="Sao chép lời nhắn và link tác phẩm, rồi dán và gửi trong Messenger" aria-label={`Sao chép lời nhắn và mở Messenger về tác phẩm ${artwork.title}`}>{children}</a>
    {notice && createPortal(<div className="artwork-contact-notice">
      <p role="status">{notice.copied ? "Đã sao chép lời nhắn và link tác phẩm. Dán và gửi trong Messenger nhé!" : "Chưa sao chép được. Hãy sao chép lời nhắn bên dưới rồi dán và gửi trong Messenger."}</p>
      <textarea aria-label="Lời nhắn về tác phẩm" readOnly value={notice.message} onFocus={(event) => event.currentTarget.select()} />
      <button type="button" onClick={() => setNotice(null)}>Đóng thông báo</button>
    </div>, document.body)}
  </>;
}
