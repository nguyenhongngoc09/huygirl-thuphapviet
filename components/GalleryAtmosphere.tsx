export default function GalleryAtmosphere() {
  return (
      <div className="gallery-atmosphere" aria-hidden="true">
        <svg className="gallery-atmosphere__wash" viewBox="0 0 600 600" fill="none" focusable="false">
          <path d="M460 128C348 28 141 95 104 266S222 528 389 464C493 424 524 321 481 248" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
          <path d="M443 114C316 49 159 110 122 262S244 500 376 452" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg className="gallery-atmosphere__brush" viewBox="0 0 100 460" fill="none" focusable="false">
          <path d="M43 40C32 17 64 8 58 38" stroke="currentColor" strokeWidth="3" />
          <path d="M39 42Q50 35 61 42L58 306Q50 312 42 306Z" fill="currentColor" opacity=".65" />
          <path d="M45 53 47 289M54 49 52 296" stroke="white" strokeWidth="2" opacity=".65" />
          <path d="M40 293H60V318H40Z" fill="currentColor" />
          <path d="M41 319C18 350 28 397 52 443C50 399 84 359 59 319Z" fill="currentColor" />
          <path d="M47 327C35 361 43 398 52 429M55 330C63 365 47 392 52 429" stroke="white" strokeWidth="1.5" opacity=".65" />
          <path d="M38 299H62M38 308H62" stroke="white" strokeWidth="2" opacity=".65" />
        </svg>
      </div>
  );
}
