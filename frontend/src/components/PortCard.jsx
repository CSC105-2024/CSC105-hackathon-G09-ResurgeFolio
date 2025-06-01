import React from 'react';

export const PortCard = ({
  status, // expected to be lowercase: 'pending', 'approved', 'rejected', 'in-review'
  position,
  company,
  date,
  onViewDetails,
  onAddReview,
  className = ''
}) => {
  // Function to determine the background color based on status
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'; // Yellow for pending
      case 'approved': // Assuming 'completed' might map to 'approved'
        return 'bg-green-500'; // Green for approved/completed
      case 'rejected':
        return 'bg-red-500'; // Red for rejected, as in the image
      case 'in-review':
        return 'bg-orange-500'; // Orange for in-review
      default:
        return 'bg-gray-400'; // A neutral default
    }
  };

  // Function to get the display text for the status
  const getStatusText = () => {
    if (!status) return 'Unknown';
    // Capitalize the first letter of the status
    return status.charAt(0).toUpperCase() + status.slice(1); 
  };

  return (
    <article className={`bg-white grow font-normal w-full pb-[45px] rounded-[30px] shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out ${className}`}>
      {/* Header section with background image and status badge */}
      {/* The parent div for the image and badge needs to be relative for absolute positioning of the badge */}
      <div className="relative aspect-[5.012] w-full max-w-full rounded-t-[30px] overflow-hidden"> {/* Ensured parent is relative and handles overflow for rounded corners */}
        <img
          src="/banner.png"
          className="absolute h-full w-full object-cover inset-0" // Image covers the div
          alt="Portfolio background"
        />
        {/* Status Badge: Absolutely positioned to the top-right */}
        <div 
          className={`absolute top-3 right-3 ${getStatusColor()} px-2.5 py-1 rounded-md text-white text-xs font-semibold`}
        >
          {getStatusText()}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex w-full flex-col text-base text-[rgba(54,122,255,1)] mt-2 px-5 pt-3"> {/* Adjusted padding for content area */}
        {/* Position Details */}
        <div className="flex items-center gap-[17px] mb-1"> {/* Reduced bottom margin */}
          <img
            src="/person.png"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Position icon"
          />
          <div className="basis-auto my-auto">
            {position}
          </div>
        </div>
        {/* Company Details */}
        <div className="flex items-center gap-[17px] whitespace-nowrap mt-1 mb-1"> {/* Reduced bottom margin */}
          <img
            src="work.png"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Company icon"
          />
          <div className="my-auto">
            {company}
          </div>
        </div>
        {/* Date Details */}
        <div className="flex items-center gap-[17px] whitespace-nowrap mt-1 mb-3"> {/* Adjusted bottom margin */}
          <img
            src="/calendar.png"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Date icon"
          />
          <div className="my-auto">
            {date}
          </div>
        </div>
        {/* View Details Button */}
        <button 
          onClick={onViewDetails}
          className="bg-[rgba(54,122,255,1)] flex items-center justify-center gap-[7px] text-xl text-white mt-4 px-[53px] py-3.5 rounded-[30px] max-md:px-5 hover:bg-blue-700 transition-colors duration-150 ease-in-out" /* Adjusted padding & hover */
        >
          <img
            src="/openeye.png"
            className="aspect-[1] object-contain w-[24px] h-[24px] shrink-0" /* Slightly smaller icon */
            alt="" // Decorative icon, alt can be empty
          />
          <span className="basis-auto my-auto">
            View Details
          </span>
        </button>
        {/* Add Review Button */}
        <button 
          onClick={onAddReview}
          className="bg-[rgba(92,83,233,1)] text-xl text-white mt-3 px-[70px] py-4 rounded-[30px] max-md:px-5 hover:bg-purple-700 transition-colors duration-150 ease-in-out" /* Adjusted padding & hover */
        >
          Add Review
        </button>
      </div>
    </article>
  );
};
