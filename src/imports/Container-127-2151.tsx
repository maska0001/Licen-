import svgPaths from "./svg-yk4l6gersv";
import imgImage470 from "figma:asset/e08073d580deb5e62836424781e803074df7e7ba.png";

function Frame() {
  return (
    <div className="relative shrink-0 size-[50px]">
      <div className="absolute left-1/2 size-[64.396px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="image 470">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage470} />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      {[...Array(3).keys()].map((_, i) => (
        <Frame key={i} />
      ))}
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[#960010] text-[28px] text-nowrap top-0 tracking-[-0.56px] uppercase">Premium</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21.43px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-0 not-italic text-[#414c5a] text-[15px] text-nowrap top-[-0.5px] tracking-[-0.1611px]">Calitate maximă pentru o experiență de neuitat</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[15px] text-black text-nowrap top-[-1px]">Grand Banquet Hall</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#4a5565] text-[13px] text-nowrap top-px">450 MDL × 250 invitați</p>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 grow h-[46px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[100px] not-italic text-[16px] text-black text-right top-[-1px] translate-x-[-100%] w-[100px]">112,500 MDL</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p158a9780} fill="var(--fill-0, #960010)" id="Vector" stroke="var(--stroke-0, #960010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[19.211px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[20px] not-italic text-[#4a5565] text-[13px] text-nowrap text-right top-px translate-x-[-100%]">4.8</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[19.5px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Text />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[47.5px] relative shrink-0 w-[99.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph3 />
        <Container1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[47.5px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[63.5px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[25px] items-start left-[32px] top-[28px] w-[412px]">
      <Frame3 />
      <Container4 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[103.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#4a5565] text-[13px] text-nowrap top-px tracking-[0.65px] uppercase">Total pachet</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[187.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[32px] left-[0.02px] not-italic text-[#960010] text-[32px] top-[-0.15px] tracking-[-1px] w-[202px]">112,500 MDL</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #960010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #960010)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[181.352px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#960010] text-[14px] top-0 w-[182px]">Economisești 282,500 MDL</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Text3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[91px] items-start left-[32px] pb-0 pt-[26px] px-0 top-[277.43px] w-[412px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[2px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-black h-[56px] left-[32px] rounded-[1.67772e+07px] top-[392.43px] w-[412px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[206.45px] not-italic text-[16px] text-center text-nowrap text-white top-[15px] tracking-[-0.2px] translate-x-[-50%] uppercase">Alege pachetul</p>
    </div>
  );
}

export default function Container8() {
  return (
    <div className="bg-white border-2 border-[#e5e7eb] border-solid relative size-full" data-name="Container">
      <Frame4 />
      <Container7 />
      <Button />
    </div>
  );
}