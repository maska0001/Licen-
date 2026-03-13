import svgPaths from "./svg-dxov5zip3o";

function Paragraph() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[12px] not-italic text-[#6a7282] text-[11px] text-nowrap top-[0.5px] tracking-[0.5645px] uppercase">Evenimentele tale</p>
    </div>
  );
}

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
    <div className="bg-[#960010] relative rounded-[16px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[39.734px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#960010] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">Nuntă</p>
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
      <Paragraph1 />
      <Icon1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">15 aug. 2025</p>
    </div>
  );
}

function Paragraph3() {
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
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fef2f2] h-[82px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#960010] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container />
        <Container2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[737.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[24px] px-[16px] relative size-full">
          <Paragraph />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[103.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-[52px] not-italic text-[15px] text-center text-nowrap text-white top-[-0.5px] tracking-[-0.2344px] translate-x-[-50%]">Eveniment nou</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#960010] h-[46.5px] relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-0 pr-[0.008px] py-0 relative size-full">
          <Icon2 />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[79.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-0 pt-[17px] px-[16px] relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full">
      <Container3 />
      <Container4 />
    </div>
  );
}