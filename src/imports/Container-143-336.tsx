import svgPaths from "./svg-qwa9rb8fqc";
import imgAwardBlock from "figma:asset/0bcf82eb6691528c2de5c1e55b7fc04cff181a64.png";

function AwardContent() {
  return <div className="absolute h-[32.094px] left-0 top-0 w-[698.035px]" data-name="Award Content" />;
}

function AwardBlock() {
  return (
    <div className="overflow-clip relative self-stretch shrink-0 w-[343px]" data-name="Award Block">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAwardBlock} />
      <div className="absolute bg-[rgba(0,0,0,0.07)] inset-0" data-name="Dark Overlay" />
      <AwardContent />
      <div className="absolute bg-[rgba(0,0,0,0.8)] blur-[92.946px] filter h-[72.523px] left-0 top-[268.47px] w-[343px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[43px] relative shrink-0 w-[355.563px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[43px] left-0 not-italic text-[#960010] text-[43px] text-nowrap top-px tracking-[-1.8452px] uppercase">DETALII EVENIMENT</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3332 18.333">
            <path d={svgPaths.p1e3da380} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[43px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button />
    </div>
  );
}

function ValueText() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex flex-col gap-[8px] items-start px-[32px] py-[40px] relative self-stretch shrink-0 w-[368.5px]" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">15 august 2025</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.08] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.2px] uppercase w-full">Data evenimentului</p>
    </div>
  );
}

function ValueText1() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex flex-col gap-[8px] items-start px-[32px] py-[40px] relative self-stretch shrink-0 w-[368.5px]" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">120</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.08] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.2px] uppercase w-full">Număr invitați</p>
    </div>
  );
}

function ValueText2() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[8px] items-start px-[32px] py-[40px] relative self-stretch shrink-0 w-[368.5px]" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Nuntă</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.08] not-italic relative shrink-0 text-[20px] text-black tracking-[-0.2px] uppercase w-full">Tip eveniment</p>
    </div>
  );
}

function ValueText3() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[8px] items-start not-italic px-[32px] py-[40px] relative size-full uppercase">
        <p className="leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] w-full">Chișinău</p>
        <p className="leading-[1.08] relative shrink-0 text-[20px] text-black tracking-[-0.2px] w-full">Locație</p>
      </div>
    </div>
  );
}

function ValueTextGrid() {
  return (
    <div className="grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_fit-content(100%))] relative shrink-0 w-full" data-name="Value & Text Grid">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      <ValueText />
      <ValueText1 />
      <ValueText2 />
      <ValueText3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0">
      <Container />
      <ValueTextGrid />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[24px] items-start p-[32px] relative w-full">
        <AwardBlock />
        <Frame />
      </div>
    </div>
  );
}

export default function Container2() {
  return (
    <div className="bg-[#960010] content-stretch flex flex-col items-start p-[40px] relative size-full" data-name="Container">
      <Container1 />
    </div>
  );
}