import svgPaths from "./svg-s7lu86r3nq";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2f84f400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#960010] relative rounded-[183px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18px] relative shrink-0 w-[50px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#960010] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] uppercase">Nuntă</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p39be50} id="Vector" stroke="var(--stroke-0, #960010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[17.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Icon1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">15 aug. 2025</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16.5px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#9ca3af] text-[11px] text-nowrap top-[0.5px] tracking-[0.0645px]">Chișinău</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow h-[56px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container1 />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#fef2f2] content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#960010] border-solid inset-0 pointer-events-none" />
      <Container />
      <Container2 />
    </div>
  );
}