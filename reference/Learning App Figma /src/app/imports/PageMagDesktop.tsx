import svgPaths from "./svg-w0qty5uysy";
import clsx from "clsx";
import img from "figma:asset/12e57dc8c26ffbd65d754a3814aa245e717c32a7.png";
import img1 from "figma:asset/4f7cb156af7440d6883d7ce6e71818b4d55fde88.png";
import img2 from "figma:asset/0f4f2fcb6049962790ac0a2810925489622b792c.png";
import img3 from "figma:asset/9f4ea61beb99ae8c2da093d59eccf06f640e117f.png";
import img4 from "figma:asset/ec3b79fff1564d645f4f2bda89407b5d61d9afd9.png";
import img5 from "figma:asset/54e0943ca661c94f801320e0a56b7ad7c9f5f2c3.png";
import img6 from "figma:asset/13457bf8f55c5d1208119bcb3d1d5e50d7f33851.png";
type ButtonWrapBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonWrapBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonWrapBackgroundImageProps>) {
  return (
    <div className={clsx("basis-0 content-stretch flex grow h-[20px] items-center min-h-px min-w-px relative shrink-0", additionalClassNames)}>
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
        {children}
      </div>
    </div>
  );
}

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full">
      <div className="max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[32px] py-0 relative w-full">{children}</div>
      </div>
    </div>
  );
}

function ContainerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="absolute inset-[20.83%]" data-name="Icon">
        <div className="absolute inset-[-7.14%]" style={{ "--stroke-0": "rgba(164, 167, 174, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            {children}
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconWrapBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[2px] px-0 relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow-up-right">
        <div className="absolute inset-[29.17%]" data-name="Icon">
          <div className="absolute inset-[-10%]" style={{ "--stroke-0": "rgba(164, 167, 174, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              {children}
            </svg>
          </div>
        </div>
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
type TextPaddingBackgroundImageAndTextProps = {
  text: string;
};

function TextPaddingBackgroundImageAndText({ text }: TextPaddingBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white">{text}</p>
    </div>
  );
}
type ContainerPaginationNumberBaseBackgroundImageAndTextProps = {
  text: string;
};

function ContainerPaginationNumberBaseBackgroundImageAndText({ text }: ContainerPaginationNumberBaseBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-start overflow-clip relative rounded-[9999px] shrink-0">
      <div className="content-stretch flex items-center justify-center p-[12px] relative rounded-[20px] shrink-0 size-[40px]" data-name="Content">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717680] text-[14px] text-center text-nowrap">{text}</p>
      </div>
    </div>
  );
}

function CategoriesBackgroundImage() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full">
      <BadgeBackgroundImageAndText1 text="Design" />
      <BadgeBackgroundImageAndText2 text="Research" />
    </div>
  );
}
type BadgeBackgroundImageAndText2Props = {
  text: string;
};

function BadgeBackgroundImageAndText2({ text }: BadgeBackgroundImageAndText2Props) {
  return (
    <div className="bg-[#eef4ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#c7d7fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3538cd] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndText1Props = {
  text: string;
};

function BadgeBackgroundImageAndText1({ text }: BadgeBackgroundImageAndText1Props) {
  return (
    <div className="bg-[#f9f5ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e9d7fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
};

function BadgeBackgroundImageAndText({ text }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#fdf2fa] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#fcceee] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#c11574] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ContentBadgeBackgroundImageAndTextProps = {
  text: string;
};

function ContentBadgeBackgroundImageAndText({ text }: ContentBadgeBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#f0f9ff] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#b9e6fe] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#026aa2] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ContentHeadingAndSubheadingBackgroundImageProps = {
  text: string;
  text1: string;
  text2: string;
};

function ContentHeadingAndSubheadingBackgroundImage({ text, text1, text2, children }: React.PropsWithChildren<ContentHeadingAndSubheadingBackgroundImageProps>) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full">{text}</p>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
          <p className="basis-0 font-['Inter:Semibold',sans-serif] grow leading-[28px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[18px]">{text1}</p>
          <IconWrapBackgroundImage>{children}</IconWrapBackgroundImage>
        </div>
        <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">{text2}</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-start flex flex-wrap gap-[48px_32px] items-start relative shrink-0 w-full" data-name="Content">
      <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[320px] relative shrink-0" data-name="Blog post card">
        <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img} />
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
          <ContentHeadingAndSubheadingBackgroundImage text="Phoenix Baker • 19 Jan 2025" text1="Migrating to Linear 101" text2="Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.">
            <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </ContentHeadingAndSubheadingBackgroundImage>
          <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
            <ContentBadgeBackgroundImageAndText text="Product" />
            <BadgeBackgroundImageAndText text="Tools" />
            <BadgeBackgroundImageAndText text="SaaS" />
          </div>
        </div>
      </div>
      <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[320px] relative shrink-0" data-name="Blog post card">
        <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img1} />
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
          <ContentHeadingAndSubheadingBackgroundImage text="Lana Steiner • 18 Jan 2025" text1="Building your API stack" text2="The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.">
            <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </ContentHeadingAndSubheadingBackgroundImage>
          <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
            <div className="bg-[#ecfdf3] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
              <div aria-hidden="true" className="absolute border border-[#abefc6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#067647] text-[14px] text-center text-nowrap">Software Development</p>
            </div>
            <BadgeBackgroundImageAndText text="Tools" />
          </div>
        </div>
      </div>
      <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[320px] relative shrink-0" data-name="Blog post card">
        <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img2} />
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
          <ContentHeadingAndSubheadingBackgroundImage text="Alec Whitten • 17 Jan 2025" text1="Bill Walsh leadership lessons" text2="Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?">
            <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </ContentHeadingAndSubheadingBackgroundImage>
          <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
            <BadgeBackgroundImageAndText1 text="Leadership" />
            <div className="bg-[#f8f9fc] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
              <div aria-hidden="true" className="absolute border border-[#d5d9eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#363f72] text-[14px] text-center text-nowrap">Management</p>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[320px] relative shrink-0" data-name="Blog post card">
        <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img3} />
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
          <ContentHeadingAndSubheadingBackgroundImage text="Demi Wilkinson • 16 Jan 2025" text1="PM mental models" text2="Mental models are simple expressions of complex processes or relationships.">
            <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </ContentHeadingAndSubheadingBackgroundImage>
          <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
            <ContentBadgeBackgroundImageAndText text="Product" />
            <BadgeBackgroundImageAndText2 text="Research" />
            <div className="bg-[#fef6ee] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
              <div aria-hidden="true" className="absolute border border-[#f9dbaf] border-solid inset-0 pointer-events-none rounded-[9999px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b93815] text-[14px] text-center text-nowrap">Frameworks</p>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[320px] relative shrink-0" data-name="Blog post card">
        <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img4} />
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
          <ContentHeadingAndSubheadingBackgroundImage text="Candice Wu • 15 Jan 2025" text1="What is wireframing?" text2="Introduction to Wireframing and its Principles. Learn from the best in the industry.">
            <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </ContentHeadingAndSubheadingBackgroundImage>
          <CategoriesBackgroundImage />
        </div>
      </div>
      <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[320px] relative shrink-0" data-name="Blog post card">
        <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img5} />
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
          <ContentHeadingAndSubheadingBackgroundImage text="Natali Craig • 14 Jan 2025" text1="How collaboration makes us better designers" text2="Collaboration can make our teams stronger, and our individual designs better.">
            <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </ContentHeadingAndSubheadingBackgroundImage>
          <CategoriesBackgroundImage />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center max-w-[inherit] px-[32px] py-0 relative w-full">
          <div className="content-stretch flex flex-col gap-[16px] items-start min-w-[320px] relative shrink-0 w-full" data-name="Blog post card">
            <div className="aspect-[384/256] relative rounded-[16px] shrink-0 w-full" data-name="Image">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={img6} />
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
                <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6941c6] text-[14px] w-full">Olivia Rhye • 20 Jan 2025</p>
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Heading and text">
                  <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and icon">
                    <p className="basis-0 font-['Inter:Semibold',sans-serif] grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#181d27] text-[24px]">UX review presentations</p>
                    <IconWrapBackgroundImage>
                      <path d="M1 11L11 1M11 1H1M11 1V11" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </IconWrapBackgroundImage>
                  </div>
                  <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[16px] w-full">How do you create compelling presentations that wow your colleagues and impress your managers?</p>
                </div>
              </div>
              <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-name="Categories">
                <BadgeBackgroundImageAndText1 text="Design" />
                <BadgeBackgroundImageAndText2 text="Research" />
                <BadgeBackgroundImageAndText text="Presentation" />
              </div>
            </div>
          </div>
          <Content />
          <div className="content-stretch flex gap-[20px] items-center justify-center pb-0 pt-[20px] px-0 relative shrink-0 w-full" data-name="Pagination">
            <div aria-hidden="true" className="absolute border-[#e9eaeb] border-[1px_0px_0px] border-solid inset-[-1px_0_0_0] pointer-events-none" />
            <ButtonWrapBackgroundImage>
              <ContainerBackgroundImage>
                <path d={svgPaths.p3ba8b580} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </ContainerBackgroundImage>
              <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px] text-nowrap">Previous</p>
            </ButtonWrapBackgroundImage>
            <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
              <div className="bg-[#fafafa] overflow-clip relative rounded-[9999px] shrink-0 size-[40px]" data-name="_Pagination number base">
                <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[20px] size-[40px] top-0" data-name="Content">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-center text-nowrap">1</p>
                </div>
              </div>
              <ContainerPaginationNumberBaseBackgroundImageAndText text="2" />
              <ContainerPaginationNumberBaseBackgroundImageAndText text="3" />
              <ContainerPaginationNumberBaseBackgroundImageAndText text="..." />
              <ContainerPaginationNumberBaseBackgroundImageAndText text="8" />
              <ContainerPaginationNumberBaseBackgroundImageAndText text="9" />
              <ContainerPaginationNumberBaseBackgroundImageAndText text="10" />
            </div>
            <ButtonWrapBackgroundImage additionalClassNames="justify-end">
              <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#535862] text-[14px] text-nowrap">Next</p>
              <ContainerBackgroundImage>
                <path d={svgPaths.p19aed710} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </ContainerBackgroundImage>
            </ButtonWrapBackgroundImage>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-96px] pb-[96px] pt-0 px-0 relative shrink-0 w-full" data-name="Section">
      <Container />
    </div>
  );
}

function BlogPageHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip pb-[96px] pt-0 px-0 relative shrink-0 w-[1440px]" data-name="Blog page header">
      <div className="bg-[#55a1b4] content-stretch flex flex-col items-center mb-[-96px] overflow-clip pb-[160px] pt-[96px] px-0 relative shrink-0 w-full" data-name="Header section">
        <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
          <div className="flex flex-col items-center max-w-[inherit] size-full">
            <div className="content-stretch flex flex-col items-center max-w-[inherit] px-[32px] py-0 relative w-full">
              <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-full" data-name="Content">
                <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-center w-full" data-name="Heading and supporting text">
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
                    <p className="font-['Oswald:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e9d7fe] text-[16px] tracking-[0.3px] w-full">Blog</p>
                    <p className="font-['League_Spartan:ExtraBold',sans-serif] font-extrabold leading-[74.24px] relative shrink-0 text-[#fafafa] text-[64px] tracking-[-1.28px] w-full">Bibliothèque de Ressources</p>
                  </div>
                  <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[30px] relative shrink-0 text-[#fdfdfd] text-[18px] w-full">Abonnez-vous pour découvrir les nouvelles fonctionnalités des produits, les dernières technologies, solutions et mises à jour</p>
                </div>
                <div className="content-stretch flex gap-[16px] items-start justify-center max-w-[480px] relative shrink-0 w-full" data-name="Email capture">
                  <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="TLS/InputField">
                    <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start p-0 relative shrink-0 w-full" data-name="Input field">
                      <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
                        <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
                          <div aria-hidden="true" className="absolute border border-[#a4a7ae] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative w-full">
                              <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
                                <p className="basis-0 font-['Nunito:Regular',sans-serif] font-normal grow leading-[normal] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-left text-nowrap">{`Input text `}</p>
                              </div>
                              <div className="shrink-0 size-[16px]" data-name="Help icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="TLS/Buttons">
                    <div className="bg-[#55a1b4] h-[40px] relative rounded-[8px] shrink-0 w-[132px]" data-name="Buttons/Button">
                      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit] size-full">
                        <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
                          <p className="font-['Nunito:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[18px] text-nowrap text-white">Get started</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
                      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Section />
    </div>
  );
}

function HeadingAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[768px] not-italic relative shrink-0 text-center w-full" data-name="Heading and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[44px] relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">Sign up for our newsletter</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#535862] text-[20px] w-full">Be the first to know about releases and industry news and insights.</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#717680] text-[16px] text-nowrap">Enter your email</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[12px] relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input />
    </div>
  );
}

function InputField() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input field">
      <InputWithLabel />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#535862] text-[0px] text-[14px] w-full">
        <span>{`We care about your data in our `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">privacy policy</span>.
      </p>
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[18px] py-[12px] relative rounded-[inherit]">
        <TextPaddingBackgroundImageAndText text="Subscribe" />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
    </div>
  );
}

function EmailCapture() {
  return (
    <div className="content-stretch flex gap-[16px] items-start max-w-[480px] relative shrink-0 w-full" data-name="Email capture">
      <InputField />
      <ButtonsButton />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText />
      <EmailCapture />
    </div>
  );
}

function Container1() {
  return (
    <ContainerBackgroundImage1>
      <Content2 />
    </ContainerBackgroundImage1>
  );
}

function Component02NewsletterSection() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col items-center overflow-clip px-0 py-[96px] relative shrink-0 w-full z-[2]" data-name="02 - Newsletter Section">
      <Container1 />
    </div>
  );
}

function Palantir() {
  return (
    <div className="absolute inset-1/4 overflow-clip rounded-[999px] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" data-name="Palantir" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.05000000074505806\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-7.1653e-16 0.7 -0.7 -8.3703e-17 8 4.6)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.18000000715255737\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(4.8986e-17 0.8 -0.8 4.8986e-17 8 8)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.7466\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.07999999821186066\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-3.8354e-16 1.2 -1.2 5.8242e-15 8 -3.908e-14)\\'><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0.99\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(26.565deg, rgb(83, 56, 158) 8.3333%, rgb(105, 65, 198) 91.667%)" }}>
      <div className="absolute h-[3.2px] left-[3.2px] top-[1.6px] w-[9.6px]" data-name="Reflection">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 4">
          <path d={svgPaths.p29911df0} fill="url(#paint0_linear_38_13585)" fillOpacity="0.4" id="Reflection" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_38_13585" x1="4.8" x2="4.8" y1="0" y2="3.2">
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

function Content3() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Content" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(10, 13, 18, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g clipPath="url(#clip0_38_13622)" id="Grid" opacity="0.14">
            <path clipRule="evenodd" d={svgPaths.p312a9a00} fill="var(--fill-0, #0A0D12)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <clipPath id="clip0_38_13622">
              <rect fill="white" height="32" width="32" />
            </clipPath>
          </defs>
        </svg>
        <Palantir />
        <Blur />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-0.5px_0.5px_0px_rgba(10,13,18,0.1)]" />
      <div aria-hidden="true" className="absolute border-[0.2px] border-[rgba(10,13,18,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(10,13,18,0.13),0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_0px_rgba(10,13,18,0.06)]" />
    </div>
  );
}

function Logomark() {
  return (
    <div className="absolute content-stretch flex inset-[0_76.98%_0_0] items-start" data-name="Logomark">
      <Content3 />
    </div>
  );
}

function Logotype() {
  return (
    <div className="absolute inset-[0_0_0_30.22%]" data-name="Logotype">
      <div className="absolute bottom-[27.46%] left-0 top-[23.82%] w-[96.673px]" data-name="Vector">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 16">
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
    </div>
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

function FooterLink2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Pricing" />
    </div>
  );
}

function FooterLink3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Careers" />
    </div>
  );
}

function FooterLink4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Help" />
    </div>
  );
}

function FooterLink5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButtonBackgroundImageAndText text="Privacy" />
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="Footer links">
      <FooterLink />
      <FooterLink1 />
      <FooterLink2 />
      <FooterLink3 />
      <FooterLink4 />
      <FooterLink5 />
    </div>
  );
}

function LogoAndLinks() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start min-w-[560px] relative shrink-0" data-name="Logo and links">
      <Logo />
      <FooterLinks />
    </div>
  );
}

function Content4() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#85888e] text-[16px] text-nowrap">Enter your email</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#0c0e12] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#373a41] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function InputField1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input field">
      <InputWithLabel1 />
    </div>
  );
}

function ButtonsButton1() {
  return (
    <div className="bg-[#7f56d9] relative rounded-[8px] shrink-0" data-name="Buttons/Button">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <TextPaddingBackgroundImageAndText text="Subscribe" />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(12,14,18,0.18),inset_0px_-2px_0px_0px_rgba(12,14,18,0.05)]" />
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.12)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(255,255,255,0)]" />
    </div>
  );
}

function EmailCapture1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Email capture">
      <InputField1 />
      <ButtonsButton1 />
    </div>
  );
}

function Newsletter() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[360px]" data-name="Newsletter">
      <p className="font-['Inter:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f7f7f7] text-[14px] w-full">Start growing with Untitled</p>
      <EmailCapture1 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-start flex flex-wrap gap-[48px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <LogoAndLinks />
      <Newsletter />
    </div>
  );
}

function Container2() {
  return (
    <ContainerBackgroundImage1>
      <Content5 />
    </ContainerBackgroundImage1>
  );
}

function FooterLinks1() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px] text-nowrap" data-name="Footer links">
      <p className="relative shrink-0">Terms</p>
      <p className="relative shrink-0">Privacy</p>
      <p className="relative shrink-0">Cookies</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-center flex flex-wrap gap-[24px] items-center justify-between pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#22262f] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#94979c] text-[16px] text-nowrap">© 2077 Untitled UI. All rights reserved.</p>
      <FooterLinks1 />
    </div>
  );
}

function Container3() {
  return (
    <ContainerBackgroundImage1>
      <Content6 />
    </ContainerBackgroundImage1>
  );
}

function Component03Footer() {
  return (
    <div className="bg-[#0c0e12] content-stretch flex flex-col gap-[64px] items-center overflow-clip pb-[48px] pt-[64px] px-0 relative shrink-0 w-full z-[1]" data-name="03 - Footer">
      <Container2 />
      <Container3 />
    </div>
  );
}

export default function PageMagDesktop() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Page Mag - Desktop">
      <div className="content-stretch flex flex-col items-start relative shrink-0 z-[3]" data-name="01 - Hero Section">
        <BlogPageHeader />
      </div>
      <Component02NewsletterSection />
      <Component03Footer />
    </div>
  );
}