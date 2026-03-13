import React, { useState, useEffect } from 'react';
import HomeMobile from '../../imports/HomeMobile';
import svgPaths from '../../imports/svg-hfbarq2cqi';
import imgImage470 from "figma:asset/e08073d580deb5e62836424781e803074df7e7ba.png";
import imgImagePolubvi from "figma:asset/e7119f979999e2fe824d2d9bc62d9e86ce9708cd.png";

interface MarketingLandingMobileEnhancedProps {
  onLogin: () => void;
  onRegister: () => void;
}

function MenuItems({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Menu Items">
      <button 
        onClick={() => {
          onLogin();
          onClose();
        }}
        className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-nowrap tracking-[-2.58px] uppercase cursor-pointer text-left w-full hover:opacity-70 transition-opacity">
        LOGHEAZĂ-TE
      </button>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
            <path d="M0 0.5H351" stroke="#F5F5F5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#960010] text-[43px] text-nowrap tracking-[-2.58px] uppercase">Ce include</p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 1">
            <path d="M0 0.5H351" stroke="#F5F5F5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-none min-w-full not-italic relative shrink-0 text-[#960010] text-[43px] tracking-[-2.58px] uppercase w-[min-content]">Cum funcționează</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[89.309px] leading-[0.78] not-italic relative shrink-0 text-[#960010] text-[88px] text-center tracking-[-5.28px] uppercase w-[364.914px]">polubvi</p>
    </div>
  );
}

function MobileMenuContent({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-between min-h-px min-w-px relative shrink-0 w-full" data-name="Mobile Menu Content">
      <MenuItems onClose={onClose} onLogin={onLogin} />
      <div className="relative shrink-0 size-[177.191px]" data-name="image 470">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage470} />
      </div>
      <Frame1 />
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

function CloseIcon({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative shrink-0 size-[28px] cursor-pointer hover:opacity-70 transition-opacity" 
      data-name="Close"
      aria-label="Închide meniul">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <path d="M7 7L21 21M21 7L7 21" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function Nav({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[20px] pt-[22px] px-[16px] relative w-full">
          <ImagePolubvi />
          <CloseIcon onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

function MobileMenuOverlay({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white animate-fadeIn">
      <div className="bg-white content-stretch flex flex-col gap-[289px] items-start pb-[12px] pt-[96px] px-[12px] relative size-full" data-name="Mobile Menu">
        <MobileMenuContent onClose={onClose} onLogin={onLogin} />
        <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0">
          <Nav onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

export function MarketingLandingMobileEnhanced({ onLogin, onRegister }: MarketingLandingMobileEnhancedProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Add click handlers to all registration buttons
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked element is the menu icon or any of its parents
      const menuIcon = target.closest('[data-name="Menu"]') || 
                      target.closest('svg') && target.closest('svg')?.closest('[data-name="Menu"]');
      if (menuIcon) {
        e.preventDefault();
        e.stopPropagation();
        setIsMenuOpen(true);
        return;
      }
      
      // Check if clicked element is a button or contains button text
      const buttonText = target.textContent?.trim();
      
      if (buttonText === 'Înregistrează-te' || buttonText === 'Loghează-te' || buttonText === 'Încearcă acum') {
        e.preventDefault();
        e.stopPropagation();
        onLogin();
      }
    };

    document.addEventListener('click', handleButtonClick);

    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, [onLogin]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <HomeMobile />
      {isMenuOpen && (
        <MobileMenuOverlay 
          onClose={() => setIsMenuOpen(false)} 
          onLogin={onLogin}
        />
      )}
    </>
  );
}