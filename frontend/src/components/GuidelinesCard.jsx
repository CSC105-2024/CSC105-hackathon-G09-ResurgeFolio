import React from 'react';

const GuidelineItem = ({ children }) => (
  <div className="flex items-start gap-[15px]">
    {/* Changed items-center to items-start for better vertical alignment of the icon with the text */}
    <div className="flex items-start justify-center w-12 h-12 p-1">
      <div className="flex items-center justify-center p-[11px] rounded-[100px]">
        <div className="w-[18px] h-[18px] bg-[#4CAF50] relative rounded-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] absolute left-[-3px] top-[-3px]">
            <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
    {/* Added break-words for better text wrapping */}
    <div className="text-black text-xs font-normal leading-normal flex-1 break-words">
      {children}
    </div>
  </div>
);

export const GuidelinesCard = () => {
  return (
    // Changed h-[302px] to min-h-[302px] to prevent content overflow
    // Alternatively, for a fixed height with scroll: className="w-[489px] h-[302px] overflow-y-auto bg-[rgba(118,118,118,0.15)] shadow-[7px_10px_4px_0px_rgba(0,0,0,0.25)] p-[33px] max-md:w-full max-sm:p-6"
    <aside className="w-[489px] min-h-[200px] bg-[rgba(118,118,118,0.15)] shadow-[7px_10px_4px_0px_rgba(0,0,0,0.25)] p-[33px] max-md:w-full max-sm:p-6">
      <h2 className="text-[#0D25FF] text-[32px] font-bold leading-normal mb-[27px] max-sm:text-2xl">
        Submission Guidelines
      </h2>
      <div className="flex flex-col gap-2.5" role="list">
        <div role="listitem">
          <GuidelineItem>
            Ensure your portfolio URL is live and accessible.
          </GuidelineItem>
        </div>
        <div role="listitem">
          <GuidelineItem>
            Provide a clear title and description for your work.
          </GuidelineItem>
        </div>
        <div role="listitem">
          <GuidelineItem>
            If comfortable, share how any failures contributed to your growth. This is optional but encouraged!
          </GuidelineItem>
        </div>
        <div role="listitem">
          <GuidelineItem>
            Your submission will be reviewed and may be featured in our gallery.
          </GuidelineItem>
        </div>
      </div>
    </aside>
  );
};