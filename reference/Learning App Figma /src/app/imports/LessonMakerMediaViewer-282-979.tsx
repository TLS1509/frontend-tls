import svgPaths from "./svg-dnvwyzlxlz";
import clsx from "clsx";

function Container47({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[41px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">{children}</div>
    </div>
  );
}
type Container46Props = {
  additionalClassNames?: string;
};

function Container46({ children, additionalClassNames = "" }: React.PropsWithChildren<Container46Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">{children}</div>
    </div>
  );
}
type Wrapper7Props = {
  additionalClassNames?: string;
};

function Wrapper7({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper7Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper6Props = {
  additionalClassNames?: string;
};

function Wrapper6({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper6Props>) {
  return <Wrapper7 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper7>;
}
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return <Wrapper7 additionalClassNames={clsx("h-[26px] relative rounded-[2.23696e+07px] shrink-0", additionalClassNames)}>{children}</Wrapper7>;
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return <Wrapper7 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</Wrapper7>;
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return <Wrapper7 additionalClassNames={clsx("relative shrink-0 w-[18px]", additionalClassNames)}>{children}</Wrapper7>;
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return <Wrapper7 additionalClassNames={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>{children}</Wrapper7>;
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}
type Container42Props = {
  additionalClassNames?: string;
};

function Container42({ children, additionalClassNames = "" }: React.PropsWithChildren<Container42Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">{children}</div>
      </div>
    </div>
  );
}
type Icon3VectorProps = {
  additionalClassNames?: string;
};

function Icon3Vector({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon3VectorProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-14.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 7.5">
          {children}
        </svg>
      </div>
    </div>
  );
}
type Icon10Props = {
  additionalClassNames?: string;
};

function Icon10({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon10Props>) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </Wrapper1>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
          {children}
        </svg>
      </div>
    </div>
  );
}
type ParagraphText1Props = {
  text: string;
};

function ParagraphText1({ text }: ParagraphText1Props) {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] text-nowrap top-px">{text}</p>
    </div>
  );
}
type ParagraphTextProps = {
  text: string;
};

function ParagraphText({ text }: ParagraphTextProps) {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[#252b37] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{text}</p>
    </div>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <Wrapper3 additionalClassNames="h-[28px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#252b37] text-[18px] text-nowrap top-[0.33px] tracking-[-0.4395px]">{text}</p>
    </Wrapper3>
  );
}
type Text10Props = {
  text: string;
};

function Text10({ text }: Text10Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[12px] not-italic text-[#252b37] text-[12px] text-nowrap top-[7px]">{text}</p>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
};

function ButtonText({ text }: ButtonTextProps) {
  return (
    <div className="h-[30px] relative rounded-[10px] shrink-0 w-[242px]">
      <Text10 text={text} />
    </div>
  );
}
type Icon6VectorProps = {
  additionalClassNames?: string;
};

function Icon6Vector({ additionalClassNames = "" }: Icon6VectorProps) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}

function Vector() {
  return (
    <Wrapper additionalClassNames="inset-[12.5%_12.5%_62.5%_62.5%]">
      <path d={svgPaths.p26fac1f0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Wrapper>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <div className={clsx("absolute h-[26px] rounded-[4px] top-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[8px] not-italic text-[#55a1b4] text-[12px] text-nowrap top-[5px]">{text}</p>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[860.417px] left-[33.33px] top-[56px] w-[294px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[36px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#0a0a0a] text-[30px] text-nowrap tracking-[0.3955px]">🖼️</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[178.76px]" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a0a0a] text-[24px] text-nowrap top-[-0.33px]">Canva Fullscreen</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[40px] w-[85.406px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#55a1b4] text-[12px] text-nowrap top-[3px]">Infographie</p>
    </div>
  );
}

function Container1() {
  return (
    <Wrapper6 additionalClassNames="h-[62px] w-[178.76px]">
      <Heading1 />
      <Text1 />
    </Wrapper6>
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
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-[1.33px] tracking-[-0.1504px]">Infographie Canva embed fullscreen avec contrôles hover</p>
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
    <Wrapper1 additionalClassNames="absolute left-[16px] top-[10.5px]">
      <g clipPath="url(#clip0_264_629)" id="Icon">
        <path d={svgPaths.p2dd43d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_264_629">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Button() {
  return (
    <Wrapper2 additionalClassNames="bg-[#55a1b4] h-[37px] w-[92.479px]">
      <Icon />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[58.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Voter</p>
    </Wrapper2>
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
    <Wrapper1 additionalClassNames="absolute left-0 top-[5px]">
      <g clipPath="url(#clip0_264_642)" id="Icon">
        <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d={svgPaths.p8247300} fill="var(--fill-0, #6B7280)" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_264_642">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </Wrapper1>
  );
}

function Container5() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <TextText text="Canva embed" additionalClassNames="left-[24px] w-[94.594px]" />
      <TextText text="Fullscreen toggle" additionalClassNames="left-[126.59px] w-[115.646px]" />
      <TextText text="Hover controls" additionalClassNames="left-[250.24px] w-[100.76px]" />
      <TextText text="External link" additionalClassNames="left-[359px] w-[86.813px]" />
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
    <Wrapper6 additionalClassNames="h-[21px] w-[118.26px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Aperçu du design</p>
    </Wrapper6>
  );
}

function Icon2() {
  return (
    <Icon10 additionalClassNames="relative shrink-0">
      <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 2L9.33333 6.66667" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 14L6.66667 9.33333" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6 14H2V10" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Icon10>
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

function Iframe() {
  return <div className="h-[520px] shrink-0 w-full" data-name="Iframe" />;
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[520px] items-start left-0 overflow-clip top-[80px] w-[926px]" data-name="Container">
      <Iframe />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[30px] left-0 text-[#0a0a0a] text-[20px] text-nowrap top-[-0.67px]">Design System - The Learning App</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Infographie interactive • Design by Chloé Mimault-Talagrand</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[51px] relative shrink-0 w-[387.771px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector />
      <Icon3Vector additionalClassNames="inset-[12.5%_12.5%_58.33%_58.33%]">
        <path d={svgPaths.p28e68380} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon3Vector>
      <Icon3Vector additionalClassNames="inset-[58.33%_58.33%_12.5%_12.5%]">
        <path d={svgPaths.p306b8b00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon3Vector>
      <Wrapper additionalClassNames="inset-[62.5%_62.5%_12.5%_12.5%]">
        <path d={svgPaths.p1fe8aa80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Wrapper>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#eef6f8] content-stretch flex flex-col items-start left-0 pb-0 pt-[8px] px-[8px] rounded-[10px] size-[36px] top-0" data-name="Button">
      <Icon3 />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[rgba(0,0,0,0.1)] h-[24px] left-[52px] top-[6px] w-px" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector />
      <div className="absolute inset-[12.5%_12.5%_41.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8333 10.8333">
            <path d="M0.833333 10L10 0.833333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-[12.5%] right-1/4 top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 14.1667">
            <path d={svgPaths.p3f573d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-[#eef6f8] content-stretch flex flex-col items-start left-[69px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[36px] top-0" data-name="Link">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 11.6667">
            <path d="M0.833333 10.8333V0.833333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 6.66667">
            <path d={svgPaths.p3e05ba00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_29.17%_37.5%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5.83333">
            <path d={svgPaths.p2dc3c480} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#eef6f8] content-stretch flex flex-col items-start left-[113px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[36px] top-0" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon6Vector additionalClassNames="inset-[8.33%_12.5%_66.67%_62.5%]" />
      <Icon6Vector additionalClassNames="inset-[37.5%_62.5%_37.5%_12.5%]" />
      <Icon6Vector additionalClassNames="inset-[66.67%_12.5%_8.33%_62.5%]" />
      <div className="absolute inset-[56.29%_35.75%_27.12%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.35861 4.98361">
            <path d={svgPaths.p159ed400} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.35027 4.9836">
            <path d={svgPaths.p93d600} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#eef6f8] content-stretch flex flex-col items-start left-[157px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[36px] top-0" data-name="Button">
      <Icon6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 16.6667">
            <path d={svgPaths.p1bbbe000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#55a1b4] content-stretch flex flex-col items-start left-[201px] pb-0 pt-[8px] px-[8px] rounded-[10px] size-[36px] top-0" data-name="Button">
      <Icon7 />
    </div>
  );
}

function Container11() {
  return (
    <Wrapper6 additionalClassNames="h-[36px] w-[237px]">
      <Button1 />
      <Container10 />
      <Link />
      <Button2 />
      <Button3 />
      <Button4 />
    </Wrapper6>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[51px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[85px] items-start left-0 pb-[2px] pt-[16px] px-[24px] top-0 w-[926px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none" />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <Wrapper5 additionalClassNames="bg-[#55a1b4] w-[110.5px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[12px] not-italic text-[12px] text-nowrap text-white top-[5px]">📌 Infographie</p>
    </Wrapper5>
  );
}

function Text3() {
  return (
    <Wrapper4 additionalClassNames="h-[21px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Scrollez dans le viewer pour explorer le design</p>
    </Wrapper4>
  );
}

function Container15() {
  return (
    <Container46 additionalClassNames="h-[26px] w-[425.906px]">
      <Container14 />
      <Text3 />
    </Container46>
  );
}

function Text4() {
  return (
    <Wrapper6 additionalClassNames="h-[18px] w-[343.854px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.7)] text-nowrap top-px">💡 Tip: Utilisez le scroll ou les contrôles Canva pour naviguer</p>
    </Wrapper6>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.8)] content-stretch flex h-[26px] items-center justify-between left-[24px] top-[562px] w-[878px]" data-name="Container">
      <Container15 />
      <Text4 />
    </div>
  );
}

function InfographicCanvaEmbed() {
  return (
    <div className="bg-white h-[600px] overflow-clip relative shrink-0 w-full" data-name="InfographicCanvaEmbed">
      <Container8 />
      <Container13 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[649.667px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[2px] relative size-full">
          <Container7 />
          <InfographicCanvaEmbed />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[860.417px] items-start left-[351.33px] top-[56px] w-[930px]" data-name="Container">
      <Container6 />
      <Container17 />
    </div>
  );
}

function SandboxRessources() {
  return (
    <div className="absolute bg-white h-[932.417px] left-0 top-0 w-[1314.667px]" data-name="SandboxRessources">
      <Container />
      <Container18 />
    </div>
  );
}

function Heading3() {
  return (
    <Wrapper6 additionalClassNames="h-[27px] w-[95.938px]">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#0a0a0a] text-[18px] text-nowrap top-[-0.33px]">Propositions</p>
    </Wrapper6>
  );
}

function Text5() {
  return (
    <Wrapper5 additionalClassNames="bg-[#e8f4f7] w-[24.208px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#55a1b4] text-[12px] text-nowrap top-[5px]">9</p>
    </Wrapper5>
  );
}

function Container19() {
  return (
    <Container42 additionalClassNames="h-[27px]">
      <Heading3 />
      <Text5 />
    </Container42>
  );
}

function Button5() {
  return (
    <Wrapper2 additionalClassNames="bg-[#55a1b4] h-[30px] w-[242px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[12px] text-nowrap text-white top-[7px]">📚 Toutes</p>
    </Wrapper2>
  );
}

function Button6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[242px]" data-name="Button">
      <Text10 text="📘 Guides" />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[138px] items-start relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <ButtonText text="📊 Infographies" />
      <ButtonText text="💡 Astuces" />
      <Button6 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[217.667px] items-start left-0 pb-[0.667px] pt-[24px] px-[24px] top-0 w-[290px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Text6() {
  return (
    <Wrapper3 additionalClassNames="h-[28px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.33px] tracking-[-0.4395px]">🖼️</p>
    </Wrapper3>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Canva Fullscreen</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] text-nowrap top-px">Infographie</p>
    </div>
  );
}

function Container22() {
  return (
    <Container47>
      <Paragraph2 />
      <Paragraph3 />
    </Container47>
  );
}

function Icon8() {
  return (
    <Icon10 additionalClassNames="relative shrink-0">
      <path d={svgPaths.pb43a980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Icon10>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <Text6 />
      <Container22 />
      <Icon8 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#55a1b4] h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <Container47>
      <ParagraphText text="Canva Card Preview" />
      <ParagraphText1 text="Infographie" />
    </Container47>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="🎴" />
      <Container24 />
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <Container47>
      <ParagraphText text="Astuces Scroll Story" />
      <ParagraphText1 text="Astuce" />
    </Container47>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="💡" />
      <Container26 />
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <Container47>
      <ParagraphText text="Cards Flip Classic" />
      <ParagraphText1 text="Astuce" />
    </Container47>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="💡" />
      <Container28 />
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <Container47>
      <ParagraphText text="Cards Flip Glassmorphism" />
      <ParagraphText1 text="Astuce" />
    </Container47>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="✨" />
      <Container30 />
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <Container47>
      <ParagraphText text="Vertical Feed" />
      <ParagraphText1 text="Guide Pratique" />
    </Container47>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="📘" />
      <Container32 />
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container33 />
    </div>
  );
}

function Container34() {
  return (
    <Container47>
      <ParagraphText text="Digital Notebook" />
      <ParagraphText1 text="Guide Pratique" />
    </Container47>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="📓" />
      <Container34 />
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <Container47>
      <ParagraphText text="Interactive Workbook" />
      <ParagraphText1 text="Guide Pratique" />
    </Container47>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="✍️" />
      <Container36 />
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container37 />
    </div>
  );
}

function Container38() {
  return (
    <Container47>
      <ParagraphText text="Article / Rapport Long" />
      <ParagraphText1 text="Article" />
    </Container47>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextText1 text="📄" />
      <Container38 />
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container39 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[633px] items-start left-[16px] top-[233.67px] w-[258px]" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function SandboxRessources1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] border-2 border-[rgba(255,255,255,0.3)] border-solid h-[841.333px] left-[33.33px] overflow-clip rounded-[24px] top-[64px] w-[294px]" data-name="SandboxRessources">
      <Container21 />
      <Container40 />
    </div>
  );
}

function Icon9() {
  return (
    <Icon10 additionalClassNames="absolute left-[12px] top-[8.5px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Icon10>
  );
}

function Button16() {
  return (
    <Wrapper2 additionalClassNames="bg-[#eef6f8] h-[33px] w-[97.323px]">
      <Icon9 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[61px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[6px] tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
    </Wrapper2>
  );
}

function Container41() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Heading() {
  return (
    <Wrapper4 additionalClassNames="h-[24px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] text-nowrap top-[-0.33px] tracking-[-0.3125px]">🎨 Ressources Complémentaires</p>
    </Wrapper4>
  );
}

function Text7() {
  return (
    <Wrapper3 additionalClassNames="h-[27px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[0.67px] tracking-[-0.4395px]">🖼️</p>
    </Wrapper3>
  );
}

function Text8() {
  return (
    <Wrapper4 additionalClassNames="h-[21px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Canva Fullscreen</p>
    </Wrapper4>
  );
}

function Container43() {
  return (
    <div className="h-[27px] relative shrink-0 w-[141.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text7 />
        <Text8 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <Container46 additionalClassNames="h-[33px] w-[555.479px]">
      <Button16 />
      <Container41 />
      <Heading />
      <Container41 />
      <Container43 />
    </Container46>
  );
}

function Text9() {
  return (
    <Wrapper2 additionalClassNames="bg-[#eef6f8] h-[30px] w-[311.302px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[#6b7280] text-[12px] top-[7px] w-[288px]">9 layouts • 2 infographies + 3 astuces + 3 guides</p>
    </Wrapper2>
  );
}

function Container45() {
  return (
    <Container42 additionalClassNames="h-[33px]">
      <Container44 />
      <Text9 />
    </Container42>
  );
}

function SandboxRessources2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[49.667px] items-start left-0 pb-[0.667px] pt-[8px] px-[24px] top-0 w-[1314.667px]" data-name="SandboxRessources">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container45 />
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