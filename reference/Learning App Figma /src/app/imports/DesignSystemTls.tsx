import svgPaths from "./svg-mzhor7xs44";
import clsx from "clsx";
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("h-[23.994px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[15.996px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("h-[47.979px] relative rounded-[10px] shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.992px] items-center pl-[15.996px] pr-0 py-0 relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage>
      <g id="Icon">{children}</g>
    </BackgroundImage>
  );
}

function IconBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
  );
}

function ColorsPageBackgroundImage2() {
  return (
    <div style={{ backgroundImage: "linear-gradient(156.232deg, rgb(74, 143, 161) 0%, rgb(192, 105, 32) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }} className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]">
      <IconBackgroundImage1 />
    </div>
  );
}

function ColorsPageBackgroundImage1() {
  return (
    <div style={{ backgroundImage: "linear-gradient(156.232deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }} className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]">
      <IconBackgroundImage1 />
    </div>
  );
}

function ColorsPageBackgroundImage() {
  return (
    <div style={{ backgroundImage: "linear-gradient(156.232deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }} className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]">
      <IconBackgroundImage1 />
    </div>
  );
}

function IconBackgroundImage1() {
  return (
    <div className="relative shrink-0 size-[23.994px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          <path d={svgPaths.p3a227e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99951" />
          <path d={svgPaths.p7b33600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99951" />
        </g>
      </svg>
    </div>
  );
}
type ColorsPageBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ColorsPageBackgroundImageAndText({ text, additionalClassNames = "" }: ColorsPageBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[14.375px] items-start left-[16px] top-[49.62px]", additionalClassNames)}>
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#6b7280] text-[12px]">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText1({ text, additionalClassNames = "" }: BadgeBackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[15.996px] relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.625px] py-[2.625px] relative rounded-[inherit] size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1a1a1a] text-[12px] text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.625px] py-[2.625px] relative rounded-[inherit] size-full">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#252b37] text-[16px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText({ text, additionalClassNames = "" }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[15.996px] relative rounded-[8px] shrink-0", additionalClassNames)}>
      <BackgroundImageAndText text={text} />
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <div className="absolute inset-[-100%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.99902 3.99902">
        <path d={svgPaths.p3156da00} fill="var(--fill-0, #55A1B4)" id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66602" />
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[31.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.3262 29.3262">
            <path d={svgPaths.pa605100} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66602" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[70.83%] left-[54.17%] right-[41.67%] top-1/4" data-name="Vector">
        <IconBackgroundImage />
      </div>
      <div className="absolute bottom-[54.17%] left-[70.83%] right-1/4 top-[41.67%]" data-name="Vector">
        <IconBackgroundImage />
      </div>
      <div className="absolute bottom-[45.83%] left-1/4 right-[70.83%] top-1/2" data-name="Vector">
        <IconBackgroundImage />
      </div>
      <div className="absolute inset-[29.17%_62.5%_66.67%_33.33%]" data-name="Vector">
        <IconBackgroundImage />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(85,161,180,0.1)] relative rounded-[16px] shrink-0 size-[55.977px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[11.992px] px-[11.992px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#ed843a] h-[23.994px] relative rounded-[8px] shrink-0 w-[199.648px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[12.625px] py-[2.625px] relative rounded-[inherit] size-full">
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#252b37] text-[16px] text-nowrap">81 Couleurs + Gradients</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[11.992px] h-[55.977px] items-center left-0 top-0 w-[1535.996px]" data-name="Container">
      <Container />
      <Badge />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[23.994px] left-0 top-[71.97px] w-[1535.996px]" data-name="Heading 1">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#252b37] text-[16px] text-nowrap top-[-0.38px]">Couleurs</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[58.477px] left-0 top-[111.96px] w-[767.998px]" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[29.25px] left-0 text-[#6b7280] text-[18px] top-[-1.13px] w-[741px]">Système de couleurs complet TLS : 3 couleurs de marque, 36 nuances (échelles 50-900), 42 gradients (14 classiques + 28 TLS v5.2) et 4 couleurs sémantiques.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[170.439px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon1() {
  return (
    <BackgroundImage1>
      <g clipPath="url(#clip0_419_858)" id="Icon">
        <path d={svgPaths.p3f259200} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p1881c180} fill="var(--fill-0, #252B37)" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p20aed900} fill="var(--fill-0, #252B37)" id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p20a59b00} fill="var(--fill-0, #252B37)" id="Vector_4" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p3a6ce700} fill="var(--fill-0, #252B37)" id="Vector_5" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
      </g>
      <defs>
        <clipPath id="clip0_419_858">
          <rect fill="white" height="15.9961" width="15.9961" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function ColorsPage() {
  return (
    <BackgroundImage2 additionalClassNames="w-[54.59px]">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-[27.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Marque</p>
    </BackgroundImage2>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute content-stretch flex gap-[7.998px] h-[49.229px] items-center justify-center left-[3.99px] p-[0.625px] rounded-[8px] top-[3.99px] w-[165.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon1 />
      <ColorsPage />
      <BadgeBackgroundImageAndText text="3" additionalClassNames="w-[26.855px]" />
    </div>
  );
}

function Icon2() {
  return (
    <BackgroundImage1>
      <g clipPath="url(#clip0_419_802)" id="Icon">
        <path d={svgPaths.p3fef580} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p19b28e80} id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p3d2f2a80} id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
      </g>
      <defs>
        <clipPath id="clip0_419_802">
          <rect fill="white" height="15.9961" width="15.9961" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function ColorsPage1() {
  return (
    <BackgroundImage2 additionalClassNames="w-[58.496px]">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-[29.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Palettes</p>
    </BackgroundImage2>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute content-stretch flex gap-[7.998px] h-[49.229px] items-center justify-center left-[169.99px] p-[0.625px] rounded-[8px] top-[3.99px] w-[166.006px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon2 />
      <ColorsPage1 />
      <BadgeBackgroundImageAndText text="36" additionalClassNames="w-[36.455px]" />
    </div>
  );
}

function Icon3() {
  return (
    <BackgroundImage1>
      <g clipPath="url(#clip0_419_811)" id="Icon">
        <path d={svgPaths.pd3b1480} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d="M13.3301 1.33301V3.99902" id="Vector_2" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d="M14.6631 2.66602H11.9971" id="Vector_3" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        <path d={svgPaths.p2a947d80} id="Vector_4" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
      </g>
      <defs>
        <clipPath id="clip0_419_811">
          <rect fill="white" height="15.9961" width="15.9961" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function ColorsPage2() {
  return (
    <BackgroundImage2 additionalClassNames="w-[69.688px]">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-[35px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Gradients</p>
    </BackgroundImage2>
  );
}

function Badge1() {
  return (
    <div className="bg-[#ed843a] h-[15.996px] relative rounded-[8px] shrink-0 w-[36.455px]" data-name="Badge">
      <BackgroundImageAndText text="42" />
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[7.998px] h-[49.229px] items-center justify-center left-[336px] pl-[0.625px] pr-[0.635px] py-[0.625px] rounded-[8px] top-[3.99px] w-[165.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon3 />
      <ColorsPage2 />
      <Badge1 />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage2>
      <path d={svgPaths.p25bd2a00} id="Vector" stroke="var(--stroke-0, #252B37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
    </IconBackgroundImage2>
  );
}

function ColorsPage3() {
  return (
    <BackgroundImage2 additionalClassNames="w-[93.535px]">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[24px] left-[47px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Sémantiques</p>
    </BackgroundImage2>
  );
}

function PrimitiveButton3() {
  return (
    <div className="absolute content-stretch flex gap-[7.998px] h-[49.229px] items-center justify-center left-[501.99px] pl-[0.635px] pr-[0.625px] py-[0.625px] rounded-[8px] top-[3.99px] w-[166.006px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon4 />
      <ColorsPage3 />
      <BadgeBackgroundImageAndText text="4" additionalClassNames="w-[26.855px]" />
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#f5f5f5] h-[57.217px] relative rounded-[10px] shrink-0 w-[671.992px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
        <PrimitiveButton3 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:SemiBold',sans-serif] font-semibold leading-[37.5px] left-0 text-[#252b37] text-[30px] text-nowrap top-[-0.63px] tracking-[-0.75px]">Gradients</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[25.986px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#6b7280] text-[16px] text-nowrap top-[-0.13px]">42 gradients (14 classiques + 28 TLS v5.2) pour vos interfaces</p>
    </div>
  );
}

function ColorsPage4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.998px] h-[71.484px] items-start relative shrink-0 w-full" data-name="ColorsPage">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function ColorsPage5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Primary" additionalClassNames="w-[49.521px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage5 />
      <ColorsPageBackgroundImageAndText text="--gradient-primary" additionalClassNames="w-[130.049px]" />
    </div>
  );
}

function ColorsPage6() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(85, 161, 180) 0%, rgb(61, 119, 134) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[294.395px]" data-name="Card">
      <CardContent />
      <ColorsPage6 />
    </div>
  );
}

function ColorsPage7() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Primary Radial" additionalClassNames="w-[93.252px]" />
      <BadgeBackgroundImageAndText1 text="Radial" additionalClassNames="w-[51.299px]" />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage7 />
      <ColorsPageBackgroundImageAndText text="--gradient-primary-radial" additionalClassNames="w-[180.615px]" />
    </div>
  );
}

function ColorsPage8() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -15.88 -15.88 0 145.33 63.999)\\\'><stop stop-color=\\\'rgba(85,161,180,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(58,112,125,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(45,87,97,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(31,62,69,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[294.404px]" data-name="Card">
      <CardContent1 />
      <ColorsPage8 />
    </div>
  );
}

function ColorsPage9() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Secondary" additionalClassNames="w-[66.826px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage9 />
      <ColorsPageBackgroundImageAndText text="--gradient-secondary" additionalClassNames="w-[144.492px]" />
    </div>
  );
}

function ColorsPage10() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(241, 138, 76) 0%, rgb(192, 105, 32) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[294.404px]" data-name="Card">
      <CardContent2 />
      <ColorsPage10 />
    </div>
  );
}

function ColorsPage11() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Secondary Radial" additionalClassNames="w-[110.547px]" />
      <BadgeBackgroundImageAndText1 text="Radial" additionalClassNames="w-[51.299px]" />
    </div>
  );
}

function CardContent3() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage11 />
      <ColorsPageBackgroundImageAndText text="--gradient-secondary-radial" additionalClassNames="w-[195.068px]" />
    </div>
  );
}

function ColorsPage12() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -15.88 -15.88 0 145.33 63.999)\\\'><stop stop-color=\\\'rgba(241,138,76,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(204,117,61,1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(168,97,46,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(131,76,31,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(94,55,16,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[294.404px]" data-name="Card">
      <CardContent3 />
      <ColorsPage12 />
    </div>
  );
}

function ColorsPage13() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Accent" additionalClassNames="w-[43.428px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent4() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage13 />
      <ColorsPageBackgroundImageAndText text="--gradient-accent" additionalClassNames="w-[122.822px]" />
    </div>
  );
}

function ColorsPage14() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(248, 176, 68) 0%, rgb(214, 144, 32) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card4() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[294.404px]" data-name="Card">
      <CardContent4 />
      <ColorsPage14 />
    </div>
  );
}

function ColorsPage15() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Accent Radial" additionalClassNames="w-[87.148px]" />
      <BadgeBackgroundImageAndText1 text="Radial" additionalClassNames="w-[51.299px]" />
    </div>
  );
}

function CardContent5() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage15 />
      <ColorsPageBackgroundImageAndText text="--gradient-accent-radial" additionalClassNames="w-[173.398px]" />
    </div>
  );
}

function ColorsPage16() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.64 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -15.879 -15.879 0 145.32 63.999)\\\'><stop stop-color=\\\'rgba(248,176,68,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(212,149,55,1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(175,122,42,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(139,95,29,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(102,68,16,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card5() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.72px] w-[294.395px]" data-name="Card">
      <CardContent5 />
      <ColorsPage16 />
    </div>
  );
}

function ColorsPage17() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Warm" additionalClassNames="w-[39.287px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent6() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage17 />
      <ColorsPageBackgroundImageAndText text="--gradient-warm" additionalClassNames="w-[108.369px]" />
    </div>
  );
}

function ColorsPage18() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(241, 138, 76) 0%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.72px] w-[294.404px]" data-name="Card">
      <CardContent6 />
      <ColorsPage18 />
    </div>
  );
}

function ColorsPage19() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Cool" additionalClassNames="w-[28.867px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent7() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage19 />
      <ColorsPageBackgroundImageAndText text="--gradient-cool" additionalClassNames="w-[108.369px]" />
    </div>
  );
}

function ColorsPage20() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(115, 175, 191) 0%, rgb(61, 119, 134) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card7() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.72px] w-[294.404px]" data-name="Card">
      <CardContent7 />
      <ColorsPage20 />
    </div>
  );
}

function ColorsPage21() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Sunset" additionalClassNames="w-[43.809px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent8() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage21 />
      <ColorsPageBackgroundImageAndText text="--gradient-sunset" additionalClassNames="w-[122.822px]" />
    </div>
  );
}

function ColorsPage22() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(237, 132, 58) 0%, rgb(255, 193, 90) 50%, rgb(245, 154, 95) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card8() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.72px] w-[294.404px]" data-name="Card">
      <CardContent8 />
      <ColorsPage22 />
    </div>
  );
}

function ColorsPage23() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Ocean" additionalClassNames="w-[40.127px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent9() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage23 />
      <ColorsPageBackgroundImageAndText text="--gradient-ocean" additionalClassNames="w-[115.596px]" />
    </div>
  );
}

function ColorsPage24() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(85, 161, 180) 0%, rgb(150, 195, 207) 50%, rgb(255, 215, 145) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.72px] w-[294.404px]" data-name="Card">
      <CardContent9 />
      <ColorsPage24 />
    </div>
  );
}

function ColorsPage25() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Fire" additionalClassNames="w-[23.877px]" />
      <BadgeBackgroundImageAndText1 text="Linear" additionalClassNames="w-[50.4px]" />
    </div>
  );
}

function CardContent10() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage25 />
      <ColorsPageBackgroundImageAndText text="--gradient-fire" additionalClassNames="w-[108.369px]" />
    </div>
  );
}

function ColorsPage26() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(248, 167, 51) 0%, rgb(192, 105, 32) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[527.44px] w-[294.395px]" data-name="Card">
      <CardContent10 />
      <ColorsPage26 />
    </div>
  );
}

function ColorsPage27() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Brand" additionalClassNames="w-[38.252px]" />
      <BadgeBackgroundImageAndText1 text="Mixed" additionalClassNames="w-[49.844px]" />
    </div>
  );
}

function CardContent11() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage27 />
      <ColorsPageBackgroundImageAndText text="--gradient-brand" additionalClassNames="w-[115.596px]" />
    </div>
  );
}

function Card11() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[527.44px] w-[294.404px]" data-name="Card">
      <CardContent11 />
      <ColorsPageBackgroundImage />
    </div>
  );
}

function ColorsPage28() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Hero TLS" additionalClassNames="w-[59.277px]" />
      <BadgeBackgroundImageAndText1 text="Hero" additionalClassNames="w-[43.652px]" />
    </div>
  );
}

function CardContent12() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage28 />
      <ColorsPageBackgroundImageAndText text="--gradient-hero" additionalClassNames="w-[108.369px]" />
    </div>
  );
}

function ColorsPage29() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(90deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 167, 51) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card12() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[527.44px] w-[294.404px]" data-name="Card">
      <CardContent12 />
      <ColorsPage29 />
    </div>
  );
}

function ColorsPage30() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="Circular TLS" additionalClassNames="w-[77.246px]" />
      <BadgeBackgroundImageAndText1 text="Radial" additionalClassNames="w-[51.299px]" />
    </div>
  );
}

function CardContent13() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage30 />
      <ColorsPageBackgroundImageAndText text="--gradient-circular-tls" additionalClassNames="w-[166.172px]" />
    </div>
  );
}

function ColorsPage31() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -31.759 -31.759 0 0 0)\\\'><stop stop-color=\\\'rgba(85,161,180,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(58,112,125,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(45,87,97,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(31,62,69,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card13() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[527.44px] w-[294.404px]" data-name="Card">
      <CardContent13 />
      <ColorsPage31 />
    </div>
  );
}

function Badge2() {
  return (
    <div className="h-[15.996px] relative rounded-[8px] shrink-0 w-[134.297px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.625px] py-[2.625px] relative rounded-[inherit] size-full">
        <p className="font-['Nunito:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1a1a1a] text-[12px] text-nowrap">Primary → Secondary</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.625px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ColorsPage32() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS" additionalClassNames="w-[24.58px]" />
      <Badge2 />
    </div>
  );
}

function CardContent14() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage32 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls" additionalClassNames="w-[101.152px]" />
    </div>
  );
}

function Card14() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[527.44px] w-[294.404px]" data-name="Card">
      <CardContent14 />
      <ColorsPageBackgroundImage1 />
    </div>
  );
}

function ColorsPage33() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Hover" additionalClassNames="w-[66.396px]" />
      <BadgeBackgroundImageAndText1 text="Hover state" additionalClassNames="w-[79.619px]" />
    </div>
  );
}

function CardContent15() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage33 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-hover" additionalClassNames="w-[144.492px]" />
    </div>
  );
}

function Card15() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[791.16px] w-[294.395px]" data-name="Card">
      <CardContent15 />
      <ColorsPageBackgroundImage2 />
    </div>
  );
}

function ColorsPage34() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Full" additionalClassNames="w-[52.129px]" />
      <BadgeBackgroundImageAndText1 text="3 couleurs" additionalClassNames="w-[72.988px]" />
    </div>
  );
}

function CardContent16() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage34 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-full" additionalClassNames="w-[137.275px]" />
    </div>
  );
}

function Card16() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[791.16px] w-[294.404px]" data-name="Card">
      <CardContent16 />
      <ColorsPageBackgroundImage />
    </div>
  );
}

function ColorsPage35() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Full Reverse" additionalClassNames="w-[106.309px]" />
      <BadgeBackgroundImageAndText1 text="3 couleurs inversé" additionalClassNames="w-[114.482px]" />
    </div>
  );
}

function CardContent17() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage35 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-full-reverse" additionalClassNames="w-[195.068px]" />
    </div>
  );
}

function ColorsPage36() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(248, 176, 68) 0%, rgb(237, 132, 58) 50%, rgb(85, 161, 180) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card17() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[791.16px] w-[294.404px]" data-name="Card">
      <CardContent17 />
      <ColorsPage36 />
    </div>
  );
}

function ColorsPage37() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Horizontal" additionalClassNames="w-[94.141px]" />
      <BadgeBackgroundImageAndText1 text="90deg" additionalClassNames="w-[52.061px]" />
    </div>
  );
}

function CardContent18() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage37 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-horizontal" additionalClassNames="w-[180.615px]" />
    </div>
  );
}

function ColorsPage38() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(90deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card18() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[791.16px] w-[294.404px]" data-name="Card">
      <CardContent18 />
      <ColorsPage38 />
    </div>
  );
}

function ColorsPage39() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Horizontal Reverse" additionalClassNames="w-[148.32px]" />
      <BadgeBackgroundImageAndText1 text="90deg inversé" additionalClassNames="w-[93.555px]" />
    </div>
  );
}

function CardContent19() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage39 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-horizontal-reverse" additionalClassNames="w-[238.418px]" />
    </div>
  );
}

function ColorsPage40() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 176, 68) 0%, rgb(237, 132, 58) 50%, rgb(85, 161, 180) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card19() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[791.16px] w-[294.404px]" data-name="Card">
      <CardContent19 />
      <ColorsPage40 />
    </div>
  );
}

function ColorsPage41() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Vertical" additionalClassNames="w-[76.66px]" />
      <BadgeBackgroundImageAndText1 text="180deg" additionalClassNames="w-[59.258px]" />
    </div>
  );
}

function CardContent20() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage41 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-vertical" additionalClassNames="w-[166.172px]" />
    </div>
  );
}

function ColorsPage42() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card20() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1054.88px] w-[294.395px]" data-name="Card">
      <CardContent20 />
      <ColorsPage42 />
    </div>
  );
}

function ColorsPage43() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Vertical Reverse" additionalClassNames="w-[130.85px]" />
      <BadgeBackgroundImageAndText1 text="180deg inversé" additionalClassNames="w-[100.762px]" />
    </div>
  );
}

function CardContent21() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage43 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-vertical-reverse" additionalClassNames="w-[223.965px]" />
    </div>
  );
}

function ColorsPage44() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(rgb(248, 176, 68) 0%, rgb(237, 132, 58) 50%, rgb(85, 161, 180) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card21() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1054.88px] w-[294.404px]" data-name="Card">
      <CardContent21 />
      <ColorsPage44 />
    </div>
  );
}

function ColorsPage45() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Diagonal" additionalClassNames="w-[85.273px]" />
      <BadgeBackgroundImageAndText1 text="45deg" additionalClassNames="w-[52.061px]" />
    </div>
  );
}

function CardContent22() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage45 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-diagonal" additionalClassNames="w-[166.172px]" />
    </div>
  );
}

function ColorsPage46() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(23.7677deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card22() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1054.88px] w-[294.404px]" data-name="Card">
      <CardContent22 />
      <ColorsPage46 />
    </div>
  );
}

function ColorsPage47() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Diagonal Reverse" additionalClassNames="w-[139.463px]" />
      <BadgeBackgroundImageAndText1 text="45deg inversé" additionalClassNames="w-[93.555px]" />
    </div>
  );
}

function CardContent23() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage47 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-diagonal-reverse" additionalClassNames="w-[223.965px]" />
    </div>
  );
}

function ColorsPage48() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(23.7677deg, rgb(248, 176, 68) 0%, rgb(237, 132, 58) 50%, rgb(85, 161, 180) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card23() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1054.88px] w-[294.404px]" data-name="Card">
      <CardContent23 />
      <ColorsPage48 />
    </div>
  );
}

function ColorsPage49() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Radial" additionalClassNames="w-[68.311px]" />
      <BadgeBackgroundImageAndText1 text="Radial" additionalClassNames="w-[51.299px]" />
    </div>
  );
}

function CardContent24() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage49 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-radial" additionalClassNames="w-[151.719px]" />
    </div>
  );
}

function ColorsPage50() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -15.88 -15.88 0 145.33 63.999)\\\'><stop stop-color=\\\'rgba(85,161,180,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(123,154,150,1)\\\' offset=\\\'0.125\\\'/><stop stop-color=\\\'rgba(161,147,119,1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(199,139,89,1)\\\' offset=\\\'0.375\\\'/><stop stop-color=\\\'rgba(237,132,58,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(248,176,68,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card24() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1054.88px] w-[294.404px]" data-name="Card">
      <CardContent24 />
      <ColorsPage50 />
    </div>
  );
}

function ColorsPage51() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Radial Reverse" additionalClassNames="w-[122.5px]" />
      <BadgeBackgroundImageAndText1 text="Radial inversé" additionalClassNames="w-[92.793px]" />
    </div>
  );
}

function CardContent25() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage51 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-radial-reverse" additionalClassNames="w-[209.521px]" />
    </div>
  );
}

function ColorsPage52() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.64 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -15.879 -15.879 0 145.32 63.999)\\\'><stop stop-color=\\\'rgba(248,176,68,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(237,132,58,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(199,139,89,1)\\\' offset=\\\'0.625\\\'/><stop stop-color=\\\'rgba(161,147,119,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(123,154,150,1)\\\' offset=\\\'0.875\\\'/><stop stop-color=\\\'rgba(85,161,180,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card25() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1318.6px] w-[294.395px]" data-name="Card">
      <CardContent25 />
      <ColorsPage52 />
    </div>
  );
}

function ColorsPage53() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Soft" additionalClassNames="w-[54.092px]" />
      <BadgeBackgroundImageAndText1 text="80% opacité" additionalClassNames="w-[84.785px]" />
    </div>
  );
}

function CardContent26() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage53 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-soft" additionalClassNames="w-[137.275px]" />
    </div>
  );
}

function ColorsPage54() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(85, 161, 180, 0.8) 0%, rgba(237, 132, 58, 0.8) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card26() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1318.6px] w-[294.404px]" data-name="Card">
      <CardContent26 />
      <ColorsPage54 />
    </div>
  );
}

function ColorsPage55() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Soft Light" additionalClassNames="w-[90.01px]" />
      <BadgeBackgroundImageAndText1 text="40% opacité" additionalClassNames="w-[84.785px]" />
    </div>
  );
}

function CardContent27() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage55 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-soft-light" additionalClassNames="w-[180.615px]" />
    </div>
  );
}

function ColorsPage56() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(85, 161, 180, 0.4) 0%, rgba(237, 132, 58, 0.4) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card27() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1318.6px] w-[294.404px]" data-name="Card">
      <CardContent27 />
      <ColorsPage56 />
    </div>
  );
}

function ColorsPage57() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Glass" additionalClassNames="w-[63.633px]" />
      <BadgeBackgroundImageAndText1 text="25% opacité" additionalClassNames="w-[84.785px]" />
    </div>
  );
}

function CardContent28() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage57 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-glass" additionalClassNames="w-[144.492px]" />
    </div>
  );
}

function ColorsPage58() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(85, 161, 180, 0.25) 0%, rgba(237, 132, 58, 0.25) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card28() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1318.6px] w-[294.404px]" data-name="Card">
      <CardContent28 />
      <ColorsPage58 />
    </div>
  );
}

function ColorsPage59() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Glass Warm" additionalClassNames="w-[106.563px]" />
      <BadgeBackgroundImageAndText1 text="25% opacité warm" additionalClassNames="w-[118.77px]" />
    </div>
  );
}

function CardContent29() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage59 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-glass-warm" additionalClassNames="w-[180.615px]" />
    </div>
  );
}

function ColorsPage60() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(237, 132, 58, 0.25) 0%, rgba(248, 176, 68, 0.25) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card29() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1318.6px] w-[294.404px]" data-name="Card">
      <CardContent29 />
      <ColorsPage60 />
    </div>
  );
}

function ColorsPage61() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Overlay" additionalClassNames="w-[77.607px]" />
      <BadgeBackgroundImageAndText1 text="10% overlay" additionalClassNames="w-[85.254px]" />
    </div>
  );
}

function CardContent30() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage61 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-overlay" additionalClassNames="w-[158.945px]" />
    </div>
  );
}

function ColorsPage62() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(85, 161, 180, 0.1) 0%, rgba(237, 132, 58, 0.1) 50%, rgba(248, 176, 68, 0.1) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card30() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1582.32px] w-[294.395px]" data-name="Card">
      <CardContent30 />
      <ColorsPage62 />
    </div>
  );
}

function ColorsPage63() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Overlay Strong" additionalClassNames="w-[124.023px]" />
      <BadgeBackgroundImageAndText1 text="30% overlay" additionalClassNames="w-[85.254px]" />
    </div>
  );
}

function CardContent31() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage63 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-overlay-strong" additionalClassNames="w-[209.521px]" />
    </div>
  );
}

function ColorsPage64() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(85, 161, 180, 0.3) 0%, rgba(237, 132, 58, 0.3) 50%, rgba(248, 176, 68, 0.3) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card31() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1582.32px] w-[294.404px]" data-name="Card">
      <CardContent31 />
      <ColorsPage64 />
    </div>
  );
}

function ColorsPage65() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Subtle" additionalClassNames="w-[69.688px]" />
      <BadgeBackgroundImageAndText1 text="5% subtil" additionalClassNames="w-[68.75px]" />
    </div>
  );
}

function CardContent32() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage65 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-subtle" additionalClassNames="w-[151.719px]" />
    </div>
  );
}

function ColorsPage66() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(85, 161, 180, 0.05) 0%, rgba(237, 132, 58, 0.05) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card32() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1582.32px] w-[294.404px]" data-name="Card">
      <CardContent32 />
      <ColorsPage66 />
    </div>
  );
}

function ColorsPage67() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Subtle Reverse" additionalClassNames="w-[123.877px]" />
      <BadgeBackgroundImageAndText1 text="5% subtil inversé" additionalClassNames="w-[110.244px]" />
    </div>
  );
}

function CardContent33() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage67 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-subtle-reverse" additionalClassNames="w-[209.521px]" />
    </div>
  );
}

function ColorsPage68() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgba(237, 132, 58, 0.05) 0%, rgba(248, 176, 68, 0.05) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card33() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1582.32px] w-[294.404px]" data-name="Card">
      <CardContent33 />
      <ColorsPage68 />
    </div>
  );
}

function ColorsPage69() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Mesh" additionalClassNames="w-[62.49px]" />
      <BadgeBackgroundImageAndText1 text="Apple-style" additionalClassNames="w-[81.152px]" />
    </div>
  );
}

function CardContent34() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage69 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-mesh" additionalClassNames="w-[137.275px]" />
    </div>
  );
}

function ColorsPage70() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -12.8 -29.065 0 116.26 25.6)\\\'><stop stop-color=\\\'rgba(85,161,180,0.4)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(43,81,90,0.2)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -16.392 -37.222 0 232.52 0)\\\'><stop stop-color=\\\'rgba(237,132,58,0.3)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(119,66,29,0.15)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -14.311 -32.496 0 0 63.999)\\\'><stop stop-color=\\\'rgba(248,176,68,0.3)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(124,88,34,0.15)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -12.075 -27.42 0 232.52 63.999)\\\'><stop stop-color=\\\'rgba(85,161,180,0.2)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(43,81,90,0.1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 290.65 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -18.102 -41.105 0 0 128)\\\'><stop stop-color=\\\'rgba(237,132,58,0.2)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(119,66,29,0.1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.5\\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card34() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1582.32px] w-[294.404px]" data-name="Card">
      <CardContent34 />
      <ColorsPage70 />
    </div>
  );
}

function ColorsPage71() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Text" additionalClassNames="w-[55.498px]" />
      <BadgeBackgroundImageAndText1 text="Pour titres" additionalClassNames="w-[72.998px]" />
    </div>
  );
}

function CardContent35() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage71 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-text" additionalClassNames="w-[137.275px]" />
    </div>
  );
}

function ColorsPage72() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 pl-0 pr-[0.01px] py-0 top-0 w-[290.645px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card35() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1846.04px] w-[294.395px]" data-name="Card">
      <CardContent35 />
      <ColorsPage72 />
    </div>
  );
}

function ColorsPage73() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Text Warm" additionalClassNames="w-[98.438px]" />
      <BadgeBackgroundImageAndText1 text="Titres warm" additionalClassNames="w-[82.129px]" />
    </div>
  );
}

function CardContent36() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage73 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-text-warm" additionalClassNames="w-[173.398px]" />
    </div>
  );
}

function ColorsPage74() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(237, 132, 58) 0%, rgb(248, 176, 68) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card36() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1846.04px] w-[294.404px]" data-name="Card">
      <CardContent36 />
      <ColorsPage74 />
    </div>
  );
}

function ColorsPage75() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Text Cool" additionalClassNames="w-[88.018px]" />
      <BadgeBackgroundImageAndText1 text="Titres cool" additionalClassNames="w-[73.564px]" />
    </div>
  );
}

function CardContent37() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage75 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-text-cool" additionalClassNames="w-[173.398px]" />
    </div>
  );
}

function ColorsPage76() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(85, 161, 180) 0%, rgb(123, 196, 212) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card37() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[620.79px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1846.04px] w-[294.404px]" data-name="Card">
      <CardContent37 />
      <ColorsPage76 />
    </div>
  );
}

function ColorsPage77() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Border" additionalClassNames="w-[71.416px]" />
      <BadgeBackgroundImageAndText1 text="Pour bordures" additionalClassNames="w-[93.34px]" />
    </div>
  );
}

function CardContent38() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage77 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-border" additionalClassNames="w-[151.719px]" />
    </div>
  );
}

function Card38() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[931.19px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1846.04px] w-[294.404px]" data-name="Card">
      <CardContent38 />
      <ColorsPageBackgroundImage />
    </div>
  );
}

function ColorsPage78() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Button" additionalClassNames="w-[71.221px]" />
      <BadgeBackgroundImageAndText1 text="Default" additionalClassNames="w-[57.207px]" />
    </div>
  );
}

function CardContent39() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage78 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-button" additionalClassNames="w-[151.719px]" />
    </div>
  );
}

function Card39() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[1241.59px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[1846.04px] w-[294.404px]" data-name="Card">
      <CardContent39 />
      <ColorsPageBackgroundImage1 />
    </div>
  );
}

function ColorsPage79() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.652px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Button Hover" additionalClassNames="w-[113.027px]" />
      <BadgeBackgroundImageAndText1 text="Hover" additionalClassNames="w-[49.736px]" />
    </div>
  );
}

function CardContent40() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.645px]" data-name="CardContent">
      <ColorsPage79 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-button-hover" additionalClassNames="w-[195.068px]" />
    </div>
  );
}

function Card40() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[2109.77px] w-[294.395px]" data-name="Card">
      <CardContent40 />
      <ColorsPageBackgroundImage2 />
    </div>
  );
}

function ColorsPage80() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[16px] top-[16px] w-[258.662px]" data-name="ColorsPage">
      <HeadingBackgroundImageAndText text="TLS Button Active" additionalClassNames="w-[114.629px]" />
      <BadgeBackgroundImageAndText1 text="Active" additionalClassNames="w-[51.035px]" />
    </div>
  );
}

function CardContent41() {
  return (
    <div className="absolute h-[91.982px] left-0 top-[151.99px] w-[290.654px]" data-name="CardContent">
      <ColorsPage80 />
      <ColorsPageBackgroundImageAndText text="--gradient-tls-button-active" additionalClassNames="w-[202.295px]" />
    </div>
  );
}

function ColorsPage81() {
  return (
    <div className="absolute content-stretch flex h-[127.998px] items-center justify-center left-0 top-0 w-[290.654px]" data-name="ColorsPage" style={{ backgroundImage: "linear-gradient(156.232deg, rgb(61, 119, 134) 0%, rgb(143, 80, 23) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)" }}>
      <IconBackgroundImage1 />
    </div>
  );
}

function Card41() {
  return (
    <div className="absolute bg-white border-[1.875px] border-[rgba(0,0,0,0.1)] border-solid h-[247.725px] left-[310.39px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[2109.77px] w-[294.404px]" data-name="Card">
      <CardContent41 />
      <ColorsPage81 />
    </div>
  );
}

function ColorsPage82() {
  return (
    <div className="h-[2357.49px] relative shrink-0 w-full" data-name="ColorsPage">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
      <Card14 />
      <Card15 />
      <Card16 />
      <Card17 />
      <Card18 />
      <Card19 />
      <Card20 />
      <Card21 />
      <Card22 />
      <Card23 />
      <Card24 />
      <Card25 />
      <Card26 />
      <Card27 />
      <Card28 />
      <Card29 />
      <Card30 />
      <Card31 />
      <Card32 />
      <Card33 />
      <Card34 />
      <Card35 />
      <Card36 />
      <Card37 />
      <Card38 />
      <Card39 />
      <Card40 />
      <Card41 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1535.996px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[31.992px] items-start relative size-full">
        <ColorsPage4 />
        <ColorsPage82 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex flex-col gap-[39.99px] h-[2590.166px] items-start pb-[31.992px] pt-0 px-0 relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function ColorsPage83() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[47.998px] h-[2888.604px] items-start left-0 pb-0 pl-[525.996px] pr-[238.008px] pt-[40px] top-0 w-[2300px]" data-name="ColorsPage">
      <Container2 />
      <PrimitiveDiv />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[27.998px] items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[28px] min-h-px min-w-px relative shrink-0 text-[#252b37] text-[20px]">TLS Design System</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#6b7280] text-[14px]">Documentation complète</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[3.994px] h-[51.992px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[101.855px] relative shrink-0 w-[286.123px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1.875px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[1.875px] pt-[23.994px] px-[23.994px] relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p260aa300} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text() {
  return (
    <BackgroundImage2 additionalClassNames="w-[52.568px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[26.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Accueil</p>
    </BackgroundImage2>
  );
}

function Button() {
  return (
    <ButtonBackgroundImage>
      <Icon5 />
      <Text />
    </ButtonBackgroundImage>
  );
}

function Icon6() {
  return (
    <BackgroundImage>
      <g clipPath="url(#clip0_419_843)" id="Icon">
        <path d={svgPaths.p3bcc1200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p14899500} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.pa15a670} fill="var(--fill-0, white)" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p295c7f00} fill="var(--fill-0, white)" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p3ad59a00} fill="var(--fill-0, white)" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_419_843">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Text1() {
  return (
    <BackgroundImage2 additionalClassNames="w-[64.063px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[32.5px] text-[16px] text-center text-nowrap text-white top-[-0.38px] translate-x-[-50%]">Couleurs</p>
    </BackgroundImage2>
  );
}

function Button1() {
  return (
    <ButtonBackgroundImage additionalClassNames="bg-[#55a1b4] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
      <Icon6 />
      <Text1 />
    </ButtonBackgroundImage>
  );
}

function Icon7() {
  return (
    <IconBackgroundImage3>
      <path d="M10 3.33333V16.6667" id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1557d000} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M7.5 16.6667H12.5" id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text2() {
  return (
    <BackgroundImage2 additionalClassNames="w-[89.805px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[45px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Typographie</p>
    </BackgroundImage2>
  );
}

function Button2() {
  return (
    <ButtonBackgroundImage>
      <Icon7 />
      <Text2 />
    </ButtonBackgroundImage>
  );
}

function Icon8() {
  return (
    <BackgroundImage>
      <g clipPath="url(#clip0_419_823)" id="Icon">
        <path d={svgPaths.p2e24a180} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M12.0833 10.4167L13.75 8.75" id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M9.58333 7.91667L11.25 6.25" id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M7.08333 5.41667L8.75 3.75" id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M14.5833 12.9167L16.25 11.25" id="Vector_5" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_419_823">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Text3() {
  return (
    <BackgroundImage2 additionalClassNames="w-[57.656px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[29px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Spacing</p>
    </BackgroundImage2>
  );
}

function Button3() {
  return (
    <ButtonBackgroundImage>
      <Icon8 />
      <Text3 />
    </ButtonBackgroundImage>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p1775ffc0} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text4() {
  return (
    <BackgroundImage2 additionalClassNames="w-[41.67px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[21px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Effets</p>
    </BackgroundImage2>
  );
}

function Button4() {
  return (
    <ButtonBackgroundImage>
      <Icon9 />
      <Text4 />
    </ButtonBackgroundImage>
  );
}

function Icon10() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p8a26180} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1f3d9f80} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text5() {
  return (
    <BackgroundImage2 additionalClassNames="w-[47.08px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[24px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Toasts</p>
    </BackgroundImage2>
  );
}

function Button5() {
  return (
    <ButtonBackgroundImage>
      <Icon10 />
      <Text5 />
    </ButtonBackgroundImage>
  );
}

function Icon11() {
  return (
    <BackgroundImage>
      <g clipPath="url(#clip0_419_835)" id="Icon">
        <path d={svgPaths.p1f829500} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.pab98830} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p23e3d380} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_419_835">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Text6() {
  return (
    <BackgroundImage2 additionalClassNames="w-[90.195px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[45.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Composants</p>
    </BackgroundImage2>
  );
}

function Button6() {
  return (
    <ButtonBackgroundImage>
      <Icon11 />
      <Text6 />
    </ButtonBackgroundImage>
  );
}

function Icon12() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p1b43e7f0} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2eca8c80} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M6.25 3.55835L13.75 7.85002" id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text7() {
  return (
    <BackgroundImage2 additionalClassNames="w-[92.08px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[46.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Bibliothèque</p>
    </BackgroundImage2>
  );
}

function Button7() {
  return (
    <ButtonBackgroundImage>
      <Icon12 />
      <Text7 />
    </ButtonBackgroundImage>
  );
}

function Icon13() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p1306cbc0} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2b84ce80} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3b927d80} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text8() {
  return (
    <BackgroundImage2 additionalClassNames="w-[60.723px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[30.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Patterns</p>
    </BackgroundImage2>
  );
}

function Button8() {
  return (
    <ButtonBackgroundImage>
      <Icon13 />
      <Text8 />
    </ButtonBackgroundImage>
  );
}

function Icon14() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p89d1480} id="Vector" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p17869500} id="Vector_2" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1c3f8340} id="Vector_3" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p9d02100} id="Vector_4" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p164b9b80} id="Vector_5" stroke="var(--stroke-0, #55A1B4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Text9() {
  return (
    <BackgroundImage2 additionalClassNames="w-[116.221px]">
      <p className="absolute font-['Nunito:Medium',sans-serif] font-medium leading-[24px] left-[58.5px] text-[#252b37] text-[16px] text-center text-nowrap top-[-0.38px] translate-x-[-50%]">Variables Figma</p>
    </BackgroundImage2>
  );
}

function Button9() {
  return (
    <ButtonBackgroundImage>
      <Icon14 />
      <Text9 />
    </ButtonBackgroundImage>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[7.998px] h-[551.768px] items-start relative shrink-0 w-full" data-name="Container">
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
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[286.123px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-0 pt-[15.996px] px-[15.996px] relative rounded-[inherit] size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return <div className="bg-[#55a1b4] rounded-[9999px] shrink-0 size-[11.992px]" data-name="Container" />;
}

function Container7() {
  return <div className="bg-[#ed843a] rounded-[9999px] shrink-0 size-[11.992px]" data-name="Container" />;
}

function Container8() {
  return <div className="basis-0 bg-[#f8b044] grow h-[11.992px] min-h-px min-w-px rounded-[9999px] shrink-0" data-name="Container" />;
}

function Container9() {
  return (
    <div className="h-[11.992px] relative shrink-0 w-[43.965px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.994px] items-start relative size-full">
        <Container6 />
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[33.262px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6b7280] text-[12px] text-nowrap top-[-0.63px]">v1.0.0</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[11.992px] h-[15.996px] items-center relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Text10 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.502px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Nunito:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#6b7280] text-[12px] text-nowrap top-[-0.75px]">The Learning Society Design System</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[7.998px] h-[43.496px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Paragraph3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(245,245,245,0.3)] h-[93.359px] relative shrink-0 w-[286.123px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.875px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[25.869px] px-[23.994px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1176.25px] items-start left-0 top-0 w-[286.123px]" data-name="Container">
      <Container4 />
      <Navigation />
      <Container12 />
    </div>
  );
}

function Icon15() {
  return (
    <IconBackgroundImage2>
      <path d={svgPaths.p3cb72500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
    </IconBackgroundImage2>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#55a1b4] content-stretch flex items-center justify-center left-[270.13px] rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[31.992px] top-[23.99px]" data-name="Button">
      <Icon15 />
    </div>
  );
}

function DesignSystemSidebar() {
  return (
    <div className="absolute bg-white border-[0px_1.875px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid h-[1176.25px] left-0 top-0 w-[287.998px]" data-name="DesignSystemSidebar">
      <Container13 />
      <Button10 />
    </div>
  );
}

export default function DesignSystemTls() {
  return (
    <div className="bg-white relative size-full" data-name="Design System - TLS">
      <ColorsPage83 />
      <DesignSystemSidebar />
    </div>
  );
}