import { MarketingLandingDesktop } from './MarketingLandingDesktop';
import { MarketingLandingMobileEnhanced } from './MarketingLandingMobileEnhanced';

interface MarketingLandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function MarketingLanding({ onLogin, onRegister }: MarketingLandingProps) {
  return (
    <>
      {/* Desktop version - hidden on mobile */}
      <div className="hidden lg:block w-full">
        <MarketingLandingDesktop onLogin={onLogin} onRegister={onRegister} />
      </div>
      
      {/* Mobile version - hidden on desktop */}
      <div className="block lg:hidden w-full">
        <MarketingLandingMobileEnhanced onLogin={onLogin} onRegister={onRegister} />
      </div>
    </>
  );
}