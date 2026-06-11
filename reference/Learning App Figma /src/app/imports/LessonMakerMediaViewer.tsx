import svgPaths from "./svg-v0lpp93hgk";
import clsx from "clsx";
type ContainerBackgroundImage1Props = {
  text: string;
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, text, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className="bg-[#55a1b4] relative rounded-[16.4px] shrink-0 size-[48px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className={clsx("h-[27px] relative shrink-0", additionalClassNames)}>
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.67px] tracking-[-0.4395px]">{text}</p>
          </div>
        </div>
      </div>
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
    <div className={clsx("bg-[rgba(255,255,255,0.7)] relative rounded-[24px] shrink-0 w-full", additionalClassNames)}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[2px] relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage1Props>) {
  return (
    <BackgroundImage additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage>
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
    <div className="h-[28px] relative shrink-0 w-[18px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#252b37] text-[18px] text-nowrap top-[0.33px] tracking-[-0.4395px]">{text}</p>
      </div>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
};

function ButtonBackgroundImageAndText({ text }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className="h-[30px] relative rounded-[10px] shrink-0 w-[242px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[12px] not-italic text-[#252b37] text-[12px] text-nowrap top-[7px]">{text}</p>
      </div>
    </div>
  );
}

function ButtonBackgroundImage() {
  return (
    <div className="bg-[#c8d4d7] h-[45px] opacity-50 relative rounded-[16.4px] shrink-0 w-full">
      <IconBackgroundImage />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[419.88px] not-italic text-[14px] text-center text-nowrap text-white top-[12px] tracking-[-0.1504px] translate-x-[-50%]">{`Valider l'exercice`}</p>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <div className="absolute left-[333.38px] size-[20px] top-[12.5px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_264_625)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_264_625">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
type TextAreaBackgroundImageAndTextProps = {
  text: string;
};

function TextAreaBackgroundImageAndText({ text }: TextAreaBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#f5f8f8] h-[120px] relative rounded-[16.4px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[16px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] text-nowrap tracking-[-0.1504px]">{text}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerBackgroundImageAndText({ text, additionalClassNames = "" }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className={clsx("bg-[#e0e8ea] h-[26px] relative rounded-[2.23696e+07px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[#0a0a0a] text-[12px] text-nowrap top-[5px]">{text}</p>
      </div>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className="h-[30px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[20px] text-nowrap top-[0.33px] tracking-[-0.4492px]">{text}</p>
    </div>
  );
}

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[27px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.67px] tracking-[-0.4395px]">{text}</p>
      </div>
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
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[8px] not-italic text-[#10b981] text-[12px] text-nowrap top-[5px]">{text}</p>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[2612.75px] left-[356px] top-[56px] w-[294px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[36px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#0a0a0a] text-[30px] text-nowrap tracking-[0.3955px]">✍️</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[225.604px]" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a0a0a] text-[24px] text-nowrap top-[-0.33px]">Interactive Workbook</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[4px] top-[40px] w-[105.406px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#10b981] text-[12px] text-nowrap top-[3px]">Guide Pratique</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[62px] relative shrink-0 w-[225.604px]" data-name="Container">
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
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#6b7280] text-[14px] text-nowrap top-[1.33px] tracking-[-0.1504px]">📌 Pour Exercices Guidés (à terme)</p>
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
    <div className="bg-[#55a1b4] h-[37px] relative rounded-[10px] shrink-0 w-[92.479px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[58.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[-0.1504px] translate-x-[-50%]">Voter</p>
      </div>
    </div>
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
      <TextBackgroundImageAndText text="Interactive exercises" additionalClassNames="left-[24px] w-[135.208px]" />
      <TextBackgroundImageAndText text="Live validation" additionalClassNames="left-[167.21px] w-[98.625px]" />
      <TextBackgroundImageAndText text="Templates" additionalClassNames="left-[273.83px] w-[75.583px]" />
      <TextBackgroundImageAndText text="Analytics" additionalClassNames="left-[357.42px] w-[69.177px]" />
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
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d="M10 2H14V6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 2L9.33333 6.66667" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 14L6.66667 9.33333" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6 14H2V10" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage1>
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

function Heading2() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[45px] left-0 text-[30px] text-nowrap text-white top-[-0.33px]">📝 Workbook Interactif</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] opacity-90 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-0.33px] tracking-[-0.3125px]">Guide complet : Créer sa première campagne</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[77px] relative shrink-0 w-[328.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] opacity-80 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Progression</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[36px] left-0 text-[24px] text-white top-[-0.33px] w-[34px]">0%</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] h-[73px] relative rounded-[16.4px] shrink-0 w-[108.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[16px] relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[77px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return <div className="bg-white h-[12px] shrink-0 w-full" data-name="Container" />;
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] h-[12px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[798px] py-0 relative size-full">
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[177px] relative rounded-[24px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(168.396deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 100%)" }}>
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-0 pt-[32px] px-[32px] relative size-full">
        <Container10 />
        <Container12 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[638px]">Vos objectifs doivent être Spécifiques, Mesurables, Atteignables, Réalistes et Temporels. Exemples concrets : +20% de leads en 3 mois, 1000 nouveaux abonnés newsletter...</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 grow h-[76px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <HeadingBackgroundImageAndText text="Définir vos objectifs SMART" />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage1 text="1" additionalClassNames="w-[8.75px]" />
      <Container14 />
      <ContainerBackgroundImageAndText text="3 min" additionalClassNames="w-[56.625px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#f5f8f8] h-[124.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[0.667px] pt-[24px] px-[24px] relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{`Exercice pratique : Comment allez-vous appliquer "Définir vos objectifs SMART" à votre projet ?`}</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[268px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
        <Label />
        <TextAreaBackgroundImageAndText text="Rédigez votre réponse ici..." />
        <ButtonBackgroundImage />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[396.667px]">
      <Container16 />
      <Container17 />
    </ContainerBackgroundImage>
  );
}

function Paragraph5() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[654px]">{`Créez des personas détaillés : âge, profession, besoins, points de douleur, habitudes d'achat. Utilisez les données analytics et sondages clients.`}</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[76px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <HeadingBackgroundImageAndText text="Identifier votre audience cible" />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[16px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage1 text="2" additionalClassNames="w-[11.104px]" />
      <Container19 />
      <ContainerBackgroundImageAndText text="4 min" additionalClassNames="w-[56.844px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#f5f8f8] content-stretch flex flex-col h-[124.667px] items-start left-[2px] pb-[0.667px] pt-[24px] px-[24px] top-[2px] w-[858px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container20 />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{`Exercice pratique : Comment allez-vous appliquer "Identifier votre audience cible" à votre projet ?`}</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[268px] items-start left-[2px] pb-0 pt-[24px] px-[24px] top-[126.67px] w-[858px]" data-name="Container">
      <Label1 />
      <TextAreaBackgroundImageAndText text="Rédigez votre réponse ici..." />
      <ButtonBackgroundImage />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[396.667px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container21 />
        <Container22 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#55a1b4] relative rounded-[16.4px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.01px] py-0 relative size-full">
        <TextBackgroundImageAndText1 text="3" additionalClassNames="w-[11.573px]" />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[665px]">{`Définissez votre proposition de valeur unique (UVP), le ton de voix, et les messages principaux adaptés à chaque segment d'audience.`}</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 grow h-[76px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <HeadingBackgroundImageAndText text="Créer votre message clé" />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[16px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
      <ContainerBackgroundImageAndText text="5 min" additionalClassNames="w-[56.552px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#f5f8f8] h-[124.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[0.667px] pt-[24px] px-[24px] relative size-full">
        <Container26 />
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{`Exercice pratique : Comment allez-vous appliquer "Créer votre message clé" à votre projet ?`}</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[268px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[24px] px-[24px] relative size-full">
        <Label2 />
        <TextAreaBackgroundImageAndText text="Rédigez votre réponse ici..." />
        <ButtonBackgroundImage />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[396.667px]">
      <Container27 />
      <Container28 />
    </ContainerBackgroundImage>
  );
}

function Paragraph7() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[669px]">Email, réseaux sociaux, publicité payante, content marketing... Sélectionnez en fonction de où se trouve votre audience et votre budget.</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="basis-0 grow h-[76px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <HeadingBackgroundImageAndText text="Choisir vos canaux de diffusion" />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[16px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage1 text="4" additionalClassNames="w-[11.896px]" />
      <Container30 />
      <ContainerBackgroundImageAndText text="2 min" additionalClassNames="w-[56.333px]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[#f5f8f8] content-stretch flex flex-col h-[124.667px] items-start left-[2px] pb-[0.667px] pt-[24px] px-[24px] top-[2px] w-[858px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container31 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{`Exercice pratique : Comment allez-vous appliquer "Choisir vos canaux de diffusion" à votre projet ?`}</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[268px] items-start left-[2px] pb-0 pt-[24px] px-[24px] top-[126.67px] w-[858px]" data-name="Container">
      <Label3 />
      <TextAreaBackgroundImageAndText text="Rédigez votre réponse ici..." />
      <ButtonBackgroundImage />
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[396.667px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container32 />
        <Container33 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6b7280] text-[14px] top-0 tracking-[-0.1504px] w-[616px]">Définissez vos KPIs, mettez en place le tracking, lancez par phases tests, analysez et optimisez continuellement vos campagnes.</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="basis-0 grow h-[76px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <HeadingBackgroundImageAndText text="Lancer et mesurer les résultats" />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[16px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage1 text="5" additionalClassNames="w-[11.479px]" />
      <Container35 />
      <ContainerBackgroundImageAndText text="1 min" additionalClassNames="w-[54.719px]" />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[#f5f8f8] content-stretch flex flex-col h-[124.667px] items-start left-[2px] pb-[0.667px] pt-[24px] px-[24px] top-[2px] w-[858px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container36 />
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{`Exercice pratique : Comment allez-vous appliquer "Lancer et mesurer les résultats" à votre projet ?`}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[268px] items-start left-[2px] pb-0 pt-[24px] px-[24px] top-[126.67px] w-[858px]" data-name="Container">
      <Label4 />
      <TextAreaBackgroundImageAndText text="Rédigez votre réponse ici..." />
      <ButtonBackgroundImage />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[396.667px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container37 />
        <Container38 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[2079.333px] items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container23 />
      <Container29 />
      <Container34 />
      <Container39 />
    </div>
  );
}

function GuideInteractiveWorkbook() {
  return (
    <div className="bg-white h-[2352.333px] relative shrink-0 w-full" data-name="GuideInteractiveWorkbook">
      <div className="content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[32px] px-[32px] relative size-full">
        <Container13 />
        <Container40 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[2402px]">
      <Container7 />
      <GuideInteractiveWorkbook />
    </ContainerBackgroundImage>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[2612.75px] items-start left-[674px] top-[56px] w-[930px]" data-name="Container">
      <Container6 />
      <Container41 />
    </div>
  );
}

function SandboxRessources() {
  return (
    <div className="absolute bg-white h-[2684.75px] left-0 top-0 w-[1960px]" data-name="SandboxRessources">
      <Container />
      <Container42 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27px] relative shrink-0 w-[95.938px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['League_Spartan:Bold',sans-serif] font-bold leading-[27px] left-0 text-[#0a0a0a] text-[18px] text-nowrap top-[-0.33px]">Propositions</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-[#e8f4f7] h-[26px] relative rounded-[2.23696e+07px] shrink-0 w-[30.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[8px] not-italic text-[#55a1b4] text-[12px] text-nowrap top-[5px]">16</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex h-[27px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Text3 />
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[#55a1b4] grow min-h-px min-w-px relative rounded-[10px] shrink-0 w-[242px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[12px] text-nowrap text-white top-[7px]">📘 Guides</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[174px] items-start relative shrink-0 w-full" data-name="Container">
      <ButtonBackgroundImageAndText text="📚 Toutes" />
      <ButtonBackgroundImageAndText text="📊 Infographies" />
      <ButtonBackgroundImageAndText text="🎥 Vidéos" />
      <ButtonBackgroundImageAndText text="💡 Astuces" />
      <Button1 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[253.667px] items-start left-0 pb-[0.667px] pt-[24px] px-[24px] top-0 w-[290px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container46() {
  return (
    <div className="basis-0 grow h-[41px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <ParagraphBackgroundImageAndText text="Vertical Feed" />
        <ParagraphBackgroundImageAndText1 text="Guide Pratique" />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📘" />
      <Container46 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <div className="basis-0 grow h-[41px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <ParagraphBackgroundImageAndText text="Digital Notebook" />
        <ParagraphBackgroundImageAndText1 text="Guide Pratique" />
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <TextBackgroundImageAndText2 text="📓" />
      <Container48 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container49 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[28px] relative shrink-0 w-[18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[0.33px] tracking-[-0.4395px]">✍️</p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">Interactive Workbook</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.8)] text-nowrap top-px">Guide Pratique</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 grow h-[41px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p26b72c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage1>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41px] items-start left-[12px] top-[12px] w-[234px]" data-name="Container">
      <Text4 />
      <Container50 />
      <Icon3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#10b981] h-[65px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container51 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[207px] items-start left-[16px] top-[269.67px] w-[258px]" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function SandboxRessources1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] border-2 border-[rgba(255,255,255,0.3)] border-solid h-[496.667px] left-[356px] overflow-clip rounded-[24px] top-[64px] w-[294px]" data-name="SandboxRessources">
      <Container45 />
      <Container52 />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-[12px] top-[8.5px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage1>
  );
}

function Button5() {
  return (
    <div className="bg-[#eef6f8] h-[33px] relative rounded-[10px] shrink-0 w-[97.323px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[61px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-[6px] tracking-[-0.1504px] translate-x-[-50%]">Accueil</p>
      </div>
    </div>
  );
}

function Container53() {
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

function Text5() {
  return (
    <div className="h-[27px] relative shrink-0 w-[18px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[27px] left-0 not-italic text-[#0a0a0a] text-[18px] text-nowrap top-[0.67px] tracking-[-0.4395px]">✍️</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Interactive Workbook</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[27px] relative shrink-0 w-[170.458px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text5 />
        <Text6 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[33px] relative shrink-0 w-[584.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button5 />
        <Container53 />
        <Heading />
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#eef6f8] h-[30px] relative rounded-[10px] shrink-0 w-[374.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[12px] not-italic text-[#6b7280] text-[12px] top-[7px] w-[351px]">3 layouts • 4 infographies + 2 vidéos + 7 astuces + 3 guides</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex h-[33px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Text7 />
    </div>
  );
}

function SandboxRessources2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[49.667px] items-start left-0 pb-[0.667px] pt-[8px] px-[24px] top-0 w-[1960px]" data-name="SandboxRessources">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container56 />
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