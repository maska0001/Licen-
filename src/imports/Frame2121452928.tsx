function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px]">Creează o invitație digitală elegantă pentru invitații tăi</p>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[80px] tracking-[-4.8px] uppercase w-full">Constructor invitație digitală</p>
      <Paragraph />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-end relative size-full">
      <Container />
    </div>
  );
}