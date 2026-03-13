import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";

function ImagePolubvi() {
  return (
    <div className="h-[32px] relative shrink-0 w-[128.391px]" data-name="Image (POLUBVI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImagePolubvi} />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[111.227px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[56px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Dashboard</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[98.945px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[49px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Checklist</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#101828] h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[95.109px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[48.5px] not-italic text-[16px] text-center text-nowrap text-white top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Furnizori</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[74.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[37px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Buget</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[79.836px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[40.5px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Invitați</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[71.391px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[36.5px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Mese</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[59.5px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Constructor</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[40px] relative rounded-[1.67772e+07px] shrink-0 w-[70.875px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[35px] not-italic text-[#e7000b] text-[16px] text-center text-nowrap top-[7.5px] tracking-[-0.3125px] translate-x-[-50%]">Ieșire</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[40px] relative shrink-0 w-[777.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImagePolubvi />
      <Container />
    </div>
  );
}

export default function Navigation() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-px pt-0 px-[64px] relative size-full" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Container1 />
    </div>
  );
}