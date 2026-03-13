import svgPaths from "./svg-fusedc3v5n";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";

function MenuItems() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Menu Items">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-nowrap tracking-[-2.58px] uppercase">LOGHEAZĂ-TE</p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
            <path d="M0 0.5H351" id="Vector 2" stroke="var(--stroke-0, #F5F5F5)" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-nowrap tracking-[-2.58px] uppercase">Ce include</p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
            <path d="M0 0.5H351" id="Vector 2" stroke="var(--stroke-0, #F5F5F5)" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none min-w-full not-italic relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-[min-content]">Cum funcționează</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-end relative shrink-0">
      <div className="h-0 relative shrink-0 w-[351px]">
        <div className="absolute inset-[-0.5px_0]" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
            <path d="M0 0.5H351" id="Vector 3" stroke="var(--stroke-0, #F5F5F5)" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[89.309px] leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[88px] text-center tracking-[-5.28px] uppercase w-[364.914px]">polubvi</p>
    </div>
  );
}

function MobileMenuContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-between min-h-px min-w-px relative shrink-0 w-full" data-name="Mobile Menu Content">
      <MenuItems />
      <Frame1 />
    </div>
  );
}

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

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0">
      <Nav />
    </div>
  );
}

export default function MobileMenu() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[289px] items-start pb-[12px] pt-[96px] px-[12px] relative size-full" data-name="Mobile Menu">
      <MobileMenuContent />
      <Frame />
    </div>
  );
}