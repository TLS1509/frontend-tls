import svgPaths from "./svg-2vp74ztdbj";

function TlsIcon() {
  return (
    <div className="h-[84.315px] relative shrink-0 w-[94px]" data-name="TLS - icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 85">
        <g id="TLS - icon">
          <path d={svgPaths.p158acb00} fill="var(--fill-0, #F8B044)" id="Vector" />
          <path d={svgPaths.p38fde400} fill="var(--fill-0, #EB7724)" id="Vector_2" />
          <path d={svgPaths.p14049800} fill="var(--fill-0, #8DBAC6)" id="Vector_3" />
          <path d={svgPaths.p30c45580} fill="var(--fill-0, #55A1B4)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[100px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[13px] items-center px-[7px] py-0 relative size-full">
          <TlsIcon />
          <div className="font-['League_Spartan:ExtraBold',sans-serif] font-extrabold leading-[29px] relative shrink-0 text-[#55a1b4] text-[36px] tracking-[1.8px] w-[165px]">
            <p className="mb-0">{`The `}</p>
            <p>{`Learning Society `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogoNormalBlue() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative size-full" data-name="Logo normal blue">
      <Frame />
    </div>
  );
}