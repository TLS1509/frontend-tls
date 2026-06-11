import svgPaths from "./svg-bnb6f8hgua";
import clsx from "clsx";
import imgImage from "figma:asset/e625c3a6a8f353a46dbb4a77fd385f7c7a72568b.png";
import imgImage1 from "figma:asset/3df5372235b373bee79a7a398a362676a0c5fa0d.png";
import imgImage2 from "figma:asset/2a4f2bf4ee8c0f6a9978721643746c01851d4706.png";
import imgImage3 from "figma:asset/e772965aa3cbb9c70a27f4f441be2c2d14428d9d.png";
import imgImage4 from "figma:asset/1f6d15a48ccac94085a92e09f0a21b1f46c6ea1e.png";

function ContainerBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[41px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImage2Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage2Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[112px] relative rounded-[16.4px] shrink-0 w-full">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}
type IconBackgroundImage2Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage2Props>) {
  return (
    <div className={clsx("size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={clsx("relative shrink-0 w-[18px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
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
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage1Props>) {
  return (
    <BackgroundImage additionalClassNames={clsx("size-[20px]", additionalClassNames)}>
      <g id="Icon">{children}</g>
    </BackgroundImage>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">{children}</div>
      </div>
    </div>
  );
}
type IconBackgroundImageProps = {
  additionalClassNames?: string;
};

function IconBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImageProps>) {
  return (
    <BackgroundImage1 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
};

function ParagraphBackgroundImageAndText1({ text }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-px">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#252b37] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <BackgroundImage3 additionalClassNames="h-[28px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#252b37] text-[18px] text-nowrap top-[0.33px] tracking-[-0.4395px]">{text}</p>
    </BackgroundImage3>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[12px] not-italic text-[#252b37] text-[12px] text-nowrap top-[7px]">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="h-[30px] relative rounded-[10px] shrink-0 w-[242px]">
      <BackgroundImageAndText1 text={text} />
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[48px] left-[32px] top-[32px] w-[32px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[48px] left-[16px] not-italic text-[#0a0a0a] text-[32px] text-center text-nowrap top-[0.33px] tracking-[0.4063px] translate-x-[-50%]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[26px] rounded-[4px] top-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[8px] not-italic text-[#f8b044] text-[12px] text-nowrap top-[5px]">{text}</p>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[1153.083px] left-[105.33px] top-[56px] w-[294px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[36px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#0a0a0a] text-[30px] text-nowrap tracking-[0.3955px]">✨</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[274.24px]" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a0a0a] text-[24px] text-nowrap top-[-0.33px]">Cards Flip Glassmorphism</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[40px] w-[58.125px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#f8b044] text-[12px] text-nowrap top-[3px]">Astuce</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[62px] relative shrink-0 w-[274.24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading1 />
        <Text1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[62px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Container1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[22.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-[1.33px] tracking-[-0.1504px]">Version premium avec glassmorphism, images et navigation multi-cartes</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[92.75px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[16px] top-[10.5px]">
      <g clipPath="url(#clip0_264_629)" id="Icon">
        <path d={svgPaths.p2dd43d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_264_629">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function Button() {
  return (
    <BackgroundImage2 additionalClassNames="bg-[#55a1b4] h-[37px] w-[92.479px]">
      <Icon />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[58.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Voter</p>
    </BackgroundImage2>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[92.75px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-0 top-[5px]">
      <g clipPath="url(#clip0_264_642)" id="Icon">
        <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d={svgPaths.p8247300} fill="var(--fill-0, #6B7280)" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_264_642">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function Container5() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <TextBackgroundImageAndText text="Multi-cards" additionalClassNames="left-[24px] w-[82.594px]" />
      <TextBackgroundImageAndText text="Image backgrounds" additionalClassNames="left-[114.59px] w-[129.75px]" />
      <TextBackgroundImageAndText text="Auto-advance" additionalClassNames="left-[252.34px] w-[97.083px]" />
      <TextBackgroundImageAndText text="Enhanced borders" additionalClassNames="left-[357.43px] w-[121.167px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[186.75px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[26px] px-[26px] relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[118.26px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Aperçu du design</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <IconBackgroundImage additionalClassNames="relative shrink-0">
      <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 2L9.33333 6.66667" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 14L6.66667 9.33333" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6 14H2V10" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Container7() {
  return (
    <div className="bg-[#f5f8f8] h-[45.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.667px] pt-0 px-[16px] relative size-full">
          <Text2 />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage2 additionalClassNames="relative shrink-0">
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
    </IconBackgroundImage2>
  );
}

function Container8() {
  return (
    <div className="relative rounded-[16.4px] shrink-0 size-[48px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[0.67px] tracking-[-0.4395px]">{`💡 Flashcards d'apprentissage`}</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[100px]">0 / 5 comprises</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-[320.677px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <BackgroundImage2 additionalClassNames="h-[34.667px] w-[62.854px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[47px] not-italic text-[#55a1b4] text-[16px] text-right top-[5px] tracking-[-0.3125px] translate-x-[-100%] w-[31px]">1 / 5</p>
    </BackgroundImage2>
  );
}

function Container11() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[48px]">
      <Container10 />
      <Text3 />
    </ContainerBackgroundImage>
  );
}

function Container12() {
  return <div className="bg-gradient-to-r from-[#55a1b4] h-[12px] shrink-0 to-[#f8b044] w-full" data-name="Container" />;
}

function Container13() {
  return (
    <div className="bg-[#e0e8ea] h-[12px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[714.667px] py-0 relative size-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[125.333px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#55a1b4] border-[2.667px] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[2.667px] pt-[26.667px] px-[26.667px] relative size-full">
        <Container11 />
        <Container13 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[112px] left-[2.8px] top-[2.8px] w-[95.2px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[50.4px] left-[33.6px] top-[33.6px] w-[33.6px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[48px] left-[17px] not-italic text-[#0a0a0a] text-[32px] text-center text-nowrap top-[0.6px] tracking-[0.4063px] translate-x-[-50%]">⚡</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[117.6px] relative rounded-[16.4px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Image />
        <Text4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#55a1b4] border-[2.667px] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[117.6px] items-start left-[-2.4px] top-[-2.8px] w-[100.8px]" data-name="Button">
      <Container15 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute h-[108px] left-[2px] top-[2px] w-[92px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container16() {
  return (
    <ContainerBackgroundImage1>
      <Image1 />
      <TextBackgroundImageAndText1 text="🚀" />
    </ContainerBackgroundImage1>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-start left-[108px] opacity-40 top-0 w-[96px]" data-name="Button">
      <Container16 />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute h-[108px] left-[2px] top-[2px] w-[92px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Container17() {
  return (
    <ContainerBackgroundImage1>
      <Image2 />
      <TextBackgroundImageAndText1 text="♿" />
    </ContainerBackgroundImage1>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-start left-[216px] opacity-40 top-0 w-[96px]" data-name="Button">
      <Container17 />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute h-[108px] left-[2px] top-[2px] w-[92px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
    </div>
  );
}

function Container18() {
  return (
    <ContainerBackgroundImage1>
      <Image3 />
      <TextBackgroundImageAndText1 text="🎨" />
    </ContainerBackgroundImage1>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-start left-[324px] opacity-40 top-0 w-[96px]" data-name="Button">
      <Container18 />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute h-[108px] left-[2px] top-[2px] w-[92px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
    </div>
  );
}

function Container19() {
  return (
    <ContainerBackgroundImage1>
      <Image4 />
      <TextBackgroundImageAndText1 text="💻" />
    </ContainerBackgroundImage1>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-start left-[432px] opacity-40 top-0 w-[96px]" data-name="Button">
      <Container19 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[120px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute h-[442px] left-0 top-0 w-[760px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[96px] relative shrink-0 w-[64px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[96px] left-0 not-italic text-[#0a0a0a] text-[64px] text-nowrap top-px tracking-[0.2188px]">⚡</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.25)] content-stretch flex items-center justify-center left-[324px] p-[2px] rounded-[24px] size-[112px] top-[72.4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.2)]" />
      <Text5 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.35)] border-2 border-[rgba(255,255,255,0.4)] border-solid h-[41px] left-[299.07px] rounded-[2.23696e+07px] top-[208.4px] w-[161.854px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[20px] not-italic text-[14px] text-nowrap text-white top-[8px] tracking-[0.8496px] uppercase">Productivité</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[43.198px] left-[154.82px] top-[265.4px] w-[450.354px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[43.2px] left-[225.5px] text-[36px] text-center text-nowrap text-white top-[-0.33px] translate-x-[-50%]">Raccourcis Clavier Essentiels</p>
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p12949080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 2V5.33333H5.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Paragraph2() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Cliquez pour voir la réponse</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex gap-[8px] h-[37px] items-center left-[258.04px] px-[16px] py-0 rounded-[2.23696e+07px] shadow-[0px_4px_13.18px_0px_rgba(85,161,180,0.34)] top-[332.59px] w-[243.906px]" data-name="Container">
      <Icon4 />
      <Paragraph2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[442px] left-0 top-0 w-[760px]" data-name="Container">
      <Container21 />
      <Container22 />
      <Heading3 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute border-4 border-[#55a1b4] border-solid h-[450px] left-0 overflow-clip rounded-[24px] top-0 w-[768px]" data-name="Container">
      <Image5 />
      <Container24 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#55a1b4] text-[12px] text-nowrap top-px tracking-[1px] uppercase">La Réponse</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-[123.135px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[2px] pt-[10px] px-[18px] relative size-full">
        <Paragraph3 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p25a8fe80} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M40 4V12" id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M44 8H36" id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p6c07e00} id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[48px] relative shrink-0 w-[680px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[496.865px] pr-0 py-0 relative size-full">
        <Container26 />
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[115.188px] relative shrink-0 w-[680px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[38.4px] left-[32.14px] not-italic text-[#252b37] text-[24px] top-[-0.33px] tracking-[0.0703px] w-[648px]">Utilisez Ctrl+Shift+P (Cmd+Shift+P sur Mac) pour ouvrir la palette de commandes et gagner un temps précieux dans vos workflows quotidiens.</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[25.74px]" data-name="Text">
      <BackgroundImageAndText text="30s" />
    </div>
  );
}

function Icon6() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0 size-[20px]">
      <g clipPath="url(#clip0_285_1370)" id="Icon">
        <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p14d24500} id="Vector_2" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_285_1370">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Container28() {
  return (
    <ContainerBackgroundImage2 additionalClassNames="h-[21px] w-[53.74px]">
      <Text6 />
      <Icon6 />
    </ContainerBackgroundImage2>
  );
}

function Text7() {
  return (
    <div className="h-[21px] relative shrink-0 w-[26.948px]" data-name="Text">
      <BackgroundImageAndText text="234" />
    </div>
  );
}

function Icon7() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0 size-[20px]">
      <g clipPath="url(#clip0_285_1387)" id="Icon">
        <path d="M5.83333 8.33333V18.3333" id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p3d0bd480} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_285_1387">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Container29() {
  return (
    <ContainerBackgroundImage2 additionalClassNames="h-[21px] w-[54.948px]">
      <Text7 />
      <Icon7 />
    </ContainerBackgroundImage2>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[37.083px]" data-name="Text">
      <BackgroundImageAndText text="1,523" />
    </div>
  );
}

function Icon8() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p25dc7400} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage1>
  );
}

function Container30() {
  return (
    <ContainerBackgroundImage2 additionalClassNames="h-[21px] w-[65.083px]">
      <Text8 />
      <Icon8 />
    </ContainerBackgroundImage2>
  );
}

function Container31() {
  return (
    <div className="bg-[#f5f8f8] h-[57px] relative rounded-[16.4px] shrink-0 w-[680px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center pl-[456.229px] pr-[2px] py-[2px] relative size-full">
        <Container28 />
        <Container29 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[680px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start justify-center relative size-full">
        <Container27 />
        <Paragraph4 />
        <Container31 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <BackgroundImage additionalClassNames="absolute inset-[-5.56%]">
          <path d={svgPaths.p15a59300} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </BackgroundImage>
      </div>
      <div className="absolute inset-[12.5%_66.67%_66.67%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d="M1 1V6H6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#eef6f8] h-[61.333px] relative rounded-[16.4px] shrink-0 w-[77.333px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[2.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[2.667px] pt-[18.667px] px-[26.667px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[392.42px] top-[18.67px]">
      <g id="Icon">
        <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </IconBackgroundImage2>
  );
}

function Button7() {
  return (
    <div className="basis-0 grow h-[61.333px] min-h-px min-w-px relative rounded-[16.4px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(174.072deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon10 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[279.76px] not-italic text-[18px] text-center text-nowrap text-white top-[17.83px] tracking-[-0.4395px] translate-x-[-50%]">Marquer comme compris</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[88px] relative shrink-0 w-[680px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#55a1b4] border-[2.667px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-0 pt-[26.667px] px-0 relative size-full">
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[450px] items-start left-0 pb-[25.813px] pl-[44px] pr-[4px] pt-[44px] rounded-[24px] top-0 w-[768px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-4 border-[#55a1b4] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[450px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container34 />
    </div>
  );
}

function Icon11() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-[26.67px] top-[16.67px]">
      <path d="M12.5 15L7.5 10L12.5 5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage1>
  );
}

function Button8() {
  return (
    <div className="bg-[#eef6f8] h-[53.333px] opacity-40 relative rounded-[16.4px] shrink-0 w-[159.531px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[2.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon11 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[93.67px] not-italic text-[#0a0a0a] text-[16px] text-center text-nowrap top-[14.33px] tracking-[-0.3125px] translate-x-[-50%]">Précédent</p>
      </div>
    </div>
  );
}

function Button9() {
  return <div className="basis-0 bg-[#55a1b4] grow h-[12px] min-h-px min-w-px rounded-[6px] shadow-[0px_0px_12px_0px_#55a1b4] shrink-0" data-name="Button" />;
}

function Button10() {
  return <div className="bg-[#c8d4d7] rounded-[4px] shrink-0 size-[8px]" data-name="Button" />;
}

function Container36() {
  return (
    <ContainerBackgroundImage2 additionalClassNames="h-[12px] w-[76px]">
      <Button9 />
      {[...Array(4).keys()].map((_, i) => (
        <Button10 key={i} />
      ))}
    </ContainerBackgroundImage2>
  );
}

function Icon12() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-[91.47px] top-[16.67px]">
      <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage1>
  );
}

function Button11() {
  return (
    <div className="h-[53.333px] relative rounded-[16.4px] shrink-0 w-[138.135px]" data-name="Button" style={{ backgroundImage: "linear-gradient(158.889deg, rgb(85, 161, 180) 0%, rgb(248, 176, 68) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[2.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[55.17px] not-italic text-[16px] text-center text-nowrap text-white top-[14.33px] tracking-[-0.3125px] translate-x-[-50%]">Suivant</p>
        <Icon12 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[53.333px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button8 />
      <Container36 />
      <Button11 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[828.667px] relative shrink-0 w-[768px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container14 />
        <Container20 />
        <Container35 />
        <Container37 />
      </div>
    </div>
  );
}

function TipsCardsFlipV2Enhanced() {
  return (
    <div className="content-stretch flex h-[892.667px] items-center justify-center relative shrink-0 w-full" data-name="TipsCardsFlipV2Enhanced" style={{ backgroundImage: "linear-gradient(136.05deg, rgb(255, 255, 255) 0%, rgb(245, 248, 248) 100%)" }}>
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[942.333px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container7 />
          <TipsCardsFlipV2Enhanced />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1153.083px] items-start left-[423.33px] top-[56px] w-[930px]" data-name="Container">
      <Container6 />
      <Container39 />
    </div>
  );
}

function SandboxRessources() {
  return (
    <div className="absolute bg-white h-[1225.083px] left-0 top-0 w-[1458.667px]" data-name="SandboxRessources">
      <Container />
      <Container40 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[27px] relative shrink-0 w-[95.938px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#0a0a0a] text-[18px] text-nowrap top-[-0.33px]">Propositions</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[#e8f4f7] h-[26px] relative rounded-[2.23696e+07px] shrink-0 w-[29.865px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#55a1b4] text-[12px] text-nowrap top-[5px]">12</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[27px]">
      <Heading4 />
      <Text9 />
    </ContainerBackgroundImage>
  );
}

function Button12() {
  return (
    <BackgroundImage2 additionalClassNames="bg-[#55a1b4] h-[30px] w-[242px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[12px] text-nowrap text-white top-[7px]">📚 Toutes</p>
    </BackgroundImage2>
  );
}

function Button13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[242px]" data-name="Button">
      <BackgroundImageAndText1 text="📘 Guides" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[138px] items-start relative shrink-0 w-full" data-name="Container">
      <Button12 />
      <ButtonBackgroundImageAndText text="📊 Infographies" />
      <ButtonBackgroundImageAndText text="💡 Astuces" />
      <Button13 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[217.667px] items-start left-0 pb-[0.667px] pt-[24px] px-[24px] top-0 w-[290px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container41 />
      <Container42 />
    </div>
  );
}

function Container44() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Canva Fullscreen" />
      <ParagraphBackgroundImageAndText1 text="Infographie" />
    </ContainerBackgroundImage3>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="🖼️" />
      <Container44 />
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container45 />
    </div>
  );
}

function Container46() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Canva Card Preview" />
      <ParagraphBackgroundImageAndText1 text="Infographie" />
    </ContainerBackgroundImage3>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="🎴" />
      <Container46 />
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Astuces Scroll Story" />
      <ParagraphBackgroundImageAndText1 text="Astuce" />
    </ContainerBackgroundImage3>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="💡" />
      <Container48 />
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container49 />
    </div>
  );
}

function Container50() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Cards Flip Classic" />
      <ParagraphBackgroundImageAndText1 text="Astuce" />
    </ContainerBackgroundImage3>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="💡" />
      <Container50 />
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container51 />
    </div>
  );
}

function Text10() {
  return (
    <BackgroundImage3 additionalClassNames="h-[28px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.33px] tracking-[-0.4395px]">✨</p>
    </BackgroundImage3>
  );
}

function Paragraph5() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Cards Flip Glassmorphism</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] text-nowrap top-px">Astuce</p>
    </div>
  );
}

function Container52() {
  return (
    <ContainerBackgroundImage3>
      <Paragraph5 />
      <Paragraph6 />
    </ContainerBackgroundImage3>
  );
}

function Icon13() {
  return (
    <IconBackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.pb43a980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <Text10 />
      <Container52 />
      <Icon13 />
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[#f8b044] h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container53 />
    </div>
  );
}

function Container54() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Vertical Feed" />
      <ParagraphBackgroundImageAndText1 text="Guide Pratique" />
    </ContainerBackgroundImage3>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📘" />
      <Container54 />
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Digital Notebook" />
      <ParagraphBackgroundImageAndText1 text="Guide Pratique" />
    </ContainerBackgroundImage3>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📓" />
      <Container56 />
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Interactive Workbook" />
      <ParagraphBackgroundImageAndText1 text="Guide Pratique" />
    </ContainerBackgroundImage3>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="✍️" />
      <Container58 />
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Article / Rapport Long" />
      <ParagraphBackgroundImageAndText1 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📄" />
      <Container60 />
    </div>
  );
}

function Button22() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Article avec Canva Doc" />
      <ParagraphBackgroundImageAndText1 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📋" />
      <Container62 />
    </div>
  );
}

function Button23() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container63 />
    </div>
  );
}

function Container64() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Rapport avec PDF Viewer" />
      <ParagraphBackgroundImageAndText1 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📊" />
      <Container64 />
    </div>
  );
}

function Button24() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="Article Magazine Style" />
      <ParagraphBackgroundImageAndText1 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📰" />
      <Container66 />
    </div>
  );
}

function Button25() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[846px] items-start left-[16px] top-[233.67px] w-[258px]" data-name="Container">
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
      <Button22 />
      <Button23 />
      <Button24 />
      <Button25 />
    </div>
  );
}

function SandboxRessources1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] border-2 border-[rgba(255,255,255,0.3)] border-solid h-[841.333px] left-[105.33px] overflow-clip rounded-[24px] top-[64px] w-[294px]" data-name="SandboxRessources">
      <Container43 />
      <Container68 />
    </div>
  );
}

function Icon14() {
  return (
    <IconBackgroundImage additionalClassNames="absolute left-[12px] top-[8.5px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Button26() {
  return (
    <BackgroundImage2 additionalClassNames="bg-[#eef6f8] h-[33px] w-[97.323px]">
      <Icon14 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[61px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[6px] tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
    </BackgroundImage2>
  );
}

function Container69() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[251.063px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-0.33px] tracking-[-0.3125px]">🎨 Ressources Complémentaires</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <BackgroundImage3 additionalClassNames="h-[27px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[0.67px] tracking-[-0.4395px]">✨</p>
    </BackgroundImage3>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <BackgroundImageAndText text="Cards Flip Glassmorphism" />
    </div>
  );
}

function Container70() {
  return (
    <ContainerBackgroundImage2 additionalClassNames="h-[27px] w-[202.417px]">
      <Text11 />
      <Text12 />
    </ContainerBackgroundImage2>
  );
}

function Container71() {
  return (
    <div className="h-[33px] relative shrink-0 w-[616.802px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button26 />
        <Container69 />
        <Heading />
        <Container69 />
        <Container70 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <BackgroundImage2 additionalClassNames="bg-[#eef6f8] h-[30px] w-[386.448px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[#6b7280] text-[12px] top-[7px] w-[363px]">12 layouts • 2 infographies + 3 astuces + 3 guides + 4 articles</p>
    </BackgroundImage2>
  );
}

function Container72() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[33px]">
      <Container71 />
      <Text13 />
    </ContainerBackgroundImage>
  );
}

function SandboxRessources2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[49.667px] items-start left-0 pb-[0.667px] pt-[8px] px-[24px] top-0 w-[1458.667px]" data-name="SandboxRessources">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container72 />
    </div>
  );
}

export default function LessonMakerMediaViewer() {
  return (
    <div className="bg-white relative size-full" data-name="Lesson maker & Media Viewer">
      <SandboxRessources />
      <SandboxRessources1 />
      <SandboxRessources2 />
    </div>
  );
}