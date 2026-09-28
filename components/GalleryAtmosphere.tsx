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
        <svg className="gallery-atmosphere__seal gallery-atmosphere__seal--fortune" viewBox="0 0 120 120" fill="none" focusable="false">
          <rect x="8" y="8" width="104" height="104" rx="5" stroke="currentColor" strokeWidth="5" />
          <path d="M17 38V17H43M78 17H103V43M103 82V103H77M42 103H17V78" stroke="currentColor" strokeWidth="2" />
          <text x="60" y="70" textAnchor="middle" fill="currentColor" fontSize="35" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">Phúc</text>
          <path d="M37 83H83" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="gallery-atmosphere__seal gallery-atmosphere__seal--peace" viewBox="0 0 100 140" fill="none" focusable="false">
          <rect x="9" y="9" width="82" height="122" rx="3" stroke="currentColor" strokeWidth="4" />
          <rect x="16" y="16" width="68" height="108" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="65" textAnchor="middle" fill="currentColor" fontSize="29" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">Bình</text>
          <text x="50" y="100" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">An</text>
        </svg>
        <svg className="gallery-atmosphere__seal gallery-atmosphere__seal--good-fortune" viewBox="0 0 112 148" fill="none" focusable="false">
          <rect x="7" y="7" width="98" height="134" rx="3" stroke="currentColor" strokeWidth="4" />
          <rect x="14" y="14" width="84" height="120" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <text x="56" y="52" textAnchor="middle" fill="currentColor" fontSize="24" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">Vạn sự</text>
          <text x="56" y="91" textAnchor="middle" fill="currentColor" fontSize="31" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">như ý</text>
          <path d="M30 108H82" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
  );
}
