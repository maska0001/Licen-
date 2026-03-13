import svgPaths from "../../imports/svg-wvr4iipwpo";
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

interface HomeDesktopEnhancedProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function HomeDesktopEnhanced({ onLogin, onRegister }: HomeDesktopEnhancedProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Home">
      <Hero />
      <About onGetStarted={onRegister} />
      <Journal onGetStarted={onRegister} />
      <Collab onGetStarted={onRegister} />
      <Award onGetStarted={onRegister} />
      <Banner1 onGetStarted={onRegister} />
      <Frame3 />
      <Navbar onLogin={onLogin} onRegister={onRegister} />
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

// FIXED BUTTON - same size as "Ce include platforma" button
function Button({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <button
      onClick={onGetStarted}
      className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0 hover:bg-[#960010] hover:scale-105 transition-all duration-300 cursor-pointer"
      data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </button>
  );
}

function About({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="bg-[#960010] relative shrink-0 w-full" data-name="About">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center justify-center px-[100px] py-[240px] relative w-full">
          <AboutContent />
          <Button onGetStarted={onGetStarted} />
        </div>
      </div>
    </div>
  );
}

function Button1({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <button
      onClick={onGetStarted}
      className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0 hover:bg-[#960010] hover:scale-105 transition-all duration-300 cursor-pointer"
      data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </button>
  );
}

function H2Button({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="H2 & Button">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none max-w-[900px] min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[120px] tracking-[-7.2px] uppercase">Ce include platforma</p>
      <Button1 onGetStarted={onGetStarted} />
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

// HOVER ONLY ON IMAGE - no card scale or shadow
function JournalBlock() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 group" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full overflow-hidden rounded-[2px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform duration-500 group-hover:scale-110" src={imgImage3} />
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
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 group" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full overflow-hidden rounded-[2px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform duration-500 group-hover:scale-110" src={imgImage3} />
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
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 group" data-name="Journal Block">
      <div className="h-[338.141px] relative shrink-0 w-full overflow-hidden rounded-[2px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform duration-500 group-hover:scale-110" src={imgImage3} />
      </div>
      <JournalContent3 />
    </div>
  );
}

function JournalBlocks() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Journal Blocks">
      <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0 group" data-name="Journal Block">
        <div className="h-[338.141px] relative shrink-0 w-full overflow-hidden rounded-[2px]" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform duration-500 group-hover:scale-110" src={imgImage3} />
        </div>
        <JournalContent />
      </div>
      <JournalBlock />
      <JournalBlock1 />
      <JournalBlock2 />
    </div>
  );
}

function JournalContent4({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
      <H2Button onGetStarted={onGetStarted} />
      <JournalBlocks />
    </div>
  );
}

function Journal({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Journal">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[100px] py-[240px] relative w-full">
          <JournalContent4 onGetStarted={onGetStarted} />
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
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] min-w-full not-italic relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-[min-content]">Tot ce trebuie să faci este să urmezi câțivi pași simpli, iar platforma te ajută să organizezi evenimentul fără stres sau confuzii.</p>
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

function Button2({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <button
      onClick={onGetStarted}
      className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0 hover:bg-[#960010] hover:scale-105 transition-all duration-300 cursor-pointer"
      data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </button>
  );
}

function CollaborationHeader1({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Collaboration Header">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end px-[32px] py-[48px] relative size-full">
          <Button2 onGetStarted={onGetStarted} />
        </div>
      </div>
    </div>
  );
}

function CollabBlockInfo({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="basis-0 bg-[rgba(232,232,232,0.5)] content-stretch flex flex-col grow h-full items-start justify-between min-h-px min-w-px relative shrink-0" data-name="Collab Block Info">
      <CollaborationHeader />
      <ValueTextGrid />
      <CollaborationHeader1 onGetStarted={onGetStarted} />
    </div>
  );
}

function CollabBlock({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Collab Block">
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <CollabBlockInfo onGetStarted={onGetStarted} />
      </div>
      <div className="basis-0 grow h-[800px] min-h-px min-w-px pointer-events-none relative shrink-0" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgImage4} />
        <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0" />
      </div>
    </div>
  );
}

function CollabBlocks({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collab Blocks">
      <CollabBlock onGetStarted={onGetStarted} />
    </div>
  );
}

function CollabsContent({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[120px] grow items-start max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Collabs Content">
      <H2Button1 />
      <CollabBlocks onGetStarted={onGetStarted} />
    </div>
  );
}

function Collab({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="bg-[#f5f5f5] relative shrink-0 w-full" data-name="Collab">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[100px] py-[240px] relative w-full">
          <CollabsContent onGetStarted={onGetStarted} />
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

// ADDED HOVER EFFECTS to AwardBlock - FIXED WIDTH RESPONSIVE
function AwardBlock() {
  return (
    <div className="h-[680px] min-h-[680px] relative shrink-0 w-full group cursor-pointer overflow-hidden rounded-[2px] transition-all hover:scale-[1.02] hover:shadow-2xl" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform group-hover:scale-110" src={imgAwardBlock} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" data-name="Dark Overlay" />
      <AwardContent1 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 right-0 top-[535.38px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-full px-4 transition-transform group-hover:translate-y-[-10px]">ZI DE NAȘTERE</p>
    </div>
  );
}

function AwardContent2() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock1() {
  return (
    <div className="h-[680px] min-h-[680px] relative shrink-0 w-full group cursor-pointer overflow-hidden rounded-[2px] transition-all hover:scale-[1.02] hover:shadow-2xl" data-name="Award Block">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full transition-transform group-hover:scale-110" src={imgAwardBlock} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgAwardBlock1} />
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" data-name="Dark Overlay" />
      <AwardContent2 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 right-0 top-[535.38px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-full px-4 transition-transform group-hover:translate-y-[-10px]">aniversare</p>
    </div>
  );
}

function AwardContent3() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock2() {
  return (
    <div className="h-[680px] min-h-[680px] relative shrink-0 w-full group cursor-pointer overflow-hidden rounded-[2px] transition-all hover:scale-[1.02] hover:shadow-2xl" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform group-hover:scale-110" src={imgAwardBlock2} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" data-name="Dark Overlay" />
      <AwardContent3 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 right-0 top-[535.38px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-full px-4 transition-transform group-hover:translate-y-[-10px]">EVENIMENT CORPORATE</p>
    </div>
  );
}

function AwardContent4() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock3() {
  return (
    <div className="h-[680px] min-h-[680px] relative shrink-0 w-full group cursor-pointer overflow-hidden rounded-[2px] transition-all hover:scale-[1.02] hover:shadow-2xl" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform group-hover:scale-110" src={imgAwardBlock3} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" data-name="Dark Overlay" />
      <AwardContent4 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 right-0 top-[535.38px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-full px-4 transition-transform group-hover:translate-y-[-10px]">Botez, baby shower</p>
    </div>
  );
}

function AwardContent5() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1392px]" data-name="Award Content" />;
}

function AwardBlock4() {
  return (
    <div className="h-[680px] min-h-[680px] relative shrink-0 w-full group cursor-pointer overflow-hidden rounded-[2px] transition-all hover:scale-[1.02] hover:shadow-2xl" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform group-hover:scale-110" src={imgHeroImage} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" data-name="Dark Overlay" />
      <AwardContent5 />
      <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 right-0 top-[535.38px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-full px-4 transition-transform group-hover:translate-y-[-10px]">Orice eveniment privat</p>
    </div>
  );
}

function AwardBlocks() {
  return (
    <div className="grid gap-[24px] grid-cols-2 relative shrink-0 w-full max-w-[1400px]" data-name="Award Blocks">
      <div className="h-[680px] min-h-[680px] relative shrink-0 w-full group cursor-pointer overflow-hidden rounded-[2px] transition-all hover:scale-[1.02] hover:shadow-2xl" data-name="Award Block">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full transition-transform group-hover:scale-110" src={imgAwardBlock4} />
        <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0 group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" data-name="Dark Overlay" />
        <AwardContent />
        <div className="absolute bg-black blur-[185.35px] filter h-[144.623px] left-0 right-0 top-[535.38px]" />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0.8] left-1/2 not-italic text-[50px] text-center text-white top-[587.69px] tracking-[-3px] translate-x-[-50%] uppercase w-full px-4 transition-transform group-hover:translate-y-[-10px]">nunTĂ</p>
      </div>
      <AwardBlock />
      <AwardBlock1 />
      <AwardBlock2 />
      <AwardBlock3 />
      <AwardBlock4 />
    </div>
  );
}

function Button3({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <button
      onClick={onGetStarted}
      className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0 hover:bg-[#960010] hover:scale-105 transition-all duration-300 cursor-pointer"
      data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Încearcă acum</p>
    </button>
  );
}

function AwardsContent({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[120px] grow items-center max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Awards Content">
      <H2Button2 />
      <AwardBlocks />
      <Button3 onGetStarted={onGetStarted} />
    </div>
  );
}

function Award({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="content-stretch flex items-start justify-center px-[100px] py-[240px] relative w-full" data-name="Award">
      <AwardsContent onGetStarted={onGetStarted} />
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

function Button4({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <button
      onClick={onGetStarted}
      className="bg-black content-stretch flex h-[70px] items-center justify-center px-[40.833px] py-[17.5px] relative rounded-[2.19181e+07px] shrink-0 hover:bg-[#960010] hover:scale-105 transition-all duration-300 cursor-pointer"
      data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.08] not-italic relative shrink-0 text-[22px] text-center text-nowrap text-white">Înregistrează-te</p>
    </button>
  );
}

function Banner({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0" data-name="Banner">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[32px] py-[80px] relative w-full">
          <ChipsHeading />
          <Button4 onGetStarted={onGetStarted} />
        </div>
      </div>
    </div>
  );
}

function BannerContent({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="basis-0 content-stretch flex grow items-start max-w-[1112px] min-h-px min-w-px relative shrink-0" data-name="Banner Content">
      <Banner onGetStarted={onGetStarted} />
    </div>
  );
}

function Banner1({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="bg-[#960010] relative shrink-0 w-full" data-name="Banner">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[240px] relative w-full">
          <BannerContent onGetStarted={onGetStarted} />
        </div>
      </div>
    </div>
  );
}

function HeroText1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[66px] items-center left-[24px] right-[24px] top-[189.86px]" data-name="Hero Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0.78] not-italic relative shrink-0 text-[325.264px] text-center text-nowrap text-white tracking-[-19.5159px] uppercase">POLUBVI</p>
      <div className="h-0 relative shrink-0 w-full max-w-[673.902px]">
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

// FIXED FOOTER - made responsive by removing fixed width
function Frame3() {
  return (
    <div className="bg-black min-h-[683px] overflow-clip relative shrink-0 w-full">
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

function Button5({ onLogin }: { onLogin: () => void }) {
  return (
    <button
      onClick={onLogin}
      className="content-stretch flex items-center justify-center px-[29px] py-[13px] relative rounded-[1.50296e+07px] shrink-0 hover:bg-gray-50 transition-colors cursor-pointer"
      data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.50296e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-center text-nowrap tracking-[-0.1611px]">Loghează-te</p>
    </button>
  );
}

function Button6({ onRegister }: { onRegister: () => void }) {
  return (
    <button
      onClick={onRegister}
      className="bg-black content-stretch flex items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] self-stretch shrink-0 hover:bg-[#960010] hover:scale-105 transition-all duration-300 cursor-pointer"
      data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </button>
  );
}

function Frame({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative">
        <Button5 onLogin={onLogin} />
        <Button6 onRegister={onRegister} />
      </div>
    </div>
  );
}

function Navigation({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="bg-white h-[72.857px] relative shrink-0 w-full" data-name="Navigation">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[100px] py-0 relative size-full">
          <Container7 />
          <Frame onLogin={onLogin} onRegister={onRegister} />
        </div>
      </div>
    </div>
  );
}

function Navbar({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="fixed content-stretch flex flex-col items-start left-0 right-0 top-0 z-50 bg-white shadow-sm" data-name="Navbar">
      <Container5 />
      <Navigation onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
}