import HomeDesktopEnhanced from './HomeDesktopEnhanced';

interface MarketingLandingDesktopProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function MarketingLandingDesktop({ onLogin, onRegister }: MarketingLandingDesktopProps) {
  return <HomeDesktopEnhanced onLogin={onLogin} onRegister={onRegister} />;
}