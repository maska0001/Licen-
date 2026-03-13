import { useEffect } from 'react';
import HomeMobile from '../../imports/HomeMobile';

interface MarketingLandingMobileProps {
  onGetStarted: () => void;
}

export function MarketingLandingMobile({ onGetStarted }: MarketingLandingMobileProps) {
  useEffect(() => {
    // Add click handlers to all registration buttons
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked element is a button or contains button text
      const buttonText = target.textContent?.trim();
      
      if (buttonText === 'Înregistrează-te' || buttonText === 'Loghează-te' || buttonText === 'Încearcă acum') {
        e.preventDefault();
        e.stopPropagation();
        onGetStarted();
      }
    };

    document.addEventListener('click', handleButtonClick);

    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, [onGetStarted]);

  return <HomeMobile />;
}
