import svgPaths from "./svg-90rhk0k4zb";
import imgAvatar from "figma:asset/75bbf14372bf1565a71e264b3a52b13b2af7fe79.png";
import imgImage from "figma:asset/bf37168cb562c22c9414d6966a55f7dbc7b0a8f3.png";
import imgImage1 from "figma:asset/1876b17b063c9fe745a8d1288c9576667ef9d70c.png";
import imgImage2 from "figma:asset/eaab8f14010496eb9054953d335828536efc9655.png";
import imgImage3 from "figma:asset/69c2d48ba81567d28893e15cd0baf517c39f52ee.png";
import imgImage4 from "figma:asset/a4c52ab3a3c522719b54dd45b1795921034a3f00.png";

function Palantir() {
  return (
    <div className="absolute inset-1/4 overflow-clip rounded-[999px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" data-name="Palantir" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.05000000074505806\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-7.1653e-16 0.7 -0.7 -8.3703e-17 8 4.6)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.18000000715255737\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(4.8986e-17 0.8 -0.8 4.8986e-17 8 8)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.7466\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.07999999821186066\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-3.8354e-16 1.2 -1.2 5.8242e-15 8 -3.908e-14)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0.99\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), linear-gradient(26.565deg, rgb(83, 56, 158) 8.3333%, rgb(105, 65, 198) 91.667%)" }}>
      <div className="absolute h-[3.2px] left-[3.2px] top-[1.6px] w-[9.6px]" data-name="Reflection">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 3.2">
          <path d={svgPaths.p29911df0} fill="url(#paint0_linear_1163_44504)" fillOpacity="0.4" id="Reflection" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1163_44504" x1="4.8" x2="4.8" y1="0" y2="3.2">
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
  return <div className="absolute backdrop-blur-[2.5px] bg-[rgba(255,255,255,0.2)] bottom-0 left-0 right-0 rounded-bl-[8px] rounded-br-[8px] top-1/2" data-name="Blur" />;
}

function Content() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Content" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(10, 13, 18, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g clipPath="url(#clip0_1163_44407)" id="Grid" opacity="0.14">
            <path clipRule="evenodd" d={svgPaths.p312a9a00} fill="var(--fill-0, #0A0D12)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <clipPath id="clip0_1163_44407">
              <rect fill="white" height="32" width="32" />
            </clipPath>
          </defs>
        </svg>
        <Palantir />
        <Blur />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0.5px_0px_rgba(10,13,18,0.1)]" />
      <div aria-hidden="true" className="absolute border-[0.2px] border-[rgba(10,13,18,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(10,13,18,0.13),0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" />
    </div>
  );
}

function Logotype() {
  return (
    <div className="absolute inset-[0_0_0_30.22%]" data-name="Logotype">
      <div className="absolute bottom-[27.46%] left-0 top-[23.82%] w-[96.673px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96.6729 15.5895">
          <g id="Vector">
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
          </g>
        </svg>
      </div>
    </div>
  );
}

function LogoWrap() {
  return (
    <div className="h-[32px] relative shrink-0 w-[139px]" data-name="Logo wrap">
      <div className="absolute content-stretch flex inset-[0_76.98%_0_0] items-start" data-name="Logomark">
        <Content />
      </div>
      <Logotype />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[12px] relative w-full">
          <div className="content-stretch flex items-start relative shrink-0 w-[139px]" data-name="Logo">
            <LogoWrap />
          </div>
          <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="_Nav menu button">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="menu-01">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Icon">
                <div className="absolute inset-[-8.33%_-5.56%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                    <path d="M1 7H19M1 1H19M1 13H19" id="Icon" stroke="var(--stroke-0, #414651)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-center justify-center left-0 right-0 top-0" data-name="Header">
      <Container />
    </div>
  );
}

function HeadingAndSubheading() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semibold',sans-serif] gap-[12px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="leading-[20px] relative shrink-0 text-[#6941c6] text-[14px] w-full">13 Jan 2025 • 10 min read</p>
      <p className="leading-[44px] relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">Our top 10 Javascript frameworks to use</p>
    </div>
  );
}

function HeadingAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Heading and supporting text">
      <HeadingAndSubheading />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#535862] text-[18px] w-full">JavaScript frameworks make development easy with extensive features and functionalities.</p>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[24px] not-italic relative shrink-0 text-[16px]" data-name="Text and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] relative shrink-0 text-[#181d27]">Drew Cano</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#535862]">Frontend Engineer</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px min-w-px relative self-stretch" data-name="Content">
      <HeadingAndSupportingText />
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Avatar label group">
        <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[48px]" data-name="Avatar">
          <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
            <div className="absolute bg-[#d9e5cc] inset-0 rounded-[9999px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[9999px] size-full" src={imgAvatar} />
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 rounded-[9999px]" />
        </div>
        <TextAndSupportingText />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start px-[16px] relative w-full">
        <Content1 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="flex-[1_0_0] h-[400px] min-h-px min-w-px relative" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start px-[16px] relative w-full">
        <Image />
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start py-[64px] relative shrink-0 w-full" data-name="Header section">
      <Container1 />
      <Container2 />
    </div>
  );
}

function PaddingBottom() {
  return <div className="content-stretch flex flex-col h-[16px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop() {
  return <div className="content-stretch flex flex-col h-[40px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function Image1() {
  return (
    <div className="aspect-[360/240] relative rounded-[12px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImage1} />
    </div>
  );
}

function Caption() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Caption">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#535862] text-[0px] text-[14px] whitespace-pre-wrap">
        <span className="leading-[20px]">{`Image courtesy of Laura Davidson via `}</span>
        <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[20px] underline" href="https://unsplash.com/photos/QBAH4IldaZY">
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[20px]" href="https://unsplash.com/photos/QBAH4IldaZY">
            Unsplash
          </span>
        </a>
      </p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Content">
      <Image1 />
      <Caption />
    </div>
  );
}

function PaddingBottom1() {
  return <div className="content-stretch flex flex-col h-[40px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function QuoteWrap() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px py-[8px] relative whitespace-pre-wrap" data-name="Quote wrap">
      <p className="font-['Inter:Medium_Italic',sans-serif] font-medium italic leading-[30px] min-w-full relative shrink-0 text-[#181d27] text-[20px] w-[min-content]">“In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.”</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-full not-italic relative shrink-0 text-[#535862] text-[16px] w-[min-content]">— Olivia Rhye, Product Designer</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex items-center justify-center relative self-stretch shrink-0 w-[2px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-90">
          <div className="h-full relative w-[346px]" data-name="Divider">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 244 2">
              <path clipRule="evenodd" d="M244 2H0V0H244V2Z" fill="var(--fill-0, #7F56D9)" fillRule="evenodd" id="Divider" />
            </svg>
          </div>
        </div>
      </div>
      <QuoteWrap />
    </div>
  );
}

function PaddingBottom2() {
  return <div className="content-stretch flex flex-col h-[40px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop1() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom3() {
  return <div className="content-stretch flex flex-col h-[12px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop2() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom4() {
  return <div className="content-stretch flex flex-col h-[12px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop3() {
  return <div className="content-stretch flex flex-col h-[40px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function Image2() {
  return (
    <div className="aspect-[360/240] relative rounded-[12px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImage2} />
    </div>
  );
}

function Caption1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Caption">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="link-01">
        <div className="absolute inset-[11.49%]" data-name="Icon">
          <div className="absolute inset-[-6.09%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8235 13.8235">
              <path d={svgPaths.p1bb26a80} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#535862] text-[0px] text-[14px] whitespace-pre-wrap">
        <span className="leading-[20px]">{`Image courtesy of Fauxels via `}</span>
        <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[20px] underline" href="https://www.pexels.com/photo/photo-of-woman-leaning-on-wooden-table-3182746/">
          <span className="[text-decoration-skip-ink:none] decoration-solid leading-[20px]" href="https://www.pexels.com/photo/photo-of-woman-leaning-on-wooden-table-3182746/">
            Pexels
          </span>
        </a>
      </p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Content">
      <Image2 />
      <Caption1 />
    </div>
  );
}

function PaddingBottom5() {
  return <div className="content-stretch flex flex-col h-[40px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop4() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom6() {
  return <div className="content-stretch flex flex-col h-[12px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function Content6() {
  return (
    <div className="bg-[#fafafa] relative rounded-[16px] shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[24px] relative w-full">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
          <p className="font-['Inter:Semibold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#181d27] text-[20px] w-full whitespace-pre-wrap">Heading text</p>
          <PaddingBottom6 />
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
          <div className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#535862] text-[18px] w-full whitespace-pre-wrap">
            <p className="mb-[18px]">Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p>
            <p className="mb-[18px]">Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p>
            <p>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaddingBottom7() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function TextPadding() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px]">Copy link</p>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Social links">
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="copy-01">
            <div className="absolute inset-[8.33%]" data-name="Icon">
              <div className="absolute inset-[-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                  <path d={svgPaths.p32ae400} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
          <TextPadding />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Platform=X (Twitter), Style=Gray, State=Default">
            <div className="-translate-x-1/2 absolute aspect-[22.981643676757812/22] bottom-[6.25%] left-1/2 top-[6.25%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.2809 17.5">
                <path clipRule="evenodd" d={svgPaths.p3b289f80} fill="var(--fill-0, #A4A7AE)" fillRule="evenodd" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Platform=Facebook, Style=Gray, State=Default">
            <div className="absolute inset-[0_0_0.61%_0]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19.8785">
                <path d={svgPaths.p24dd3180} fill="var(--fill-0, #A4A7AE)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Platform=LinkedIn, Style=Gray, State=Default">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Group">
                <path d={svgPaths.p3fb91680} fill="var(--fill-0, #A4A7AE)" id="Vector" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
    </div>
  );
}

function SocialLinksWrap() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[24px] relative shrink-0 w-full" data-name="Social links wrap">
      <div aria-hidden="true" className="absolute border-[#e9eaeb] border-solid border-t inset-0 pointer-events-none" />
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#535862] text-[16px] w-[min-content] whitespace-pre-wrap">Share this post</p>
      <SocialLinks />
    </div>
  );
}

function RichText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Rich text">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <p className="font-['Inter:Semibold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full whitespace-pre-wrap">Introduction</p>
        <PaddingBottom />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-pre-wrap">
          <p className="mb-[16px]">Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
          <p>{`Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat. `}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop />
        <Content3 />
        <PaddingBottom1 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <Content4 />
        <PaddingBottom2 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-pre-wrap">
          <p className="mb-[16px]">Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</p>
          <p className="mb-[16px]">Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.</p>
          <p>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop1 />
        <p className="font-['Inter:Semibold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#181d27] text-[20px] w-full whitespace-pre-wrap">Software and tools</p>
        <PaddingBottom3 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-pre-wrap">
          <p className="mb-[16px]">Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
          <p>{`Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat. `}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop2 />
        <p className="font-['Inter:Semibold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#181d27] text-[20px] w-full whitespace-pre-wrap">Other resources</p>
        <PaddingBottom4 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-pre-wrap">
          <p className="leading-[24px] mb-[16px]">Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.</p>
          <ol>
            <li className="mb-0 ms-[24px]">
              <span className="leading-[24px]">Lectus id duis vitae porttitor enim gravida morbi.</span>
            </li>
            <li className="mb-0 ms-[24px]">
              <span className="leading-[24px]">Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</span>
            </li>
            <li className="ms-[24px]">
              <span className="leading-[24px]">Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</span>
            </li>
          </ol>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop3 />
        <Content5 />
        <PaddingBottom5 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#535862] text-[16px] w-full whitespace-pre-wrap">
          <p className="mb-[16px]">Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.</p>
          <p>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop4 />
        <Content6 />
        <PaddingBottom7 />
      </div>
      <SocialLinksWrap />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <RichText />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Content2 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[64px] relative shrink-0 w-full" data-name="Section">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] h-px min-h-px min-w-px relative" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
        <g id="Container">
          <path clipRule="evenodd" d="M359 1H16V0H359V1Z" fill="var(--fill-0, #E9EAEB)" fillRule="evenodd" id="Divider" />
        </g>
      </svg>
    </div>
  );
}

function HeadingAndSupportingText1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full whitespace-pre-wrap" data-name="Heading and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[38px] relative shrink-0 text-[#181d27] text-[30px] w-full">Latest writings</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#535862] text-[18px] w-full">The latest news, technologies, and resources from our team.</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Content7 />
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="aspect-[360/240] relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage3} />
    </div>
  );
}

function IconWrap() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0" data-name="Icon wrap">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow-up-right">
        <div className="absolute inset-[29.17%]" data-name="Icon">
          <div className="absolute inset-[-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingAndIcon() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
      <p className="flex-[1_0_0] font-['Inter:Semibold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#181d27] text-[18px] whitespace-pre-wrap">UX review presentations</p>
      <IconWrap />
    </div>
  );
}

function HeadingAndText() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
      <HeadingAndIcon />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#535862] text-[16px] text-ellipsis w-full whitespace-pre-wrap">How do you create compelling presentations that wow your colleagues and impress your managers?</p>
    </div>
  );
}

function HeadingAndSubheading1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full whitespace-pre-wrap">Olivia Rhye • 20 Jan 2025</p>
      <HeadingAndText />
    </div>
  );
}

function Categories() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
      <div className="bg-[#f9f5ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#e9d7fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] text-center">Design</p>
      </div>
      <div className="bg-[#eef4ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#c7d7fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3538cd] text-[14px] text-center">Research</p>
      </div>
      <div className="bg-[#fdf2fa] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#fcceee] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#c11574] text-[14px] text-center">Presentation</p>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSubheading1 />
      <Categories />
    </div>
  );
}

function Image4() {
  return (
    <div className="aspect-[360/240] relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgImage4} />
    </div>
  );
}

function IconWrap1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0" data-name="Icon wrap">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow-up-right">
        <div className="absolute inset-[29.17%]" data-name="Icon">
          <div className="absolute inset-[-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingAndIcon1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
      <p className="flex-[1_0_0] font-['Inter:Semibold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#181d27] text-[18px] whitespace-pre-wrap">Migrating to Linear 101</p>
      <IconWrap1 />
    </div>
  );
}

function HeadingAndText1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
      <HeadingAndIcon1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#535862] text-[16px] text-ellipsis w-full whitespace-pre-wrap">Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.</p>
    </div>
  );
}

function HeadingAndSubheading2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full whitespace-pre-wrap">Phoenix Baker • 19 Jan 2025</p>
      <HeadingAndText1 />
    </div>
  );
}

function Categories1() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
      <div className="bg-[#f0f9ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#b9e6fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#026aa2] text-[14px] text-center">Product</p>
      </div>
      <div className="bg-[#fdf2fa] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#fcceee] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#c11574] text-[14px] text-center">Tools</p>
      </div>
      <div className="bg-[#fdf2fa] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#fcceee] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#c11574] text-[14px] text-center">SaaS</p>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSubheading2 />
      <Categories1 />
    </div>
  );
}

function Posts() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Posts">
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[320px]" data-name="Blog post card">
        <Image3 />
        <Content9 />
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[320px]" data-name="Blog post card">
        <Image4 />
        <Content10 />
      </div>
    </div>
  );
}

function Arrows() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Arrows">
      <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="_Testiomonial carousel arrow">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrow-left">
          <div className="absolute inset-[20.83%]" data-name="Icon">
            <div className="absolute inset-[-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                <path d={svgPaths.p3ba8b580} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="_Testiomonial carousel arrow">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrow-right">
          <div className="absolute inset-[20.83%]" data-name="Icon">
            <div className="absolute inset-[-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                <path d={svgPaths.p19aed710} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-name="Content">
      <Posts />
      <Arrows />
    </div>
  );
}

function TextPadding1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white">View all posts</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Actions">
      <div className="bg-[#7f56d9] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Buttons/Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[18px] py-[12px] relative w-full">
            <TextPadding1 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[48px] items-start px-[16px] relative w-full">
        <Content8 />
        <Actions />
      </div>
    </div>
  );
}

function HeadingAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full whitespace-pre-wrap" data-name="Heading and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[32px] relative shrink-0 text-[#f7f7f7] text-[24px] w-full">Start growing with Untitled</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#94979c] text-[16px] w-full">Join over 4,000+ startups already growing with Untitled.</p>
    </div>
  );
}

function TextPadding2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white">Get started</p>
    </div>
  );
}

function TextPadding3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#cecfd2] text-[16px]">Chat to us</p>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Actions">
      <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0 w-full" data-name="Buttons/Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[18px] py-[12px] relative w-full">
            <TextPadding2 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(12,14,18,0.18),inset_0px_-2px_0px_0px_rgba(12,14,18,0.05)]" />
        <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
      </div>
      <div className="bg-[#0c0e12] relative rounded-[8px] shrink-0 w-full" data-name="Buttons/Button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[18px] py-[12px] relative w-full">
            <TextPadding3 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(12,14,18,0.18),inset_0px_-2px_0px_0px_rgba(12,14,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#373a41] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText2 />
      <Actions1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Content11 />
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Overview</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Features</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Solutions</p>
        </div>
        <div className="bg-[#0c0e12] content-stretch flex items-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
          <div aria-hidden="true" className="absolute border border-[#373a41] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#cecfd2] text-[12px] text-center">New</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Tutorials</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Pricing</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Releases</p>
        </div>
      </div>
    </div>
  );
}

function FooterLinks1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">About us</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Careers</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Press</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">News</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Media kit</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Contact</p>
        </div>
      </div>
    </div>
  );
}

function FooterLinks2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Blog</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Newsletter</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Events</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Help centre</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Tutorials</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Support</p>
        </div>
      </div>
    </div>
  );
}

function FooterLinks3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Startups</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Enterprise</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Government</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">SaaS centre</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Marketplaces</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Ecommerce</p>
        </div>
      </div>
    </div>
  );
}

function FooterLinks4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Twitter</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">LinkedIn</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Facebook</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">GitHub</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">AngelList</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Dribbble</p>
        </div>
      </div>
    </div>
  );
}

function FooterLinks5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Footer links">
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Terms</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Privacy</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Cookies</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Licenses</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Settings</p>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
        <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px]">Contact</p>
        </div>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[96px] relative" data-name="_Footer links column">
        <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full whitespace-pre-wrap">Product</p>
        <FooterLinks />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[96px] relative" data-name="_Footer links column">
        <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full whitespace-pre-wrap">Company</p>
        <FooterLinks1 />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[96px] relative" data-name="_Footer links column">
        <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full whitespace-pre-wrap">Resources</p>
        <FooterLinks2 />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[96px] relative" data-name="_Footer links column">
        <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full whitespace-pre-wrap">Use cases</p>
        <FooterLinks3 />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[96px] relative" data-name="_Footer links column">
        <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full whitespace-pre-wrap">Social</p>
        <FooterLinks4 />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-[96px] relative" data-name="_Footer links column">
        <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#94979c] text-[14px] w-full whitespace-pre-wrap">Legal</p>
        <FooterLinks5 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Content12 />
      </div>
    </div>
  );
}

function Palantir1() {
  return (
    <div className="absolute inset-1/4 overflow-clip rounded-[999px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" data-name="Palantir" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.05000000074505806\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-7.1653e-16 0.7 -0.7 -8.3703e-17 8 4.6)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.18000000715255737\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(4.8986e-17 0.8 -0.8 4.8986e-17 8 8)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.7466\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.07999999821186066\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-3.8354e-16 1.2 -1.2 5.8242e-15 8 -3.908e-14)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0.99\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), linear-gradient(26.565deg, rgb(83, 56, 158) 8.3333%, rgb(105, 65, 198) 91.667%)" }}>
      <div className="absolute h-[3.2px] left-[3.2px] top-[1.6px] w-[9.6px]" data-name="Reflection">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 3.2">
          <path d={svgPaths.p29911df0} fill="url(#paint0_linear_1163_44504)" fillOpacity="0.4" id="Reflection" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1163_44504" x1="4.8" x2="4.8" y1="0" y2="3.2">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Blur1() {
  return <div className="absolute backdrop-blur-[2.5px] bg-[rgba(255,255,255,0.2)] bottom-0 left-0 right-0 rounded-bl-[8px] rounded-br-[8px] top-1/2" data-name="Blur" />;
}

function Content14() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Content" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(10, 13, 18, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g clipPath="url(#clip0_1163_44407)" id="Grid" opacity="0.14">
            <path clipRule="evenodd" d={svgPaths.p312a9a00} fill="var(--fill-0, #0A0D12)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <clipPath id="clip0_1163_44407">
              <rect fill="white" height="32" width="32" />
            </clipPath>
          </defs>
        </svg>
        <Palantir1 />
        <Blur1 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0.5px_0px_rgba(10,13,18,0.1)]" />
      <div aria-hidden="true" className="absolute border-[0.2px] border-[rgba(10,13,18,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(10,13,18,0.13),0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" />
    </div>
  );
}

function Logotype1() {
  return (
    <div className="absolute inset-[0_0_0_30.22%]" data-name="Logotype">
      <div className="absolute bottom-[27.46%] left-0 top-[23.82%] w-[96.673px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96.6729 15.5895">
          <g id="Vector">
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
          </g>
        </svg>
      </div>
    </div>
  );
}

function LogoWrap1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[139px]" data-name="Logo wrap">
      <div className="absolute content-stretch flex inset-[0_76.98%_0_0] items-start" data-name="Logomark">
        <Content14 />
      </div>
      <Logotype1 />
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[32px] relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#22262f] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start relative shrink-0 w-[139px]" data-name="Logo">
        <LogoWrap1 />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-full not-italic relative shrink-0 text-[#94979c] text-[16px] w-[min-content] whitespace-pre-wrap">© 2077 Untitled UI. All rights reserved.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[16px] relative w-full">
        <Content13 />
      </div>
    </div>
  );
}

export default function Mobile() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Mobile">
      <button className="block cursor-pointer h-[72px] relative shrink-0 w-full z-[5]" data-name="Dropdown header navigation">
        <Header />
      </button>
      <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full z-[4]" data-name="Blog post page header">
        <HeaderSection />
        <Section />
      </div>
      <div className="content-stretch flex items-start justify-center relative shrink-0 w-full z-[3]" data-name="–––– Section divider ––––">
        <Container4 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-col gap-[48px] items-center overflow-clip py-[64px] relative shrink-0 w-full z-[2]" data-name="Blog section">
        <Container5 />
        <Container6 />
      </div>
      <div className="bg-[#0c0e12] content-stretch flex flex-col gap-[48px] items-center overflow-clip py-[48px] relative shrink-0 w-full z-[1]" data-name="Footer">
        <Container7 />
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}