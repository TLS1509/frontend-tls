import svgPaths from "./svg-fwe8ggogmc";

function Heading() {
  return (
    <div className="absolute h-[60px] left-0 top-0 w-[547.778px]" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[60px] left-[274.5px] text-[#252b37] text-[48px] text-center top-[-0.22px] tracking-[-1.2px]">Test Modal de Confirmation</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[32.5px] left-0 top-[76px] w-[547.778px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[32.5px] left-[274.38px] text-[#6b7280] text-[20px] text-center top-[-0.78px]">Nouveau design avec hiérarchie visuelle améliorée</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[32px] size-[23.993px] top-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <g id="Icon">
          <path d="M7.99769 1.99942V5.99826" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d="M15.9954 1.99942V5.99826" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d={svgPaths.p2ee14000} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d="M2.99913 9.99711H20.9939" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[59.002px] left-[90.79px] rounded-[16px] shadow-[0px_8px_24px_0px_rgba(85,161,180,0.4)] top-[140.49px] w-[366.198px]" data-name="Button" style={{ backgroundImage: "linear-gradient(170.847deg, rgb(85, 161, 180) 0%, rgb(74, 143, 161) 100%)" }}>
      <Icon />
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Bold',sans-serif] font-bold leading-[27px] left-[201.49px] text-[18px] text-center text-white top-[16.11px]">Ouvrir le modal de confirmation</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[199.497px] left-[340.56px] top-[279.7px] w-[547.778px]" data-name="Container">
      <Heading />
      <Paragraph />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[13.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p33f6b680} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15.8333 10H4.16667" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-[0.556px] border-[rgba(0,0,0,0.1)] border-solid h-[49.097px] left-[23.99px] rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] top-[23.99px] w-[200.408px]" data-name="Button">
      <Icon1 />
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[24px] left-[113.99px] text-[#252b37] text-[16px] text-center top-[12.11px]">Retour au Sandbox</p>
    </div>
  );
}

function TestConfirmationModal() {
  return (
    <div className="absolute h-[758.889px] left-0 top-0 w-[1228.889px]" data-name="TestConfirmationModal" style={{ backgroundImage: "linear-gradient(148.303deg, rgb(240, 249, 255) 0%, rgb(224, 242, 254) 100%)" }}>
      <Container />
      <Button1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[44.991px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[45px] left-[295.62px] text-[#252b37] text-[36px] text-center top-[-0.44px] tracking-[-0.9px]">Confirmer votre réservation</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[29.253px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Regular',sans-serif] font-normal leading-[29.25px] left-[295.89px] text-[#6b7280] text-[18px] text-center top-[-0.78px]">Vérifiez les détails de votre session avant de confirmer</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.997px] h-[86.241px] items-start left-[40px] top-[40px] w-[590.885px]" data-name="Container">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24d83580} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd919a80} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#e8f4f7] relative rounded-[16px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[77.969px] relative shrink-0 w-[497.778px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Nunito:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#252b37] text-[16px] top-[-0.33px] w-[495px]">Après confirmation, vous recevrez un email avec le lien de visioconférence Google Meet et un questionnaire de préparation pour optimiser votre session.</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[11.997px] h-[77.969px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Paragraph2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[119.08px] items-start left-[40px] pb-[0.556px] pt-[20.556px] px-[20.556px] rounded-[24px] top-[166.24px] w-[590.885px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.606deg, rgba(85, 161, 180, 0.08) 0%, rgba(85, 161, 180, 0.03) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(85,161,180,0.15)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[59.323px] min-h-px min-w-px relative rounded-[16px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[25.667px] py-[17.667px] relative size-full">
          <p className="css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#6b7280] text-[16px] text-center">Retour</p>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[38.63px] size-[20px] top-[19.66px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p32ddfd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="flex-[1_0_0] h-[59.323px] min-h-px min-w-px relative rounded-[16px] shadow-[0px_8px_24px_0px_rgba(85,161,180,0.4)]" data-name="Button" style={{ backgroundImage: "linear-gradient(168.339deg, rgb(85, 161, 180) 0%, rgb(74, 143, 161) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Nunito:Bold',sans-serif] font-bold leading-[24px] left-[157.12px] text-[16px] text-center text-white top-[17.78px]">Confirmer la réservation</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[15.998px] h-[59.323px] items-start left-[40px] top-[699.19px] w-[590.885px]" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container6() {
  return <div className="absolute h-[127.995px] left-0 opacity-20 top-0 w-[587.552px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 587.55 127.99\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(0 -14.31 -65.69 0 293.78 0)\'><stop stop-color=\'rgba(85,161,180,0.4)\' offset=\'0\'/><stop stop-color=\'rgba(43,81,90,0.2)\' offset=\'0.35\'/><stop stop-color=\'rgba(0,0,0,0)\' offset=\'0.7\'/></radialGradient></defs></svg>')" }} />;
}

function Heading2() {
  return (
    <div className="h-[30px] relative shrink-0 w-[378.741px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['League_Spartan:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#252b37] text-[24px] top-[-0.11px]">{`Session de Coaching IA & Formation`}</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 12.5V2.5" id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3053b100} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p37dcb700} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#e8f4f7] relative rounded-[16px] shrink-0 size-[43.993px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[43.993px] items-center justify-between left-[32px] top-[32px] w-[523.559px]" data-name="Container">
      <Heading2 />
      <Button4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <g id="Icon">
          <path d="M7.99769 1.99942V5.99826" id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d="M15.9954 1.99942V5.99826" id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d={svgPaths.p2ee14000} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d="M2.99913 9.99711H20.9939" id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#e8f4f7] relative rounded-[16px] shrink-0 size-[47.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.009px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.488px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#6b7280] text-[12px] top-[-0.89px] tracking-[0.6px] uppercase">Date</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[22.5px] left-0 text-[#252b37] text-[18px] top-[-0.11px]">31 janv. 2026</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[45.981px] relative shrink-0 w-[111.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.993px] items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[47.995px] items-start left-0 top-0 w-[251.78px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <g id="Icon">
          <path d={svgPaths.p23449420} id="Vector" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d={svgPaths.p29c7be70} id="Vector_2" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#fff9ee] relative rounded-[16px] shrink-0 size-[47.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.009px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.488px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#6b7280] text-[12px] top-[-0.89px] tracking-[0.6px] uppercase">Heure</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[22.5px] left-0 text-[#252b37] text-[18px] top-[-0.11px]">14:00</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[45.981px] relative shrink-0 w-[47.465px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.993px] items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[47.995px] items-start left-[271.78px] top-0 w-[251.78px]" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <g id="Icon">
          <path d={svgPaths.p23449420} id="Vector" stroke="var(--stroke-0, #ED843A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d={svgPaths.p29c7be70} id="Vector_2" stroke="var(--stroke-0, #ED843A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#fff4e6] relative rounded-[16px] shrink-0 size-[47.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.009px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.488px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#6b7280] text-[12px] top-[-0.89px] tracking-[0.6px] uppercase">Durée</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[22.5px] left-0 text-[#252b37] text-[18px] top-[-0.11px]">1 heure</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[45.981px] relative shrink-0 w-[62.049px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.993px] items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[47.995px] items-start left-0 top-[67.99px] w-[251.78px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <g id="Icon">
          <path d={svgPaths.pd7fb180} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          <path d={svgPaths.p1b56b680} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#e8f4f7] relative rounded-[16px] shrink-0 size-[47.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.009px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.488px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#6b7280] text-[12px] top-[-0.89px] tracking-[0.6px] uppercase">Coach</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[22.5px] left-0 text-[#252b37] text-[18px] top-[-0.11px]">Sophie Martin</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[45.981px] relative shrink-0 w-[114.957px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.993px] items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[11.997px] h-[47.995px] items-start left-[271.78px] top-[67.99px] w-[251.78px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[115.99px] left-[32px] top-[99.98px] w-[523.559px]" data-name="Container">
      <Container10 />
      <Container13 />
      <Container16 />
      <Container19 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p5948a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e238c80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#55a1b4] relative rounded-[12px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[19.488px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[19.5px] left-0 text-[#6b7280] text-[12px] top-[-0.89px] tracking-[0.6px] uppercase">Format</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Nunito:SemiBold',sans-serif] font-semibold leading-[20px] left-0 text-[#252b37] text-[16px] top-[-0.11px]">Visioconférence Google Meet</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[41.476px] relative shrink-0 w-[213.255px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.997px] items-start relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[11.997px] h-[41.476px] items-center relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[rgba(85,161,180,0.08)] content-stretch flex flex-col h-[74.583px] items-start left-[32px] pb-[0.556px] pt-[16.554px] px-[16.554px] rounded-[16px] top-[239.96px] w-[523.559px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.556px] border-[rgba(85,161,180,0.15)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute border-[1.667px] border-[rgba(85,161,180,0.2)] border-solid h-[349.878px] left-[40px] overflow-clip rounded-[32px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.08)] top-[317.32px] w-[590.885px]" data-name="Container" style={{ backgroundImage: "linear-gradient(149.369deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)" }}>
      <Container6 />
      <Container7 />
      <Container20 />
      <Container24 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.9)]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[798.516px] left-0 top-0 w-[670.885px]" data-name="Container">
      <Container1 />
      <Container4 />
      <Container5 />
      <Container25 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start left-[610.9px] pt-[7.995px] px-[7.995px] rounded-[12px] size-[35.99px] top-[23.99px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.98)] border-[0.556px] border-[rgba(255,255,255,0.5)] border-solid h-[799.627px] left-[278.45px] rounded-[32px] shadow-[0px_24px_64px_0px_rgba(0,0,0,0.2)] top-[-20.36px] w-[671.997px]" data-name="Container">
      <Container26 />
      <Button5 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.9)]" />
    </div>
  );
}

function BookingConfirmationModal() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.6)] h-[758.889px] left-0 top-0 w-[1228.889px]" data-name="BookingConfirmationModal">
      <Container27 />
    </div>
  );
}

export default function LearningAppSandbox() {
  return (
    <div className="bg-white relative size-full" data-name="Learning App - Sandbox">
      <TestConfirmationModal />
      <BookingConfirmationModal />
    </div>
  );
}