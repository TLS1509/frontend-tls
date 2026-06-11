import svgPaths from "./svg-b03542pewi";
import imgContainer from "figma:asset/86fd85b264899d7f00ae6353dec57c15dbc83633.png";

function Button() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-0 rounded-[12px] top-0 w-[51.828px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[25px] text-[#252b37] text-[12px] text-center top-[6px]">Tous</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#55a1b4] h-[32px] left-[59.83px] rounded-[12px] top-0 w-[71px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[35px] text-[12px] text-center text-white top-[7px]">Dossiers</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-[138.83px] rounded-[12px] top-0 w-[68.516px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[33.5px] text-[#252b37] text-[12px] text-center top-[6px]">Articles</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#eef6f8] border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-0 rounded-[12px] top-[40px] w-[66.078px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[18px] left-[32.5px] text-[#252b37] text-[12px] text-center top-[6px]">Le Mag</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[105px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📕</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[111.078px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">PDF Viewer Modal</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[186px]" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[33.594px] left-0 top-[25px] w-[186px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[148px] whitespace-pre-wrap">Viewer PDF fullscreen avec navigation</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[39.227px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">PDF</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22px] left-[43.23px] rounded-[4px] top-0 w-[50.086px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Modal</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[22px] left-[97.31px] rounded-[4px] top-0 w-[74.609px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Navigation</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[22px] left-0 top-[66.59px] w-[186px]" data-name="Container">
      <Text />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
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
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[17px] top-[17px] w-[238px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[122.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📖</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[110.453px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Immersive Reader</p>
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
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-0 w-[184px]" data-name="Container">
      <Heading3 />
      <Icon />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[184px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Lecture immersive fullscreen</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[71.719px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Immersive</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[22px] left-[75.72px] rounded-[4px] top-0 w-[71.781px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Fullscreen</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[26px] w-[60.586px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Reading</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[48px] left-0 top-[49.8px] w-[184px]" data-name="Container">
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
    <div className="absolute content-stretch flex gap-[12px] h-[97.797px] items-start left-[18px] top-[18px] w-[236px]" data-name="Container">
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

function Container15() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📊</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[121.391px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Executive Summary</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[186px]" data-name="Container">
      <Heading4 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[33.594px] left-0 top-[25px] w-[186px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[145px] whitespace-pre-wrap">Summary + Key Findings + Download</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[68.219px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Summary</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[22px] left-[72.22px] rounded-[4px] top-0 w-[62.242px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Findings</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[26px] w-[72.305px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Download</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[48px] left-0 top-[66.59px] w-[186px]" data-name="Container">
      <Text6 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] h-[114.594px] min-h-px min-w-px relative" data-name="Container">
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
    <div className="absolute content-stretch flex gap-[12px] h-[114.594px] items-start left-[17px] top-[17px] w-[238px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[148.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container14 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📰</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[94.984px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Magazine 2 Col</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[186px]" data-name="Container">
      <Heading5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[186px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Mise en page éditoriale</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[47.219px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Cover</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[22px] left-[51.22px] rounded-[4px] top-0 w-[74.727px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">2 colonnes</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[22px] left-[129.95px] rounded-[4px] top-0 w-[41.641px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Tags</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[22px] left-0 top-[49.8px] w-[186px]" data-name="Container">
      <Text9 />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-[71.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container22 />
        <Paragraph3 />
        <Container23 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[71.797px] items-start left-[17px] top-[17px] w-[238px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[105.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container19 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📊</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[106.016px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Executive Reader</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[186px]" data-name="Container">
      <Heading6 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[186px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Reader pour résumé exécutif</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[54.586px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Reader</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[22px] left-[58.59px] rounded-[4px] top-0 w-[67.781px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Executive</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[26px] w-[68.219px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Summary</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[48px] left-0 top-[49.8px] w-[186px]" data-name="Container">
      <Text12 />
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[97.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container27 />
        <Paragraph4 />
        <Container28 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[97.797px] items-start left-[17px] top-[17px] w-[238px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[131.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container24 />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#252b37] text-[20px]">📰</p>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[107.055px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Magazine Reader</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-0 top-0 w-[186px]" data-name="Container">
      <Heading7 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[16.797px] items-start left-0 top-[25px] w-[186px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px] whitespace-pre-wrap">Reader pour magazine</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-0 w-[54.586px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Reader</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[22px] left-[58.59px] rounded-[4px] top-0 w-[67.898px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Magazine</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[22px] left-[130.48px] rounded-[4px] top-0 w-[52.828px]" data-name="Text">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[8px] text-[#f8b044] text-[12px] top-[2px]">Layout</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[22px] left-0 top-[49.8px] w-[186px]" data-name="Container">
      <Text15 />
      <Text16 />
      <Text17 />
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] h-[71.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container32 />
        <Paragraph5 />
        <Container33 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[71.797px] items-start left-[17px] top-[17px] w-[238px]" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[105.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container29 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[820.375px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] px-[16px] relative size-full">
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] h-[697px] left-0 top-[64px] w-[320px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-[16px] relative rounded-[inherit] size-full">
        <Container1 />
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container36() {
  return <div className="bg-white h-[64px] shrink-0 w-full" data-name="Container" />;
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col h-[697px] items-start left-0 overflow-clip pt-[64px] top-0 w-[711px]" data-name="Container">
      <Container36 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#f8b044] relative rounded-[12px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[27px] relative shrink-0 text-[#252b37] text-[18px]">📖</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#252b37] text-[16px] top-[-0.5px]">Immersive Reader</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">Dossiers</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading1 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[42px] relative shrink-0 w-[170.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container40 />
        <Container41 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[12px] top-[8.02px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M7.5 1.5H10.5V4.5" id="Vector" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 1.5L7 5" id="Vector_2" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 10.5L5 7" id="Vector_3" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 10.5H1.5V7.5" id="Vector_4" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[26px] relative rounded-[12px] shrink-0 w-[133.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[18px] left-[28px] text-[#f8b044] text-[12px] top-[4px]">Aperçu interactif</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[42px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Container42 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[67px] items-start left-0 pb-px pt-[12px] px-[24px] top-0 w-[711px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container38 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[697px] left-[320px] overflow-clip top-[64px] w-[711px]" data-name="Container">
      <Container35 />
      <Container37 />
    </div>
  );
}

function T() {
  return (
    <div className="absolute bg-white h-[761px] left-0 top-0 w-[1031px]" data-name="T0">
      <Container />
      <Container34 />
    </div>
  );
}

function Icon2() {
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

function Button10() {
  return (
    <div className="bg-[#eef6f8] relative rounded-[12px] shrink-0 size-[34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[9px] px-[9px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container46() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Heading() {
  return (
    <div className="h-[21.594px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[21.6px] left-0 text-[#252b37] text-[18px] top-[0.5px]">{`Veille & Apprentissage`}</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">22 layouts • Niveau 3</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="flex-[1_0_0] h-[39.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[39.594px] relative shrink-0 w-[238.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button10 />
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#eef6f8] flex-[1_0_0] h-[35px] min-h-px min-w-px relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-[37px] text-[#252b37] text-[14px] text-center top-[7px]">🗳️ Vote</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[35px] relative shrink-0 w-[73.039px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button11 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex h-[39.594px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Container48 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[56.594px] items-start left-0 pb-px pt-[8px] px-[24px] top-0 w-[1031px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container44 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] border-2 border-[rgba(0,0,0,0.1)] border-solid h-[41px] left-[32px] rounded-[12px] top-[48px] w-[102.953px]" data-name="Button">
      <Icon3 />
      <p className="-translate-x-1/2 absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[21px] left-[61.5px] text-[#252b37] text-[14px] text-center top-[8px]">Retour</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#e8f4f7] h-[29px] left-0 rounded-[9999px] top-0 w-[83.727px]" data-name="Text">
      <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[21px] left-[12px] text-[#55a1b4] text-[14px] top-[4px]">Stratégie</p>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[115.188px] left-0 top-[45px] w-[704px]" data-name="Heading 1">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[57.6px] left-0 text-[#252b37] text-[48px] top-[0.5px] w-[677px] whitespace-pre-wrap">La Transformation Digitale de la Formation</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[24px] left-0 top-[176.19px] w-[704px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b7280] text-[16px] top-0">15 Janvier 2025 • 12 min de lecture</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[384px] left-0 rounded-[24px] top-[232.19px] w-[704px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgContainer} />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[97.195px] left-0 top-0 w-[704px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[32.4px] left-0 text-[#252b37] text-[18px] top-[-0.5px] w-[666px] whitespace-pre-wrap">La transformation digitale bouleverse profondément le secteur de la formation professionnelle. Les organisations doivent repenser leurs approches pédagogiques pour intégrer les nouvelles technologies.</p>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[36px] left-0 top-[129.2px] w-[704px]" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#252b37] text-[24px] top-[-0.5px]">Les enjeux majeurs</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[97.195px] left-0 top-[181.2px] w-[704px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[32.4px] left-0 text-[#252b37] text-[18px] top-[-0.5px] w-[684px] whitespace-pre-wrap">{`L'adoption du digital learning implique des changements structurels importants. Il ne s'agit pas simplement de numériser des contenus existants, mais de réinventer l'expérience d'apprentissage.`}</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['League_Spartan:SemiBold',sans-serif] font-semibold leading-[30px] left-0 text-[#55a1b4] text-[20px] top-[-0.5px] w-[543px] whitespace-pre-wrap">{`"L'avenir de la formation est hybride, personnalisé et centré sur l'apprenant."`}</p>
    </div>
  );
}

function Quote() {
  return (
    <div className="absolute bg-[#e8f4f7] content-stretch flex flex-col h-[108px] items-start left-0 pl-[28px] pr-[24px] pt-[24px] rounded-[16px] top-[310.39px] w-[704px]" data-name="Quote">
      <div aria-hidden="true" className="absolute border-[#55a1b4] border-l-4 border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Paragraph11 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[97.195px] left-0 top-[450.39px] w-[704px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[32.4px] left-0 text-[#252b37] text-[18px] top-[-0.5px] w-[690px] whitespace-pre-wrap">{`Les plateformes LMS modernes offrent des fonctionnalités avancées de personnalisation et de suivi. L'intelligence artificielle permet d'adapter les parcours en temps réel selon les besoins de chaque apprenant.`}</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute h-[547.586px] left-0 top-[664.19px] w-[704px]" data-name="Container">
      <Paragraph9 />
      <Heading9 />
      <Paragraph10 />
      <Quote />
      <Paragraph12 />
    </div>
  );
}

function Article() {
  return (
    <div className="absolute h-[1211.773px] left-[32px] top-[121px] w-[704px]" data-name="Article">
      <Text18 />
      <Heading8 />
      <Paragraph8 />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[1380.773px] relative shrink-0 w-full" data-name="Container">
      <Button12 />
      <Article />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[761px] items-start left-0 overflow-clip pl-[124px] pr-[139px] pt-[-620px] top-0 w-[1031px]" data-name="Container">
      <Container50 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <T />
      <Container43 />
      <Container49 />
    </div>
  );
}