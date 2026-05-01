import svgPaths from "./svg-n8n8th5nxr";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3c6311f0} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3d728000} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-[187.594px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Black',sans-serif] font-black leading-[37.5px] left-0 text-[#252b37] text-[30px] top-0 tracking-[-0.75px]">Fullscreen Pills</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[37.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Heading1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b7280] text-[16px] top-0">Layout plein écran avec pills horizontales interactives</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[103.898px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b7280] text-[14px] top-0">Aperçu interactif</p>
      </div>
    </div>
  );
}

function Container3() {
  return <div className="bg-[#10b981] opacity-100 rounded-[9999px] shrink-0 size-[8px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[108.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Paragraph />
      <Container2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Black',sans-serif] font-black leading-[75px] left-[460.91px] text-[#252b37] text-[60px] text-center top-0 tracking-[-1.5px]">Maîtrise des outils numériques</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[32.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[32.5px] left-[460.16px] text-[#6b7280] text-[20px] text-center top-[-0.5px]">Sélectionnez votre niveau de compétence</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[131.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph1 />
    </div>
  );
}

function FullscreenPillsLayout1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[48px] left-[45px] text-[#252b37] text-[48px] text-center top-[-1px]">✨</p>
    </div>
  );
}

function FullscreenPillsLayout2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-[45.16px] text-[#252b37] text-[16px] text-center top-[-0.5px]">Débutant</p>
    </div>
  );
}

function FullscreenPillsLayout3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px relative text-[#6b7280] text-[12px] text-center whitespace-pre-wrap">Je découvre</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[162px] relative rounded-[32px] shrink-0 w-[144px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-[3px] pt-[27px] px-[27px] relative size-full">
        <FullscreenPillsLayout1 />
        <FullscreenPillsLayout2 />
        <FullscreenPillsLayout3 />
      </div>
    </div>
  );
}

function FullscreenPillsLayout4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[48px] left-[45px] text-[#252b37] text-[48px] text-center top-[-1px]">🔥</p>
    </div>
  );
}

function FullscreenPillsLayout5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-[45.22px] text-[#252b37] text-[16px] text-center top-[-0.5px]">Novice</p>
    </div>
  );
}

function FullscreenPillsLayout6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px relative text-[#6b7280] text-[12px] text-center whitespace-pre-wrap">Bases acquises</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[162px] relative rounded-[32px] shrink-0 w-[144px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-[3px] pt-[27px] px-[27px] relative size-full">
        <FullscreenPillsLayout4 />
        <FullscreenPillsLayout5 />
        <FullscreenPillsLayout6 />
      </div>
    </div>
  );
}

function FullscreenPillsLayout7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[48px] left-[45px] text-[#252b37] text-[48px] text-center top-[-1px]">⭐</p>
    </div>
  );
}

function FullscreenPillsLayout8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-[47.5px] text-[#252b37] text-[16px] text-center top-[-0.5px]">Intermédiaire</p>
    </div>
  );
}

function FullscreenPillsLayout9() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px relative text-[#6b7280] text-[12px] text-center whitespace-pre-wrap">Autonome</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[162px] relative rounded-[32px] shrink-0 w-[144px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-[3px] pt-[27px] px-[27px] relative size-full">
        <FullscreenPillsLayout7 />
        <FullscreenPillsLayout8 />
        <FullscreenPillsLayout9 />
      </div>
    </div>
  );
}

function FullscreenPillsLayout10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[48px] left-[45px] text-[#252b37] text-[48px] text-center top-[-1px]">🚀</p>
    </div>
  );
}

function FullscreenPillsLayout11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-[45.13px] text-[#252b37] text-[16px] text-center top-[-0.5px]">Avancé</p>
    </div>
  );
}

function FullscreenPillsLayout12() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px relative text-[#6b7280] text-[12px] text-center whitespace-pre-wrap">{`Très à l'aise`}</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[162px] relative rounded-[32px] shrink-0 w-[144px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-[3px] pt-[27px] px-[27px] relative size-full">
        <FullscreenPillsLayout10 />
        <FullscreenPillsLayout11 />
        <FullscreenPillsLayout12 />
      </div>
    </div>
  );
}

function FullscreenPillsLayout13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[48px] left-[45px] text-[#252b37] text-[48px] text-center top-[-1px]">👑</p>
    </div>
  );
}

function FullscreenPillsLayout14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-[45.18px] text-[#252b37] text-[16px] text-center top-[-0.5px]">Expert</p>
    </div>
  );
}

function FullscreenPillsLayout15() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="FullscreenPillsLayout">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px relative text-[#6b7280] text-[12px] text-center whitespace-pre-wrap">Maîtrise totale</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[162px] relative rounded-[32px] shrink-0 w-[144px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-[3px] pt-[27px] px-[27px] relative size-full">
        <FullscreenPillsLayout13 />
        <FullscreenPillsLayout14 />
        <FullscreenPillsLayout15 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[16px] h-[162px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function FullscreenPillsLayout() {
  return (
    <div className="h-[357.5px] relative shrink-0 w-[920px]" data-name="FullscreenPillsLayout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[64px] items-start relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[500px] items-center justify-center p-[2px] relative rounded-[24px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(153.886deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <FullscreenPillsLayout />
    </div>
  );
}

function SandboxPositionnementComplete() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[32px] h-[991.5px] items-start left-0 pl-[368px] pr-[48px] pt-[303px] top-0 w-[1436px]" data-name="SandboxPositionnementComplete">
      <Container />
      <Container4 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[45px] left-0 rounded-[12px] top-0 w-[271px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(37,43,55,0.5)]">Rechercher...</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[18px] top-[13.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M15.75 15.75L12.495 12.495" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p126da180} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_984_545)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_984_545">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[212.656px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#252b37] text-[18px] top-0">Layouts Positionnement (4)</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[12px] h-[27px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Heading2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">{`Différentes expériences d'évaluation`}</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[86px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container10 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_984_558)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29e1f300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29ba0200} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_984_558">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Progressive Cards</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[50.391px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[178px] whitespace-pre-wrap">Navigation question par question avec auto-avancement et progression</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[47.219px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Cards</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[51.22px] rounded-[6px] top-0 w-[78.797px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Progressive</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[134.02px] rounded-[6px] top-0 w-[53.875px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Classic</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] h-[105.391px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Paragraph3 />
        <Container15 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[105.391px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[141.391px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container12 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_984_558)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29e1f300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29ba0200} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_984_558">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Floating Glass Modal</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[174px] whitespace-pre-wrap">Modal flottante avec effet glassmorphism et backdrop blur</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[46.172px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Glass</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[50.17px] rounded-[6px] top-0 w-[49.836px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Modal</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[104.01px] rounded-[6px] top-0 w-[71.281px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Immersive</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
      <Text6 />
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Paragraph4 />
        <Container19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container16 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_984_540)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29e1f300} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p29ba0200} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_984_540">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#dcebef] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#55a1b4] text-[14px] top-0">Fullscreen Pills</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[152px] whitespace-pre-wrap">Layout plein écran avec pills horizontales interactives</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[71.336px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Fullscreen</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[75.34px] rounded-[6px] top-0 w-[39.195px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Pills</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[118.53px] rounded-[6px] top-0 w-[58.836px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Minimal</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading5 />
        <Paragraph5 />
        <Container23 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <Container20 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[430.578px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[8px] px-[8px] relative size-full">
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function SandboxPositionnementComplete1() {
  return (
    <div className="absolute h-[457px] left-0 top-[534.5px] w-[320px]" data-name="SandboxPositionnementComplete">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-[17px] pt-[-137.5px] relative rounded-[inherit] size-full">
        <Container7 />
        <Container9 />
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M9 14.25L3.75 9L9 3.75" id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M14.25 9H3.75" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid h-[41px] left-[32px] rounded-[12px] top-[24px] w-[104.539px]" data-name="Button">
      <Icon6 />
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[63.5px] text-[#252b37] text-[14px] text-center top-[8px]">Retour</p>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Black',sans-serif] font-black leading-[45px] left-0 text-[#252b37] text-[36px] top-0 tracking-[-0.9px]">Positionnement Apprenant</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b7280] text-[16px] top-0">4 layouts immersifs • Évaluation de compétences</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[79px] relative shrink-0 w-[418.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading6 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[21.55px] text-[#55a1b4] text-[24px] text-center top-[-0.5px]">4</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[21.5px] text-[#6b7280] text-[12px] text-center top-0">Layouts</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[54px] relative shrink-0 w-[42.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container29 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[22.18px] text-[#f8b044] text-[24px] text-center top-[-0.5px]">5</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[22px] text-[#6b7280] text-[12px] text-center top-0">Niveaux</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] h-[54px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[54px] relative shrink-0 w-[101.805px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container28 />
        <Container31 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[79px] items-start justify-between left-[32px] top-[81px] w-[1372px]" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[13.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_984_535)" id="Icon">
          <path d={svgPaths.p3ba229c0} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1ea61200} id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3e4d7380} id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_984_535">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#f5f5f5] h-[45px] relative rounded-[16px] shrink-0 w-[147.867px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon7 />
        <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[87px] text-[#252b37] text-[14px] text-center top-[12px]">Progressive</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[13.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_984_781)" id="Icon">
          <path d={svgPaths.p2d67c60} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M15 1.5V4.5" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 3H13.5" id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p6f9ce00} id="Vector_4" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_984_781">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#f5f5f5] h-[45px] relative rounded-[16px] shrink-0 w-[126.219px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon8 />
        <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[76.5px] text-[#252b37] text-[14px] text-center top-[12px]">Floating</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[13.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1a8e7980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 6.75H15.75" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 11.25H15.75" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6.75 2.25V15.75" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M11.25 2.25V15.75" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#55a1b4] h-[45px] relative rounded-[16px] shrink-0 w-[140.844px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon9 />
        <p className="-translate-x-1/2 absolute font-['Nunito:Bold',sans-serif] font-bold leading-[21px] left-[83.5px] text-[14px] text-center text-white top-[12px]">Fullscreen</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[45px] items-start left-[32px] top-[184px] w-[1372px]" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[253px] relative shrink-0 w-full" data-name="Container">
      <Button8 />
      <Container25 />
      <Container34 />
    </div>
  );
}

function SandboxPositionnementComplete2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[255px] items-start left-0 pb-[2px] top-[314.5px] w-[1436px]" data-name="SandboxPositionnementComplete">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
      <Container24 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <SandboxPositionnementComplete />
      <SandboxPositionnementComplete1 />
      <SandboxPositionnementComplete2 />
    </div>
  );
}