import svgPaths from "./svg-itk2vpqza4";

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
    <div className="absolute bg-[#55a1b4] h-[32px] left-[140.83px] rounded-[12px] top-0 w-[66.516px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[33.5px] text-[12px] text-center text-white top-[7px]">Articles</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-[215.34px] rounded-[12px] top-0 w-[66.078px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[32.5px] text-[#252b37] text-[12px] text-center top-[6px]">Le Mag</p>
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
    <div className="bg-[#10b981] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📝</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[72.266px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Blog Classic</p>
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
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Format blog traditionnel</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[42.609px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#10b981] text-[12px] top-[2px]">Hero</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22px] left-[46.61px] rounded-[4px] top-0 w-[51.961px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#10b981] text-[12px] top-[2px]">Centré</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[22px] left-[102.57px] rounded-[4px] top-0 w-[58.047px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#10b981] text-[12px] top-[2px]">Related</p>
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
    <div className="bg-[#10b981] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📖</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[105.984px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Longform Reader</p>
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

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-0 w-[199px]" data-name="Container">
      <Heading3 />
      <Icon />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[199px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Format lecture longue</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[80.234px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#10b981] text-[12px] top-[2px]">Typography</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[22px] left-[84.23px] rounded-[4px] top-0 w-[59.211px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#10b981] text-[12px] top-[2px]">Minimal</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[26px] w-[63.938px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#10b981] text-[12px] top-[2px]">Progress</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[48px] left-0 top-[49.8px] w-[199px]" data-name="Container">
      <Text3 />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[97.797px] min-h-px min-w-px relative" data-name="Container">
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
    <div className="absolute content-stretch flex gap-[12px] h-[97.797px] items-start left-[18px] top-[18px] w-[251px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[133.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_12px_0px_rgba(85,161,180,0.2)]" />
      <Container9 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[279.594px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] px-[16px] relative size-full">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] h-[697px] left-0 top-[64px] w-[320px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[18px] size-[16px] top-[12.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[41px] relative rounded-[12px] shrink-0 w-[207.469px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-[116px] text-[#252b37] text-[14px] text-center top-[10px]">Quitter le mode lecture</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 16.6664">
            <path d={svgPaths.p37adc100} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[2px] pt-[10px] px-[10px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 11.6667">
            <path d="M0.833333 10.8333V0.833333" id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 6.66667">
            <path d={svgPaths.p3e05ba00} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_29.17%_37.5%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.83333">
            <path d={svgPaths.p2dc3c480} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[2px] pt-[10px] px-[10px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[40px] relative shrink-0 w-[88px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[41px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button6 />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#f8b044] h-[26px] left-0 rounded-[9999px] top-0 w-[101.203px]" data-name="Container">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[18px] left-[12px] text-[12px] text-white top-[4px]">Méthodologie</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[165.586px] left-0 top-[50px] w-[632px]" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[55.2px] left-0 text-[#252b37] text-[48px] top-[0.5px] tracking-[-1px] w-[534px] whitespace-pre-wrap">Pourquoi la méthode EDRA révolutionne la conception pédagogique</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[64px] left-0 top-[231.59px] w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[32px] left-0 text-[#6b7280] text-[20px] top-[-0.5px] w-[577px] whitespace-pre-wrap">{`Engagement, Découverte, Réflexion, Ancrage : décryptage d'une approche qui change tout`}</p>
    </div>
  );
}

function Container21() {
  return <div className="bg-[#55a1b4] rounded-[9999px] shrink-0 size-[48px]" data-name="Container" />;
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#252b37] text-[16px] top-0">Thomas Martin</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b7280] text-[14px] top-0">5 janvier 2025 • 12 min</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[45px] relative shrink-0 w-[148.883px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[82px] items-center left-0 pb-[2px] top-[327.59px] w-[632px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[113.391px] left-0 top-0 w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[37.8px] left-0 text-[#1a1a1a] text-[21px] top-[-0.5px] w-[568px] whitespace-pre-wrap">{`La méthode EDRA s'impose comme le nouveau standard de conception pédagogique. Découvrez comment structurer vos contenus pour maximiser l'apprentissage et l'engagement.`}</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[188.984px] left-0 top-[137.39px] w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[37.8px] left-0 text-[#1a1a1a] text-[21px] top-[-0.5px] w-[617px] whitespace-pre-wrap">{`La méthode EDRA s'impose comme le nouveau standard de conception pédagogique. Fini le temps des PowerPoint interminables et des formations magistrales de plusieurs heures. Place à un framework en 4 phases qui place l'apprenant au centre de l'expérience.`}</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[151.188px] left-0 top-[350.38px] w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[0] left-0 text-[#1a1a1a] text-[0px] text-[21px] top-[-0.5px] w-[629px] whitespace-pre-wrap">
        <span className="leading-[37.8px]">{`L'acronyme EDRA représente les 4 piliers essentiels : `}</span>
        <span className="font-['Nunito:Bold',sans-serif] font-bold leading-[37.8px]">Engagement</span>
        <span className="leading-[37.8px]">{` (capter l'attention dès les premières secondes), `}</span>
        <span className="font-['Nunito:Bold',sans-serif] font-bold leading-[37.8px]">Découverte</span>
        <span className="leading-[37.8px]">{` (présenter le contenu de manière active), `}</span>
        <span className="font-['Nunito:Bold',sans-serif] font-bold leading-[37.8px]">Réflexion</span>
        <span className="leading-[37.8px]">{` (faire analyser et questionner), et `}</span>
        <span className="font-['Nunito:Bold',sans-serif] font-bold leading-[37.8px]">Ancrage</span>
        <span className="leading-[37.8px]">{` (consolider par l'action).`}</span>
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[32.398px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[32.4px] left-0 text-[#55a1b4] text-[18px] top-[-0.5px]">💡 Point Clé</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[107.086px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[35.7px] left-0 text-[#1a1a1a] text-[21px] top-[-0.5px] w-[541px] whitespace-pre-wrap">87% des formations conçues avec la méthodologie EDRA affichent un taux de complétion supérieur à 80%, contre seulement 23% pour les formations traditionnelles.</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[221.484px] items-start left-0 pb-[3px] pt-[35px] px-[35px] rounded-[24px] top-[533.56px] w-[632px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-3 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[151.188px] left-0 top-[787.05px] w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[37.8px] left-0 text-[#1a1a1a] text-[21px] top-[-0.5px] w-[627px] whitespace-pre-wrap">{`Cette approche transforme radicalement l'expérience d'apprentissage en créant un parcours cohérent qui respecte les principes des neurosciences cognitives. Chaque phase a un objectif précis et s'appuie sur des techniques pédagogiques éprouvées.`}</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[188.984px] left-0 top-[962.23px] w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[37.8px] left-0 text-[#1a1a1a] text-[21px] top-[-0.5px] w-[630px] whitespace-pre-wrap">{`La phase d'Engagement utilise le storytelling, les questions provocantes et les statistiques surprenantes pour créer une accroche immédiate. En 30 secondes maximum, l'apprenant doit comprendre pourquoi cette formation lui est utile et pourquoi il doit y prêter attention maintenant.`}</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[151.188px] left-0 top-[1175.22px] w-[632px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[37.8px] left-0 text-[#1a1a1a] text-[21px] top-[-0.5px] w-[620px] whitespace-pre-wrap">{`La Découverte active privilégie les formats visuels, vidéos courtes, infographies interactives et études de cas concrètes. Fini les longs pavés de texte : on montre, on démontre, on illustre. L'apprenant n'est plus passif mais acteur de sa découverte.`}</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[1326.406px] left-0 top-[457.59px] w-[632px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
      <Paragraph7 />
      <Container24 />
      <Paragraph10 />
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Article() {
  return (
    <div className="h-[1783.992px] relative shrink-0 w-full" data-name="Article">
      <Container19 />
      <Heading />
      <Paragraph2 />
      <Container20 />
      <Container23 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#fafaf8] h-[1968.992px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[48px] items-start pt-[48px] px-[32px] relative size-full">
        <Container17 />
        <Article />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col h-[697px] items-start left-0 overflow-clip pr-[15px] pt-[64px] top-0 w-[711px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[#10b981] relative rounded-[12px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[#252b37] text-[18px]">📖</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#252b37] text-[16px] top-[-0.5px]">Longform Reader</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">Articles</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading1 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[42px] relative shrink-0 w-[165.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[12px] size-[12px] top-[8.02px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M7.5 1.5H10.5V4.5" id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 1.5L7 5" id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 10.5L5 7" id="Vector_3" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 10.5H1.5V7.5" id="Vector_4" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[26px] relative rounded-[12px] shrink-0 w-[133.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[18px] left-[28px] text-[#10b981] text-[12px] top-[4px]">Aperçu interactif</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[42px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container30 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[67px] items-start left-0 pb-px pt-[12px] px-[24px] top-0 w-[711px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container26 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[697px] left-[320px] overflow-clip top-[64px] w-[711px]" data-name="Container">
      <Container15 />
      <Container25 />
    </div>
  );
}

function T() {
  return (
    <div className="absolute bg-white h-[761px] left-0 top-0 w-[1031px]" data-name="T0">
      <Container />
      <Container14 />
    </div>
  );
}

function Icon5() {
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

function Button9() {
  return (
    <div className="bg-[#eef6f8] relative rounded-[12px] shrink-0 size-[34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container34() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Heading4() {
  return (
    <div className="h-[21.594px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21.6px] left-0 text-[#252b37] text-[18px] top-[0.5px]">{`Veille & Apprentissage`}</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">22 layouts • Niveau 3</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[39.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading4 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[39.594px] relative shrink-0 w-[238.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button9 />
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#eef6f8] flex-[1_0_0] h-[35px] min-h-px min-w-px relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-[37px] text-[#252b37] text-[14px] text-center top-[7px]">🗳️ Vote</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[35px] relative shrink-0 w-[73.039px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button10 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex h-[39.594px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container36 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[56.594px] items-start left-0 pb-px pt-[8px] px-[24px] top-0 w-[1031px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container32 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <T />
      <Container31 />
    </div>
  );
}