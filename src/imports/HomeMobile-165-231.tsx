import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";
import imgHeroImage from "figma:asset/76e6f5ecf67a186705359b4f00347f8b04c8da76.png";

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
            <path d="M4 11H20V12.5H4V11Z" fill="var(--fill-0, black)" />
            <path d="M4 6H20V7.5H4V6Z" fill="var(--fill-0, black)" />
            <path d="M4 16H20V17.5H4V16Z" fill="var(--fill-0, black)" />
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

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
      <Nav />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Dragi prieteni,</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
      <Frame />
    </div>
  );
}

function HeroText() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[16px] top-[127.2px] w-[343px]" data-name="Hero Text">
      <Container />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[88px] text-center tracking-[-5.28px] uppercase w-[364.914px]">{`MAXIM & MARINA`}</p>
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

function Frame2() {
  return (
    <div className="h-[443px] relative shrink-0 w-full z-[1]">
      <div className="absolute h-[443px] left-0 top-0 w-[375px]" data-name="Hero Image">
        <div aria-hidden="true" className="absolute bg-repeat bg-size-[500px_500px] bg-top-left inset-0 mix-blend-multiply opacity-[0.21] pointer-events-none" style={{ backgroundImage: `url('${imgHeroImage}')` }} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-[187.5px] not-italic text-[15px] text-center text-white top-[118.53px] tracking-[-0.1611px] translate-x-[-50%] w-[200px]">{`A venit momentul `}</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="content-stretch flex flex-col h-[776px] isolate items-start relative shrink-0 w-full" data-name="Hero">
      <Frame1 />
      <HeroContent />
      <Frame2 />
    </div>
  );
}

function HeadingWrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading Wrapper">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[32px] pt-[52px] px-[16px] relative w-full">
        <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[43px] text-center tracking-[-2.58px] uppercase">04.09.2026</p>
      </div>
    </div>
  );
}

function ChipsText() {
  return (
    <div className="relative shrink-0 w-full" data-name="Chips & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[28px] relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] not-italic relative shrink-0 text-[#414c5a] text-[15px] text-center tracking-[-0.1611px] w-full">
          Dragi prieteni,
          <br aria-hidden="true" />
          {`Vă invităm sa sarbatorim cea mai importanta data a noastra -  ziua nuntii noastre.`}
        </p>
      </div>
    </div>
  );
}

function TextBlocks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text Blocks">
      <ChipsText />
      <div className="bg-[rgba(0,0,0,0.2)] h-[285px] shrink-0 w-full" data-name="Image" />
    </div>
  );
}

function AboutContent() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[1112px] relative shrink-0 w-full" data-name="About Content">
      <HeadingWrapper />
      <TextBlocks />
    </div>
  );
}

function About() {
  return (
    <div className="bg-[#960010] relative shrink-0 w-full" data-name="About">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[100px] relative w-full">
          <AboutContent />
        </div>
      </div>
    </div>
  );
}

function H2Button() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-center w-full" data-name="H2 & Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">Poseidon, vadal lui voda</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Adresa completa a locatiei</p>
    </div>
  );
}

function JournalContent() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
      <H2Button />
    </div>
  );
}

function Journal() {
  return (
    <div className="relative shrink-0 w-full" data-name="Journal">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center px-[16px] py-[100px] relative w-full">
          <JournalContent />
          <div className="bg-[rgba(0,0,0,0.2)] h-[285px] shrink-0 w-full" data-name="Image" />
        </div>
      </div>
    </div>
  );
}

function H2Button1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-center w-full" data-name="H2 & Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">timing</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
    </div>
  );
}

function JournalContent1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
      <H2Button1 />
    </div>
  );
}

function ValueText() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">19:00</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Intampinarea oaspetilor</p>
      </div>
    </div>
  );
}

function ValueText1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">20:00</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Asezarea la mese</p>
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
      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">21:00</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Dansuri,distractie</p>
      </div>
    </div>
  );
}

function ValueText3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">00:00</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Tortul</p>
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
      <ValueTextGrid />
    </div>
  );
}

function CollabBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start justify-center relative shrink-0 w-[351px]" data-name="Collab Block">
      <CollabBlockInfo />
      <div className="bg-[rgba(0,0,0,0.2)] h-[560px] relative shrink-0 w-full" data-name="Image">
        <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
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

function CollabsContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-center max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Collabs Content">
      <JournalContent1 />
      <CollabBlocks />
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

function ChipsHeading() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[280px] relative shrink-0 w-full" data-name="Chips & Heading">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-center tracking-[-2.58px] uppercase w-full">DETALII</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
      <ChipsHeading />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[#414c5a] text-[15px] text-center tracking-[-0.1611px] w-full">
        Daca doriti sa ne surprindeti placut in loc de un buchet de flori care moare a 2 zi sa ne aduceti o sticla de vin semnata cu numele vostru si sa ne scrieti momentul cand ati vrea sa o descridem
        <br aria-hidden="true" />
        VA MULTUMIM!
      </p>
    </div>
  );
}

function Banner() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Banner">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center px-[20px] py-[48px] relative w-full">
          <Frame5 />
          <div className="bg-[rgba(0,0,0,0.2)] h-[285px] shrink-0 w-full" data-name="Image" />
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

function Frame4() {
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

function Frame3() {
  return (
    <div className="bg-black h-[333px] overflow-clip relative shrink-0 w-[375px]">
      <Frame4 />
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
      <Banner1 />
      <Frame3 />
    </div>
  );
}