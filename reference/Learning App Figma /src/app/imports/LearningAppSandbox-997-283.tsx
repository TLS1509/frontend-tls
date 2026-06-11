import svgPaths from "./svg-sf1byzhc32";

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
    <div className="h-[45px] relative shrink-0 w-[247.82px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Black',sans-serif] font-black leading-[45px] left-0 text-[#252b37] text-[30px] top-[-0.5px]">Progressive Cards</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[45px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Heading1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b7280] text-[16px] top-0">Navigation question par question avec auto-avancement et progression</p>
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
  return <div className="bg-[#10b981] opacity-76 rounded-[9999px] shrink-0 size-[8px]" data-name="Container" />;
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
    <div className="content-stretch flex flex-col gap-[8px] h-[114px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Paragraph />
      <Container2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[88.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b7280] text-[14px] top-0 w-[89px] whitespace-pre-wrap">Question 1 / 3</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[30.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#55a1b4] text-[14px] top-0 w-[31px] whitespace-pre-wrap">33%</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container8() {
  return <div className="h-[8px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(178.466deg, rgb(85, 161, 180) 0%, rgb(74, 143, 161) 100%)" }} />;
}

function Container7() {
  return (
    <div className="bg-[#f5f5f5] h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[597.336px] relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[41px] items-start left-0 top-0 w-[896px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function ProgressiveCardsLayout1() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[45px] left-0 text-[#252b37] text-[30px] top-[-0.5px]">Maîtrise des outils numériques</p>
    </div>
  );
}

function ProgressiveCardsLayout2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b7280] text-[16px] top-0">Comment évaluez-vous votre niveau actuel ?</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[145px] items-start left-0 pt-[32px] px-[32px] rounded-[24px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] top-[73px] w-[896px]" data-name="Container">
      <ProgressiveCardsLayout1 />
      <ProgressiveCardsLayout2 />
    </div>
  );
}

function ProgressiveCardsLayout3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[48px] left-[57.2px] text-[#252b37] text-[48px] text-center top-[-1px]">✨</p>
    </div>
  );
}

function ProgressiveCardsLayout4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-[57.41px] text-[#252b37] text-[14px] text-center top-0">Débutant</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[133px] items-start left-0 pb-[2px] pt-[26px] px-[26px] rounded-[16px] top-0 w-[166.398px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <ProgressiveCardsLayout3 />
      <ProgressiveCardsLayout4 />
    </div>
  );
}

function ProgressiveCardsLayout5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[48px] left-[57.2px] text-[#252b37] text-[48px] text-center top-[-1px]">🔥</p>
    </div>
  );
}

function ProgressiveCardsLayout6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-[57.39px] text-[#252b37] text-[14px] text-center top-0">Novice</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[133px] items-start left-[182.4px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] top-0 w-[166.398px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <ProgressiveCardsLayout5 />
      <ProgressiveCardsLayout6 />
    </div>
  );
}

function ProgressiveCardsLayout7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[48px] left-[57.2px] text-[#252b37] text-[48px] text-center top-[-1px]">⭐</p>
    </div>
  );
}

function ProgressiveCardsLayout8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-[57.27px] text-[#252b37] text-[14px] text-center top-0">Intermédiaire</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[133px] items-start left-[364.8px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] top-0 w-[166.398px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <ProgressiveCardsLayout7 />
      <ProgressiveCardsLayout8 />
    </div>
  );
}

function ProgressiveCardsLayout9() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[48px] left-[57.2px] text-[#252b37] text-[48px] text-center top-[-1px]">🚀</p>
    </div>
  );
}

function ProgressiveCardsLayout10() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-[57.57px] text-[#252b37] text-[14px] text-center top-0">Avancé</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[133px] items-start left-[547.2px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] top-0 w-[166.398px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <ProgressiveCardsLayout9 />
      <ProgressiveCardsLayout10 />
    </div>
  );
}

function ProgressiveCardsLayout11() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[48px] left-[57.2px] text-[#252b37] text-[48px] text-center top-[-1px]">👑</p>
    </div>
  );
}

function ProgressiveCardsLayout12() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="ProgressiveCardsLayout">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-[57.3px] text-[#252b37] text-[14px] text-center top-0">Expert</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[133px] items-start left-[729.59px] pb-[2px] pt-[26px] px-[26px] rounded-[16px] top-0 w-[166.398px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <ProgressiveCardsLayout11 />
      <ProgressiveCardsLayout12 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[133px] left-0 top-[250px] w-[896px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[95.97px] size-[18px] top-[19px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#f5f5f5] h-[56px] left-[750.03px] opacity-50 rounded-[16px] top-[415px] w-[145.969px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:Bold',sans-serif] font-bold leading-[24px] left-[60px] text-[16px] text-center text-white top-[16px]">Suivant</p>
      <Icon1 />
    </div>
  );
}

function ProgressiveCardsLayout() {
  return (
    <div className="h-[471px] relative shrink-0 w-[896px]" data-name="ProgressiveCardsLayout">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container5 />
        <Container9 />
        <Container10 />
        <Button5 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[571px] items-center justify-center p-[2px] relative rounded-[24px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(150.76deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <ProgressiveCardsLayout />
    </div>
  );
}

function SandboxPositionnementComplete() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[32px] h-[1068px] items-start left-0 pl-[368px] pr-[48px] pt-[303px] top-0 w-[1436px]" data-name="SandboxPositionnementComplete">
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

function Icon2() {
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

function Container12() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Icon3() {
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

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] h-[27px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <Heading2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">{`Différentes expériences d'évaluation`}</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[86px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container14 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon4() {
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

function Container17() {
  return (
    <div className="bg-[#dcebef] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#55a1b4] text-[14px] top-0">Progressive Cards</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[50.391px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[178px] whitespace-pre-wrap">Navigation question par question avec auto-avancement et progression</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[47.219px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Cards</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[51.22px] rounded-[6px] top-0 w-[78.797px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Progressive</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[134.02px] rounded-[6px] top-0 w-[53.875px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Classic</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[105.391px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Paragraph2 />
        <Container19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[105.391px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[141.391px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <Container16 />
    </div>
  );
}

function Icon5() {
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

function Container21() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
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

function Paragraph3() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[174px] whitespace-pre-wrap">Modal flottante avec effet glassmorphism et backdrop blur</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[46.172px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Glass</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[50.17px] rounded-[6px] top-0 w-[49.836px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Modal</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[104.01px] rounded-[6px] top-0 w-[71.281px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Immersive</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Paragraph3 />
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
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container20 />
    </div>
  );
}

function Icon6() {
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

function Container25() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Fullscreen Pills</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[152px] whitespace-pre-wrap">Layout plein écran avec pills horizontales interactives</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[71.336px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Fullscreen</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[75.34px] rounded-[6px] top-0 w-[39.195px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Pills</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[118.53px] rounded-[6px] top-0 w-[58.836px]" data-name="Text">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Minimal</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading5 />
        <Paragraph4 />
        <Container27 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container24 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[430.578px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[8px] px-[8px] relative size-full">
        <Button6 />
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function SandboxPositionnementComplete1() {
  return (
    <div className="absolute h-[457px] left-0 top-[255px] w-[320px]" data-name="SandboxPositionnementComplete">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-[17px] pt-[-137.5px] relative rounded-[inherit] size-full">
        <Container11 />
        <Container13 />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon7() {
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

function Button9() {
  return (
    <div className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid h-[41px] left-[32px] rounded-[12px] top-[24px] w-[104.539px]" data-name="Button">
      <Icon7 />
      <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[63.5px] text-[#252b37] text-[14px] text-center top-[8px]">Retour</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Black',sans-serif] font-black leading-[45px] left-0 text-[#252b37] text-[36px] top-0 tracking-[-0.9px]">Positionnement Apprenant</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b7280] text-[16px] top-0">4 layouts immersifs • Évaluation de compétences</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[79px] relative shrink-0 w-[418.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[21.55px] text-[#55a1b4] text-[24px] text-center top-[-0.5px]">4</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[21.5px] text-[#6b7280] text-[12px] text-center top-0">Layouts</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[54px] relative shrink-0 w-[42.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[22.18px] text-[#f8b044] text-[24px] text-center top-[-0.5px]">5</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[22px] text-[#6b7280] text-[12px] text-center top-0">Niveaux</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[54px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[54px] relative shrink-0 w-[101.805px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container32 />
        <Container35 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex h-[79px] items-start justify-between left-[32px] top-[81px] w-[1372px]" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[13.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_984_776)" id="Icon">
          <path d={svgPaths.p3ba229c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1ea61200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3e4d7380} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_984_776">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#55a1b4] h-[45px] relative rounded-[16px] shrink-0 w-[149.914px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon8 />
        <p className="-translate-x-1/2 absolute font-['Nunito:Bold',sans-serif] font-bold leading-[21px] left-[88px] text-[14px] text-center text-white top-[12px]">Progressive</p>
      </div>
    </div>
  );
}

function Icon9() {
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

function Button11() {
  return (
    <div className="bg-[#f5f5f5] h-[45px] relative rounded-[16px] shrink-0 w-[126.219px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon9 />
        <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[76.5px] text-[#252b37] text-[14px] text-center top-[12px]">Floating</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[13.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1a8e7980} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 6.75H15.75" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 11.25H15.75" id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M6.75 2.25V15.75" id="Vector_4" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M11.25 2.25V15.75" id="Vector_5" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#f5f5f5] h-[45px] relative rounded-[16px] shrink-0 w-[139.078px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon10 />
        <p className="-translate-x-1/2 absolute font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[83px] text-[#252b37] text-[14px] text-center top-[12px]">Fullscreen</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[45px] items-start left-[32px] top-[184px] w-[1372px]" data-name="Container">
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[253px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Container29 />
      <Container38 />
    </div>
  );
}

function SandboxPositionnementComplete2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[255px] items-start left-0 pb-[2px] top-0 w-[1436px]" data-name="SandboxPositionnementComplete">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
      <Container28 />
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