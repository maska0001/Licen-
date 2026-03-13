import svgPaths from "./svg-wvr4iipwpo";
import imgHeroImage from "figma:asset/df9c3e29e618246d377d0e2a4c1857c9d744d483.png";
import imgHeroImage1 from "figma:asset/76e6f5ecf67a186705359b4f00347f8b04c8da76.png";
import imgImage from "figma:asset/15e7421786c3684f033fd6dacee404e5e9f71a22.png";
import imgImage1 from "figma:asset/5b9be586e107e29c693d30d01c20fda48e57c02b.png";
import imgImage2 from "figma:asset/1ff12d22120379bb23b5477b0a5e0f539cb7475b.png";
import imgImage3 from "figma:asset/c41a75318f00e9eb3221b839be8b7dee569527c6.png";
import imgImage4 from "figma:asset/fbdcb8627d72709a4f1c9ba72755d2bec8952511.png";
import imgAwardBlock from "figma:asset/c62f1af1fab83475a987c6e8c4446613340ebfcb.png";
import imgAwardBlock1 from "figma:asset/8ef9e5a6b81c2de01053c4b39beb1fa17e08453a.png";
import imgAwardBlock2 from "figma:asset/6890489c8f401f811e93e1252f749e269a2c7609.png";
import imgAwardBlock3 from "figma:asset/e25e65a1d04953d1ddbc8fa6671ec1ad7e344c13.png";
import imgAwardBlock4 from "figma:asset/0bcf82eb6691528c2de5c1e55b7fc04cff181a64.png";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";

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
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">De la idee la eveniment memorabil</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame1 />
    </div>
  );
}

function HeroText() {
  return (
    <div className="content-stretch flex flex-col gap-[66px] items-center relative shrink-0 w-full" data-name="Hero Text">
      <Container />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[325.264px] text-center text-nowrap tracking-[-19.5159px] uppercase">POLUBVI</p>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="h-[732px] relative shrink-0 w-full" data-name="Hero Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[32px] relative size-full">
          <HeroText />
          <p className="absolute bottom-[56.46px] font-['Inter:Regular',sans-serif] font-normal leading-[1.08] left-1/2 not-italic text-[24px] text-center text-white translate-x-[-50%] translate-y-[100%] w-[656.852px]">Planifică, gestionează și colaborează cu furnizori într-un singur loc. De la nuntă la zi de naștere - totul organizat inteligent, fără stres și fără haos.</p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="content-stretch flex flex-col h-[1350px] items-start relative shrink-0 w-full" data-name="Hero">
      <div className="absolute h-[900px] left-0 right-0 top-[450px]" data-name="Hero Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgHeroImage} />
          <div className="absolute bg-repeat bg-size-[500px_500px] bg-top-left inset-0 mix-blend-multiply opacity-[0.21]" style={{ backgroundImage: `url('${imgHeroImage1}')` }} />
        </div>
      </div>
      <HeroContent />
    </div>
  );
}

function HeadingWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading Wrapper">
      <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pb-[40px] pt-[100px] px-[32px] relative w-full">
          <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none max-w-[900px] min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[120px] text-center tracking-[-7.2px] uppercase">Totul într-un singur loc</p>
        </div>
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

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">All-in-One</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame4 />
    </div>
  );
}

function ChipsText() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Chips & Text">
      <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[32px] relative w-full">
        <Container1 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-[min-content]">Jonglezi cu zeci de aplicații când poți avea totul într-un singur dashboard? Am reunit logistica, designul și comunicarea sub același acoperiș digital.</p>
      </div>
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

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Comoditate</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame5 />
    </div>
  );
}

function ChipsText1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Chips & Text">
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[32px] relative w-full">
        <Container2 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-[min-content]">Proiectat pentru cei care prețuiesc timpul. Este singurul instrument care îți permite să treci de la gestionarea bugetului la designul invitației fără să părăsești platforma.</p>
      </div>
    </div>
  );
}

function TextBlocks() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Text Blocks">
      <ChipsText />
      <ChipsText1 />
    </div>
  );
}

function Images() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-name="Images">
      <div className="basis-0 grow h-[560px] min-h-px min-w-px relative shrink-0" data-name="Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage1} />
        </div>
      </div>
      <div className="basis-0 grow h-[560px] min-h-px min-w-px relative shrink-0" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[127.59%] left-[33.62%] max-w-none top-[-2.93%] w-[72.06%]" src={imgImage2} />
        </div>
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[1240px] relative shrink-0 w-full" data-name="About Content">
      <HeadingWrapper />
      <TextBlocks />
      <Images />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black h-[70px] relative rounded-[2.19181e+07px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[40.833px] py-[17.5px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="bg-[#960010] relative shrink-0 w-full" data-name="About">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center justify-center px-[100px] py-[240px] relative w-full">
          <AboutContent />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </div>
  );
}

function H2Button() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="H2 & Button">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none max-w-[900px] min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[120px] tracking-[-7.2px] uppercase">Ce include platforma</p>
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

function JournalContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full" data-name="Journal Content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] uppercase w-full">{`02.  Controlul bugetului`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Urmărești cheltuielile în timp real, știi exact cât ai alocat și eviți surprizele neplăcute pe parcurs.</p>
    </div>
  );
}

function JournalBlock() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
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

function JournalBlock1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
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

function JournalBlock2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <JournalContent3 />
    </div>
  );
}

function JournalBlocks() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Journal Blocks">
      <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Journal Block">
        <div className="h-[338.141px] relative shrink-0 w-full" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <JournalContent />
      </div>
      <JournalBlock />
      <JournalBlock1 />
      <JournalBlock2 />
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
        <div className="content-stretch flex flex-col items-center px-[100px] py-[240px] relative w-full">
          <JournalContent4 />
        </div>
      </div>
    </div>
  );
}

function H2Button1() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="H2 & Button">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none max-w-[900px] min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[120px] tracking-[-7.2px] uppercase">Cum funcționează</p>
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

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">De la idee la eveniment memorabil</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame6 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full">
      <Container3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-[min-content]">Tot ce trebuie să faci este să urmezi câțiva pași simpli, iar platforma te ajută să organizezi evenimentul fără stres sau confuzii.</p>
    </div>
  );
}

function CollaborationHeader() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Collaboration Header">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start justify-between px-[32px] py-[48px] relative size-full">
        <Frame2 />
      </div>
    </div>
  );
}

function ValueText() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] w-full">01.</p>
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
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] w-full">02.</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">Alegi tipul evenimentului</p>
      </div>
    </div>
  );
}

function ValueTextRow() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Value & Text Row">
      <ValueText />
      <ValueText1 />
    </div>
  );
}

function ValueText2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] w-full">03.</p>
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
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative uppercase w-full">
        <p className="leading-none relative shrink-0 text-[#960010] text-[28px] tracking-[-0.56px] w-full">04.</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">Organizezi totul într-un singur loc</p>
      </div>
    </div>
  );
}

function ValueTextRow1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Value & Text Row">
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

function Button2() {
  return (
    <div className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </div>
  );
}

function CollaborationHeader1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Collaboration Header">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[32px] py-[48px] relative size-full">
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function CollabBlockInfo() {
  return (
    <div className="basis-0 bg-[rgba(232,232,232,0.5)] content-stretch flex flex-col grow h-full items-start justify-between min-h-px min-w-px relative shrink-0" data-name="Collab Block Info">
      <CollaborationHeader />
      <ValueTextGrid />
      <CollaborationHeader1 />
    </div>
  );
}

function CollabBlock() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Collab Block">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <CollabBlockInfo />
      </div>
      <div className="basis-0 grow h-[800px] min-h-px min-w-px pointer-events-none relative shrink-0" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgImage4} />
        <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0" />
      </div>
    </div>
  );
}

function CollabBlocks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collab Blocks">
      <CollabBlock />
    </div>
  );
}

function CollabsContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[120px] grow items-start max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Collabs Content">
      <H2Button1 />
      <CollabBlocks />
    </div>
  );
}

function Collab() {
  return (
    <div className="bg-[#f5f5f5] relative shrink-0 w-full" data-name="Collab">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[100px] py-[240px] relative w-full">
          <CollabsContent />
        </div>
      </div>
    </div>
  );
}

function H2Button2() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="H2 & Button">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none max-w-[900px] min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[120px] tracking-[-7.2px] uppercase">Ce evenimente poți organiza</p>
    </div>
  );
}

function AwardContent() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardContent1() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock() {
  return (
    <div className="[grid-area:1_/_2] h-[680px] min-h-[680px] relative shrink-0 w-[684px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
      <AwardContent1 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 top-[535.38px] w-[684px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-[684px]">ZI DE NAȘTERE</p>
    </div>
  );
}

function AwardContent2() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock1() {
  return (
    <div className="[grid-area:2_/_1] h-[680px] min-h-[680px] relative shrink-0 w-[684px]" data-name="Award Block">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgAwardBlock} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgAwardBlock1} />
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
      <AwardContent2 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 top-[535.38px] w-[684px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-[684px]">aniversare</p>
    </div>
  );
}

function AwardContent3() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock2() {
  return (
    <div className="[grid-area:2_/_2] h-[680px] min-h-[680px] relative shrink-0 w-[684px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock2} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
      <AwardContent3 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 top-[535.38px] w-[684px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-[684px]">EVENIMENT CORPORATE</p>
    </div>
  );
}

function AwardContent4() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock3() {
  return (
    <div className="[grid-area:3_/_1] h-[680px] min-h-[680px] relative shrink-0 w-[684px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock3} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
      <AwardContent4 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 top-[535.38px] w-[684px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-[684px]">Botez, baby shower</p>
    </div>
  );
}

function AwardContent5() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock4() {
  return (
    <div className="[grid-area:3_/_2] h-[680px] min-h-[680px] relative shrink-0 w-[684px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHeroImage} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
      <AwardContent5 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 top-[535.38px] w-[684px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-[684px]">Orice eveniment privat</p>
    </div>
  );
}

function AwardBlocks() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_fit-content(100%))] relative shrink-0 w-full" data-name="Award Blocks">
      <div className="[grid-area:1_/_1] h-[680px] justify-self-stretch min-h-[680px] relative shrink-0" data-name="Award Block">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock4} />
        <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
        <AwardContent />
        <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 top-[535.38px] w-[684px]" />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-[684px]">nunTĂ</p>
      </div>
      <AwardBlock />
      <AwardBlock1 />
      <AwardBlock2 />
      <AwardBlock3 />
      <AwardBlock4 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Încearcă acum</p>
    </div>
  );
}

function AwardsContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[120px] grow items-center max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Awards Content">
      <H2Button2 />
      <AwardBlocks />
      <Button3 />
    </div>
  );
}

function Award() {
  return (
    <div className="content-stretch flex items-start justify-center px-[24px] py-[240px] relative shrink-0 w-[1440px]" data-name="Award">
      <AwardsContent />
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-white h-[26px] relative rounded-[1.9232e+07px] shrink-0 w-[75px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.9232e+07px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.835px] left-[10px] not-italic text-[#960010] text-[12.626px] text-nowrap top-[5px]">POLUBVI</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Text4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Transformă ideea într-un eveniment reușit</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip pl-[4px] pr-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame7 />
    </div>
  );
}

function ChipsHeading() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[900px] relative shrink-0 w-full" data-name="Chips & Heading">
      <Container4 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none min-w-full not-italic relative shrink-0 text-[#960010] text-[80px] text-center tracking-[-4.8px] uppercase w-[min-content]">Încă te gândești?</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </div>
  );
}

function Banner() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0" data-name="Banner">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[32px] py-[80px] relative w-full">
          <ChipsHeading />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function BannerContent() {
  return (
    <div className="basis-0 content-stretch flex grow items-start max-w-[1112px] min-h-px min-w-px relative shrink-0" data-name="Banner Content">
      <Banner />
    </div>
  );
}

function Banner1() {
  return (
    <div className="bg-[#960010] relative shrink-0 w-full" data-name="Banner">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[240px] relative w-full">
          <BannerContent />
        </div>
      </div>
    </div>
  );
}

function HeroText1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[66px] items-center left-[24px] top-[189.86px] w-[1392px]" data-name="Hero Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.78] not-italic relative shrink-0 text-[325.264px] text-center text-nowrap text-white tracking-[-19.5159px] uppercase">POLUBVI</p>
      <div className="h-0 relative shrink-0 w-[673.902px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 673.902 1">
            <path d="M0 0.5H673.902" id="Vector 1" stroke="var(--stroke-0, white)" strokeOpacity="0.2" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[15px] text-[rgba(255,255,255,0.6)] text-center tracking-[-0.1611px] w-[min-content]">© 2025 POLUBVI. Toate drepturile rezervate.</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-black h-[683px] overflow-clip relative shrink-0 w-[1440px]">
      <HeroText1 />
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

function Container5() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex gap-[8.571px] h-[38.571px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Organizează evenimentul tau cu noi</p>
    </div>
  );
}

function ImagePolubvi() {
  return (
    <div className="h-[32px] relative shrink-0 w-[128.391px]" data-name="Image (POLUBVI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImagePolubvi} />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow h-[21.429px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[25.714px] items-center leading-[21.429px] not-italic relative size-full text-[15px] text-black text-nowrap tracking-[-0.1611px]">
        <p className="relative shrink-0">Acasă</p>
        <p className="relative shrink-0">Ce include</p>
        <p className="relative shrink-0">Cum funcționează</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[34px] relative shrink-0 w-[589px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[34.286px] items-center relative size-full">
        <ImagePolubvi />
        <Container6 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[29px] py-[13px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.50296e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-center text-nowrap tracking-[-0.1611px]">Loghează-te</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-black content-stretch flex items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] self-stretch shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative">
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-white h-[72.857px] relative shrink-0 w-full" data-name="Navigation">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[100px] py-0 relative size-full">
          <Container7 />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Navbar">
      <Container5 />
      <Navigation />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Home">
      <Hero />
      <About />
      <Journal />
      <Collab />
      <Award />
      <Banner1 />
      <Frame3 />
      <Navbar />
    </div>
  );
}