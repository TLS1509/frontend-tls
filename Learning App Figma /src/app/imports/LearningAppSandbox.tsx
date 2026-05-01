import svgPaths from "./svg-3nn4ju3o7m";
import imgImage from "figma:asset/3b8e25b9c2a3dbe633170841105f8b78b15dd2e0.png";

function Container() {
  return <div className="absolute h-[1061.953px] left-0 opacity-30 shadow-[0px_4px_12.997px_0px_rgba(85,161,180,0.34)] top-0 w-[1102.899px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1102.9 1062\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -102.98 -102.98 0 220.58 530.98)\\\'><stop stop-color=\\\'rgba(85,161,180,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(64,121,135,0.75)\\\' offset=\\\'0.125\\\'/><stop stop-color=\\\'rgba(43,81,90,0.5)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(21,40,45,0.25)\\\' offset=\\\'0.375\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1102.9 1062\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -102.98 -102.98 0 882.32 530.98)\\\'><stop stop-color=\\\'rgba(248,176,68,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(186,132,51,0.75)\\\' offset=\\\'0.125\\\'/><stop stop-color=\\\'rgba(124,88,34,0.5)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(62,44,17,0.25)\\\' offset=\\\'0.375\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>')" }} />;
}

function Heading() {
  return (
    <div className="h-[45px] relative shrink-0 w-[551.684px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[45px] left-0 not-italic text-[#55a1b4] text-[30px] top-px tracking-[0.3955px] whitespace-pre">Les Fondamentaux du Marketing Digital</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 15.9983">
        <g clipPath="url(#clip0_462_253)" id="Icon">
          <path d={svgPaths.p386f74e0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
          <path d={svgPaths.p2373280} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
        </g>
        <defs>
          <clipPath id="clip0_462_253">
            <rect fill="white" height="15.9983" width="15.9983" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[44.514px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-[0.22px] tracking-[-0.1504px] whitespace-pre">45 min</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[68.507px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[45px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container1 />
    </div>
  );
}

function Container3() {
  return <div className="bg-[#55a1b4] h-[7.995px] shadow-[0px_0px_20px_0px_#55a1b4] shrink-0 w-full" data-name="Container" />;
}

function Container4() {
  return (
    <div className="bg-[#e0e8ea] h-[7.995px] relative rounded-[9999px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[870.399px] py-0 relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[15.998px] h-[68.993px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[117.535px] items-start left-0 pb-[0.556px] pt-[23.993px] px-[39.453px] top-0 w-[1102.899px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[7px] not-italic text-[14px] text-center text-white top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">📖</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[85.26px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[43.5px] not-italic text-[14px] text-center text-white top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Introduction</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_462_243)" id="Icon">
          <path d={svgPaths.p2da57900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999711" />
          <path d={svgPaths.p163fc00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999711" />
        </g>
        <defs>
          <clipPath id="clip0_462_243">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
      <Icon1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#55a1b4] h-[44.991px] relative rounded-[16px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] shrink-0 w-[175.122px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[7px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">🎯</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[20.998px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[42px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Engagement</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#eef6f8] h-[44.991px] relative rounded-[16px] shrink-0 w-[152.943px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[7px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">🔍</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[64.392px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[32px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Découvrir</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#eef6f8] h-[44.991px] relative rounded-[16px] shrink-0 w-[134.262px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[7px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">❓</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[29.965px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[15px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Quiz</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#eef6f8] h-[44.991px] relative rounded-[16px] shrink-0 w-[99.835px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[7px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">💭</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[58.698px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[29.5px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Réfléchir</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#eef6f8] h-[44.991px] relative rounded-[16px] shrink-0 w-[128.568px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[7px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✍️</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[63.976px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[32px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Appliquer</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#eef6f8] h-[44.991px] relative rounded-[16px] shrink-0 w-[133.845px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[13.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[7px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">🎓</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[73.446px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[37px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Conclusion</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[20.998px] items-center relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#eef6f8] h-[44.991px] relative rounded-[16px] shrink-0 w-[143.316px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.997px] px-[23.993px] relative size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[7.995px] h-[44.991px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[77.543px] items-start left-0 pb-[0.556px] pt-[15.998px] px-[39.453px] top-[117.53px] w-[1102.899px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container14 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#252b37] text-[24px] top-[-0.67px] tracking-[0.0703px] whitespace-pre">Bienvenue dans cette leçon</p>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[255.998px] relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgImage} />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[58.507px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#252b37] text-[18px] top-[0.89px] tracking-[-0.4395px] w-[787px] whitespace-pre-wrap">Dans cette introduction, nous allons découvrir ensemble les concepts fondamentaux du marketing digital. Vous allez apprendre comment les entreprises utilisent Internet pour atteindre leurs clients.</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_462_260)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_462_260">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RenderFullWidthGradient() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[238.377px]" data-name="RenderFullWidthGradient">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#252b37] text-[16px] top-[-0.78px] tracking-[-0.3125px] whitespace-pre">{`Comprendre l'écosystème digital`}</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[57.101px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(176.069deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex gap-[11.997px] items-start pb-[0.556px] pl-[16.554px] pr-[0.556px] pt-[16.554px] relative size-full">
        <Icon2 />
        <RenderFullWidthGradient />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_462_260)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_462_260">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RenderFullWidthGradient1() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[178.455px]" data-name="RenderFullWidthGradient">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#252b37] text-[16px] top-[-0.78px] tracking-[-0.3125px] whitespace-pre">Identifier les canaux clés</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[57.101px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(176.069deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex gap-[11.997px] items-start pb-[0.556px] pl-[16.554px] pr-[0.556px] pt-[16.554px] relative size-full">
        <Icon3 />
        <RenderFullWidthGradient1 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_462_260)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_462_260">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RenderFullWidthGradient2() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[254.297px]" data-name="RenderFullWidthGradient">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#252b37] text-[16px] top-[-0.78px] tracking-[-0.3125px] whitespace-pre">Maîtriser les métriques essentielles</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[57.101px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(176.069deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex gap-[11.997px] items-start pb-[0.556px] pl-[16.554px] pr-[0.556px] pt-[16.554px] relative size-full">
        <Icon4 />
        <RenderFullWidthGradient2 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[11.997px] h-[195.295px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[23.993px] h-[722.882px] items-start left-[103.45px] pb-[0.556px] pt-[32.552px] px-[32.552px] rounded-[32px] top-[243.07px] w-[895.998px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
      <Heading1 />
      <Image />
      <Paragraph />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[1061.953px] left-0 top-0 w-[1102.899px]" data-name="Container">
      <Container6 />
      <Container15 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[1061.953px] relative shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(136.084deg, rgba(85, 161, 180, 0.063) 0%, rgba(237, 132, 58, 0.063) 50%, rgba(248, 176, 68, 0.063) 100%)" }}>
      <Container />
      <Container21 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[16px] size-[15.998px] top-[10.49px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 15.9983">
        <g id="Icon">
          <path d={svgPaths.pec0aa00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#eef6f8] h-[36.988px] opacity-40 relative rounded-[12px] shrink-0 w-[125.521px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon5 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[75.49px] not-italic text-[#6b7280] text-[14px] text-center top-[8.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Précédent</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#55a1b4] relative rounded-[9999px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#e0e8ea] relative rounded-[9999px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#e0e8ea] relative rounded-[9999px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#e0e8ea] relative rounded-[9999px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#e0e8ea] relative rounded-[9999px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[191.962px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-center relative size-full">
        <Button8 />
        <Button9 />
        <Button10 />
        <Button11 />
        <Button12 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[74.56px] size-[15.998px] top-[10.49px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 15.9983">
        <g id="Icon">
          <path d={svgPaths.p1801b380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#55a1b4] h-[36.988px] relative rounded-[12px] shrink-0 w-[106.554px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[41.5px] not-italic text-[14px] text-center text-white top-[8.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Suivant</p>
        <Icon6 />
      </div>
    </div>
  );
}

function PreviewNavigation() {
  return (
    <div className="bg-[#f5f8f8] h-[69.54px] relative shrink-0 w-full" data-name="PreviewNavigation">
      <div aria-hidden="true" className="absolute border-[0.556px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pl-[23.993px] pr-[24.002px] pt-[0.556px] relative size-full">
          <Button7 />
          <Container23 />
          <Button13 />
        </div>
      </div>
    </div>
  );
}

function RenderFullWidthGradient3() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1131.493px] items-start overflow-clip relative rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="RenderFullWidthGradient">
      <Container22 />
      <PreviewNavigation />
    </div>
  );
}

function SandboxLessonViewers() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1235.486px] items-start left-0 pb-0 pt-[103.993px] px-[7.995px] top-0 w-[1118.889px]" data-name="SandboxLessonViewers">
      <RenderFullWidthGradient3 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 15.9983">
        <g id="Icon">
          <path d={svgPaths.peb33b80} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
          <path d="M12.6653 7.99913H3.33297" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20.998px] relative shrink-0 w-[49.323px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[25px] not-italic text-[#252b37] text-[14px] text-center top-[0.22px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Accueil</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-[#eef6f8] h-[32.995px] relative rounded-[12px] shrink-0 w-[97.309px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-center pl-[11.997px] pr-0 py-0 relative size-full">
        <Icon7 />
        <Text15 />
      </div>
    </div>
  );
}

function Container24() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[31.997px] shrink-0 w-[0.998px]" data-name="Container" />;
}

function Button15() {
  return (
    <div className="bg-[#55a1b4] h-[29.991px] relative rounded-[12px] shrink-0 w-[36.771px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[18px] not-italic text-[12px] text-center text-white top-[6.66px] translate-x-[-50%] whitespace-pre">🎨</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[29.991px] relative rounded-[12px] shrink-0 w-[36.771px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[18px] not-italic text-[#6b7280] text-[12px] text-center top-[6.66px] translate-x-[-50%] whitespace-pre">📚</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[29.991px] relative rounded-[12px] shrink-0 w-[36.771px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[18px] not-italic text-[#6b7280] text-[12px] text-center top-[6.66px] translate-x-[-50%] whitespace-pre">🔀</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[29.991px] relative rounded-[12px] shrink-0 w-[36.771px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[18px] not-italic text-[#6b7280] text-[12px] text-center top-[6.66px] translate-x-[-50%] whitespace-pre">✨</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[29.991px] relative shrink-0 w-[171.068px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-start relative size-full">
        <Button15 />
        <Button16 />
        <Button17 />
        <Button18 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[27.005px] relative shrink-0 w-[17.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[9px] not-italic text-[18px] text-center text-white top-[0.78px] tracking-[-0.4395px] translate-x-[-50%] whitespace-pre">🌈</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="flex-[1_0_0] h-[20.998px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-white top-[0.22px] tracking-[-0.1504px] whitespace-pre">Full Width Gradient</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[15.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 15.9983">
        <g id="Icon">
          <path d={svgPaths.p1801b380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33319" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#55a1b4] h-[39.002px] relative rounded-[12px] shrink-0 w-[220px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.995px] items-center px-[15.998px] py-0 relative size-full">
        <Text16 />
        <Text17 />
        <Icon8 />
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-[#eef6f8] h-[32.995px] relative rounded-[12px] shrink-0 w-[37.057px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[12px] py-[6px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#252b37] text-[14px] text-center tracking-[-0.1504px] whitespace-pre">○</p>
      </div>
    </div>
  );
}

function CompactLessonNav() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex gap-[11.997px] h-[64.106px] items-center left-[234.69px] pl-[24.549px] pr-[0.556px] py-[0.556px] rounded-[24px] top-[16px] w-[649.505px]" data-name="CompactLessonNav">
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Button14 />
      <Container24 />
      <Container25 />
      <Container24 />
      <Button19 />
      <Container24 />
      <Button20 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <SandboxLessonViewers />
      <CompactLessonNav />
    </div>
  );
}