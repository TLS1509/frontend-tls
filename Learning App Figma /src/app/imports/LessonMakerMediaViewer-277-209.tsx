import svgPaths from "./svg-faz74pzgpt";
import clsx from "clsx";
import imgImage from "figma:asset/3b8e25b9c2a3dbe633170841105f8b78b15dd2e0.png";

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(176.052deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)" }} className="h-[57.333px] relative rounded-[16.4px] shrink-0 w-full">
      {children}
    </div>
  );
}
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("h-[45px] relative rounded-[16.4px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[12px] px-[24px] relative size-full">{children}</div>
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
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <BackgroundImage1 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
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
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ additionalClassNames = "" }: IconBackgroundImage1Props) {
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
type RenderFullWidthGradientBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function RenderFullWidthGradientBackgroundImageAndText({ text, additionalClassNames = "" }: RenderFullWidthGradientBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[24px] left-[48.67px] top-[16.67px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-0.33px] tracking-[-0.3125px]">{text}</p>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <div className="absolute left-[16.67px] size-[20px] top-[18.67px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_277_223)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_277_223">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
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
    <div className="h-[21px] relative shrink-0 w-[15.333px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[8px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">{text}</p>
      </div>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[1063.167px] left-0 opacity-30 shadow-[0px_4px_18.372px_0px_rgba(85,161,180,0.54)] top-0 w-[1298.667px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1298.7 1063.2\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -116.7 -116.7 0 259.73 531.58)\\'><stop stop-color=\\'rgba(85,161,180,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(64,121,135,0.75)\\' offset=\\'0.125\\'/><stop stop-color=\\'rgba(43,81,90,0.5)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(21,40,45,0.25)\\' offset=\\'0.375\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1298.7 1063.2\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -116.7 -116.7 0 1038.9 531.58)\\'><stop stop-color=\\'rgba(248,176,68,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(186,132,51,0.75)\\' offset=\\'0.125\\'/><stop stop-color=\\'rgba(124,88,34,0.5)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(62,44,17,0.25)\\' offset=\\'0.375\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />;
}

function Heading() {
  return (
    <div className="h-[45px] relative shrink-0 w-[551.688px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[45px] left-0 not-italic text-[#55a1b4] text-[30px] text-nowrap top-[0.67px] tracking-[0.3955px]">Les Fondamentaux du Marketing Digital</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_277_219)" id="Icon">
        <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_277_219">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[44.51px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">45 min</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[21px] w-[68.51px]">
      <Icon />
      <Text />
    </ContainerBackgroundImage>
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
  return <div className="bg-[#55a1b4] h-[8px] shadow-[0px_0px_20px_0px_#55a1b4] shrink-0 w-full" data-name="Container" />;
}

function Container4() {
  return (
    <div className="bg-[#e0e8ea] h-[8px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[870.406px] py-0 relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[69px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[117.667px] items-start left-0 pb-[0.667px] pt-[24px] px-[137.333px] top-0 w-[1298.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[15.333px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[8px] not-italic text-[14px] text-center text-nowrap text-white top-0 tracking-[-0.1504px] translate-x-[-50%]">📖</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[43.5px] not-italic text-[14px] text-center text-nowrap text-white top-0 tracking-[-0.1504px] translate-x-[-50%]">Introduction</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_277_234)" id="Icon">
          <path d={svgPaths.p8f10080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24097a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_277_234">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
      <Icon1 />
    </div>
  );
}

function Button() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#55a1b4] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] w-[176.594px]">
      <Container7 />
    </ButtonBackgroundImage>
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

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="🎯" />
      <Text3 />
    </div>
  );
}

function Button1() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#eef6f8] w-[154.406px]">
      <Container8 />
    </ButtonBackgroundImage>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="🔍" />
      <TextBackgroundImageAndText1 text="Découvrir" additionalClassNames="w-[64.396px]" />
    </div>
  );
}

function Button2() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#eef6f8] w-[135.729px]">
      <Container9 />
    </ButtonBackgroundImage>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[29.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[15px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Quiz</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="❓" />
      <Text4 />
    </div>
  );
}

function Button3() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#eef6f8] w-[101.302px]">
      <Container10 />
    </ButtonBackgroundImage>
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

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="💭" />
      <Text5 />
    </div>
  );
}

function Button4() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#eef6f8] w-[130.031px]">
      <Container11 />
    </ButtonBackgroundImage>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="✍️" />
      <TextBackgroundImageAndText1 text="Appliquer" additionalClassNames="w-[63.979px]" />
    </div>
  );
}

function Button5() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#eef6f8] w-[135.313px]">
      <Container12 />
    </ButtonBackgroundImage>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[73.448px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[37px] not-italic text-[#252b37] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Conclusion</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="🎓" />
      <Text6 />
    </div>
  );
}

function Button6() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#eef6f8] w-[144.781px]">
      <Container13 />
    </ButtonBackgroundImage>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[45px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
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
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[77.667px] items-start left-0 pb-[0.667px] pt-[16px] px-[137.333px] top-[117.67px] w-[1298.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container14 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-[-0.67px] tracking-[0.0703px]">Bienvenue dans cette leçon</p>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[256px] pointer-events-none relative rounded-[24px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[24px] size-full" src={imgImage} />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 rounded-[24px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#252b37] text-[18px] top-[0.33px] tracking-[-0.4395px] w-[788px]">Dans cette introduction, nous allons découvrir ensemble les concepts fondamentaux du marketing digital. Vous allez apprendre comment les entreprises utilisent Internet pour atteindre leurs clients.</p>
    </div>
  );
}

function RenderFullWidthGradient() {
  return (
    <div className="absolute h-[24px] left-[48.67px] top-[16.67px] w-[238.375px]" data-name="RenderFullWidthGradient">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-0.33px] tracking-[-0.3125px]">{`Comprendre l'écosystème digital`}</p>
    </div>
  );
}

function Container16() {
  return (
    <ContainerBackgroundImage1>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <IconBackgroundImage />
      <RenderFullWidthGradient />
    </ContainerBackgroundImage1>
  );
}

function Container17() {
  return (
    <ContainerBackgroundImage1>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <IconBackgroundImage />
      <RenderFullWidthGradientBackgroundImageAndText text="Identifier les canaux clés" additionalClassNames="w-[178.458px]" />
    </ContainerBackgroundImage1>
  );
}

function Container18() {
  return (
    <ContainerBackgroundImage1>
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <IconBackgroundImage />
      <RenderFullWidthGradientBackgroundImageAndText text="Maîtriser les métriques essentielles" additionalClassNames="w-[254.302px]" />
    </ContainerBackgroundImage1>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[196px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[24px] h-[723.833px] items-start left-[201.33px] pb-[0.667px] pt-[32.667px] px-[32.667px] rounded-[24px] top-[243.33px] w-[896px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
      <Heading1 />
      <Image />
      <Paragraph />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[1063.167px] left-0 top-0 w-[1298.667px]" data-name="Container">
      <Container6 />
      <Container15 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[1063.167px] relative shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(140.694deg, rgba(85, 161, 180, 0.063) 0%, rgba(237, 132, 58, 0.063) 50%, rgba(248, 176, 68, 0.063) 100%)" }}>
      <Container />
      <Container21 />
    </div>
  );
}

function Icon2() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[16px] top-[10.5px]">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button7() {
  return (
    <div className="bg-[#eef6f8] h-[37px] opacity-40 relative rounded-[10px] shrink-0 w-[125.531px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[75.5px] not-italic text-[#6b7280] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Précédent</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#55a1b4] relative rounded-[2.23696e+07px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">1</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="basis-0 bg-[#e0e8ea] grow h-[32px] min-h-px min-w-px relative rounded-[2.23696e+07px] shrink-0" data-name="Button">
      <BackgroundImageAndText text="5" />
    </div>
  );
}

function Container23() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[32px] w-[192px]">
      <Button8 />
      <ButtonBackgroundImageAndText text="2" />
      <ButtonBackgroundImageAndText text="3" />
      <ButtonBackgroundImageAndText text="4" />
      <Button9 />
    </ContainerBackgroundImage>
  );
}

function Button10() {
  return (
    <div className="bg-[#55a1b4] h-[37px] relative rounded-[10px] shrink-0 w-[106.563px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[41.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Suivant</p>
        <IconBackgroundImage1 additionalClassNames="absolute left-[74.56px] top-[10.5px]" />
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
          <Button7 />
          <Container23 />
          <Button10 />
        </div>
      </div>
    </div>
  );
}

function RenderFullWidthGradient1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1132.833px] items-start overflow-clip relative rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="RenderFullWidthGradient">
      <Container22 />
      <PreviewNavigation />
    </div>
  );
}

function SandboxLessonViewers() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1236.833px] items-start left-0 pb-0 pt-[104px] px-[8px] top-0 w-[1314.667px]" data-name="SandboxLessonViewers">
      <RenderFullWidthGradient1 />
    </div>
  );
}

function Icon3() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Text7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[49.323px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[25px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#eef6f8] h-[33px] relative rounded-[10px] shrink-0 w-[97.323px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-0 relative size-full">
        <Icon3 />
        <Text7 />
      </div>
    </div>
  );
}

function Container24() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[32px] shrink-0 w-px" data-name="Container" />;
}

function Button12() {
  return (
    <div className="bg-[#55a1b4] h-[30px] relative rounded-[10px] shrink-0 w-[38px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[19px] not-italic text-[12px] text-center text-nowrap text-white top-[7px] translate-x-[-50%]">🎨</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[30px] relative shrink-0 w-[176px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button12 />
        <ButtonBackgroundImageAndText1 text="📚" />
        <ButtonBackgroundImageAndText1 text="🔀" />
        <ButtonBackgroundImageAndText1 text="✨" />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[27px] relative shrink-0 w-[18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[9px] not-italic text-[18px] text-center text-nowrap text-white top-[0.67px] tracking-[-0.4395px] translate-x-[-50%]">🌈</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Full Width Gradient</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#55a1b4] h-[39px] relative rounded-[10px] shrink-0 w-[220px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
        <Text8 />
        <Text9 />
        <IconBackgroundImage1 additionalClassNames="relative shrink-0" />
      </div>
    </div>
  );
}

function Button14() {
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
      <Button11 />
      <Container24 />
      <Container25 />
      <Container24 />
      <Button13 />
      <Container24 />
      <Button14 />
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