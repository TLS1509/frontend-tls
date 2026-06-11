import svgPaths from "../imports/svg-2vp74ztdbj";

interface LogoHeaderBlueProps {
  text?: string;
  showText?: boolean;
  isDark?: boolean;
}

export function LogoHeaderBlue({ text = "The Learning Society", showText = true, isDark = false }: LogoHeaderBlueProps) {
  return (
    <div className="flex items-center gap-3">
      {/* TLS Icon */}
      <div className="h-10 w-auto relative shrink-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMinYMid meet" viewBox="0 0 94 85">
          <g>
            <path d={svgPaths.p158acb00} fill="#F8B044" />
            <path d={svgPaths.p38fde400} fill="#EB7724" />
            <path d={svgPaths.p14049800} fill="#8DBAC6" />
            <path d={svgPaths.p30c45580} fill="#55A1B4" />
          </g>
        </svg>
      </div>
      
      {/* Texte modifiable */}
      {showText && (
        <div 
          className={`relative shrink-0 uppercase tracking-wide whitespace-nowrap transition-all duration-500 ${
            isDark ? 'text-white' : 'text-primary'
          }`}
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' }}
        >
          {text}
        </div>
      )}
    </div>
  );
}