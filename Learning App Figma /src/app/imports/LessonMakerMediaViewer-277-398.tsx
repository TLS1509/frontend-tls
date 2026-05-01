import svgPaths from "./svg-w0evi35z38";
import clsx from "clsx";
import imgImage from "figma:asset/3b8e25b9c2a3dbe633170841105f8b78b15dd2e0.png";
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className={clsx("bg-[rgba(255,255,255,0.7)] place-self-stretch relative rounded-[16.4px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[22px] px-[22px] relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("bg-[#55a1b4] relative shrink-0 size-[32px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.3125px]">{children}</p>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type ButtonBackgroundImageAndText1Props = {
  text: string;
};

function ButtonBackgroundImageAndText1({ text }: ButtonBackgroundImageAndText1Props) {
  return (
    <div className="h-[30px] relative rounded-[10px] shrink-0 w-[38px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[19px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-[7px] translate-x-[-50%]">{text}</p>
      </div>
    </div>
  );
}
type IconBackgroundImageProps = {
  additionalClassNames?: string;
};

function IconBackgroundImage({ additionalClassNames = "" }: IconBackgroundImageProps) {
  return (
    <BackgroundImage additionalClassNames={additionalClassNames}>
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#e0e8ea] relative rounded-[2.23696e+07px] shrink-0 size-[32px]">
      <BackgroundImageAndText text={text} />
    </div>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText3({ text, additionalClassNames = "" }: TextBackgroundImageAndText3Props) {
  return (
    <div className={clsx("h-[26px] relative shrink-0", additionalClassNames)}>
      <BackgroundImage1>{text}</BackgroundImage1>
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText2({ text, additionalClassNames = "" }: TextBackgroundImageAndText2Props) {
  return (
    <div className={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">{text}</p>
      </div>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[32px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">{text}</p>
      </div>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="h-[28px] relative shrink-0 w-[18px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[9px] not-italic text-[#252b37] text-[18px] text-center text-nowrap top-[0.33px] tracking-[-0.4395px] translate-x-[-50%]">{text}</p>
      </div>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[1392.26px] left-0 opacity-30 top-0 w-[1298.667px]" data-name="Container" />;
}

function Heading1() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#0a0a0a] text-[20px] text-nowrap top-[-0.67px]">Les Fondamentaux du Marketing Digital</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[130px]">45 min • Section 1/7</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[51px] relative shrink-0 w-[349.698px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[27px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#10b981] text-[18px] top-[-0.33px] w-[31px]">15%</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[27px] w-[58.01px]">
      <Icon />
      <Text />
    </ContainerBackgroundImage>
  );
}

function Container3() {
  return (
    <div className="h-[51px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container1 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return <div className="bg-gradient-to-r from-[rgba(0,0,0,0)] h-[8px] shrink-0 to-[rgba(0,0,0,0)] via-1/2 w-full" data-name="Container" />;
}

function Container5() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#55a1b4] h-[8px] items-start relative shadow-[0px_0px_20px_0px_#55a1b4] shrink-0 to-[#f8b044] w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#e0e8ea] h-[8px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[1049.469px] py-0 relative size-full">
          <Container5 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[71px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[105px] items-start left-0 pb-[2px] pt-[16px] px-[32px] top-0 w-[1298.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[29.4px] relative shrink-0 w-[18.9px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[9px] not-italic text-[18px] text-center text-nowrap text-white top-[0.5px] tracking-[-0.4395px] translate-x-[-50%]">📖</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[22.05px] relative shrink-0 w-[89.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[45.5px] not-italic text-[14px] text-center text-nowrap text-white top-[0.1px] tracking-[-0.1504px] translate-x-[-50%]">Introduction</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16.8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8 16.8">
        <g clipPath="url(#clip0_277_402)" id="Icon">
          <path d={svgPaths.p219b49f2} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
          <path d="M6.3 8.4L7.7 9.80001L10.5 7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        </g>
        <defs>
          <clipPath id="clip0_277_402">
            <rect fill="white" height="16.8" width="16.8" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex gap-[12.6px] h-[58.8px] items-center left-[-4.88px] pl-[27.3px] pr-[2px] py-[2px] rounded-[16.4px] top-[-3.4px] w-[205.023px]" data-name="Button" style={{ backgroundImage: "linear-gradient(163.997deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px] shadow-[0px_8px_24px_0px_rgba(85,161,180,0.4)]" />
      <Text1 />
      <Text2 />
      <Icon1 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[83.073px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[42px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Engagement</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-[203.26px] pl-[26px] pr-[2px] py-[2px] rounded-[16.4px] top-0 w-[165.073px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <TextBackgroundImageAndText text="🎯" />
      <Text3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-[376.33px] pl-[26px] pr-[2px] py-[2px] rounded-[16.4px] top-0 w-[146.396px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <TextBackgroundImageAndText text="🔍" />
      <TextBackgroundImageAndText1 text="Découvrir" additionalClassNames="w-[64.396px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[15px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Quiz</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-[530.73px] px-[26px] py-[2px] rounded-[16.4px] top-0 w-[111.969px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <TextBackgroundImageAndText text="❓" />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[58.698px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[29.5px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Réfléchir</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-[650.7px] pl-[26px] pr-[2px] py-[2px] rounded-[16.4px] top-0 w-[140.698px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <TextBackgroundImageAndText text="💭" />
      <Text5 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-[799.4px] pl-[26px] pr-[2px] py-[2px] rounded-[16.4px] top-0 w-[145.979px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <TextBackgroundImageAndText text="✍️" />
      <TextBackgroundImageAndText1 text="Appliquer" additionalClassNames="w-[63.979px]" />
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[37px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Conclusion</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[56px] items-center left-[953.38px] px-[26px] py-[2px] rounded-[16.4px] top-0 w-[155.448px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <TextBackgroundImageAndText text="🎓" />
      <Text6 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[56px] overflow-clip relative shrink-0 w-full" data-name="Container">
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

function Container10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[88.667px] items-start left-0 pb-[0.667px] pt-[16px] px-[32px] top-[105px] w-[1298.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none" />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[37px] left-[42px] rounded-[2.23696e+07px] top-[42px] w-[117.26px]" data-name="Container" style={{ backgroundImage: "linear-gradient(162.488deg, rgb(248, 176, 68) 0%, rgb(237, 132, 58) 100%)" }}>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[16px] not-italic text-[14px] text-nowrap text-white top-[8px] tracking-[-0.1504px]">Introduction</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[57.594px] left-[42px] top-[103px] w-[940px]" data-name="Heading 1">
      <p className="absolute bg-clip-text font-['League_Spartan:Bold',sans-serif] font-bold leading-[57.6px] left-0 text-[#0a0a0a] text-[48px] text-nowrap top-[0.67px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgb(10, 10, 10) 0%, rgb(10, 10, 10) 100%), linear-gradient(174.139deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
        Bienvenue dans cette leçon
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[72px] left-[42px] top-[600.59px] w-[940px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[36px] left-0 not-italic text-[#252b37] text-[20px] top-0 tracking-[-0.4492px] w-[919px]">Dans cette introduction, nous allons découvrir ensemble les concepts fondamentaux du marketing digital. Vous allez apprendre comment les entreprises utilisent Internet pour atteindre leurs clients.</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_277_410)" id="Icon">
          <path d={svgPaths.p3eebfc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20 2V6" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4H18" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p352890c0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_277_410">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative rounded-[16.4px] shadow-[0px_8px_16px_0px_rgba(85,161,180,0.3)] shrink-0 size-[48px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[36px] relative shrink-0 w-[170.583px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a0a0a] text-[24px] text-nowrap top-[-0.33px]">Points essentiels</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Heading2 />
    </div>
  );
}

function Container14() {
  return (
    <BackgroundImage2 additionalClassNames="rounded-[10px]">
      <TextBackgroundImageAndText2 text="1" additionalClassNames="w-[7.021px]" />
    </BackgroundImage2>
  );
}

function Text7() {
  return (
    <div className="h-[26px] relative shrink-0 w-[238.375px]" data-name="Text">
      <BackgroundImage1>{`Comprendre l'écosystème digital`}</BackgroundImage1>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Text7 />
    </div>
  );
}

function Container16() {
  return (
    <ContainerBackgroundImage1 additionalClassNames="[grid-area:1_/_1]">
      <Container15 />
    </ContainerBackgroundImage1>
  );
}

function Container17() {
  return (
    <BackgroundImage2 additionalClassNames="rounded-[10px]">
      <TextBackgroundImageAndText2 text="2" additionalClassNames="w-[8.854px]" />
    </BackgroundImage2>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <TextBackgroundImageAndText3 text="Identifier les canaux clés" additionalClassNames="w-[178.458px]" />
    </div>
  );
}

function Container19() {
  return (
    <ContainerBackgroundImage1 additionalClassNames="[grid-area:1_/_2]">
      <Container18 />
    </ContainerBackgroundImage1>
  );
}

function Container20() {
  return (
    <div className="bg-[#55a1b4] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.01px] py-0 relative size-full">
        <TextBackgroundImageAndText2 text="3" additionalClassNames="w-[9.219px]" />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <TextBackgroundImageAndText3 text="Maîtriser les métriques essentielles" additionalClassNames="w-[254.302px]" />
    </div>
  );
}

function Container22() {
  return (
    <ContainerBackgroundImage1 additionalClassNames="[grid-area:2_/_1]">
      <Container21 />
    </ContainerBackgroundImage1>
  );
}

function Container23() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[168px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container19 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[240px] items-start left-[42px] top-[704.59px] w-[940px]" data-name="Container">
      <Container13 />
      <Container23 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[384px] left-0 top-0 w-[940px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container25() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.5)] h-[384px] left-0 opacity-0 to-[rgba(0,0,0,0)] top-0 w-[940px]" data-name="Container" />;
}

function Container26() {
  return (
    <div className="absolute h-[384px] left-[42px] overflow-clip rounded-[24px] top-[184.59px] w-[940px]" data-name="Container">
      <Image />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[1018.594px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_32px_64px_0px_rgba(0,0,0,0.1)]" />
      <Container11 />
      <Heading />
      <Paragraph1 />
      <Container24 />
      <Container26 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[52px] relative rounded-[16.4px] shrink-0 w-[148.719px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[26px] py-[14px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] text-center text-nowrap tracking-[-0.3125px]">← Précédent</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[52px] relative rounded-[16.4px] shadow-[0px_8px_24px_0px_rgba(85,161,180,0.4)] shrink-0 w-[123.323px]" data-name="Button" style={{ backgroundImage: "linear-gradient(157.137deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[24px] py-[12px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.3125px]">Suivant →</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[52px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[1102.594px] items-start left-[137.33px] top-[241.67px] w-[1024px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function RenderFullWidthImmersiveV() {
  return (
    <div className="bg-white h-[1392.26px] relative shrink-0 w-full" data-name="RenderFullWidthImmersiveV2">
      <Container />
      <Container8 />
      <Container10 />
      <Container29 />
    </div>
  );
}

function Icon3() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[16px] top-[10.5px]">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button9() {
  return (
    <div className="bg-[#eef6f8] h-[37px] opacity-40 relative rounded-[10px] shrink-0 w-[125.531px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[75.5px] not-italic text-[#6b7280] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Précédent</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <BackgroundImage2 additionalClassNames="rounded-[2.23696e+07px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">1</p>
    </BackgroundImage2>
  );
}

function Button11() {
  return (
    <div className="basis-0 bg-[#e0e8ea] grow h-[32px] min-h-px min-w-px relative rounded-[2.23696e+07px] shrink-0" data-name="Button">
      <BackgroundImageAndText text="5" />
    </div>
  );
}

function Container30() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[32px] w-[192px]">
      <Button10 />
      <ButtonBackgroundImageAndText text="2" />
      <ButtonBackgroundImageAndText text="3" />
      <ButtonBackgroundImageAndText text="4" />
      <Button11 />
    </ContainerBackgroundImage>
  );
}

function Button12() {
  return (
    <div className="bg-[#55a1b4] h-[37px] relative rounded-[10px] shrink-0 w-[106.563px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[41.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Suivant</p>
        <IconBackgroundImage additionalClassNames="absolute left-[74.56px] top-[10.5px]" />
      </div>
    </div>
  );
}

function PreviewNavigation() {
  return (
    <div className="bg-[#f5f8f8] h-[69.667px] relative shrink-0 w-full" data-name="PreviewNavigation">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pl-[24px] pr-[24.01px] pt-[0.667px] relative size-full">
          <Button9 />
          <Container30 />
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function LessonPreviewWrapper() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1461.927px] items-start overflow-clip relative rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="LessonPreviewWrapper">
      <RenderFullWidthImmersiveV />
      <PreviewNavigation />
    </div>
  );
}

function SandboxLessonViewers() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1565.927px] items-start left-0 pb-0 pt-[104px] px-[8px] top-0 w-[1314.667px]" data-name="SandboxLessonViewers">
      <LessonPreviewWrapper />
    </div>
  );
}

function Icon4() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[49.323px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[25px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#eef6f8] h-[33px] relative rounded-[10px] shrink-0 w-[97.323px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-0 relative size-full">
        <Icon4 />
        <Text8 />
      </div>
    </div>
  );
}

function Container31() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[32px] shrink-0 w-px" data-name="Container" />;
}

function Button14() {
  return (
    <div className="bg-[#55a1b4] h-[30px] relative rounded-[10px] shrink-0 w-[38px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[19px] not-italic text-[12px] text-center text-nowrap text-white top-[7px] translate-x-[-50%]">🎨</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[30px] relative shrink-0 w-[176px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button14 />
        <ButtonBackgroundImageAndText1 text="📚" />
        <ButtonBackgroundImageAndText1 text="🔀" />
        <ButtonBackgroundImageAndText1 text="✨" />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[27px] relative shrink-0 w-[18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[9px] not-italic text-[18px] text-center text-nowrap text-white top-[0.67px] tracking-[-0.4395px] translate-x-[-50%]">✨</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Full Width Enhanced</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#55a1b4] h-[39px] relative rounded-[10px] shrink-0 w-[220px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
        <Text9 />
        <Text10 />
        <IconBackgroundImage additionalClassNames="relative shrink-0" />
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[#eef6f8] h-[33px] relative rounded-[10px] shrink-0 w-[37.073px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[12px] py-[6px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#252b37] text-[14px] text-center text-nowrap tracking-[-0.1504px]">○</p>
      </div>
    </div>
  );
}

function CompactLessonNav() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex gap-[12px] h-[64.333px] items-center left-[329.97px] pl-[24.667px] pr-[0.667px] py-[0.667px] rounded-[24px] top-[16px] w-[654.729px]" data-name="CompactLessonNav">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Button13 />
      <Container31 />
      <Container32 />
      <Container31 />
      <Button15 />
      <Container31 />
      <Button16 />
    </div>
  );
}

export default function LessonMakerMediaViewer() {
  return (
    <div className="bg-white relative size-full" data-name="Lesson maker & Media Viewer">
      <SandboxLessonViewers />
      <CompactLessonNav />
    </div>
  );
}