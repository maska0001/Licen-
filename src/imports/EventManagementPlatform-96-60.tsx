import svgPaths from "./svg-pdnv9up2ou";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";

function Icon() {
  return (
    <div className="absolute left-0 size-[15.994px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9943 15.9943">
        <g id="Icon">
          <path d={svgPaths.p24f45e00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
          <path d="M12.6622 7.99715H3.33214" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33286" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[19.991px] left-[23.99px] top-0 w-[80.718px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[40.5px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[0.71px] tracking-[-0.1504px] translate-x-[-50%]">Înapoi la site</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[19.991px] left-[14.1px] top-[113.49px] w-[104.705px]" data-name="Button">
      <Icon />
      <Text />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-[0.71px] tracking-[-0.1504px]">Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="h-[51.997px] relative rounded-[1.90714e+07px] shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-0 relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] text-nowrap tracking-[-0.3125px]">exemplu@email.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.568px] border-solid inset-0 pointer-events-none rounded-[1.90714e+07px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.993px] h-[80px] items-start left-0 top-0 w-[361px]" data-name="Container">
      <Label />
      <EmailInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] text-nowrap top-[0.71px] tracking-[-0.1504px]">Parolă</p>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute h-[52px] left-0 rounded-[1.90714e+07px] top-[0.02px] w-[361px]" data-name="Password Input">
      <div className="content-stretch flex items-center overflow-clip pl-[16px] pr-[48px] py-0 relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] text-nowrap tracking-[-0.3125px]">••••••••••••</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.568px] border-solid inset-0 pointer-events-none rounded-[1.90714e+07px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3342 13.3323">
            <path d={svgPaths.pcb0000} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[322px] size-[20px] top-1/2 translate-y-[-50%]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[51.997px] relative shrink-0 w-full" data-name="Container">
      <PasswordInput />
      <Button1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.993px] h-[80px] items-start left-0 top-[104px] w-[361px]" data-name="Container">
      <Label1 />
      <Container1 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex h-[16.483px] items-start left-[265.01px] top-[197.73px] w-[95.993px]" data-name="Link">
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap text-right tracking-[-0.1504px] underline">Ai uitat parola?</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-black content-stretch flex h-[48px] items-center justify-center left-0 px-[28px] py-[12px] rounded-[1.50296e+07px] top-[256px] w-[361px]" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-white tracking-[-0.1611px]">Înregistrează-te</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 px-[29px] py-[13px] rounded-[1.50296e+07px] top-[318px] w-[361px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[1.50296e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-center text-nowrap tracking-[-0.1611px]">Cont demo</p>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute h-[366px] left-[16px] top-[331px] w-[361px]" data-name="Form">
      <Container />
      <Container2 />
      <Link />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[31.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[133.03px] not-italic text-[#6a7282] text-[12px] text-center top-[1.14px] translate-x-[-50%] w-[256px]">Demo: folosește orice email și o parolă cu cel puțin 6 caractere</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15.994px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[132.64px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-[1.14px] translate-x-[-50%]">{`sau apasă "Cont Demo" pentru acces instant`}</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72.547px] items-start left-[64px] pb-0 pt-[24.564px] px-0 top-[746.64px] w-[265.323px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.568px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[18.188px] items-start left-[17.31px] top-[256.2px] w-[160.716px]" data-name="Text">
      <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] not-italic relative shrink-0 text-[#4a5565] text-[15px] text-nowrap tracking-[-0.2344px] underline">Creează un cont gratuit</p>
    </div>
  );
}

function ImagePolubvi() {
  return (
    <div className="h-[24px] relative shrink-0 w-[96.293px]" data-name="Image (POLUBVI)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImagePolubvi} />
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Menu">
          <g id="Fill">
            <path d={svgPaths.p2c5d6280} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3067a680} fill="var(--fill-0, black)" />
            <path d={svgPaths.p24ae58c0} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Nav() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[20px] pt-[22px] px-[16px] relative w-full">
          <ImagePolubvi />
          <Menu />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0">
      <Nav />
    </div>
  );
}

export default function EventManagementPlatform() {
  return (
    <div className="bg-white relative size-full" data-name="Event Management Platform">
      <Button />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-none left-[17.31px] not-italic text-[#960010] text-[43px] top-[195.42px] tracking-[-2.58px] uppercase w-[361px]">LOGHEAZĂ-TE</p>
      <Form />
      <Container3 />
      <Text1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-[182.09px] not-italic text-[#4a5565] text-[15px] top-[256.2px] tracking-[-0.2344px] w-[203px]">{`sau autentifică-te pentru `}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-[17.31px] not-italic text-[#4a5565] text-[15px] top-[279.36px] tracking-[-0.2344px] w-[203px]">a începe</p>
      <Frame />
    </div>
  );
}