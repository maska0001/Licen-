import svgPaths from "./svg-y545ga5yx3";
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
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Subtitlu</p>
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
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[88px] text-center tracking-[-5.28px] uppercase w-[364.914px]">titlu</p>
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
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-[187.5px] not-italic text-[15px] text-center text-white top-[118.53px] tracking-[-0.1611px] translate-x-[-50%] w-[200px]">Text descriere</p>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" data-name="Hero">
      <Frame1 />
      <HeroContent />
      <Frame2 />
    </div>
  );
}