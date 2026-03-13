import svgPaths from "./svg-jb75njz153";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";
import imgHeroImage from "figma:asset/df9c3e29e618246d377d0e2a4c1857c9d744d483.png";
import imgHeroImage1 from "figma:asset/76e6f5ecf67a186705359b4f00347f8b04c8da76.png";
import imgImage from "figma:asset/5b9be586e107e29c693d30d01c20fda48e57c02b.png";
import imgImage1 from "figma:asset/1ff12d22120379bb23b5477b0a5e0f539cb7475b.png";
import imgImage2 from "figma:asset/c41a75318f00e9eb3221b839be8b7dee569527c6.png";
import imgImage3 from "figma:asset/4575be13d5e622440a310f5c34cc28e94af47813.png";
import imgImage4 from "figma:asset/fbdcb8627d72709a4f1c9ba72755d2bec8952511.png";
import imgAwardBlock from "figma:asset/0bcf82eb6691528c2de5c1e55b7fc04cff181a64.png";
import imgAwardBlock1 from "figma:asset/c62f1af1fab83475a987c6e8c4446613340ebfcb.png";
import imgAwardBlock2 from "figma:asset/8ef9e5a6b81c2de01053c4b39beb1fa17e08453a.png";
import imgAwardBlock3 from "figma:asset/6890489c8f401f811e93e1252f749e269a2c7609.png";
import imgAwardBlock4 from "figma:asset/e25e65a1d04953d1ddbc8fa6671ec1ad7e344c13.png";

function ImagePolubvi() {
  return (
    <div className="h-[24px] relative shrink-0 w-[96.293px]" data-name="Image (POLUBVI)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImagePolubvi} />
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Menu">
          <g id="Fill">
            <path d={svgPaths.p2c5d6280} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3067a680} fill="var(--fill-0, black)" />
            <path d={svgPaths.p24ae58c0} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Nav() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[20px] pt-[22px] px-[16px] relative w-full">
          <ImagePolubvi />
          <Menu />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[17.143px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1429 17.1429">
        <g clipPath="url(#clip0_78_233)" id="Icon">
          <path d={svgPaths.p1e436700} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_78_233">
            <rect fill="white" height="17.1429" width="17.1429" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex gap-[8.571px] h-[38px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Organizează evenimentul tau cu noi</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
      <Nav />
      <Container />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">De la idee la eveniment memorabil</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame />
    </div>
  );
}

function HeroText() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[16px] top-[127.2px] w-[343px]" data-name="Hero Text">
      <Container1 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[88px] text-center tracking-[-5.28px] uppercase w-[364.914px]">polubvi</p>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="h-[225px] relative shrink-0 w-full z-[2]" data-name="Hero Content">
      <HeroText />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[443px] relative shrink-0 w-full z-[1]">
      <div className="absolute h-[443px] left-0 top-0 w-[375px]" data-name="Hero Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgHeroImage} />
          <div className="absolute bg-repeat bg-size-[500px_500px] bg-top-left inset-0 mix-blend-multiply opacity-[0.21]" style={{ backgroundImage: `url('${imgHeroImage1}')` }} />
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-[187.5px] not-italic text-[15px] text-center text-white top-[118.53px] tracking-[-0.1611px] translate-x-[-50%] w-[200px]">Planifică, gestionează și colaborează cu furnizori într-un singur loc. De la nuntă la zi de naștere - totul organizat inteligent, fără stres și fără haos.</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="content-stretch flex flex-col h-[776px] isolate items-start relative shrink-0 w-full" data-name="Hero">
      <Frame3 />
      <HeroContent />
      <Frame4 />
    </div>
  );
}

function HeadingWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading Wrapper">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[32px] pt-[52px] px-[16px] relative w-full">
        <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[43px] text-center tracking-[-2.58px] uppercase">Totul într-un singur loc</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-white h-[26px] relative rounded-[1.9232e+07px] shrink-0 w-[75px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.9232e+07px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.835px] left-[10px] not-italic text-[#960010] text-[12.626px] text-nowrap top-[5px]">POLUBVI</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">All-in-One</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame1 />
    </div>
  );
}

function ChipsText() {
  return (
    <div className="relative shrink-0 w-full" data-name="Chips & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[20px] py-[28px] relative w-full">
        <Container2 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-[min-content]">Jonglezi cu zeci de aplicații când poți avea totul într-un singur dashboard? Am reunit logistica, designul și comunicarea sub același acoperiș digital.</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-white h-[26px] relative rounded-[1.9232e+07px] shrink-0 w-[75px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.9232e+07px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.835px] left-[10px] not-italic text-[#960010] text-[12.626px] text-nowrap top-[5px]">POLUBVI</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Comoditate</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame2 />
    </div>
  );
}

function ChipsText1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Chips & Text">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[20px] py-[28px] relative w-full">
        <Container3 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-[min-content]">Proiectat pentru cei care prețuiesc timpul. Este singurul instrument care îți permite să treci de la gestionarea bugetului la designul invitației fără să părăsești platforma.</p>
      </div>
    </div>
  );
}

function TextBlocks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text Blocks">
      <ChipsText />
      <div className="h-[353px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <ChipsText1 />
    </div>
  );
}

function Images() {
  return (
    <div className="content-stretch flex flex-col h-[353px] items-start justify-center overflow-clip relative shrink-0 w-full" data-name="Images">
      <div className="h-[400px] relative shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[118.56%] left-[23.36%] max-w-none top-0 w-[86.46%]" src={imgImage1} />
        </div>
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[1112px] relative shrink-0 w-full" data-name="About Content">
      <HeadingWrapper />
      <TextBlocks />
      <Images />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black content-stretch flex h-[48px] items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function About() {
  return (
    <div className="bg-[#960010] relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="About">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center justify-center px-[16px] py-[100px] relative w-full">
          <AboutContent />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black content-stretch flex h-[48px] items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function H2Button() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="H2 & Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none min-w-full not-italic relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-[min-content]">Ce include platforma</p>
      <Button1 />
    </div>
  );
}

function JournalContent() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Journal Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] uppercase w-full">{`01.  Planificare pas cu pas`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Îți oferim un plan clar de organizare, structurat pe etape, astfel încât să știi mereu ce urmează și ce ai deja rezolvat.</p>
    </div>
  );
}

function JournalBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <JournalContent />
    </div>
  );
}

function JournalContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Journal Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] uppercase w-full">{`02.  Controlul bugetului`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Urmărești cheltuielile în timp real, știi exact cât ai alocat și eviți surprizele neplăcute pe parcurs.</p>
    </div>
  );
}

function JournalBlock1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <JournalContent1 />
    </div>
  );
}

function JournalContent2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Journal Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] uppercase w-full">{`03.  Managementul invitaților`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Gestionezi lista de invitați, confirmările de participare și aranjarea la mese într-un mod simplu și organizat, fără liste separate sau confuzii.</p>
    </div>
  );
}

function JournalBlock2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <JournalContent2 />
    </div>
  );
}

function JournalContent3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Journal Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] uppercase w-full">{`04.  Creare invitație digitală`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Creezi invitații digitale personalizate, ușor de distribuit invitaților, cu toate detaliile evenimentului într-un format modern și elegant.</p>
    </div>
  );
}

function JournalBlock3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <JournalContent3 />
    </div>
  );
}

function JournalBlocks() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Journal Blocks">
      <JournalBlock />
      <JournalBlock1 />
      <JournalBlock2 />
      <JournalBlock3 />
    </div>
  );
}

function JournalContent4() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
      <H2Button />
      <JournalBlocks />
    </div>
  );
}

function Journal() {
  return (
    <div className="relative shrink-0 w-full" data-name="Journal">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[16px] py-[100px] relative w-full">
          <JournalContent4 />
        </div>
      </div>
    </div>
  );
}

function H2Button1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="H2 & Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">Cum funcționează</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-white h-[26px] relative rounded-[1.9232e+07px] shrink-0 w-[75px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.9232e+07px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.835px] left-[10px] not-italic text-[#960010] text-[12.626px] text-nowrap top-[5px]">POLUBVI</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Text2 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[21.429px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">De la idee la eveniment memorabil</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[1.9232e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[4px] pr-[10px] py-[3px] relative w-full">
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function TestimonialName() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[560px] relative shrink-0 w-full" data-name="Testimonial & Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Tot ce trebuie să faci este să urmezi câțiva pași simpli, iar platforma te ajută să organizezi evenimentul fără stres sau confuzii.</p>
    </div>
  );
}

function CollaborationHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Collaboration Header">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[40px] items-start px-[20px] py-[32px] relative w-full">
        <Container4 />
        <TestimonialName />
      </div>
    </div>
  );
}

function ValueText() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] w-full">01.</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">
          Creezi cont
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

function ValueText1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] w-full">02.</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">Alegi tipul evenimentului</p>
      </div>
    </div>
  );
}

function ValueTextRow() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Value & Text Row">
      <ValueText />
      <ValueText1 />
    </div>
  );
}

function ValueText2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] w-full">03.</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">
          Completezi detalii
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

function ValueText3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] w-full">04.</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">Organizezi totul într-un singur loc</p>
      </div>
    </div>
  );
}

function ValueTextRow1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Value & Text Row">
      <ValueText2 />
      <ValueText3 />
    </div>
  );
}

function ValueTextGrid() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Value & Text Grid">
      <ValueTextRow />
      <ValueTextRow1 />
    </div>
  );
}

function CollabBlockInfo() {
  return (
    <div className="bg-[rgba(232,232,232,0.5)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collab Block Info">
      <CollaborationHeader />
      <ValueTextGrid />
    </div>
  );
}

function CollabBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start justify-center relative shrink-0 w-[351px]" data-name="Collab Block">
      <CollabBlockInfo />
      <div className="h-[560px] pointer-events-none relative shrink-0 w-full" data-name="Image">
        <div aria-hidden="true" className="absolute inset-0">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage3} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage4} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0" />
      </div>
    </div>
  );
}

function CollabBlocks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Collab Blocks">
      <CollabBlock />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-black content-stretch flex h-[48px] items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function CollabsContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[80px] grow items-center max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Collabs Content">
      <H2Button1 />
      <CollabBlocks />
      <Button2 />
    </div>
  );
}

function Collab() {
  return (
    <div className="bg-[#f5f5f5] relative shrink-0 w-full" data-name="Collab">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[100px] relative w-full">
          <CollabsContent />
        </div>
      </div>
    </div>
  );
}

function H2Button2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="H2 & Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">Ce evenimente poți organiza</p>
    </div>
  );
}

function AwardContent() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock() {
  return (
    <div className="[grid-area:1_/_1] h-[340.994px] min-h-[340.994140625px] overflow-clip relative shrink-0 w-[343px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-[0_0_-0.01px_0]" data-name="Dark Overlay" />
      <AwardContent />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-[calc(50%+0.5px)] not-italic text-[25.073px] text-center text-white top-[294.7px] tracking-[-1.5044px] translate-x-[-50%] uppercase w-[343px]">nunTĂ</p>
    </div>
  );
}

function AwardContent1() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock1() {
  return (
    <div className="[grid-area:2_/_1] h-[340.994px] min-h-[340.994140625px] overflow-clip relative shrink-0 w-[343px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock1} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-[0_0_-0.01px_0]" data-name="Dark Overlay" />
      <AwardContent1 />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-[calc(50%+0.5px)] not-italic text-[25.073px] text-center text-white top-[294.7px] tracking-[-1.5044px] translate-x-[-50%] uppercase w-[343px]">ZI DE NAȘTERE</p>
    </div>
  );
}

function AwardContent2() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock2() {
  return (
    <div className="[grid-area:3_/_1] h-[340.994px] min-h-[340.994140625px] overflow-clip relative shrink-0 w-[343px]" data-name="Award Block">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgAwardBlock1} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgAwardBlock2} />
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-[0_0_-0.01px_0]" data-name="Dark Overlay" />
      <AwardContent2 />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-[calc(50%+0.5px)] not-italic text-[25.073px] text-center text-white top-[294.7px] tracking-[-1.5044px] translate-x-[-50%] uppercase w-[343px]">aniversare</p>
    </div>
  );
}

function AwardContent3() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock3() {
  return (
    <div className="[grid-area:4_/_1] h-[340.994px] min-h-[340.994140625px] overflow-clip relative shrink-0 w-[343px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock3} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-[0_0_-0.01px_0]" data-name="Dark Overlay" />
      <AwardContent3 />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-[calc(50%+0.5px)] not-italic text-[25.073px] text-center text-white top-[294.7px] tracking-[-1.5044px] translate-x-[-50%] uppercase w-[343px]">EVENIMENT CORPORATE</p>
    </div>
  );
}

function AwardContent4() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock4() {
  return (
    <div className="[grid-area:5_/_1] h-[340.994px] min-h-[340.994140625px] overflow-clip relative shrink-0 w-[343px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock4} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-[0_0_-0.01px_0]" data-name="Dark Overlay" />
      <AwardContent4 />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-[calc(50%+0.5px)] not-italic text-[25.073px] text-center text-white top-[294.7px] tracking-[-1.5044px] translate-x-[-50%] uppercase w-[343px]">Botez, baby shower</p>
    </div>
  );
}

function AwardContent5() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock5() {
  return (
    <div className="[grid-area:6_/_1] h-[340.994px] min-h-[340.994140625px] overflow-clip relative shrink-0 w-[343px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHeroImage} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-[0_0_-0.01px_0]" data-name="Dark Overlay" />
      <AwardContent5 />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-[calc(50%+0.5px)] not-italic text-[25.073px] text-center text-white top-[294.7px] tracking-[-1.5044px] translate-x-[-50%] uppercase w-[343px]">Orice eveniment privat</p>
    </div>
  );
}

function AwardBlocks() {
  return (
    <div className="gap-[12.035087585449219px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[repeat(6,_fit-content(100%))] h-[2106.14px] relative shrink-0 w-[343px]" data-name="Award Blocks">
      <AwardBlock />
      <AwardBlock1 />
      <AwardBlock2 />
      <AwardBlock3 />
      <AwardBlock4 />
      <AwardBlock5 />
    </div>
  );
}

function JournalContent5() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
      <H2Button2 />
      <AwardBlocks />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-black content-stretch flex h-[48px] items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function Journal1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Journal">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[16px] py-[100px] relative w-full">
          <JournalContent5 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-white h-[26px] relative rounded-[1.9232e+07px] shrink-0 w-[75px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.9232e+07px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.835px] left-[10px] not-italic text-[#960010] text-[12.626px] text-nowrap top-[5px]">POLUBVI</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Text3 />
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[21.429px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Transformă ideea într-un eveniment reușit</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[1.9232e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[4px] pr-[10px] py-[3px] relative w-full">
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function ChipsHeading() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[280px] relative shrink-0 w-full" data-name="Chips & Heading">
      <Container5 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-center tracking-[-2.58px] uppercase w-full">Încă te gândești?</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-black content-stretch flex h-[48px] items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function Banner() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Banner">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center px-[20px] py-[48px] relative w-full">
          <ChipsHeading />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function BannerContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start max-w-[1112px] min-h-px min-w-px relative shrink-0" data-name="Banner Content">
      <Banner />
    </div>
  );
}

function Banner1() {
  return (
    <div className="bg-[#960010] relative shrink-0 w-full" data-name="Banner">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[160px] relative w-full">
          <BannerContent />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[5.04px] top-[121.49px] w-[364.914px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.78] min-w-full not-italic relative shrink-0 text-[88px] text-center text-white tracking-[-5.28px] uppercase w-[min-content]">polubvi</p>
      <div className="h-0 relative shrink-0 w-[300.429px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.429 1">
            <path d="M0 0.5H300.429" id="Vector 1" stroke="var(--stroke-0, white)" strokeOpacity="0.2" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] min-w-full not-italic relative shrink-0 text-[15px] text-[rgba(255,255,255,0.6)] text-center tracking-[-0.1611px] w-[min-content]">
        {`© 2025 POLUBVI. `}
        <br aria-hidden="true" />
        Toate drepturile rezervate.
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-black h-[333px] overflow-clip relative shrink-0 w-[375px]">
      <Frame6 />
    </div>
  );
}

export default function HomeMobile() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Home - Mobile">
      <Hero />
      <About />
      <Journal />
      <Collab />
      <Journal1 />
      <Banner1 />
      <Frame5 />
    </div>
  );
}