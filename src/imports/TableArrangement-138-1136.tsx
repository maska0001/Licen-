function Text() {
  return (
    <div className="bg-[#fef2f2] h-[28px] relative rounded-[1.67772e+07px] shrink-0 w-[32.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#960010] text-[14px] text-nowrap top-[4.5px] tracking-[-0.1504px]">0</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[43px] min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[43px] tracking-[-2.2126px] uppercase">invitați nealocați</p>
      <Text />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M20 6L9 17L4 12" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#960010] content-stretch flex items-center justify-center left-[151px] rounded-[1.67772e+07px] size-[48px] top-[32px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[20px] left-0 top-[92px] w-[350px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[175.66px] not-italic text-[#6a7282] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%]">Toți invitații sunt alocați</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[144px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Paragraph />
    </div>
  );
}

export default function TableArrangement() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full" data-name="TableArrangement">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      <Container />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350 1">
            <path d="M0 0.5H350" id="Vector 5" stroke="var(--stroke-0, #F5F5F5)" />
          </svg>
        </div>
      </div>
      <Container2 />
    </div>
  );
}