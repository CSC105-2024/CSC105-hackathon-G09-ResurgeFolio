
import React from 'react';

export const NotificationCard = ({
  status,
  position,
  company,
  date,
  backgroundImage = "https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true",
  className = ''
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
      <div className="flex flex-col relative aspect-[5.012] w-full max-w-full text-xl text-white whitespace-nowrap pt-[11px] pb-[47px] px-20 rounded-[30px_30px_0px_0px] max-md:px-5">
        <img
          src={backgroundImage}
          alt="Card background"
          className="absolute h-full w-full object-cover inset-0 rounded-[30px_30px_0px_0px]"
        />
        <div className={`relative ${getStatusColor(status)} px-2 rounded-[30px] w-fit`}>
          {getStatusText(status)}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex w-full flex-col text-base text-[rgba(54,122,255,1)] mt-2 pl-2.5 pr-[63px] max-md:pr-5">
        {/* Position */}
        <div className="flex items-stretch gap-[17px] mb-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/be0fa09027540cc023e428bc12a40016a110a94c?placeholderIfAbsent=true"
            alt="Position icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
          />
          <div className="basis-auto my-auto font-medium">
            {position}
          </div>
        </div>

        {/* Company */}
        <div className="flex items-stretch gap-[17px] whitespace-nowrap mb-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/69c2856a6961d1eb58347b9fa7f65ac35c8ebf57?placeholderIfAbsent=true"
            alt="Company icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
          />
          <div className="my-auto font-medium">
            {company}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-stretch gap-[17px] whitespace-nowrap mb-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/251a46d7aab82b22e97cac40c6e5378c619a6315?placeholderIfAbsent=true"
            alt="Date icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
          />
          <div className="my-auto font-medium">
            {date}
          </div>
        </div>

        {/* View Details Button */}
        <button className="bg-[rgba(54,122,255,1)] flex items-center justify-center gap-[7px] text-xl text-white px-[43px] py-4 rounded-[30px] hover:bg-blue-600 transition-colors duration-200 max-md:px-5">
          <span className="font-medium">
            View Details
          </span>
        </button>
      </div>
    </article>
  );
};
