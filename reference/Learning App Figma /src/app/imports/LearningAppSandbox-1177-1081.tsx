import svgPaths from "./svg-xbrgjiwvvv";
import imgContainer from "figma:asset/51b047e3d79056c38e81a253b42c2935e296bbda.png";

function Button() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-0 rounded-[12px] top-0 w-[51.828px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[25px] text-[#252b37] text-[12px] text-center top-[6px]">Tous</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-[59.83px] rounded-[12px] top-0 w-[73px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[35px] text-[#252b37] text-[12px] text-center top-[6px]">Dossiers</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-[140.83px] rounded-[12px] top-0 w-[68.516px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[33.5px] text-[#252b37] text-[12px] text-center top-[6px]">Articles</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#55a1b4] h-[32px] left-[217.34px] rounded-[12px] top-0 w-[64.078px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[32.5px] text-[12px] text-center text-white top-[7px]">Le Mag</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[65px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f59e0b] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📚</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[159.438px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Le Mag - Cover Sommaire</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[201px]" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[201px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Cover avec sommaire</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[47.219px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Cover</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22px] left-[51.22px] rounded-[4px] top-0 w-[70.781px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Sommaire</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[22px] left-[126px] rounded-[4px] top-0 w-[43.992px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Icons</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[22px] left-0 top-[49.8px] w-[201px]" data-name="Container">
      <Text />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] h-[71.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container7 />
        <Paragraph />
        <Container8 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[71.797px] items-start left-[17px] top-[17px] w-[253px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[105.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#f59e0b] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📰</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[165.672px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Le Mag - Editorial Columns</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[201px]" data-name="Container">
      <Heading3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[201px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Colonnes éditoriales</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[63.781px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Columns</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[22px] left-[67.78px] rounded-[4px] top-0 w-[61.086px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Editorial</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[22px] left-[132.87px] rounded-[4px] top-0 w-[43.992px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Icons</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[22px] left-0 top-[49.8px] w-[201px]" data-name="Container">
      <Text3 />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[71.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container12 />
        <Paragraph1 />
        <Container13 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[71.797px] items-start left-[17px] top-[17px] w-[253px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[105.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container9 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f59e0b] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📰</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[151.734px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Le Mag - Magazine Style</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p9a79300} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24092800} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-0 w-[199px]" data-name="Container">
      <Heading4 />
      <Icon />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[199px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Style magazine 2 colonnes</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[67.898px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Magazine</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[22px] left-[71.9px] rounded-[4px] top-0 w-[74.117px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">2 Columns</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[26px] w-[82.859px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f59e0b] text-[12px] top-[2px]">Professional</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[48px] left-0 top-[49.8px] w-[199px]" data-name="Container">
      <Text6 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] h-[97.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container17 />
        <Paragraph2 />
        <Container18 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[97.797px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[133.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_12px_0px_rgba(85,161,180,0.2)]" />
      <Container14 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[393.391px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] px-[16px] relative size-full">
        <Button4 />
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] h-[699px] left-0 top-[64px] w-[320px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[570px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[285.64px] text-[#6b7280] text-[12px] text-center top-0 tracking-[1.2px] uppercase">Mars 2025 • N°12</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[90px] left-0 top-[30px] w-[570px]" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[90px] left-[285.95px] text-[#252b37] text-[60px] text-center top-[0.5px] tracking-[-1.2px]">LE MAG TLS</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[30px] left-0 top-[132px] w-[570px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Regular',sans-serif] font-normal leading-[30px] left-[285.1px] text-[#6b7280] text-[20px] text-center top-[-0.5px]">Soft Skills : La Nouvelle Priorité</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[80.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-[40.5px] text-[#6b7280] text-[14px] text-center top-0">1 Mars 2025</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center justify-center left-0 top-[178px] w-[570px]" data-name="Container">
      <Icon1 />
      <Text9 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute border-[rgba(0,0,0,0.1)] border-b-3 border-solid h-[234px] left-[32px] top-[32px] w-[570px]" data-name="Container">
      <Paragraph3 />
      <Heading />
      <Paragraph4 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[384px] relative shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContainer} />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[570px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0 tracking-[1.2px] uppercase">Leadership</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[105.594px] left-0 top-[26px] w-[570px]" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[52.8px] left-0 text-[#252b37] text-[48px] top-0 tracking-[-0.96px] w-[495px] whitespace-pre-wrap">{`L'Empathie, Compétence Clé du Leader Moderne`}</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[62.391px] left-0 top-[147.59px] w-[570px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Medium',sans-serif] font-medium leading-[31.2px] left-0 text-[#6b7280] text-[24px] top-0 w-[567px] whitespace-pre-wrap">{`Comment développer l'intelligence émotionnelle dans les organisations`}</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="flex-[1_0_0] h-[224px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Italic',sans-serif] font-normal italic leading-[32px] left-0 text-[#252b37] text-[20px] top-[-0.5px] w-[343px] whitespace-pre-wrap">{`L'intelligence émotionnelle n'est plus un "nice to have" mais une compétence stratégique essentielle pour tout leader. Les organisations qui investissent dans le développement de l'empathie voient leurs résultats s'améliorer significativement.`}</p>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Dr. Claire Dubois</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1177_1095)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1177_1095">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[43.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b7280] text-[14px] top-0">15 min</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Text10 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[50px] relative shrink-0 w-[192px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Paragraph7 />
        <Container29 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[257px] items-start left-0 pb-px top-[233.98px] w-[570px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Paragraph6 />
      <Container28 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[201.578px] left-0 top-0 w-[269px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[269px] whitespace-pre-wrap">{`L'empathie en leadership va bien au-delà de la simple "gentillesse". C'est la capacité à comprendre véritablement le point de vue, les émotions et les besoins des autres pour prendre de meilleures décisions.`}</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[201.578px] left-[301px] top-0 w-[269px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[269px] whitespace-pre-wrap">{`Les études montrent que les équipes dirigées par des leaders empathiques sont 50% plus productives et ont un turnover réduit de 40%. L'empathie crée un environnement psychologiquement sûr où l'innovation peut prospérer.`}</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[172.781px] left-0 top-[233.58px] w-[269px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[269px] whitespace-pre-wrap">{`Développer l'empathie nécessite un travail conscient : écoute active, suspension du jugement, curiosité authentique envers les autres. C'est une pratique qui se cultive au quotidien.`}</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[406.359px] left-0 top-[522.98px] w-[570px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[929.344px] relative shrink-0 w-full" data-name="Container">
      <Paragraph5 />
      <Heading1 />
      <Heading5 />
      <Container27 />
      <Container30 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[1345.344px] items-start left-[32px] top-[314px] w-[570px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[45px] left-0 text-[#252b37] text-[30px] top-[-0.5px] tracking-[-0.3px]">Dans ce numéro</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col h-[96px] items-start pt-[35px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t-3 inset-0 pointer-events-none" />
      <Heading6 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0 tracking-[1.2px] uppercase">Communication</p>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[57.594px] left-0 top-[26px] w-[261px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[28.8px] left-0 text-[#252b37] text-[24px] top-0 w-[233px] whitespace-pre-wrap">Communication Non-Violente en Entreprise</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[81.586px] left-0 top-[95.59px] w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[27.2px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[261px] whitespace-pre-wrap">Les principes de la CNV appliqués au monde professionnel pour des échanges plus constructifs.</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[21px] relative shrink-0 w-[83.969px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Marc Laurent</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(0,0,0,0.1)] top-0">•</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1177_1085)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1177_1085">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[21px] relative shrink-0 w-[55.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#6b7280] text-[14px] top-0">8 min</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[24px] items-center left-0 top-[193.18px] w-[261px]" data-name="Container">
      <Paragraph13 />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[217.18px] left-0 top-0 w-[261px]" data-name="Container">
      <Paragraph11 />
      <Heading7 />
      <Paragraph12 />
      <Container35 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0 tracking-[1.2px] uppercase">Cognition</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[57.594px] left-0 top-[26px] w-[261px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[28.8px] left-0 text-[#252b37] text-[24px] top-0 w-[236px] whitespace-pre-wrap">{`Pensée Critique à l'Ère de l'Infobésité`}</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[54.391px] left-0 top-[95.59px] w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[27.2px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[261px] whitespace-pre-wrap">{`Développer son esprit critique face au flux d'informations permanent.`}</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[89.438px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Sophie Martin</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(0,0,0,0.1)] top-0">•</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1177_1085)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1177_1085">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#6b7280] text-[14px] top-0">10 min</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[24px] items-center left-0 top-[165.98px] w-[261px]" data-name="Container">
      <Paragraph16 />
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[217.18px] left-[309px] top-0 w-[261px]" data-name="Container">
      <Paragraph14 />
      <Heading8 />
      <Paragraph15 />
      <Container37 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0 tracking-[1.2px] uppercase">Innovation</p>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[57.594px] left-0 top-[26px] w-[261px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[28.8px] left-0 text-[#252b37] text-[24px] top-0 w-[252px] whitespace-pre-wrap">Créativité et Innovation Collaborative</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[54.391px] left-0 top-[95.59px] w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[27.2px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[261px] whitespace-pre-wrap">Stimuler la créativité collective pour résoudre les problèmes complexes.</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[21px] relative shrink-0 w-[88.289px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Thomas Chen</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(0,0,0,0.1)] top-0">•</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1177_1085)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1177_1085">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon5 />
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#6b7280] text-[14px] top-0">12 min</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[24px] items-center left-0 top-[165.98px] w-[261px]" data-name="Container">
      <Paragraph19 />
      <Text15 />
      <Text16 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[189.984px] left-0 top-[257.18px] w-[261px]" data-name="Container">
      <Paragraph17 />
      <Heading9 />
      <Paragraph18 />
      <Container39 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0 tracking-[1.2px] uppercase">Bien-être</p>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[57.594px] left-0 top-[26px] w-[261px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[28.8px] left-0 text-[#252b37] text-[24px] top-0 w-[249px] whitespace-pre-wrap">Résilience et Gestion du Stress</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[54.391px] left-0 top-[95.59px] w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[27.2px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[261px] whitespace-pre-wrap">Développer sa capacité à rebondir face aux défis et à la pression.</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[21px] relative shrink-0 w-[90.852px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Laura Bernard</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(0,0,0,0.1)] top-0">•</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-0 size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1177_1085)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1177_1085">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[21px] relative shrink-0 w-[55.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon6 />
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#6b7280] text-[14px] top-0">9 min</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[24px] items-center left-0 top-[165.98px] w-[261px]" data-name="Container">
      <Paragraph22 />
      <Text17 />
      <Text18 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[189.984px] left-[309px] top-[257.18px] w-[261px]" data-name="Container">
      <Paragraph20 />
      <Heading10 />
      <Paragraph21 />
      <Container41 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0 tracking-[1.2px] uppercase">Collaboration</p>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute h-[57.594px] left-0 top-[26px] w-[261px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[28.8px] left-0 text-[#252b37] text-[24px] top-0 w-[260px] whitespace-pre-wrap">Intelligence Collective en Action</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[54.391px] left-0 top-[95.59px] w-[261px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[27.2px] left-0 text-[#252b37] text-[16px] text-justify top-[-0.5px] w-[261px] whitespace-pre-wrap">Mobiliser la sagesse du groupe pour des décisions plus pertinentes.</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[21px] relative shrink-0 w-[103.195px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Pierre Rousseau</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[8.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(0,0,0,0.1)] top-0">•</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-0 size-[16px] top-[2.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1177_1085)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1177_1085">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[21px] relative shrink-0 w-[63.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon7 />
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[#6b7280] text-[14px] top-0">11 min</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[24px] items-center left-0 top-[165.98px] w-[261px]" data-name="Container">
      <Paragraph25 />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[189.984px] left-0 top-[487.16px] w-[261px]" data-name="Container">
      <Paragraph23 />
      <Heading11 />
      <Paragraph24 />
      <Container43 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[677.148px] relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container36 />
      <Container38 />
      <Container40 />
      <Container42 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[805.148px] items-start left-[32px] top-[1723.34px] w-[570px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-white h-[2560.492px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container24 />
      <Container31 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col h-[699px] items-start left-0 overflow-clip pr-[15px] pt-[64px] top-0 w-[649px]" data-name="Container">
      <Container21 />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#f59e0b] relative rounded-[12px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[#252b37] text-[18px]">📰</p>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#252b37] text-[16px] top-[-0.5px]">Le Mag - Magazine Style</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">Le Mag</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading12 />
        <Paragraph26 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[42px] relative shrink-0 w-[217.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container47 />
        <Container48 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[12px] size-[12px] top-[8.02px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M7.5 1.5H10.5V4.5" id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 1.5L7 5" id="Vector_2" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 10.5L5 7" id="Vector_3" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 10.5H1.5V7.5" id="Vector_4" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[26px] relative rounded-[12px] shrink-0 w-[133.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon8 />
        <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[18px] left-[28px] text-[#f59e0b] text-[12px] top-[4px]">Aperçu interactif</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex h-[42px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container49 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[67px] items-start left-0 pb-px pt-[12px] px-[24px] top-0 w-[649px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container45 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[699px] left-[320px] overflow-clip top-[64px] w-[649px]" data-name="Container">
      <Container20 />
      <Container44 />
    </div>
  );
}

function T() {
  return (
    <div className="absolute bg-white h-[763px] left-0 top-0 w-[969px]" data-name="T0">
      <Container />
      <Container19 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10.6667">
            <path d={svgPaths.p3f446380} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 1.33333">
            <path d="M10 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#eef6f8] relative rounded-[12px] shrink-0 size-[34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container53() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Heading13() {
  return (
    <div className="h-[21.594px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21.6px] left-0 text-[#252b37] text-[18px] top-[0.5px]">{`Veille & Apprentissage`}</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">22 layouts • Niveau 3</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] h-[39.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading13 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[39.594px] relative shrink-0 w-[238.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button7 />
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#eef6f8] flex-[1_0_0] h-[35px] min-h-px min-w-px relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-[37px] text-[#252b37] text-[14px] text-center top-[7px]">🗳️ Vote</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[35px] relative shrink-0 w-[73.039px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button8 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex h-[39.594px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Container55 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[56.594px] items-start left-0 pb-px pt-[8px] px-[24px] top-0 w-[969px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container51 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <T />
      <Container50 />
    </div>
  );
}