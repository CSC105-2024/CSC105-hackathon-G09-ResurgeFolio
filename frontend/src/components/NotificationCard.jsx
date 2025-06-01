import React from 'react';

export const NotificationCard = ({
  status,
  position,
  company,
  date,
  backgroundImage = "/banner.png",
  className = '',
  onViewDetails = () => {} // ✅ default to no-op to prevent errors
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'rejected':
        return 'bg-[rgba(255,42,42,1)]';
      case 'accepted':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <article className={`bg-white font-normal w-full pb-[26px] rounded-[30px] shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Header with Status Badge */}
      {/* Adjusted padding: px-20 to pl-20 pr-10 and max-md:px-5 to max-md:pl-5 max-md:pr-3 */}
      <div className="flex flex-col items-end relative aspect-[5.012] w-full max-w-full text-xl text-white whitespace-nowrap pt-[11px] pb-[47px] pl-20 pr-10 rounded-[30px_30px_0px_0px] max-md:pl-5 max-md:pr-3">
        <img
          src={backgroundImage}
          alt="Card background"
          className="absolute h-full w-full object-cover inset-0 rounded-[30px_30px_0px_0px]"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if placeholder also fails
            e.target.src = `https://placehold.co/600x120/cccccc/ffffff?text=Image+Not+Found`;
          }}
        />
        {/* The status badge will now be aligned further to the right due to reduced right padding on parent */}
        <div className={`relative ${getStatusColor(status)} px-2 rounded-[30px] w-fit`}>
          {getStatusText(status)}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex w-full flex-col text-base text-[rgba(54,122,255,1)] mt-2 pl-2.5 pr-[63px] max-md:pr-5">
        {/* Position */}
        <div className="flex items-stretch gap-[17px] mb-2">
          <img
            src="person.png"
            alt="Position icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/30x30/cccccc/ffffff?text=Icon`;
            }}
          />
          <div className="basis-auto my-auto font-medium">
            {position}
          </div>
        </div>

        {/* Company */}
        <div className="flex items-stretch gap-[17px] whitespace-nowrap mb-2">
          <img
            src="/work.png"
            alt="Company icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/30x30/cccccc/ffffff?text=Icon`;
            }}
          />
          <div className="my-auto font-medium">
            {company}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-stretch gap-[17px] whitespace-nowrap mb-5">
          <img
            src="calendar.png"
            alt="Date icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/30x30/cccccc/ffffff?text=Icon`;
            }}
          />
          <div className="my-auto font-medium">
            {date}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="bg-[rgba(54,122,255,1)] flex items-center justify-center gap-[7px] text-xl text-white px-[43px] py-4 rounded-[30px] hover:bg-blue-600 transition-colors duration-200 max-md:px-5"
        >
          <span className="font-medium">
            View Details
          </span>
        </button>
      </div>
    </article>
  );
};