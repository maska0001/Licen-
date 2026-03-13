function H2Button() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-center w-full" data-name="H2 & Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">timing</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
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

function Frame() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Ora</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
    </div>
  );
}

function ValueText() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[20px] items-center justify-end px-[32px] py-[40px] relative w-full">
          <Frame />
          <div className="bg-[#d9d9d9] shrink-0 size-[84px]" />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Ora</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
    </div>
  );
}

function ValueText1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value & Text">
      <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[20px] items-center justify-end px-[32px] py-[40px] relative w-full">
          <div className="bg-[#d9d9d9] shrink-0 size-[84px]" />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function ValueTextRow() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Value & Text Row">
      <ValueText />
      <ValueText1 />
      <ValueText />
      <ValueText1 />
    </div>
  );
}

function ValueTextGrid() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Value & Text Grid">
      <ValueTextRow />
    </div>
  );
}

function CollabBlockInfo() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collab Block Info">
      <ValueTextGrid />
    </div>
  );
}

function CollabBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start justify-center relative shrink-0 w-full" data-name="Collab Block">
      <CollabBlockInfo />
      <div className="bg-[rgba(0,0,0,0.2)] h-[560px] relative shrink-0 w-full" data-name="Image">
        <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function CollabBlocks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collab Blocks">
      <CollabBlock />
    </div>
  );
}

function CollabsContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-center max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Collabs Content">
      <JournalContent />
      <CollabBlocks />
    </div>
  );
}

export default function Collab() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-start justify-center px-[16px] py-[100px] relative size-full" data-name="Collab">
      <CollabsContent />
    </div>
  );
}