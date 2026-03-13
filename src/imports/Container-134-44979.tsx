function Frame2() {
  return (
    <div className="h-[14px] relative shrink-0 w-[16px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[8px] not-italic text-[24px] text-center text-nowrap text-white top-[-7px] tracking-[0.0703px] translate-x-[-50%]">+</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black content-stretch flex items-center justify-center p-[2px] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-nowrap tracking-[-2.58px] uppercase">Detalii buget</p>
      <Button />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-[0.5px] tracking-[-0.3008px]">Buget real</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38px] left-0 not-italic text-[#101828] text-[30px] text-nowrap top-0 tracking-[-0.2051px]">84,600 MDL</p>
    </div>
  );
}

function Container() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#960010] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[2px] pt-[26px] px-[26px] relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-[0.5px] tracking-[-0.3008px]">Buget estimat</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38px] left-0 not-italic text-[#101828] text-[30px] text-nowrap top-0 tracking-[-0.2051px]">584,200 MDL</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-[0.5px] tracking-[-0.3008px]">Diferență</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38px] left-0 not-italic text-[#101828] text-[30px] text-nowrap top-0 tracking-[-0.2051px]">-499,600 MDL</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="[grid-area:1_/_3] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[25px] px-[25px] relative size-full">
        <Heading2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[128px] relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container1 />
      <Container2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[20px] relative w-full">
        <Frame1 />
        <Container3 />
      </div>
    </div>
  );
}

export default function Container4() {
  return (
    <div className="bg-[#960010] content-stretch flex flex-col items-start pb-[39px] pt-[40px] px-[40px] relative size-full" data-name="Container">
      <Frame />
    </div>
  );
}