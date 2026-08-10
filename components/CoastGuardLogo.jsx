export const CoastGuardLogo = ({ className = 'w-10 h-12' }) => {
  return (
    <svg
      viewBox="0 0 300 360"
      className={`${className} shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bangladesh Coast Guard Logo"
    >
      <defs>
        <path id="topRibbonPath" d="M 60,82 A 130,130 0 0,1 240,82" />
        <path id="bottomRibbonPath" d="M 50,285 A 135,135 0 0,0 250,285" />
      </defs>
      <ellipse cx="150" cy="180" rx="145" ry="175" fill="#F8E11C" />
      <ellipse cx="150" cy="180" rx="133" ry="163" fill="#16226C" />
      <path d="M 50,88 C 90,52 210,52 250,88 L 236,112 C 200,82 100,82 64,112 Z" fill="#FFFFFF" />
      <path d="M 50,88 L 32,70 L 42,102 Z" fill="#E2E8F0" />
      <path d="M 250,88 L 268,70 L 258,102 Z" fill="#E2E8F0" />
      <text fill="#16226C" fontSize="19" fontWeight="900" letterSpacing="2.5">
        <textPath href="#topRibbonPath" startOffset="50%" textAnchor="middle">
          GUARDIAN AT SEA
        </textPath>
      </text>
      <circle cx="150" cy="108" r="23" fill="#DC2626" stroke="#F8E11C" strokeWidth="3" />
      <g fill="#F8E11C">
        <path d="M 150,94 C 148,100 148,108 150,116 C 152,108 152,100 150,94 Z" />
        <path d="M 150,96 C 144,103 145,114 150,118 C 155,114 156,103 150,96 Z" />
        <path d="M 148,102 C 140,105 137,113 144,118 C 148,115 149,110 148,102 Z" />
        <path d="M 152,102 C 160,105 163,113 156,118 C 152,115 151,110 152,102 Z" />
        <path d="M 134,118 C 142,122 158,122 166,118 C 160,126 140,126 134,118 Z" />
      </g>
      <g stroke="#F8E11C" strokeWidth="12" strokeLinecap="round">
        <line x1="150" y1="130" x2="150" y2="290" />
        <line x1="70" y1="210" x2="230" y2="210" />
        <line x1="93" y1="153" x2="207" y2="267" />
        <line x1="93" y1="267" x2="207" y2="153" />
      </g>
      <g fill="#F8E11C">
        <circle cx="150" cy="126" r="10" />
        <circle cx="150" cy="294" r="10" />
        <circle cx="66" cy="210" r="10" />
        <circle cx="234" cy="210" r="10" />
        <circle cx="90" cy="150" r="10" />
        <circle cx="210" cy="270" r="10" />
        <circle cx="90" cy="270" r="10" />
        <circle cx="210" cy="150" r="10" />
      </g>
      <circle cx="150" cy="210" r="62" stroke="#F8E11C" strokeWidth="12" fill="none" />
      <circle cx="150" cy="210" r="44" stroke="#F8E11C" strokeWidth="6" fill="#16226C" />
      <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">
        <line x1="114" y1="222" x2="186" y2="222" />
        <line x1="110" y1="229" x2="190" y2="229" />
        <line x1="112" y1="236" x2="188" y2="236" />
        <line x1="118" y1="243" x2="182" y2="243" />
        <line x1="126" y1="250" x2="174" y2="250" />
      </g>
      <g fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1">
        <path d="M 148,172 L 152,172 L 152,228 L 148,228 Z" />
        <path d="M 141,185 L 159,185 L 159,189 L 141,189 Z" />
        <circle cx="150" cy="170" r="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M 124,208 C 122,222 134,230 144,230 L 144,224 C 137,224 128,218 130,208 Z" />
        <path d="M 120,208 L 132,204 L 128,214 Z" />
        <path d="M 176,208 C 178,222 166,230 156,230 L 156,224 C 163,224 172,218 170,208 Z" />
        <path d="M 180,208 L 168,204 L 172,214 Z" />
      </g>
      <path d="M 45,268 C 90,305 210,305 255,268 L 240,244 C 200,275 100,275 60,244 Z" fill="#FFFFFF" />
      <path d="M 45,268 L 25,286 L 36,254 Z" fill="#E2E8F0" />
      <path d="M 255,268 L 275,286 L 264,254 Z" fill="#E2E8F0" />
      <text fill="#16226C" fontSize="17" fontWeight="900">
        <textPath href="#bottomRibbonPath" startOffset="50%" textAnchor="middle">
          বাংলাদেশ কোস্ট গার্ড
        </textPath>
      </text>
    </svg>
  );
};
