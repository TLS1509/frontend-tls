import svgPaths from "./svg-bj8161fayn";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1a816e00} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p18a2f300} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p385f3200} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3d96f400} id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p19719a00} id="Vector_5" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p190dfa00} id="Vector_6" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1116500} id="Vector_7" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d9c5d00} id="Vector_8" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p20bcd040} id="Vector_9" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[45px] relative shrink-0 w-[261.172px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['League_Spartan:Black',sans-serif] font-black leading-[45px] left-0 text-[#252b37] text-[30px] top-[-0.5px]">Booking Confirmed</p>
      </div>
    </div>
  );
}

function Container() {
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
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b7280] text-[16px] top-0">Réservation confirmée avec particules animées</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[103.898px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6b7280] text-[14px] top-0">Aperçu interactif</p>
      </div>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#10b981] opacity-96 rounded-[9999px] shrink-0 size-[8px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[186px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[48px] px-[48px] relative size-full">
        <Container />
        <Paragraph />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[rgba(0,0,0,0.5)] h-[600px] left-0 top-0 w-[747px]" data-name="Container" />;
}

function BookingConfirmedPreview() {
  return (
    <div className="absolute h-[144px] left-[48px] top-[168px] w-[412px]" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-4hzbpn font-['League_Spartan:Black',sans-serif] font-black leading-[72px] left-[206.38px] text-[#252b37] text-[48px] text-center top-0 w-[263px]">Réservation confirmée !</p>
    </div>
  );
}

function BookingConfirmedPreview1() {
  return (
    <div className="absolute h-[27px] left-[48px] top-[328px] w-[412px]" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[27px] left-[206.22px] text-[#6b7280] text-[18px] text-center top-0">Votre session de coaching est programmée</p>
    </div>
  );
}

function BookingConfirmedPreview2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[36px] left-[25.96px] text-[#252b37] text-[24px] text-center top-[-0.5px]">📅</p>
    </div>
  );
}

function BookingConfirmedPreview3() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-[26px] text-[#55a1b4] text-[18px] text-center top-0">24 Jan</p>
    </div>
  );
}

function BookingConfirmedPreview4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[26.06px] text-[#6b7280] text-[12px] text-center top-0">Date</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[rgba(85,161,180,0.1)] h-[111px] relative rounded-[16px] shrink-0 w-[85.922px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9d7df] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[17px] relative size-full">
        <BookingConfirmedPreview2 />
        <BookingConfirmedPreview3 />
        <BookingConfirmedPreview4 />
      </div>
    </div>
  );
}

function BookingConfirmedPreview5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[36px] left-[20.91px] text-[#252b37] text-[24px] text-center top-[-0.5px]">⏰</p>
    </div>
  );
}

function BookingConfirmedPreview6() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-[21px] text-[#55a1b4] text-[18px] text-center top-0">14:00</p>
    </div>
  );
}

function BookingConfirmedPreview7() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[20.99px] text-[#6b7280] text-[12px] text-center top-0">Heure</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(85,161,180,0.1)] h-[111px] relative rounded-[16px] shrink-0 w-[75.836px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9d7df] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[17px] relative size-full">
        <BookingConfirmedPreview5 />
        <BookingConfirmedPreview6 />
        <BookingConfirmedPreview7 />
      </div>
    </div>
  );
}

function BookingConfirmedPreview8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[36px] left-[26.6px] text-[#252b37] text-[24px] text-center top-[-0.5px]">👩‍🏫</p>
    </div>
  );
}

function BookingConfirmedPreview9() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-[27px] text-[#55a1b4] text-[18px] text-center top-0">Sophie</p>
    </div>
  );
}

function BookingConfirmedPreview10() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[27.08px] text-[#6b7280] text-[12px] text-center top-0">Coach</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[rgba(85,161,180,0.1)] h-[111px] relative rounded-[16px] shrink-0 w-[87.211px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#b9d7df] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[17px] relative size-full">
        <BookingConfirmedPreview8 />
        <BookingConfirmedPreview9 />
        <BookingConfirmedPreview10 />
      </div>
    </div>
  );
}

function BookingConfirmedPreview11() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[111px] items-start justify-center left-[48px] top-[387px] w-[412px]" data-name="BookingConfirmedPreview">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container8() {
  return <div className="absolute h-[547.793px] left-[-0.83px] opacity-30 top-[-0.9px] w-[509.668px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 509.67 547.79\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(0 -60.417 -60.417 0 254.83 0)\'><stop stop-color=\'rgba(85,161,180,1)\' offset=\'0\'/><stop stop-color=\'rgba(64,121,135,0.75)\' offset=\'0.175\'/><stop stop-color=\'rgba(43,81,90,0.5)\' offset=\'0.35\'/><stop stop-color=\'rgba(21,40,45,0.25)\' offset=\'0.525\'/><stop stop-color=\'rgba(0,0,0,0)\' offset=\'0.7\'/></radialGradient></defs></svg>')" }} />;
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[52.631px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.6313 52.6313">
        <g id="Icon">
          <path d={svgPaths.pdf06000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.57892" />
          <path d={svgPaths.p1c5aed80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.57892" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[153.37px] rounded-[9999px] shadow-[0px_10px_40px_0px_rgba(85,161,180,0.5)] size-[105.263px] top-[-4.63px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <Icon1 />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[#55a1b4] left-[240.45px] rounded-[9999px] size-[9.695px] top-[92.37px]" data-name="Container" />;
}

function Container11() {
  return <div className="absolute bg-[#55a1b4] left-[235.18px] rounded-[9999px] size-[9.128px] top-[118.55px]" data-name="Container" />;
}

function Container12() {
  return <div className="absolute bg-[#55a1b4] left-[215.4px] rounded-[9999px] size-[8.363px] top-[131.42px]" data-name="Container" />;
}

function Container13() {
  return <div className="absolute bg-[#55a1b4] left-[195.72px] rounded-[9999px] size-[7.431px] top-[126.53px]" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-[#55a1b4] left-[187.9px] rounded-[9999px] size-[6.36px] top-[111.28px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-[#55a1b4] left-[193.63px] rounded-[9999px] size-[5.16px] top-[98.01px]" data-name="Container" />;
}

function Container16() {
  return <div className="absolute bg-[#55a1b4] left-[205.29px] rounded-[9999px] size-[3.838px] top-[94.76px]" data-name="Container" />;
}

function Container17() {
  return <div className="absolute bg-[#55a1b4] left-[213.08px] rounded-[9999px] size-[2.416px] top-[100.33px]" data-name="Container" />;
}

function Container18() {
  return (
    <div className="h-[216.337px] relative w-[421.719px]" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function BookingConfirmedPreview12() {
  return (
    <div className="absolute h-[96px] left-[48px] top-[48px] w-[412px]" data-name="BookingConfirmedPreview">
      <Container9 />
      <div className="absolute flex h-[333.96px] items-center justify-center left-[-4.86px] top-[-187.96px] w-[467.447px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-17.64deg]">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] border-2 border-[#b9d7df] border-solid h-[550px] left-[117.5px] overflow-clip rounded-[32px] shadow-[0px_32px_96px_0px_rgba(85,161,180,0.4)] top-[25px] w-[512px]" data-name="Container">
      <BookingConfirmedPreview />
      <BookingConfirmedPreview1 />
      <BookingConfirmedPreview11 />
      <Container8 />
      <BookingConfirmedPreview12 />
    </div>
  );
}

function BookingConfirmedPreview13() {
  return (
    <div className="h-[600px] relative shrink-0 w-full" data-name="BookingConfirmedPreview">
      <Container4 />
      <Container19 />
    </div>
  );
}

function SandboxDesignSystem() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1042px] items-start left-0 pl-[320px] pt-[256px] top-0 w-[1067px]" data-name="SandboxDesignSystem">
      <Container3 />
      <BookingConfirmedPreview13 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[45px] left-0 rounded-[12px] top-0 w-[286px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(37,43,55,0.5)]">Rechercher...</p>
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

function Container20() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_989_3535)" id="Icon">
          <path d={svgPaths.pf5c4480} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 2.5H3.34167" id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 6.66667H18.3417" id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 1.66667H12.5083" id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 16.6667H18.3417" id="Vector_5" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1106df80} id="Vector_6" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2461da00} id="Vector_7" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p15833570} id="Vector_8" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p718a680} id="Vector_9" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_989_3535">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[132.086px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#252b37] text-[18px] top-0 w-[133px]">Célébrations (12)</p>
      </div>
    </div>
  );
}

function Container22() {
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
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6b7280] text-[12px] top-0">12 variantes disponibles</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[86px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container22 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Lesson Complete</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[214px]">{`Card overlay avec confetti pour célébrer la fin d'une leçon`}</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[58.461px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Confetti</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[62.46px] rounded-[6px] top-0 w-[57.984px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Overlay</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[124.45px] rounded-[6px] top-0 w-[53.875px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Classic</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Paragraph2 />
        <Container25 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container24 />
      <Container26 />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container27 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
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
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Perfect Score</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[184px]">Card avec étoiles animées pour un score parfait</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[43.914px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Stars</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[47.91px] rounded-[6px] top-0 w-[54.297px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Perfect</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[106.21px] rounded-[6px] top-0 w-[68.508px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Animated</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
      <Text6 />
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Paragraph3 />
        <Container29 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container28 />
      <Container30 />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container31 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
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
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Trophy Scale</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[183px]">Trophée qui apparaît avec effet de zoom et rotation</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[53.125px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Trophy</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[57.13px] rounded-[6px] top-0 w-[45.109px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Scale</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[106.23px] rounded-[6px] top-0 w-[32.109px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">3D</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading5 />
        <Paragraph4 />
        <Container33 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container32 />
      <Container34 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container35 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Daily Goal</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16.797px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] min-h-px min-w-px relative text-[#6b7280] text-[12px]">Card pour objectif quotidien atteint</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[43.633px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Daily</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[47.63px] rounded-[6px] top-0 w-[41.297px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Goal</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[92.93px] rounded-[6px] top-0 w-[50.492px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Target</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Container38() {
  return (
    <div className="flex-[1_0_0] h-[71.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading6 />
        <Paragraph5 />
        <Container37 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[71.797px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container36 />
      <Container38 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[107.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container39 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Level Up</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[181px]">Célébration de passage au niveau supérieur avec effet rotatif</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[44.789px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Level</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[48.79px] rounded-[6px] top-0 w-[53.273px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Unlock</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[106.06px] rounded-[6px] top-0 w-[62.492px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Gradient</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading7 />
        <Paragraph6 />
        <Container41 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container40 />
      <Container42 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container43 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Streak Milestone</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[197px]">{`Célébration de série d'apprentissage avec emojis feu`}</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[50.508px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Streak</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[54.51px] rounded-[6px] top-0 w-[36.188px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Fire</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[94.7px] rounded-[6px] top-0 w-[68.648px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Milestone</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
      <Text18 />
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading8 />
        <Paragraph7 />
        <Container45 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container44 />
      <Container46 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container47 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Quiz Failed</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[205px]">{`Écran d'échec avec options de révision et réessai`}</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[52.359px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Failure</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[56.36px] rounded-[6px] top-0 w-[45.297px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Retry</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[105.66px] rounded-[6px] top-0 w-[40.68px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Loss</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text19 />
      <Text20 />
      <Text21 />
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading9 />
        <Paragraph8 />
        <Container49 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container48 />
      <Container50 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container51 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">{`Time's Up`}</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[179px]">Alerte de temps écoulé pour quiz chronométré</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[47.281px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Timer</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[51.28px] rounded-[6px] top-0 w-[60.594px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Timeout</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[115.88px] rounded-[6px] top-0 w-[62.625px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Warning</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text22 />
      <Text23 />
      <Text24 />
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading10 />
        <Paragraph9 />
        <Container53 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container52 />
      <Container54 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container55 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#dcebef] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#55a1b4] text-[14px] top-0">Booking Confirmed</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[204px]">Réservation confirmée avec particules animées</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[60.094px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Booking</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[64.09px] rounded-[6px] top-0 w-[62.531px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Particles</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[130.63px] rounded-[6px] top-0 w-[46.172px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Glass</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text25 />
      <Text26 />
      <Text27 />
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading11 />
        <Paragraph10 />
        <Container57 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container56 />
      <Container58 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
      <Container59 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Course Unlocked</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[200px]">Nouveau cours débloqué avec rayons lumineux</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[53.453px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Course</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[57.45px] rounded-[6px] top-0 w-[42.133px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Rays</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[103.59px] rounded-[6px] top-0 w-[53.273px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Unlock</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text28 />
      <Text29 />
      <Text30 />
    </div>
  );
}

function Container62() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading12 />
        <Paragraph11 />
        <Container61 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container60 />
      <Container62 />
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container63 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Badge Earned</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[16.797px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#6b7280] text-[12px]">Badge obtenu avec sparkles et rotation</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[50.883px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Badge</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[54.88px] rounded-[6px] top-0 w-[62.664px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Sparkles</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[121.55px] rounded-[6px] top-0 w-[53.125px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Trophy</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text31 />
      <Text32 />
      <Text33 />
    </div>
  );
}

function Container66() {
  return (
    <div className="flex-[1_0_0] h-[71.797px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading13 />
        <Paragraph12 />
        <Container65 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[71.797px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container64 />
      <Container66 />
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[107.797px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container67 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#252b37] text-[14px] top-0">Quiz Mastered</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[16.8px] left-0 text-[#6b7280] text-[12px] top-0 w-[179px]">Quiz réussi avec confettis et stats animées</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-0 rounded-[6px] top-0 w-[40.289px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Quiz</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[44.29px] rounded-[6px] top-0 w-[58.461px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Confetti</p>
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute bg-[#dcebef] h-[22px] left-[106.75px] rounded-[6px] top-0 w-[43.883px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#55a1b4] text-[12px] top-[2px]">Stats</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Text34 />
      <Text35 />
      <Text36 />
    </div>
  );
}

function Container70() {
  return (
    <div className="flex-[1_0_0] h-[88.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading14 />
        <Paragraph13 />
        <Container69 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[88.594px] items-start left-[18px] top-[18px] w-[266px]" data-name="Container">
      <Container68 />
      <Container70 />
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[124.594px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container71 />
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[1573.531px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[8px] px-[8px] relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
        <Button8 />
        <Button9 />
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function SandboxDesignSystem1() {
  return (
    <div className="absolute h-[457px] left-0 top-[437px] w-[320px]" data-name="SandboxDesignSystem">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-[2px] pt-[-1118px] relative rounded-[inherit] size-full">
        <Container21 />
        <Container23 />
        <Container72 />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r-2 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon16() {
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

function Button12() {
  return (
    <div className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid h-[41px] left-[32px] rounded-[12px] top-[24px] w-[104.539px]" data-name="Button">
      <Icon16 />
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[63.5px] text-[#252b37] text-[14px] text-center top-[8px]">Retour</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute css-ew64yg font-['League_Spartan:Black',sans-serif] font-black leading-[45px] left-0 text-[#252b37] text-[36px] top-0 tracking-[-0.9px]">{`Design System & Composants`}</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b7280] text-[16px] top-0 w-[322px]">34 composants • UI complète + Célébrations</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[79px] relative shrink-0 w-[462.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[21.31px] text-[#252b37] text-[24px] text-center top-[-0.5px]">10</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[21.5px] text-[#6b7280] text-[12px] text-center top-0">Buttons</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[54px] relative shrink-0 w-[42.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container74 />
        <Container75 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[34.25px] text-[#55a1b4] text-[24px] text-center top-[-0.5px]">12</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[34px] text-[#6b7280] text-[12px] text-center top-0">Célébrations</p>
    </div>
  );
}

function Container79() {
  return (
    <div className="flex-[1_0_0] h-[54px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[19.91px] text-[#252b37] text-[24px] text-center top-[-0.5px]">6</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#6b7280] text-[12px] text-center top-0">Modals</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[54px] relative shrink-0 w-[39.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container80 />
        <Container81 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Black',sans-serif] font-black leading-[36px] left-[33.86px] text-[#252b37] text-[24px] text-center top-[-0.5px]">6</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[18px] left-[34px] text-[#6b7280] text-[12px] text-center top-0">Notifications</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[54px] relative shrink-0 w-[67.43px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[54px] relative shrink-0 w-[265.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container76 />
        <Container79 />
        <Container82 />
        <Container85 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex h-[79px] items-start justify-between left-[32px] top-[81px] w-[1003px]" data-name="Container">
      <Container73 />
      <Container86 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2aca4e80} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7dff300} id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p34a33c00} id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3f4e600} id="Vector_4" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p27cf2000} id="Vector_5" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p38a06840} id="Vector_6" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_7" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pdb24200} id="Vector_8" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3631df80} id="Vector_9" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute bg-white h-[22px] left-[111.75px] rounded-[9999px] top-[12px] w-[30.406px]" data-name="Text">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[15.5px] text-[#252b37] text-[12px] text-center top-[2px]">10</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#f5f5f5] h-[46px] relative rounded-[16px] shrink-0 w-[166.156px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon17 />
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[75px] text-[#252b37] text-[14px] text-center top-[12.5px]">Buttons</p>
        <Text37 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_989_3571)" id="Icon">
          <path d={svgPaths.p3a45b880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 2.25H3.0075" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 6H16.5075" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M11.25 1.5H11.2575" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 15H16.5075" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2c1ad600} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pc90ca80} id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3bac7e00} id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2f728900} id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_989_3571">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] h-[22px] left-[144.3px] rounded-[9999px] top-[12px] w-[30.406px]" data-name="Text">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Bold',sans-serif] font-bold leading-[18px] left-[15.5px] text-[12px] text-center text-white top-[2px]">12</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-[#55a1b4] h-[46px] relative rounded-[16px] shrink-0 w-[198.703px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon18 />
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Bold',sans-serif] font-bold leading-[21px] left-[91.5px] text-[14px] text-center text-white top-[12.5px]">Célébrations</p>
        <Text38 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[14px]" data-name="Icon">
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

function Text39() {
  return (
    <div className="absolute bg-white h-[22px] left-[108.45px] rounded-[9999px] top-[12px] w-[23.203px]" data-name="Text">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[12px] text-[#252b37] text-[12px] text-center top-[2px]">6</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#f5f5f5] h-[46px] relative rounded-[16px] shrink-0 w-[155.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon19 />
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[73.5px] text-[#252b37] text-[14px] text-center top-[12.5px]">Modals</p>
        <Text39 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1bb47df0} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute bg-white h-[22px] left-[141.56px] rounded-[9999px] top-[12px] w-[23.203px]" data-name="Text">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[18px] left-[12px] text-[#252b37] text-[12px] text-center top-[2px]">6</p>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[#f5f5f5] h-[46px] relative rounded-[16px] shrink-0 w-[188.766px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon20 />
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Medium',sans-serif] font-medium leading-[21px] left-[90px] text-[#252b37] text-[14px] text-center top-[12.5px]">Notifications</p>
        <Text40 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[46px] items-start left-[32px] top-[184px] w-[1003px]" data-name="Container">
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[254px] relative shrink-0 w-full" data-name="Container">
      <Button12 />
      <Container87 />
      <Container88 />
    </div>
  );
}

function SandboxDesignSystem2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[256px] items-start left-0 pb-[2px] top-[217px] w-[1067px]" data-name="SandboxDesignSystem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-2 border-solid inset-0 pointer-events-none" />
      <Container89 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <SandboxDesignSystem />
      <SandboxDesignSystem1 />
      <SandboxDesignSystem2 />
    </div>
  );
}