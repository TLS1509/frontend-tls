import svgPaths from "./svg-h78nwql4z7";
import clsx from "clsx";
import imgAvatar from "figma:asset/75bbf14372bf1565a71e264b3a52b13b2af7fe79.png";
import imgImage from "figma:asset/bf37168cb562c22c9414d6966a55f7dbc7b0a8f3.png";
import imgImage1 from "figma:asset/1876b17b063c9fe745a8d1288c9576667ef9d70c.png";
import imgImage2 from "figma:asset/eaab8f14010496eb9054953d335828536efc9655.png";
import imgImage3 from "figma:asset/69c2d48ba81567d28893e15cd0baf517c39f52ee.png";
import imgImage4 from "figma:asset/a4c52ab3a3c522719b54dd45b1795921034a3f00.png";
import imgImage5 from "figma:asset/4f7cb156af7440d6883d7ce6e71818b4d55fde88.png";
import imgImage6 from "figma:asset/0f4f2fcb6049962790ac0a2810925489622b792c.png";

function ButtonsButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">{children}</div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return (
    <div className={clsx("relative shrink-0 size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 96.6729 15.5895" className="block size-full">
      <g id="Vector">{children}</g>
    </svg>
  );
}

function LogotypeBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[0_0_0_30.22%]">
      <div className="absolute bottom-[27.46%] left-0 top-[23.82%] w-[96.673px]" data-name="Vector">
        {children}
      </div>
    </div>
  );
}

function ContentBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(10, 13, 18, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} className="relative rounded-[8px] shrink-0 size-[32px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-0.5px_0.5px_0px_rgba(10,13,18,0.1)]" />
      <div aria-hidden="true" className="absolute border-[0.2px] border-[rgba(10,13,18,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(10,13,18,0.13),0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" />
    </div>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">{children}</div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

function ContainerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full">
      <div className="max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[32px] py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}
type ButtonsButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonsButtonBackgroundImageAndText({ text }: ButtonsButtonBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndText1Props = {
  text: string;
};

function BadgeBackgroundImageAndText1({ text }: BadgeBackgroundImageAndText1Props) {
  return (
    <div className="bg-[#fdf2fa] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#fcceee] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#c11574] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
};

function BadgeBackgroundImageAndText({ text }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#f9f5ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e9d7fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}

function ArrowUpRightBackgroundImage() {
  return (
    <BackgroundImage1>
      <g id="arrow-up-right">
        <path d="M7 17L17 7M17 7H7M17 7V17" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </BackgroundImage1>
  );
}
type ContentItemBackgroundImageProps = {
  text: string;
  text1: string;
  text2: string;
};

function ContentItemBackgroundImage({ text, text1, text2 }: ContentItemBackgroundImageProps) {
  return (
    <BackgroundImage2>
      <p className="mb-[18px]">{text}</p>
      <p className="mb-[18px]">{text1}</p>
      <p>{text2}</p>
    </BackgroundImage2>
  );
}
type TextPaddingBackgroundImageAndText1Props = {
  text: string;
};

function TextPaddingBackgroundImageAndText1({ text }: TextPaddingBackgroundImageAndText1Props) {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
    </div>
  );
}

function ChevronDownBackgroundImage() {
  return (
    <BackgroundImage3>
      <g id="chevron-down">
        <path d="M4 6L8 10L12 6" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
      </g>
    </BackgroundImage3>
  );
}
type TextPaddingBackgroundImageAndTextProps = {
  text: string;
};

function TextPaddingBackgroundImageAndText({ text }: TextPaddingBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#414651] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}

function BackgroundImage() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" className="block size-full">
      <g clipPath="url(#clip0_119_24569)" id="Grid" opacity="0.14">
        <path clipRule="evenodd" d={svgPaths.p312a9a00} fill="var(--fill-0, #0A0D12)" fillRule="evenodd" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_119_24569">
          <rect fill="white" height="32" width="32" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PalantirBackgroundImage() {
  return (
    <div style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.05000000074505806\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-7.1653e-16 0.7 -0.7 -8.3703e-17 8 4.6)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.18000000715255737\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(4.8986e-17 0.8 -0.8 4.8986e-17 8 8)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.7466\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.07999999821186066\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-3.8354e-16 1.2 -1.2 5.8242e-15 8 -3.908e-14)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0.99\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(26.565deg, rgb(83, 56, 158) 8.3333%, rgb(105, 65, 198) 91.667%)" }} className="absolute inset-1/4 overflow-clip rounded-[999px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]">
      <div className="absolute h-[3.2px] left-[3.2px] top-[1.6px] w-[9.6px]" data-name="Reflection">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 3.2">
          <path d={svgPaths.p29911df0} fill="url(#paint0_linear_119_24640)" fillOpacity="0.4" id="Reflection" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_119_24640" x1="4.8" x2="4.8" y1="0" y2="3.2">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Blur() {
  return <div className="absolute backdrop-blur-[2.5px] backdrop-filter bg-[rgba(255,255,255,0.2)] bottom-0 left-0 right-0 rounded-bl-[8px] rounded-br-[8px] top-1/2" data-name="Blur" />;
}

function Content() {
  return (
    <ContentBackgroundImage>
      <BackgroundImage />
      <PalantirBackgroundImage />
      <Blur />
    </ContentBackgroundImage>
  );
}

function Logomark() {
  return (
    <div className="absolute content-stretch flex inset-[0_76.98%_0_0] items-start" data-name="Logomark">
      <Content />
    </div>
  );
}

function Logotype() {
  return (
    <LogotypeBackgroundImage>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(24, 29, 39, 1)" } as React.CSSProperties}>
        <BackgroundImage4>
          <path d={svgPaths.p111ca700} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.p162dce00} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.p3e393580} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.p34609180} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.p162d4f00} fill="var(--fill-0, #181D27)" />
          <path clipRule="evenodd" d={svgPaths.pbce2df0} fill="var(--fill-0, #181D27)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p9487500} fill="var(--fill-0, #181D27)" fillRule="evenodd" />
          <path d={svgPaths.p13eb7ec0} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.pfbe8980} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.p122e7480} fill="var(--fill-0, #181D27)" />
          <path d={svgPaths.p3dfebe00} fill="var(--fill-0, #181D27)" />
        </BackgroundImage4>
      </div>
    </LogotypeBackgroundImage>
  );
}

function LogoWrap() {
  return (
    <div className="h-[32px] relative shrink-0 w-[139px]" data-name="Logo wrap">
      <Logomark />
      <Logotype />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[139px]" data-name="Logo">
      <LogoWrap />
    </div>
  );
}

function DropdownHeaderNavigationButton() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center overflow-clip px-[6px] py-[4px] relative rounded-[8px] shrink-0" data-name="_Dropdown header navigation button">
      <TextPaddingBackgroundImageAndText text="Products" />
      <ChevronDownBackgroundImage />
    </div>
  );
}

function DropdownHeaderNavigationButton1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center overflow-clip px-[6px] py-[4px] relative rounded-[8px] shrink-0" data-name="_Dropdown header navigation button">
      <TextPaddingBackgroundImageAndText text="Services" />
      <ChevronDownBackgroundImage />
    </div>
  );
}

function DropdownHeaderNavigationButton2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center overflow-clip px-[6px] py-[4px] relative rounded-[8px] shrink-0" data-name="_Dropdown header navigation button">
      <TextPaddingBackgroundImageAndText text="Pricing" />
    </div>
  );
}

function DropdownHeaderNavigationButton3() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center overflow-clip px-[6px] py-[4px] relative rounded-[8px] shrink-0" data-name="_Dropdown header navigation button">
      <TextPaddingBackgroundImageAndText text="Resources" />
      <ChevronDownBackgroundImage />
    </div>
  );
}

function DropdownHeaderNavigationButton4() {
  return (
    <div className="content-stretch flex gap-[2px] items-center justify-center overflow-clip px-[6px] py-[4px] relative rounded-[8px] shrink-0" data-name="_Dropdown header navigation button">
      <TextPaddingBackgroundImageAndText text="About" />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Navigation">
      <DropdownHeaderNavigationButton />
      <DropdownHeaderNavigationButton1 />
      <DropdownHeaderNavigationButton2 />
      <DropdownHeaderNavigationButton3 />
      <DropdownHeaderNavigationButton4 />
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[20px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Logo />
      <Navigation />
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <TextPaddingBackgroundImageAndText text="Log in" />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function ButtonsButton1() {
  return (
    <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <TextPaddingBackgroundImageAndText1 text="Sign up" />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function NavigationActions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="_Navigation actions">
      <ButtonsButton />
      <ButtonsButton1 />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center max-w-[inherit] px-[32px] py-0 relative w-full">
          <NavigationActions />
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col h-[80px] items-center justify-center left-0 right-0 top-0" data-name="Header">
      <Container />
    </div>
  );
}

function DropdownHeaderNavigation() {
  return (
    <div className="h-[80px] relative shrink-0 w-full z-[4]" data-name="Dropdown header navigation">
      <Header />
    </div>
  );
}

function HeadingAndBadge() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semibold',sans-serif] gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and badge">
      <p className="leading-[24px] relative shrink-0 text-[#6941c6] text-[16px] w-full">13 Jan 2025 • 10 min read</p>
      <p className="leading-[60px] relative shrink-0 text-[#181d27] text-[48px] tracking-[-0.96px] w-full">Our top 10 Javascript frameworks to use</p>
    </div>
  );
}

function HeadingAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[768px] not-italic relative shrink-0 w-full" data-name="Heading and supporting text">
      <HeadingAndBadge />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] max-w-[480px] relative shrink-0 text-[#535862] text-[20px] w-full">JavaScript frameworks make development easy with extensive features and functionalities.</p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[48px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute bg-[#d9e5cc] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap" data-name="Text and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] relative shrink-0 text-[#181d27]">Drew Cano</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">Frontend Engineer</p>
    </div>
  );
}

function AvatarLabelGroup() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Avatar label group">
      <Avatar />
      <TextAndSupportingText />
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-start pl-0 pr-[32px] py-0 relative w-full">
          <HeadingAndSupportingText />
          <AvatarLabelGroup />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow max-w-[640px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="max-w-[inherit] size-full">
        <div className="content-stretch flex items-start max-w-[inherit] px-[32px] py-0 relative w-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="basis-0 content-stretch flex grow h-[720px] items-end justify-end min-h-px min-w-px px-0 py-[96px] relative shrink-0" data-name="Section">
      <Container1 />
    </div>
  );
}

function Image() {
  return (
    <div className="basis-0 grow max-h-[560px] max-w-[400px] min-h-px min-w-px relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Section1() {
  return (
    <div className="basis-0 bg-[#fafafa] grow min-h-px min-w-px relative self-stretch shrink-0" data-name="Section">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[32px] relative size-full">
          <Image />
        </div>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex items-start min-h-[720px] relative shrink-0 w-full" data-name="Header section">
      <Section />
      <Section1 />
    </div>
  );
}

function PaddingBottom() {
  return <div className="content-stretch flex flex-col h-[20px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <p className="font-['Inter:Semibold',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#181d27] text-[30px] w-full">Introduction</p>
      <PaddingBottom />
    </div>
  );
}

function ContentItem1() {
  return (
    <BackgroundImage2>
      <p className="mb-[18px]">Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
      <p>{`Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat. `}</p>
    </BackgroundImage2>
  );
}

function PaddingTop() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function Image1() {
  return (
    <div className="aspect-[720/480] relative rounded-[12px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImage1} />
    </div>
  );
}

function Caption() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Caption">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[0px] text-[14px]">
        <span>{`Image courtesy of Laura Davidson via `}</span>
        <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://unsplash.com/photos/QBAH4IldaZY">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px]" href="https://unsplash.com/photos/QBAH4IldaZY">
            Unsplash
          </span>
        </a>
      </p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <Image1 />
      <Caption />
    </div>
  );
}

function PaddingBottom1() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <PaddingTop />
      <Content3 />
      <PaddingBottom1 />
    </div>
  );
}

function QuoteWrap() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px px-0 py-[8px] relative shrink-0" data-name="Quote wrap">
      <p className="font-['Inter:Medium_Italic',sans-serif] font-medium italic leading-[32px] min-w-full relative shrink-0 text-[#181d27] text-[24px] w-[min-content]">“In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.”</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-full not-italic relative shrink-0 text-[#535862] text-[16px] w-[min-content]">— Olivia Rhye, Product Designer</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex items-center justify-center relative self-stretch shrink-0 w-[2px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-[90deg]">
          <div className="h-full relative w-[200px]" data-name="Divider">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(127, 86, 217, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200 2">
                <path clipRule="evenodd" d="M200 2H0V0H200V2Z" fill="var(--fill-0, #7F56D9)" fillRule="evenodd" id="Divider" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <QuoteWrap />
    </div>
  );
}

function PaddingBottom2() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <Content4 />
      <PaddingBottom2 />
    </div>
  );
}

function PaddingTop1() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom3() {
  return <div className="content-stretch flex flex-col h-[16px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <PaddingTop1 />
      <p className="font-['Inter:Semibold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full">Software and tools</p>
      <PaddingBottom3 />
    </div>
  );
}

function PaddingTop2() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom4() {
  return <div className="content-stretch flex flex-col h-[16px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <PaddingTop2 />
      <p className="font-['Inter:Semibold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full">Other resources</p>
      <PaddingBottom4 />
    </div>
  );
}

function ContentItem6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">
        <p className="leading-[28px] mb-[18px]">Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.</p>
        <ol className="list-decimal" start="1">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[28px]">Lectus id duis vitae porttitor enim gravida morbi.</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[28px]">Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[28px]">Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function PaddingTop3() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function Image2() {
  return (
    <div className="aspect-[720/480] relative rounded-[12px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={imgImage2} />
    </div>
  );
}

function Link() {
  return (
    <BackgroundImage3>
      <g id="link-01">
        <path d={svgPaths.p1caf5c80} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
    </BackgroundImage3>
  );
}

function Caption1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Caption">
      <Link />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#535862] text-[0px] text-[14px]">
        <span>{`Image courtesy of Fauxels via `}</span>
        <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.pexels.com/photo/photo-of-woman-leaning-on-wooden-table-3182746/">
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px]" href="https://www.pexels.com/photo/photo-of-woman-leaning-on-wooden-table-3182746/">
            Pexels
          </span>
        </a>
      </p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <Image2 />
      <Caption1 />
    </div>
  );
}

function PaddingBottom5() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <PaddingTop3 />
      <Content5 />
      <PaddingBottom5 />
    </div>
  );
}

function ContentItem8() {
  return (
    <BackgroundImage2>
      <p className="mb-[18px]">Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.</p>
      <p>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.</p>
    </BackgroundImage2>
  );
}

function PaddingTop4() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom6() {
  return <div className="content-stretch flex flex-col h-[16px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <p className="font-['Inter:Semibold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full">Heading text</p>
      <PaddingBottom6 />
    </div>
  );
}

function Content6() {
  return (
    <div className="bg-[#fafafa] relative rounded-[16px] shrink-0 w-full" data-name="Content">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative w-full">
          <ContentItem9 />
          <ContentItemBackgroundImage text="Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse." text1="Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus." text2="Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor." />
        </div>
      </div>
    </div>
  );
}

function PaddingBottom7() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function ContentItem10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
      <PaddingTop4 />
      <Content6 />
      <PaddingBottom7 />
    </div>
  );
}

function Copy() {
  return (
    <BackgroundImage5>
      <g clipPath="url(#clip0_119_28981)" id="copy-01">
        <path d={svgPaths.p3601ca80} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_119_28981">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage5>
  );
}

function TextPadding() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap">Copy link</p>
    </div>
  );
}

function ButtonsButton2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit]">
        <Copy />
        <TextPadding />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function SocialIcon() {
  return (
    <BackgroundImage5>
      <g id="Social icon">
        <path clipRule="evenodd" d={svgPaths.p32584700} fill="var(--fill-0, #A4A7AE)" fillRule="evenodd" id="Vector" />
      </g>
    </BackgroundImage5>
  );
}

function ButtonsButton3() {
  return (
    <ButtonsButtonBackgroundImage>
      <SocialIcon />
    </ButtonsButtonBackgroundImage>
  );
}

function SocialIcon1() {
  return (
    <BackgroundImage5>
      <g clipPath="url(#clip0_119_24630)" id="Social icon">
        <path d={svgPaths.p24dd3180} fill="var(--fill-0, #A4A7AE)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_119_24630">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage5>
  );
}

function ButtonsButton4() {
  return (
    <ButtonsButtonBackgroundImage>
      <SocialIcon1 />
    </ButtonsButtonBackgroundImage>
  );
}

function SocialIcon2() {
  return (
    <BackgroundImage5 additionalClassNames="overflow-clip">
      <g id="Group">
        <path d={svgPaths.p3fb91680} fill="var(--fill-0, #A4A7AE)" id="Vector" />
      </g>
    </BackgroundImage5>
  );
}

function ButtonsButton5() {
  return (
    <ButtonsButtonBackgroundImage>
      <SocialIcon2 />
    </ButtonsButtonBackgroundImage>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Social links">
      <ButtonsButton2 />
      <ButtonsButton3 />
      <ButtonsButton4 />
      <ButtonsButton5 />
    </div>
  );
}

function SocialLinksWrap() {
  return (
    <div className="content-center flex flex-wrap gap-[24px] items-center justify-between pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Social links wrap">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] text-nowrap">Share this post</p>
      <SocialLinks />
    </div>
  );
}

function RichText() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start max-w-[720px] min-h-px min-w-px relative shrink-0" data-name="Rich text">
      <ContentItem />
      <ContentItem1 />
      <ContentItem2 />
      <ContentItem3 />
      <ContentItemBackgroundImage text="Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla." text1="Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor." text2="Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci." />
      <ContentItem4 />
      <ContentItem1 />
      <ContentItem5 />
      <ContentItem6 />
      <ContentItem7 />
      <ContentItem8 />
      <ContentItem10 />
      <SocialLinksWrap />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Content">
      <RichText />
    </div>
  );
}

function Container2() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center max-w-[inherit] px-[32px] py-0 relative w-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-col items-center px-0 py-[96px] relative shrink-0 w-full" data-name="Section">
      <Container2 />
    </div>
  );
}

function BlogPostPageHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full z-[3]" data-name="Blog post page header">
      <HeaderSection />
      <Section2 />
    </div>
  );
}

function HeadingAndSupportingText1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start max-w-[768px] min-h-px min-w-[480px] not-italic relative shrink-0" data-name="Heading and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[44px] relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">Latest writings</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#535862] text-[20px] w-full">The latest news, technologies, and resources from our team.</p>
    </div>
  );
}

function ButtonsButton6() {
  return (
    <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[18px] py-[12px] relative rounded-[inherit]">
        <TextPaddingBackgroundImageAndText1 text="View all posts" />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Actions">
      <ButtonsButton6 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText1 />
      <Actions />
    </div>
  );
}

function Container3() {
  return (
    <ContainerBackgroundImage>
      <Content8 />
    </ContainerBackgroundImage>
  );
}

function Image3() {
  return (
    <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgImage3} />
    </div>
  );
}

function IconWrap() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Icon wrap">
      <ArrowUpRightBackgroundImage />
    </div>
  );
}

function HeadingAndIcon() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
      <p className="basis-0 font-['Inter:Semibold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[18px]">UX review presentations</p>
      <IconWrap />
    </div>
  );
}

function HeadingAndText() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
      <HeadingAndIcon />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">How do you create compelling presentations that wow your colleagues and impress your managers?</p>
    </div>
  );
}

function HeadingAndSubheading() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full">Olivia Rhye • 20 Jan 2025</p>
      <HeadingAndText />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#c7d7fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3538cd] text-[14px] text-center text-nowrap">Research</p>
    </div>
  );
}

function Categories() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
      <BadgeBackgroundImageAndText text="Design" />
      <Badge />
      <BadgeBackgroundImageAndText1 text="Presentation" />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSubheading />
      <Categories />
    </div>
  );
}

function BlogPostCard() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start min-w-[320px] relative shrink-0 w-[384px]" data-name="Blog post card">
      <Image3 />
      <Content9 />
    </div>
  );
}

function Image4() {
  return (
    <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgImage4} />
    </div>
  );
}

function IconWrap1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Icon wrap">
      <ArrowUpRightBackgroundImage />
    </div>
  );
}

function HeadingAndIcon1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
      <p className="basis-0 font-['Inter:Semibold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[18px]">Migrating to Linear 101</p>
      <IconWrap1 />
    </div>
  );
}

function HeadingAndText1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
      <HeadingAndIcon1 />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.</p>
    </div>
  );
}

function HeadingAndSubheading1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full">Phoenix Baker • 19 Jan 2025</p>
      <HeadingAndText1 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#f0f9ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#b9e6fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#026aa2] text-[14px] text-center text-nowrap">Product</p>
    </div>
  );
}

function Categories1() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
      <Badge1 />
      <BadgeBackgroundImageAndText1 text="Tools" />
      <BadgeBackgroundImageAndText1 text="SaaS" />
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSubheading1 />
      <Categories1 />
    </div>
  );
}

function BlogPostCard1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start min-w-[320px] relative shrink-0 w-[384px]" data-name="Blog post card">
      <Image4 />
      <Content10 />
    </div>
  );
}

function Image5() {
  return (
    <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgImage5} />
    </div>
  );
}

function IconWrap2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Icon wrap">
      <ArrowUpRightBackgroundImage />
    </div>
  );
}

function HeadingAndIcon2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
      <p className="basis-0 font-['Inter:Semibold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[18px]">Building your API stack</p>
      <IconWrap2 />
    </div>
  );
}

function HeadingAndText2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
      <HeadingAndIcon2 />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.</p>
    </div>
  );
}

function HeadingAndSubheading2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full">Lana Steiner • 18 Jan 2025</p>
      <HeadingAndText2 />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#abefc6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#067647] text-[14px] text-center text-nowrap">Software Development</p>
    </div>
  );
}

function Categories2() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
      <Badge2 />
      <BadgeBackgroundImageAndText1 text="Tools" />
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSubheading2 />
      <Categories2 />
    </div>
  );
}

function BlogPostCard2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start min-w-[320px] relative shrink-0 w-[384px]" data-name="Blog post card">
      <Image5 />
      <Content11 />
    </div>
  );
}

function Image6() {
  return (
    <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgImage6} />
    </div>
  );
}

function IconWrap3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0" data-name="Icon wrap">
      <ArrowUpRightBackgroundImage />
    </div>
  );
}

function HeadingAndIcon3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
      <p className="basis-0 font-['Inter:Semibold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[18px]">Bill Walsh leadership lessons</p>
      <IconWrap3 />
    </div>
  );
}

function HeadingAndText3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
      <HeadingAndIcon3 />
      <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</p>
    </div>
  );
}

function HeadingAndSubheading3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full">Alec Whitten • 17 Jan 2025</p>
      <HeadingAndText3 />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#f8f9fc] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#d5d9eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#363f72] text-[14px] text-center text-nowrap">Management</p>
    </div>
  );
}

function Categories3() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
      <BadgeBackgroundImageAndText text="Leadership" />
      <Badge3 />
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSubheading3 />
      <Categories3 />
    </div>
  );
}

function BlogPostCard3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start min-w-[320px] relative shrink-0 w-[384px]" data-name="Blog post card">
      <Image6 />
      <Content12 />
    </div>
  );
}

function Posts() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Posts">
      <BlogPostCard />
      <BlogPostCard1 />
      <BlogPostCard2 />
      <BlogPostCard3 />
    </div>
  );
}

function ArrowLeft() {
  return (
    <BackgroundImage1>
      <g id="arrow-left">
        <path d={svgPaths.pbf7d180} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </BackgroundImage1>
  );
}

function TestiomonialCarouselArrow() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="_Testiomonial carousel arrow">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <ArrowLeft />
    </div>
  );
}

function ArrowRight() {
  return (
    <BackgroundImage1>
      <g id="arrow-right">
        <path d={svgPaths.p39396800} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </BackgroundImage1>
  );
}

function TestiomonialCarouselArrow1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="_Testiomonial carousel arrow">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <ArrowRight />
    </div>
  );
}

function Arrows() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Arrows">
      <TestiomonialCarouselArrow />
      <TestiomonialCarouselArrow1 />
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-name="Content">
      <Posts />
      <Arrows />
    </div>
  );
}

function Container4() {
  return (
    <ContainerBackgroundImage>
      <Content13 />
    </ContainerBackgroundImage>
  );
}

function BlogSection() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[64px] items-center overflow-clip px-0 py-[96px] relative shrink-0 w-full z-[2]" data-name="Blog section">
      <Container3 />
      <Container4 />
    </div>
  );
}

function HeadingAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] not-italic relative shrink-0 text-center w-full" data-name="Heading and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[38px] relative shrink-0 text-[#f7f7f7] text-[30px] w-full">Start growing with Untitled</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#94979c] text-[20px] w-full">Join over 4,000+ startups already growing with Untitled.</p>
    </div>
  );
}

function TextPadding1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#cecfd2] text-[16px] text-nowrap">Chat to us</p>
    </div>
  );
}

function ButtonsButton7() {
  return (
    <div className="bg-[#0c0e12] relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[18px] py-[12px] relative rounded-[inherit]">
        <TextPadding1 />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(12,14,18,0.18),inset_0px_-2px_0px_0px_rgba(12,14,18,0.05)]" />
      <div aria-hidden="true" className="absolute border border-[#373a41] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
    </div>
  );
}

function ButtonsButton8() {
  return (
    <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[18px] py-[12px] relative rounded-[inherit]">
        <TextPaddingBackgroundImageAndText1 text="Get started" />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(12,14,18,0.18),inset_0px_-2px_0px_0px_rgba(12,14,18,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Actions">
      <ButtonsButton7 />
      <ButtonsButton8 />
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText2 />
      <Actions1 />
    </div>
  );
}

function Container5() {
  return (
    <ContainerBackgroundImage>
      <Content14 />
    </ContainerBackgroundImage>
  );
}

function FooterLink() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Overview" />
    </div>
  );
}

function FooterLink1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Features" />
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#0c0e12] content-stretch flex items-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#373a41] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#cecfd2] text-[12px] text-center text-nowrap">New</p>
    </div>
  );
}

function FooterLink2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Solutions" />
      <Badge4 />
    </div>
  );
}

function FooterLink3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Tutorials" />
    </div>
  );
}

function FooterLink4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Pricing" />
    </div>
  );
}

function FooterLink5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Releases" />
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <FooterLink />
      <FooterLink1 />
      <FooterLink2 />
      <FooterLink3 />
      <FooterLink4 />
      <FooterLink5 />
    </div>
  );
}

function FooterLinksColumn() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[96px] relative shrink-0" data-name="_Footer links column">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full">Product</p>
      <FooterLinks />
    </div>
  );
}

function FooterLink6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="About us" />
    </div>
  );
}

function FooterLink7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Careers" />
    </div>
  );
}

function FooterLink8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Press" />
    </div>
  );
}

function FooterLink9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="News" />
    </div>
  );
}

function FooterLink10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Media kit" />
    </div>
  );
}

function FooterLink11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Contact" />
    </div>
  );
}

function FooterLinks1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <FooterLink6 />
      <FooterLink7 />
      <FooterLink8 />
      <FooterLink9 />
      <FooterLink10 />
      <FooterLink11 />
    </div>
  );
}

function FooterLinksColumn1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[96px] relative shrink-0" data-name="_Footer links column">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full">Company</p>
      <FooterLinks1 />
    </div>
  );
}

function FooterLink12() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Blog" />
    </div>
  );
}

function FooterLink13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Newsletter" />
    </div>
  );
}

function FooterLink14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Events" />
    </div>
  );
}

function FooterLink15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Help centre" />
    </div>
  );
}

function FooterLink16() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Tutorials" />
    </div>
  );
}

function FooterLink17() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Support" />
    </div>
  );
}

function FooterLinks2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <FooterLink12 />
      <FooterLink13 />
      <FooterLink14 />
      <FooterLink15 />
      <FooterLink16 />
      <FooterLink17 />
    </div>
  );
}

function FooterLinksColumn2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[96px] relative shrink-0" data-name="_Footer links column">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full">Resources</p>
      <FooterLinks2 />
    </div>
  );
}

function FooterLink18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Startups" />
    </div>
  );
}

function FooterLink19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Enterprise" />
    </div>
  );
}

function FooterLink20() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Government" />
    </div>
  );
}

function FooterLink21() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="SaaS centre" />
    </div>
  );
}

function FooterLink22() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Marketplaces" />
    </div>
  );
}

function FooterLink23() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Ecommerce" />
    </div>
  );
}

function FooterLinks3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <FooterLink18 />
      <FooterLink19 />
      <FooterLink20 />
      <FooterLink21 />
      <FooterLink22 />
      <FooterLink23 />
    </div>
  );
}

function FooterLinksColumn3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[96px] relative shrink-0" data-name="_Footer links column">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full">Use cases</p>
      <FooterLinks3 />
    </div>
  );
}

function FooterLink24() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Twitter" />
    </div>
  );
}

function FooterLink25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="LinkedIn" />
    </div>
  );
}

function FooterLink26() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Facebook" />
    </div>
  );
}

function FooterLink27() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="GitHub" />
    </div>
  );
}

function FooterLink28() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="AngelList" />
    </div>
  );
}

function FooterLink29() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Dribbble" />
    </div>
  );
}

function FooterLinks4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <FooterLink24 />
      <FooterLink25 />
      <FooterLink26 />
      <FooterLink27 />
      <FooterLink28 />
      <FooterLink29 />
    </div>
  );
}

function FooterLinksColumn4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[96px] relative shrink-0" data-name="_Footer links column">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full">Social</p>
      <FooterLinks4 />
    </div>
  );
}

function FooterLink30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Terms" />
    </div>
  );
}

function FooterLink31() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Privacy" />
    </div>
  );
}

function FooterLink32() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Cookies" />
    </div>
  );
}

function FooterLink33() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Licenses" />
    </div>
  );
}

function FooterLink34() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Settings" />
    </div>
  );
}

function FooterLink35() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Contact" />
    </div>
  );
}

function FooterLinks5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <FooterLink30 />
      <FooterLink31 />
      <FooterLink32 />
      <FooterLink33 />
      <FooterLink34 />
      <FooterLink35 />
    </div>
  );
}

function FooterLinksColumn5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[96px] relative shrink-0" data-name="_Footer links column">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full">Legal</p>
      <FooterLinks5 />
    </div>
  );
}

function Content15() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <FooterLinksColumn />
      <FooterLinksColumn1 />
      <FooterLinksColumn2 />
      <FooterLinksColumn3 />
      <FooterLinksColumn4 />
      <FooterLinksColumn5 />
    </div>
  );
}

function Container6() {
  return (
    <ContainerBackgroundImage>
      <Content15 />
    </ContainerBackgroundImage>
  );
}

function Blur1() {
  return <div className="absolute backdrop-blur-[2.5px] backdrop-filter bg-[rgba(255,255,255,0.2)] bottom-0 left-0 right-0 rounded-bl-[8px] rounded-br-[8px] top-1/2" data-name="Blur" />;
}

function Content16() {
  return (
    <ContentBackgroundImage>
      <BackgroundImage />
      <PalantirBackgroundImage />
      <Blur1 />
    </ContentBackgroundImage>
  );
}

function Logomark1() {
  return (
    <div className="absolute content-stretch flex inset-[0_76.98%_0_0] items-start" data-name="Logomark">
      <Content16 />
    </div>
  );
}

function Logotype1() {
  return (
    <LogotypeBackgroundImage>
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <BackgroundImage4>
          <path d={svgPaths.p111ca700} fill="var(--fill-0, white)" />
          <path d={svgPaths.p162dce00} fill="var(--fill-0, white)" />
          <path d={svgPaths.p3e393580} fill="var(--fill-0, white)" />
          <path d={svgPaths.p34609180} fill="var(--fill-0, white)" />
          <path d={svgPaths.p162d4f00} fill="var(--fill-0, white)" />
          <path clipRule="evenodd" d={svgPaths.pbce2df0} fill="var(--fill-0, white)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p9487500} fill="var(--fill-0, white)" fillRule="evenodd" />
          <path d={svgPaths.p13eb7ec0} fill="var(--fill-0, white)" />
          <path d={svgPaths.pfbe8980} fill="var(--fill-0, white)" />
          <path d={svgPaths.p122e7480} fill="var(--fill-0, white)" />
          <path d={svgPaths.p3dfebe00} fill="var(--fill-0, white)" />
        </BackgroundImage4>
      </div>
    </LogotypeBackgroundImage>
  );
}

function LogoWrap1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[139px]" data-name="Logo wrap">
      <Logomark1 />
      <Logotype1 />
    </div>
  );
}

function Logo1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[139px]" data-name="Logo">
      <LogoWrap1 />
    </div>
  );
}

function Content17() {
  return (
    <div className="content-center flex flex-wrap gap-[24px] items-center justify-between pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#22262f] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Logo1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px] text-nowrap">© 2077 Untitled UI. All rights reserved.</p>
    </div>
  );
}

function Container7() {
  return (
    <ContainerBackgroundImage>
      <Content17 />
    </ContainerBackgroundImage>
  );
}

function Footer() {
  return (
    <div className="bg-[#0c0e12] content-stretch flex flex-col gap-[64px] items-center overflow-clip pb-[48px] pt-[64px] px-0 relative shrink-0 w-full z-[1]" data-name="Footer">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Desktop">
      <DropdownHeaderNavigation />
      <BlogPostPageHeader />
      <BlogSection />
      <Footer />
    </div>
  );
}