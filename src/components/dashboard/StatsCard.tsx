import React from 'react';
import svgPaths from "../../imports/svg-02t0o90l7y";

interface StatsCardProps {
  title: string;
  mainValue: string | number;
  secondaryValue?: string | number; // For "3/8" format
  subtitle?: string;
  progressLabel: string;
  progressPercent: number;
  bottomContent: React.ReactNode;
  onClick?: () => void;
}

function ArrowIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d="M4.16667 10H15.8333" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

export function StatsCard({
  title,
  mainValue,
  secondaryValue,
  subtitle,
  progressLabel,
  progressPercent,
  bottomContent,
  onClick
}: StatsCardProps) {
  return (
    <div 
      className="bg-white border border-[#e7e7e7] cursor-pointer hover:border-[#960010] transition-all group relative h-[242px]"
      onClick={onClick}
    >
      {/* Header */}
      <div className="absolute content-stretch flex h-[21px] items-center justify-between left-[25px] top-[25px] w-[244px]">
        <div className="h-[21px] relative shrink-0">
          <div className="bg-clip-padding border-0 border-transparent border-solid relative size-full">
            <p className="font-medium leading-[21.429px] not-italic text-[15px] text-black text-nowrap tracking-[-0.1611px] uppercase">
              {title}
            </p>
          </div>
        </div>
        <ArrowIcon />
      </div>

      {/* Main Value */}
      <div className="absolute h-[54px] left-[25px] top-[62px] w-[244px]">
        <p className="font-medium leading-[54px] not-italic text-[#960010] text-[36px] text-nowrap tracking-[0.3691px]">
          {mainValue}
          {secondaryValue && (
            <span className="font-semibold leading-[30px] not-italic text-[#6a7282] text-[20px] tracking-[-0.4492px]">
              /{secondaryValue}
            </span>
          )}
        </p>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="absolute h-[21px] left-[25px] top-[120px] w-[244px]">
          <p className="font-normal leading-[21px] not-italic text-[#6a7282] text-[14px] text-nowrap tracking-[-0.1504px]">
            {subtitle}
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute content-stretch flex flex-col gap-[8px] h-[34px] items-start left-[25px] top-[153px] w-[244px]">
        {/* Labels */}
        <div className="content-stretch flex h-[18px] items-start justify-between relative shrink-0 w-full">
          <div className="h-[18px] relative shrink-0">
            <div className="bg-clip-padding border-0 border-transparent border-solid relative size-full">
              <p className="font-normal leading-[18px] not-italic text-[#6a7282] text-[12px] text-nowrap">
                {progressLabel}
              </p>
            </div>
          </div>
          <div className="h-[18px] relative shrink-0">
            <div className="bg-clip-padding border-0 border-transparent border-solid relative size-full">
              <p className="font-normal leading-[18px] not-italic text-[#6a7282] text-[12px]">
                {Math.round(progressPercent)}%
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#f3f4f6] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative size-full overflow-hidden">
            <div 
              className="bg-black h-[8px] rounded-[1.67772e+07px] shrink-0 transition-all"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute left-[25px] top-[199px] w-[244px]">
        {bottomContent}
      </div>
    </div>
  );
}