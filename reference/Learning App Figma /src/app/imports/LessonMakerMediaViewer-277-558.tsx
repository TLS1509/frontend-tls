import svgPaths from "./svg-vng1tzfxdz";
import clsx from "clsx";
import imgImage from "figma:asset/3b8e25b9c2a3dbe633170841105f8b78b15dd2e0.png";
type Wrapper6Props = {
  additionalClassNames?: string;
};

function Wrapper6({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper6Props>) {
  return (
    <div className={clsx("bg-[#55a1b4] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type Text10Props = {
  text: string;
  additionalClassNames: any;
  additionalClassNames?: string;
};

function Text10({ text, additionalClassNames, additionalClassNames = "" }: Text10Props) {
  return (
    <div className={clsx("bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full", additionalClassNames)}>
      <Wrapper5 additionalClassNames={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{text}</p>
      </Wrapper5>
    </div>
  );
}

function Container6({ children, text, additionalClassNames = "" }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[2.23696e+07px] shrink-0 w-[48px]">
      <div aria-hidden="true" className="absolute border-[2.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text10 text={text} additionalClassNames={clsx("pl-[2.667px] pr-[2.677px] py-[2.667px]", additionalClassNames)} additionalClassNames={additionalClassNames} />
    </div>
  );
}
type Container4Props = {
  text: string;
  additionalClassNames?: string;
};

function Container4({ children, text, additionalClassNames = "" }: React.PropsWithChildren<Container4Props>) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[2.23696e+07px] shrink-0 w-[48px]">
      <div aria-hidden="true" className="absolute border-[2.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text10 text={text} additionalClassNames={clsx("p-[2.667px]", additionalClassNames)} additionalClassNames={additionalClassNames} />
    </div>
  );
}
type Wrapper5Props = {
  additionalClassNames?: string;
};

function Wrapper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper5Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return <Wrapper5 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper5>;
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return <Wrapper5 additionalClassNames={clsx("h-[37px] relative rounded-[10px] shrink-0", additionalClassNames)}>{children}</Wrapper5>;
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return <Wrapper5 additionalClassNames={clsx("h-[30px] relative rounded-[10px] shrink-0 w-[38px]", additionalClassNames)}>{children}</Wrapper5>;
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper5 additionalClassNames={clsx("h-[18px] relative shrink-0", additionalClassNames)}>{children}</Wrapper5>;
}

function Icon6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type ButtonText1Props = {
  text: string;
};

function ButtonText1({ text }: ButtonText1Props) {
  return (
    <Wrapper2>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[19px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-[7px] translate-x-[-50%]">{text}</p>
    </Wrapper2>
  );
}
type Icon4Props = {
  additionalClassNames?: string;
};

function Icon4({ additionalClassNames = "" }: Icon4Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Wrapper>
  );
}
type Text9Props = {
  text: string;
};

function Text9({ text }: Text9Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
};

function ButtonText({ text }: ButtonTextProps) {
  return (
    <div className="bg-[#e0e8ea] relative rounded-[2.23696e+07px] shrink-0 size-[32px]">
      <Text9 text={text} />
    </div>
  );
}
type TextText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText1({ text, additionalClassNames = "" }: TextText1Props) {
  return (
    <div className={clsx("absolute h-[21px] left-[48px] top-[16px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{text}</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_277_566)" id="Icon">
          <path d={svgPaths.p2061d800} id="Vector" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 3.33333H15" id="Vector_3" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2661f400} id="Vector_4" stroke="var(--stroke-0, #F8B044)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_277_566">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <Wrapper5 additionalClassNames={clsx("h-[18px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[28px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">{text}</p>
    </Wrapper5>
  );
}

function Container() {
  return <div className="absolute bg-[#e0e8ea] h-[4px] left-0 rounded-[2.23696e+07px] top-[24px] w-[1152px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[#55a1b4] h-[4px] left-0 rounded-[2.23696e+07px] top-[24px] w-[172.792px]" data-name="Container" />;
}

function Icon() {
  return (
    <Icon6>
      <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Icon6>
  );
}

function Container2() {
  return (
    <div className="basis-0 bg-[#55a1b4] grow min-h-px min-w-px relative rounded-[2.23696e+07px] shrink-0 w-[48px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#55a1b4] border-[2.667px] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px] shadow-[0px_4px_16px_0px_rgba(85,161,180,0.3)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2.667px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <Wrapper1 additionalClassNames="w-[74.625px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[37.5px] not-italic text-[#55a1b4] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">Introduction</p>
    </Wrapper1>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-0 top-0 w-[164.573px]" data-name="Container">
      <Container2 />
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <Wrapper1 additionalClassNames="w-[72.5px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[36.5px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">Engagement</p>
    </Wrapper1>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-[164.57px] top-0 w-[164.573px]" data-name="Container">
      <Container4 text="2" additionalClassNames="w-[8.854px]" />
      <Text1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-[329.15px] top-0 w-[164.573px]" data-name="Container">
      <Container6 text="3" additionalClassNames="w-[9.219px]" />
      <TextText text="Découvrir" additionalClassNames="w-[56.354px]" />
    </div>
  );
}

function Text2() {
  return (
    <Wrapper1 additionalClassNames="w-[26.198px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[13px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">Quiz</p>
    </Wrapper1>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-[493.72px] top-0 w-[164.573px]" data-name="Container">
      <Container6 text="4" additionalClassNames="w-[9.469px]" />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <Wrapper1 additionalClassNames="w-[51.479px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[26.5px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">Réfléchir</p>
    </Wrapper1>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-[658.29px] top-0 w-[164.573px]" data-name="Container">
      <Container4 text="5" additionalClassNames="w-[9.146px]" />
      <Text3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-[822.86px] top-0 w-[164.573px]" data-name="Container">
      <Container6 text="6" additionalClassNames="w-[9.427px]" />
      <TextText text="Appliquer" additionalClassNames="w-[56px]" />
    </div>
  );
}

function Text4() {
  return (
    <Wrapper1 additionalClassNames="w-[64.25px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[32px] not-italic text-[#6b7280] text-[12px] text-center text-nowrap top-px translate-x-[-50%]">Conclusion</p>
    </Wrapper1>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[78px] items-center left-[987.44px] top-0 w-[164.573px]" data-name="Container">
      <Container4 text="7" additionalClassNames="w-[8.313px]" />
      <Text4 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[78px] left-0 top-0 w-[1152px]" data-name="Container">
      <Container3 />
      <Container5 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container1 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[128px] items-start left-0 pb-[2px] pt-[24px] px-[73.333px] top-0 w-[1298.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container13 />
    </div>
  );
}

function Icon1() {
  return (
    <Icon6>
      <path d="M12 7V21" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p38e00000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </Icon6>
  );
}

function Container15() {
  return (
    <Wrapper6 additionalClassNames="rounded-[16.4px] size-[48px]">
      <Icon1 />
    </Wrapper6>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-[-0.67px] tracking-[0.0703px]">Bienvenue dans cette leçon</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Comprendre les bases du marketing en ligne</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[57px] relative shrink-0 w-[306.479px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[57px] items-center relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
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

function Paragraph1() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#252b37] text-[18px] top-[0.33px] tracking-[-0.4395px] w-[788px]">Dans cette introduction, nous allons découvrir ensemble les concepts fondamentaux du marketing digital. Vous allez apprendre comment les entreprises utilisent Internet pour atteindre leurs clients.</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[21px] left-[48px] top-[16px] w-[212.396px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{`Comprendre l'écosystème digital`}</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-[#f5f8f8] border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[55.333px] left-0 rounded-[16.4px] top-0 w-[408px]" data-name="Container">
      <Icon2 />
      <Text5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#f5f8f8] border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[55.333px] left-[424px] rounded-[16.4px] top-0 w-[408px]" data-name="Container">
      <Icon2 />
      <TextText1 text="Identifier les canaux clés" additionalClassNames="w-[159.354px]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#f5f8f8] border-[0.667px] border-[rgba(0,0,0,0.1)] border-solid h-[55.333px] left-0 rounded-[16.4px] top-[71.33px] w-[408px]" data-name="Container">
      <Icon2 />
      <TextText1 text="Maîtriser les métriques essentielles" additionalClassNames="w-[226.948px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[126.667px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[497.167px] items-start relative shrink-0 w-full" data-name="Container">
      <Image />
      <Paragraph1 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-[674.167px] items-start left-[201.33px] pb-0 pt-[32px] px-[32px] rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[176px] w-[896px]" data-name="Container">
      <Container17 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white h-[946.167px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container23 />
    </div>
  );
}

function Icon3() {
  return (
    <Wrapper additionalClassNames="absolute left-[16px] top-[10.5px]">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Wrapper>
  );
}

function Button() {
  return (
    <Wrapper3 additionalClassNames="bg-[#eef6f8] opacity-40 w-[125.531px]">
      <Icon3 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[75.5px] not-italic text-[#6b7280] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Précédent</p>
    </Wrapper3>
  );
}

function Button1() {
  return (
    <Wrapper6 additionalClassNames="rounded-[2.23696e+07px] size-[32px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white">1</p>
    </Wrapper6>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-[#e0e8ea] grow h-[32px] min-h-px min-w-px relative rounded-[2.23696e+07px] shrink-0" data-name="Button">
      <Text9 text="5" />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[32px] relative shrink-0 w-[192px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button1 />
        <ButtonText text="2" />
        <ButtonText text="3" />
        <ButtonText text="4" />
        <Button2 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <Wrapper3 additionalClassNames="bg-[#55a1b4] w-[106.563px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[41.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Suivant</p>
      <Icon4 additionalClassNames="absolute left-[74.56px] top-[10.5px]" />
    </Wrapper3>
  );
}

function PreviewNavigation() {
  return (
    <div className="bg-[#f5f8f8] h-[69.667px] relative shrink-0 w-full" data-name="PreviewNavigation">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pl-[24px] pr-[24.01px] pt-[0.667px] relative size-full">
          <Button />
          <Container25 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function RenderTimelineHorizontal() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1015.833px] items-start overflow-clip relative rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="RenderTimelineHorizontal">
      <Container24 />
      <PreviewNavigation />
    </div>
  );
}

function SandboxLessonViewers() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1119.833px] items-start left-0 pb-0 pt-[104px] px-[8px] top-0 w-[1314.667px]" data-name="SandboxLessonViewers">
      <RenderTimelineHorizontal />
    </div>
  );
}

function Icon5() {
  return (
    <Wrapper additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Wrapper>
  );
}

function Text6() {
  return (
    <Wrapper4 additionalClassNames="h-[21px] w-[49.323px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[25px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
    </Wrapper4>
  );
}

function Button4() {
  return (
    <div className="bg-[#eef6f8] h-[33px] relative rounded-[10px] shrink-0 w-[97.323px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-0 relative size-full">
        <Icon5 />
        <Text6 />
      </div>
    </div>
  );
}

function Container26() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-[32px] shrink-0 w-px" data-name="Container" />;
}

function Button5() {
  return (
    <Wrapper2 additionalClassNames="bg-[#55a1b4]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[19px] not-italic text-[12px] text-center text-nowrap text-white top-[7px] translate-x-[-50%]">🎨</p>
    </Wrapper2>
  );
}

function Container27() {
  return (
    <div className="h-[30px] relative shrink-0 w-[176px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button5 />
        <ButtonText1 text="📚" />
        <ButtonText1 text="🔀" />
        <ButtonText1 text="✨" />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <Wrapper4 additionalClassNames="h-[27px] w-[18px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[9px] not-italic text-[18px] text-center text-nowrap text-white top-[0.67px] tracking-[-0.4395px] translate-x-[-50%]">⏱️</p>
    </Wrapper4>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Timeline Horizontal</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#55a1b4] h-[39px] relative rounded-[10px] shrink-0 w-[220px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
        <Text7 />
        <Text8 />
        <Icon4 additionalClassNames="relative shrink-0" />
      </div>
    </div>
  );
}

function Button7() {
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
      <Button4 />
      <Container26 />
      <Container27 />
      <Container26 />
      <Button6 />
      <Container26 />
      <Button7 />
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