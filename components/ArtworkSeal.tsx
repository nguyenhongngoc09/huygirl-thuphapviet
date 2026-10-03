export default function ArtworkSeal({ variant = "fortune" }: { variant?: "fortune" | "peace" | "good-fortune" }) {
  return (
    <div className="artwork-seal" aria-hidden="true">
      {variant === "fortune" && (<svg  viewBox="0 0 120 120" fill="none" focusable="false">
          <rect x="8" y="8" width="104" height="104" stroke="currentColor" strokeWidth="5" />
          <path d="M17 38V17H43M78 17H103V43M103 82V103H77M42 103H17V78" stroke="currentColor" strokeWidth="2" />
          <text x="60" y="70" textAnchor="middle" fill="currentColor" fontSize="35" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">Phúc</text>
          <path d="M37 83H83" stroke="currentColor" strokeWidth="2" />
        </svg>)}
      {variant === "peace" && (<svg  viewBox="0 0 100 140" fill="none" focusable="false">
          <rect x="9" y="9" width="82" height="122" stroke="currentColor" strokeWidth="4" />
          <rect x="16" y="16" width="68" height="108" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="65" textAnchor="middle" fill="currentColor" fontSize="29" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">Bình</text>
          <text x="50" y="100" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">An</text>
        </svg>)}
      {variant === "good-fortune" && (<svg  viewBox="0 0 112 148" fill="none" focusable="false">
          <rect x="7" y="7" width="98" height="134" stroke="currentColor" strokeWidth="4" />
          <rect x="14" y="14" width="84" height="120" stroke="currentColor" strokeWidth="1.5" />
          <text x="56" y="52" textAnchor="middle" fill="currentColor" fontSize="24" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">Vạn sự</text>
          <text x="56" y="91" textAnchor="middle" fill="currentColor" fontSize="31" fontFamily="var(--font-display), Georgia, serif" fontWeight="600">như ý</text>
          <path d="M30 108H82" stroke="currentColor" strokeWidth="2" />
        </svg>)}
    </div>
  );
}
