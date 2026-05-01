import svgPaths from "./svg-g56vl7d80z";
import clsx from "clsx";
import imgImage from "figma:asset/e625c3a6a8f353a46dbb4a77fd385f7c7a72568b.png";
import imgImage1 from "figma:asset/a30891736d751bbdbb6126c20ce2674ea5c537a4.png";
import imgImage2 from "figma:asset/a3e7048f5ceb0ea136fc2c0f36823c087c8bd115.png";
import imgImage3 from "figma:asset/8d9e6534b3e629ac4559c36829d0d52458b58ec6.png";

function ContainerBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[41px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">{children}</div>
    </div>
  );
}
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("h-[49px] relative rounded-[16.4px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[26px] py-[14px] relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[64px] relative rounded-[16.4px] shrink-0 w-full">
      <div className="content-stretch flex gap-[12px] items-start pb-0 pl-[16px] pr-0 pt-[16px] relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-0 rounded-[16.4px] size-[48px] top-0">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={clsx("bg-[#f8b044] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("relative shrink-0 w-[18px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
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
        {children}
      </svg>
    </div>
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
    <BackgroundImage additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage>
  );
}
type ParagraphBackgroundImageAndText2Props = {
  text: string;
};

function ParagraphBackgroundImageAndText2({ text }: ParagraphBackgroundImageAndText2Props) {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-px">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
};

function ParagraphBackgroundImageAndText1({ text }: ParagraphBackgroundImageAndText1Props) {
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
    <BackgroundImage2 additionalClassNames="h-[28px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#252b37] text-[18px] text-nowrap top-[0.33px] tracking-[-0.4395px]">{text}</p>
    </BackgroundImage2>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
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
      <BackgroundImageAndText text={text} />
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[24px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#252b37] text-[16px] text-nowrap top-[-0.33px] tracking-[-0.3125px]">{text}</p>
      </div>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <BackgroundImage3 additionalClassNames="rounded-[10px] size-[32px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px]">{text}</p>
    </BackgroundImage3>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[30px] left-[14px] top-[9px] w-[20px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[10px] not-italic text-[#0a0a0a] text-[20px] text-center text-nowrap top-[0.33px] tracking-[-0.4492px] translate-x-[-50%]">{text}</p>
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
  return <div className="absolute h-[1107.698px] left-[105.33px] top-[56px] w-[294px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[36px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#0a0a0a] text-[30px] text-nowrap tracking-[0.3955px]">💡</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[207.156px]" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a0a0a] text-[24px] text-nowrap top-[-0.33px]">Astuces Scroll Story</p>
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
    <div className="h-[62px] relative shrink-0 w-[207.156px]" data-name="Container">
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
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-[1.33px] tracking-[-0.1504px]">Format scroll story pour astuces pratiques avec images</p>
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
    <BackgroundImage additionalClassNames="absolute left-[16px] top-[10.5px]">
      <g clipPath="url(#clip0_264_629)" id="Icon">
        <path d={svgPaths.p2dd43d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_264_629">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Button() {
  return (
    <BackgroundImage1 additionalClassNames="bg-[#55a1b4] h-[37px] w-[92.479px]">
      <Icon />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[58.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Voter</p>
    </BackgroundImage1>
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
    <BackgroundImage additionalClassNames="absolute left-0 top-[5px]">
      <g clipPath="url(#clip0_264_642)" id="Icon">
        <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d={svgPaths.p8247300} fill="var(--fill-0, #6B7280)" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_264_642">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Container5() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <TextBackgroundImageAndText text="Image gallery" additionalClassNames="left-[24px] w-[93.813px]" />
      <TextBackgroundImageAndText text="Section navigation" additionalClassNames="left-[125.81px] w-[122.875px]" />
      <TextBackgroundImageAndText text="Progress tracking" additionalClassNames="left-[256.69px] w-[118.146px]" />
      <TextBackgroundImageAndText text="Tips list" additionalClassNames="left-[382.83px] w-[61.219px]" />
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

function Text3() {
  return (
    <div className="h-[42px] relative shrink-0 w-[28px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[42px] left-0 not-italic text-[#0a0a0a] text-[28px] text-nowrap top-0 tracking-[0.3828px]">⌨️</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <BackgroundImage3 additionalClassNames="rounded-[24px] size-[56px]">
      <Text3 />
    </BackgroundImage3>
  );
}

function Heading3() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#0a0a0a] text-[20px] text-nowrap top-[-0.67px]">💡 Astuces Pratiques</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[76px]">Astuce 1 / 4</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[51px] relative shrink-0 w-[180.885px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading3 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[56px] relative shrink-0 w-[248.885px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[46.933px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute left-0 rounded-[16.4px] size-[52.8px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[2.667px] pt-[2.933px] px-[2.933px] relative rounded-[inherit] size-full">
        <Image />
      </div>
      <div aria-hidden="true" className="absolute border-[#f8b044] border-[2.667px] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[33px] left-[15.4px] top-[9.9px] w-[22px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[30px] left-[11px] not-italic text-[#0a0a0a] text-[20px] text-center text-nowrap top-[0.67px] tracking-[-0.4492px] translate-x-[-50%]">⌨️</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute left-[-2.4px] size-[52.8px] top-[-2.4px]" data-name="Button">
      <Container11 />
      <Text4 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container12() {
  return (
    <ContainerBackgroundImage1>
      <Image1 />
    </ContainerBackgroundImage1>
  );
}

function Button2() {
  return (
    <div className="absolute left-[56px] opacity-40 size-[48px] top-0" data-name="Button">
      <Container12 />
      <TextBackgroundImageAndText1 text="📋" />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Container13() {
  return (
    <ContainerBackgroundImage1>
      <Image2 />
    </ContainerBackgroundImage1>
  );
}

function Button3() {
  return (
    <div className="absolute left-[112px] opacity-40 size-[48px] top-0" data-name="Button">
      <Container13 />
      <TextBackgroundImageAndText1 text="📝" />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
    </div>
  );
}

function Container14() {
  return (
    <ContainerBackgroundImage1>
      <Image3 />
    </ContainerBackgroundImage1>
  );
}

function Button4() {
  return (
    <div className="absolute left-[168px] opacity-40 size-[48px] top-0" data-name="Button">
      <Container14 />
      <TextBackgroundImageAndText1 text="🔄" />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[48px] relative shrink-0 w-[216px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[56px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return <div className="bg-[#f8b044] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container18() {
  return (
    <div className="bg-[#e0e8ea] h-[8px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[592.5px] py-0 relative size-full">
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[130.667px] items-start left-[4px] pb-[2.667px] pt-[24px] px-[32px] top-[4px] w-[854px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f8b044] border-[0px_0px_2.667px] border-solid inset-0 pointer-events-none" />
      <Container16 />
      <Container18 />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute h-[394.667px] left-0 top-0 w-[357.667px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[72px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[72px] left-0 not-italic text-[#0a0a0a] text-[48px] text-nowrap top-[0.33px] tracking-[0.3516px]">⌨️</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[24px] rounded-[24px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.2)] size-[80px] top-[24px]" data-name="Container">
      <Text5 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute border-[#f8b044] border-[2.667px] border-solid h-[400px] left-[48px] overflow-clip rounded-[24px] top-[76.47px] w-[363px]" data-name="Container">
      <Image4 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute border-2 border-[#f8b044] border-solid h-[38px] left-0 rounded-[2.23696e+07px] top-0 w-[200.667px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[16px] not-italic text-[#f8b044] text-[12px] text-nowrap top-[9px] tracking-[1px] uppercase">Astuce Productivité</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[43.198px] left-0 top-[54px] w-[363px]" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[43.2px] left-0 text-[#f8b044] text-[36px] text-nowrap top-[-0.33px]">Raccourcis Clavier</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[87.75px] left-0 top-[121.2px] w-[363px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#252b37] text-[18px] top-[0.33px] tracking-[-0.4395px] w-[336px]">{`Gagnez du temps avec les raccourcis essentiels pour naviguer rapidement dans l'application.`}</p>
    </div>
  );
}

function Container23() {
  return (
    <ContainerBackgroundImage2>
      <ContainerBackgroundImageAndText text="1" />
      <ParagraphBackgroundImageAndText text="Ctrl+Shift+P : Palette de commandes" additionalClassNames="w-[274.063px]" />
    </ContainerBackgroundImage2>
  );
}

function Container24() {
  return (
    <ContainerBackgroundImage2>
      <ContainerBackgroundImageAndText text="2" />
      <ParagraphBackgroundImageAndText text="Ctrl+K : Recherche rapide" additionalClassNames="w-[190.552px]" />
    </ContainerBackgroundImage2>
  );
}

function Container25() {
  return (
    <ContainerBackgroundImage2>
      <ContainerBackgroundImageAndText text="3" />
      <ParagraphBackgroundImageAndText text="Alt+Tab : Naviguer entre fenêtres" additionalClassNames="w-[243.802px]" />
    </ContainerBackgroundImage2>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[216px] items-start left-0 top-[240.95px] w-[363px]" data-name="Container">
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[456.948px] left-[443px] top-[48px] w-[363px]" data-name="Container">
      <Container22 />
      <Heading2 />
      <Paragraph2 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[552.948px] left-[4px] top-[134.67px] w-[854px]" data-name="Container">
      <Container21 />
      <Container27 />
    </div>
  );
}

function Button5() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#e0e8ea] opacity-50 w-[137.979px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap tracking-[-0.1504px]">← Précédent</p>
    </ButtonBackgroundImage>
  );
}

function Container29() {
  return (
    <div className="h-[41px] relative rounded-[10px] shrink-0 w-[63.948px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#f8b044] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[18px] not-italic text-[#f8b044] text-[14px] top-[10px] tracking-[-0.1504px] w-[28px]">1 / 4</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#f8b044] w-[119.01px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[-0.1504px]">Suivant →</p>
    </ButtonBackgroundImage>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#f5f8f8] content-stretch flex h-[91.667px] items-center justify-between left-[4px] pb-0 pt-[2.667px] px-[32px] top-[687.61px] w-[854px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f8b044] border-[2.667px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Button5 />
      <Container29 />
      <Button6 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[783.281px] relative rounded-[24px] shrink-0 w-[862px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container19 />
        <Container28 />
        <Container30 />
      </div>
      <div aria-hidden="true" className="absolute border-4 border-[#f8b044] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function InfographicScrollStoryRedesigned() {
  return (
    <div className="content-stretch flex h-[847.281px] items-center justify-center relative shrink-0 w-full" data-name="InfographicScrollStoryRedesigned" style={{ backgroundImage: "linear-gradient(137.542deg, rgb(255, 255, 255) 0%, rgb(245, 248, 248) 100%)" }}>
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[896.948px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container7 />
          <InfographicScrollStoryRedesigned />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1107.698px] items-start left-[423.33px] top-[56px] w-[930px]" data-name="Container">
      <Container6 />
      <Container32 />
    </div>
  );
}

function SandboxRessources() {
  return (
    <div className="absolute bg-white h-[1179.698px] left-0 top-0 w-[1458.667px]" data-name="SandboxRessources">
      <Container />
      <Container33 />
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

function Text6() {
  return (
    <div className="bg-[#e8f4f7] h-[26px] relative rounded-[2.23696e+07px] shrink-0 w-[29.865px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#55a1b4] text-[12px] text-nowrap top-[5px]">12</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[27px]">
      <Heading4 />
      <Text6 />
    </ContainerBackgroundImage>
  );
}

function Button7() {
  return (
    <BackgroundImage1 additionalClassNames="bg-[#55a1b4] h-[30px] w-[242px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[12px] text-nowrap text-white top-[7px]">📚 Toutes</p>
    </BackgroundImage1>
  );
}

function Button8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[242px]" data-name="Button">
      <BackgroundImageAndText text="📘 Guides" />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[138px] items-start relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <ButtonBackgroundImageAndText text="📊 Infographies" />
      <ButtonBackgroundImageAndText text="💡 Astuces" />
      <Button8 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[217.667px] items-start left-0 pb-[0.667px] pt-[24px] px-[24px] top-0 w-[290px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Canva Fullscreen" />
      <ParagraphBackgroundImageAndText2 text="Infographie" />
    </ContainerBackgroundImage3>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="🖼️" />
      <Container37 />
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Canva Card Preview" />
      <ParagraphBackgroundImageAndText2 text="Infographie" />
    </ContainerBackgroundImage3>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="🎴" />
      <Container39 />
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container40 />
    </div>
  );
}

function Text7() {
  return (
    <BackgroundImage2 additionalClassNames="h-[28px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.33px] tracking-[-0.4395px]">💡</p>
    </BackgroundImage2>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Astuces Scroll Story</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] text-nowrap top-px">Astuce</p>
    </div>
  );
}

function Container41() {
  return (
    <ContainerBackgroundImage3>
      <Paragraph3 />
      <Paragraph4 />
    </ContainerBackgroundImage3>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.pb43a980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <Text7 />
      <Container41 />
      <Icon3 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#f8b044] h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container42 />
    </div>
  );
}

function Container43() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Cards Flip Classic" />
      <ParagraphBackgroundImageAndText2 text="Astuce" />
    </ContainerBackgroundImage3>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="💡" />
      <Container43 />
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Cards Flip Glassmorphism" />
      <ParagraphBackgroundImageAndText2 text="Astuce" />
    </ContainerBackgroundImage3>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="✨" />
      <Container45 />
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Vertical Feed" />
      <ParagraphBackgroundImageAndText2 text="Guide Pratique" />
    </ContainerBackgroundImage3>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📘" />
      <Container47 />
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Digital Notebook" />
      <ParagraphBackgroundImageAndText2 text="Guide Pratique" />
    </ContainerBackgroundImage3>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📓" />
      <Container49 />
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Interactive Workbook" />
      <ParagraphBackgroundImageAndText2 text="Guide Pratique" />
    </ContainerBackgroundImage3>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="✍️" />
      <Container51 />
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container52 />
    </div>
  );
}

function Container53() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Article / Rapport Long" />
      <ParagraphBackgroundImageAndText2 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📄" />
      <Container53 />
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container54 />
    </div>
  );
}

function Container55() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Article avec Canva Doc" />
      <ParagraphBackgroundImageAndText2 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📋" />
      <Container55 />
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Rapport avec PDF Viewer" />
      <ParagraphBackgroundImageAndText2 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📊" />
      <Container57 />
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container58 />
    </div>
  );
}

function Container59() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText1 text="Article Magazine Style" />
      <ParagraphBackgroundImageAndText2 text="Article" />
    </ContainerBackgroundImage3>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📰" />
      <Container59 />
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container60 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[846px] items-start left-[16px] top-[233.67px] w-[258px]" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
    </div>
  );
}

function SandboxRessources1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] border-2 border-[rgba(255,255,255,0.3)] border-solid h-[841.333px] left-[105.33px] overflow-clip rounded-[24px] top-[64px] w-[294px]" data-name="SandboxRessources">
      <Container36 />
      <Container61 />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage additionalClassNames="absolute left-[12px] top-[8.5px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Button21() {
  return (
    <BackgroundImage1 additionalClassNames="bg-[#eef6f8] h-[33px] w-[97.323px]">
      <Icon4 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[61px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[6px] tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
    </BackgroundImage1>
  );
}

function Container62() {
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

function Text8() {
  return (
    <BackgroundImage2 additionalClassNames="h-[27px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[0.67px] tracking-[-0.4395px]">💡</p>
    </BackgroundImage2>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Astuces Scroll Story</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[27px] relative shrink-0 w-[162.917px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[33px] relative shrink-0 w-[577.302px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button21 />
        <Container62 />
        <Heading />
        <Container62 />
        <Container63 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <BackgroundImage1 additionalClassNames="bg-[#eef6f8] h-[30px] w-[386.448px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[#6b7280] text-[12px] top-[7px] w-[363px]">12 layouts • 2 infographies + 3 astuces + 3 guides + 4 articles</p>
    </BackgroundImage1>
  );
}

function Container65() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[33px]">
      <Container64 />
      <Text10 />
    </ContainerBackgroundImage>
  );
}

function SandboxRessources2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[49.667px] items-start left-0 pb-[0.667px] pt-[8px] px-[24px] top-0 w-[1458.667px]" data-name="SandboxRessources">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container65 />
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