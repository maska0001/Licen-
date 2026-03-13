import svgPaths from "./svg-cg14armeyf";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";
import imgContainer from "figma:asset/c62f1af1fab83475a987c6e8c4446613340ebfcb.png";
import imgContainer1 from "figma:asset/8ef9e5a6b81c2de01053c4b39beb1fa17e08453a.png";
import imgContainer2 from "figma:asset/0bcf82eb6691528c2de5c1e55b7fc04cff181a64.png";
import imgContainer3 from "figma:asset/431dba7d859b0780e0df508f2c87a8bc418e6ede.png";
import imgRectangle49 from "figma:asset/df9c3e29e618246d377d0e2a4c1857c9d744d483.png";
import imgRectangle50 from "figma:asset/66cb4c28a8c243d16a3e3664d6f82e019cdb3394.png";
import imgRectangle51 from "figma:asset/e25e65a1d04953d1ddbc8fa6671ec1ad7e344c13.png";
import imgRectangle48 from "figma:asset/6890489c8f401f811e93e1252f749e269a2c7609.png";
import imgImage477 from "figma:asset/f27bd70f58ff5246c3e88f128274c8398c9e0e13.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[17.143px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1429 17.1429">
        <g clipPath="url(#clip0_68_85)" id="Icon">
          <path d={svgPaths.p1e436700} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_68_85">
            <rect fill="white" height="17.1429" width="17.1429" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21.429px] relative shrink-0 w-[211.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-0 not-italic text-[#0a0a0a] text-[15px] text-nowrap top-[0.54px] tracking-[-0.1611px]">Organizează evenimentul tau cu noi!</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex gap-[8.571px] h-[38.571px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Text />
    </div>
  );
}

function ImagePolubvi() {
  return (
    <div className="h-[32px] relative shrink-0 w-[128.391px]" data-name="Image (POLUBVI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImagePolubvi} />
    </div>
  );
}

function Link() {
  return (
    <div className="h-[21.429px] relative shrink-0 w-[40.974px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-0 not-italic text-[#0a0a0a] text-[15px] text-nowrap top-[0.54px] tracking-[-0.1611px]">Acasă</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[22px] relative shrink-0 w-[127px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-0 not-italic text-[#0a0a0a] text-[15px] text-nowrap top-[0.54px] tracking-[-0.1611px]">Cum funcționează</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[21.429px] relative shrink-0 w-[64.788px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-0 not-italic text-[#0a0a0a] text-[15px] text-nowrap top-[0.54px] tracking-[-0.1611px]">De ce noi?</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-[21.429px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[25.714px] items-center relative size-full">
        <Link />
        <Link1 />
        <Link2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[34px] relative shrink-0 w-[589px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[34.286px] items-center relative size-full">
        <ImagePolubvi />
        <Container1 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-center justify-center px-[29px] py-[13px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e8e8e8] border-solid inset-0 pointer-events-none rounded-[1.50296e+07px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[19px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap tracking-[-0.2516px]">Loghează-te</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black content-stretch flex h-[45px] items-center justify-center px-[28px] py-[12px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[19px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[-0.2516px]">Înregistrează-te</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-white h-[72.857px] relative shrink-0 w-full" data-name="Navigation">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[114px] py-0 relative size-full">
          <Container2 />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[111.429px] items-start relative shrink-0 w-full z-[2]" data-name="Navbar">
      <Container />
      <Navigation />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#0a0a0a] h-[26px] left-[3.62px] rounded-[1.9232e+07px] top-[2.57px] w-[75px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.835px] left-[10px] not-italic text-[12.626px] text-nowrap text-white top-[4px]">POLUBVI</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f5f5f5] h-[33px] relative rounded-[1.9232e+07px] shrink-0 w-[256px]" data-name="Container">
      <Text1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.341px] left-[86.62px] not-italic text-[13.756px] text-black text-nowrap top-[6.57px]">Toolul de care ai nevoie!</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[128px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[64px] left-0 not-italic text-[#0a0a0a] text-[53.09px] top-0 tracking-[0.2486px] uppercase w-[662.243px]">De la idee la eveniment memorabil</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[21.906px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9057 21.9057">
        <g id="Icon">
          <path d="M4.56308 10.953H17.3414" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.82548" />
          <path d={svgPaths.p35b41b40} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.82548" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[7.167px] items-center justify-center px-[28px] py-[16px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(90deg, rgb(152, 16, 250) 0%, rgb(230, 0, 118) 100%), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[19px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.2516px]">Loghează-te gratuit</p>
      <Icon1 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[29px] py-[17px] relative rounded-[1.50296e+07px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e8e8e8] border-solid inset-0 pointer-events-none rounded-[1.50296e+07px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[19px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] text-center text-nowrap tracking-[-0.2516px]">Vezi cum funcționează</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[48.75px] relative shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContainer} />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-[#51a2ff] left-0 rounded-[2.27191e+07px] size-[54.167px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.708px] relative rounded-[inherit] size-full">
        <Container4 />
      </div>
      <div aria-hidden="true" className="absolute border-[2.708px] border-solid border-white inset-0 pointer-events-none rounded-[2.27191e+07px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[48.75px] relative shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContainer1} />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#ff8904] left-[37.92px] rounded-[2.27191e+07px] size-[54.167px] top-0" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.708px] relative rounded-[inherit] size-full">
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border-[2.708px] border-solid border-white inset-0 pointer-events-none rounded-[2.27191e+07px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[48.75px] relative shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContainer2} />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute left-[75.83px] rounded-[2.27191e+07px] size-[54.167px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[2.27191e+07px]">
        <div className="absolute bg-[#ff6467] inset-0 rounded-[2.27191e+07px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[2.27191e+07px] size-full" src={imgContainer3} />
      </div>
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2.708px] relative rounded-[inherit] size-full">
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border-[2.708px] border-solid border-white inset-0 pointer-events-none rounded-[2.27191e+07px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[54.167px] left-0 top-0 w-[130px]" data-name="Container">
      <Container5 />
      <Container7 />
      <Container9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[54.167px] relative shrink-0 w-[130px]">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[28.697px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.697px] left-0 not-italic text-[#0a0a0a] text-[18.448px] text-nowrap top-0 tracking-[-0.4504px]">12k+</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[20.498px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.498px] left-0 not-italic text-[#4a5565] text-[14.349px] text-nowrap top-[0.51px] tracking-[-0.1541px]">evenimente organizate</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[223.116px]">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[49.195px] relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col h-[49.195px] items-start relative shrink-0 w-[223.116px]" data-name="Container">
      <Frame6 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[22px] items-center relative shrink-0">
      <Frame2 />
      <Container13 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[26px] items-start left-[114px] top-[82.57px] w-[662.243px]">
      <Container3 />
      <Frame7 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30.875px] not-italic relative shrink-0 text-[#4a5565] text-[19.848px] tracking-[-0.4846px] w-[575px]">Planifică, gestionează și colaborează cu furnizori într-un singur loc. De la nuntă la zi de naștere - totul organizat inteligent, fără stres și fără haos.</p>
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[1306.098px] opacity-[0.78] overflow-clip relative w-[576.828px]">
      <div className="absolute bottom-[642.79px] h-[312.856px] left-0 rounded-[17.109px] w-[283.526px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[17.109px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[17.109px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgContainer1} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgRectangle49} />
        </div>
      </div>
      <div className="absolute bottom-[481.47px] h-[312.856px] left-[293.3px] rounded-[17.109px] w-[283.526px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[17.109px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[17.109px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgRectangle50} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgContainer2} />
        </div>
      </div>
      <div className="absolute bottom-[799.21px] h-[312.856px] left-[293.3px] rounded-[17.109px] w-[283.526px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[17.109px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[17.109px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgRectangle51} />
        </div>
      </div>
      <div className="absolute bottom-[163.73px] h-[312.856px] left-[293.3px] rounded-[17.109px] w-[283.526px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[17.109px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[17.109px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgContainer} />
        </div>
      </div>
      <div className="absolute bottom-[321.38px] h-[312.856px] left-0 rounded-[17.109px] w-[283.526px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[17.109px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[17.109px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgContainer2} />
        </div>
      </div>
      <div className="absolute bottom-[-0.03px] h-[312.856px] left-0 rounded-[17.109px] w-[283.526px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[17.109px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[17.109px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[17.109px] size-full" src={imgRectangle48} />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[703px] relative shrink-0 w-full z-[1]">
      <Frame9 />
      <div className="absolute flex h-[1387.111px] items-center justify-center left-[827px] top-[-463.59px] w-[797.274px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[10.116deg]">
          <Frame8 />
        </div>
      </div>
      <div className="absolute h-[1266.333px] left-[727.69px] top-[-191.64px] w-[712.312px]" data-name="image 477">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage477} />
      </div>
    </div>
  );
}

export default function Frame10() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full">
      <Navbar />
      <Frame5 />
    </div>
  );
}