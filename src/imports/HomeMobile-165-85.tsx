import svgPaths from "./svg-pvemfrrk6x";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";
import imgHeroImage from "figma:asset/76e6f5ecf67a186705359b4f00347f8b04c8da76.png";

export default function HomeMobile() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative w-[375px]" data-name="Home - Mobile">
      <div className="content-stretch flex flex-col h-[776px] isolate items-start relative shrink-0 w-full" data-name="Hero">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
          <div className="bg-white relative shrink-0 w-full" data-name="Nav">
            <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center justify-between pb-[20px] pt-[22px] px-[16px] relative w-full">
                <div className="h-[24px] relative shrink-0 w-[96.293px]" data-name="Image (POLUBVI)">
                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImagePolubvi} />
                </div>
                <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Menu">
                  <div className="absolute bottom-[27.08%] left-[16.67%] right-[16.67%] top-1/4" data-name="Fill">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 13.4167">
                        <g id="Fill">
                          <path d={svgPaths.p16fc2280} fill="var(--fill-0, black)" />
                          <path d="M0 0H18.6667V1.75H0V0Z" fill="var(--fill-0, black)" />
                          <path d={svgPaths.p1423bd00} fill="var(--fill-0, black)" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[225px] relative shrink-0 w-full z-[2]" data-name="Hero Content">
          <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[16px] top-[127.2px] w-[343px]" data-name="Hero Text">
            <div className="bg-[#f5f5f5] content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[10px] py-[3px] relative rounded-[1.9232e+07px] shrink-0" data-name="Container">
              <div className="content-stretch flex items-center relative shrink-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[15px] text-black text-nowrap tracking-[-0.1611px]">Subtitlu</p>
              </div>
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[88px] text-center tracking-[-5.28px] uppercase w-[364.914px]">titlu</p>
          </div>
        </div>
        <div className="h-[443px] relative shrink-0 w-full z-[1]">
          <div className="absolute h-[443px] left-0 top-0 w-[375px]" data-name="Hero Image">
            <div aria-hidden="true" className="absolute bg-repeat bg-size-[500px_500px] bg-top-left inset-0 mix-blend-multiply opacity-[0.21] pointer-events-none" style={{ backgroundImage: `url('${imgHeroImage}')` }} />
          </div>
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] left-[187.5px] not-italic text-[15px] text-center text-white top-[118.53px] tracking-[-0.1611px] translate-x-[-50%] w-[200px]">Text descriere</p>
        </div>
      </div>
      <div className="bg-[#960010] relative shrink-0 w-full" data-name="About">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[100px] relative w-full">
            <div className="bg-white content-stretch flex flex-col items-start max-w-[1112px] relative shrink-0 w-full" data-name="About Content">
              <div className="relative shrink-0 w-full" data-name="Heading Wrapper">
                <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <div className="content-stretch flex items-start pb-[32px] pt-[52px] px-[16px] relative w-full">
                  <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#960010] text-[43px] text-center tracking-[-2.58px] uppercase">DATA</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text Blocks">
                <div className="relative shrink-0 w-full" data-name="Chips & Text">
                  <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                  <div className="content-stretch flex flex-col items-start px-[20px] py-[28px] relative w-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] not-italic relative shrink-0 text-[#414c5a] text-[15px] text-center tracking-[-0.1611px] w-full">Description</p>
                  </div>
                </div>
                <div className="bg-[rgba(0,0,0,0.2)] h-[285px] shrink-0 w-full" data-name="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Journal">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[40px] items-center px-[16px] py-[100px] relative w-full">
            <div className="content-stretch flex flex-col items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
              <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-center w-full" data-name="H2 & Button">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">Locatia</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Adresa completa a locatiei</p>
              </div>
            </div>
            <div className="bg-[rgba(0,0,0,0.2)] h-[285px] shrink-0 w-full" data-name="Image" />
          </div>
        </div>
      </div>
      <div className="bg-[#f5f5f5] relative shrink-0 w-full" data-name="Collab">
        <div className="flex flex-row justify-center size-full">
          <div className="content-stretch flex items-start justify-center px-[16px] py-[100px] relative w-full">
            <div className="basis-0 content-stretch flex flex-col gap-[40px] grow items-center max-w-[1600px] min-h-px min-w-px relative shrink-0" data-name="Collabs Content">
              <div className="content-stretch flex flex-col items-start max-w-[1600px] relative shrink-0 w-full" data-name="Journal Content">
                <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-center w-full" data-name="H2 & Button">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-full">timing</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Collab Blocks">
                <div className="content-stretch flex flex-col gap-[6px] items-start justify-center relative shrink-0 w-[351px]" data-name="Collab Block">
                  <div className="bg-[rgba(232,232,232,0.5)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collab Block Info">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Value & Text Grid">
                      <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Value & Text Row">
                        <div className="relative shrink-0 w-full" data-name="Value & Text">
                          <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Ora</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
                          </div>
                        </div>
                        <div className="relative shrink-0 w-full" data-name="Value & Text">
                          <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Ora</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Value & Text Row">
                        <div className="relative shrink-0 w-full" data-name="Value & Text">
                          <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Ora</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
                          </div>
                        </div>
                        <div className="relative shrink-0 w-full" data-name="Value & Text">
                          <div aria-hidden="true" className="absolute border-[#e7e7e7] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex flex-col gap-[8px] items-start not-italic px-[32px] py-[40px] relative text-center w-full">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-none relative shrink-0 text-[#960010] text-[44px] tracking-[-0.88px] uppercase w-full">Ora</p>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] max-w-[360px] relative shrink-0 text-[#414c5a] text-[15px] tracking-[-0.1611px] w-full">Descriere</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(0,0,0,0.2)] h-[560px] relative shrink-0 w-full" data-name="Image">
                    <div aria-hidden="true" className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#960010] relative shrink-0 w-full" data-name="Banner">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[12px] py-[160px] relative w-full">
            <div className="basis-0 content-stretch flex flex-col grow items-start max-w-[1112px] min-h-px min-w-px relative shrink-0" data-name="Banner Content">
              <div className="bg-white relative shrink-0 w-full" data-name="Banner">
                <div className="flex flex-col items-center size-full">
                  <div className="content-stretch flex flex-col gap-[32px] items-center px-[20px] py-[48px] relative w-full">
                    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col items-center max-w-[280px] relative shrink-0 w-full" data-name="Chips & Heading">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-center tracking-[-2.58px] uppercase w-full">DETALII</p>
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] not-italic relative shrink-0 text-[#414c5a] text-[15px] text-center tracking-[-0.1611px] w-full">Descriere</p>
                    </div>
                    <div className="bg-[rgba(0,0,0,0.2)] h-[285px] shrink-0 w-full" data-name="Image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[333px] overflow-clip relative shrink-0 w-[375px]">
        <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[5.04px] top-[121.49px] w-[364.914px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.78] min-w-full not-italic relative shrink-0 text-[88px] text-center text-white tracking-[-5.28px] uppercase w-[min-content]">polubvi</p>
          <div className="h-0 relative shrink-0 w-[300.429px]">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.429 1">
                <path d="M0 0.5H300.429" id="Vector 1" stroke="var(--stroke-0, white)" strokeOpacity="0.2" />
              </svg>
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21.429px] min-w-full not-italic relative shrink-0 text-[15px] text-[rgba(255,255,255,0.6)] text-center tracking-[-0.1611px] w-[min-content]">
            © 2025 POLUBVI. <br aria-hidden="true" />
            Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </div>
  );
}