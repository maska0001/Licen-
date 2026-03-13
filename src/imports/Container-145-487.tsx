import svgPaths from "./svg-02t0o90l7y";

function Heading() {
  return (
    <div className="h-[21px] relative shrink-0 w-[94.602px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21.429px] left-0 not-italic text-[15px] text-black text-nowrap top-0 tracking-[-0.1611px] uppercase">Lista de invitați</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[25px] top-[25px] w-[244px]" data-name="Container">
      <Heading />
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[54px] relative shrink-0 w-[244px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[54px] left-0 not-italic text-[#960010] text-[36px] text-nowrap top-[0.5px] tracking-[0.3691px]">8</p>
    </div>
  );
}

function Paragraph1() {
  return <div className="h-[21px] shrink-0 w-full" data-name="Paragraph" />;
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[18px] relative shrink-0 w-[104.727px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">Progres confirmări</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[25.242px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[26px]">75%</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[18px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container2() {
  return <div className="bg-black h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container3() {
  return (
    <div className="bg-[#f3f4f6] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-0 pr-[61px] py-0 relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[34px] items-start relative shrink-0 w-[244px]" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#f0fdf4] h-[19px] relative rounded-[1.67772e+07px] shrink-0 w-[87px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[8px] not-italic text-[#008236] text-[10px] text-nowrap top-[2.5px] tracking-[0.1172px] uppercase">6 confirmați</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-[rgba(254,252,232,0.99)] h-[19px] relative rounded-[1.67772e+07px] shrink-0 w-[94px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[8px] not-italic text-[#a65f00] text-[10px] text-nowrap top-[2.5px] tracking-[0.1172px] uppercase">2 în așteptare</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-start left-0 top-[-0.19px]">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[244px]" data-name="Container">
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[25px] top-[62px] w-[244px]">
      <Frame1 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      <Container />
      <Frame2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[21px] relative shrink-0 w-[69.227px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21.429px] left-0 not-italic text-[15px] text-black text-nowrap top-0 tracking-[-0.1611px] uppercase">Buget total</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[25px] top-[25px] w-[244px]" data-name="Container">
      <Heading1 />
      <Icon1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[54px] left-0 not-italic text-[#960010] text-[36px] text-nowrap top-[0.5px] tracking-[0.3691px]">96,000</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">MDL</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[83.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">Cheltuieli reale</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[26.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[27px]">95%</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[18px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container9() {
  return <div className="bg-black h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container10() {
  return (
    <div className="bg-[#f3f4f6] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-0 pr-[12.461px] py-0 relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[34px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container10 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[14px] left-[64.64px] top-[2px] w-[67.563px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#101828] text-[12px] top-[-1px] w-[68px]">91,100 MDL</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">Buget real:</p>
      <Text6 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[25px] top-[62px] w-[244px]">
      <Frame3 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      <Container7 />
      <Frame4 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[117.383px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21.429px] left-0 not-italic text-[15px] text-black text-nowrap top-0 tracking-[-0.1611px] uppercase">Sarcini completate</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[25px] top-[25px] w-[244px]" data-name="Container">
      <Heading2 />
      <Icon2 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[23.5px] left-[22.59px] top-[21px] w-[18.766px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[0.41px] not-italic text-[#6a7282] text-[20px] top-[-3.19px] tracking-[-0.4492px] w-[46px]">/8</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[54px] left-[25px] top-[62px] w-[244px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[54px] left-0 not-italic text-[#960010] text-[36px] text-nowrap top-[0.5px] tracking-[0.3691px]">3</p>
      <Text7 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[21px] left-[25px] top-[120px] w-[244px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">task-uri</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[72.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">Progres total</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[26.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[27px]">38%</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[18px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container16() {
  return <div className="bg-black h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container17() {
  return (
    <div className="bg-[#f3f4f6] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-0 pr-[152.5px] py-0 relative size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[34px] items-start left-[25px] top-[153px] w-[244px]" data-name="Container">
      <Container15 />
      <Container17 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[14px] left-[25px] top-[201px] w-[92.508px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-[-1px] w-[93px]">5 sarcini rămase</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="[grid-area:1_/_3] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      <Container14 />
      <Paragraph4 />
      <Paragraph5 />
      <Container18 />
      <Text10 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[112.102px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21.429px] left-0 not-italic text-[15px] text-black text-nowrap top-0 tracking-[-0.1611px] uppercase">Furnizori selectați</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[25px] top-[25px] w-[244px]" data-name="Container">
      <Heading3 />
      <Icon3 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[23.5px] left-[23.38px] top-[21px] w-[40.422px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-[-0.38px] not-italic text-[#6a7282] text-[20px] top-[-3.19px] tracking-[-0.4492px] w-[84px]">/165</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[54px] left-[25px] top-[62px] w-[244px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[54px] left-0 not-italic text-[#960010] text-[36px] text-nowrap top-[0.5px] tracking-[0.3691px]">0</p>
      <Text11 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[21px] left-[25px] top-[120px] w-[244px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">furnizori</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[18px] relative shrink-0 w-[91.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px">Progres selecție</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[18.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[19px]">0%</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[18px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container22() {
  return <div className="bg-black h-[8px] rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container23() {
  return (
    <div className="bg-[#f3f4f6] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-0 pr-[244px] py-0 relative size-full">
        <Container22 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[34px] items-start left-[25px] top-[153px] w-[244px]" data-name="Container">
      <Container21 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[18px] left-[25px] top-[199px] w-[244px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[132px]">165 furnizori disponibili</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="[grid-area:1_/_4] bg-white place-self-stretch relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
      <Container20 />
      <Paragraph6 />
      <Paragraph7 />
      <Container24 />
      <Container25 />
    </div>
  );
}

export default function Container27() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] relative size-full" data-name="Container">
      <Container6 />
      <Container13 />
      <Container19 />
      <Container26 />
    </div>
  );
}