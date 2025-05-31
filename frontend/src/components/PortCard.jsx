
import React from 'react';

export const PortCard = ({
  status,
  position,
  company,
  date,
  onViewDetails,
  onAddReview,
  className = ''
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-[rgba(254,242,0,1)]';
      case 'completed':
        return 'bg-green-500';
      case 'in-review':
        return 'bg-orange-500';
      default:
        return 'bg-[rgba(254,242,0,1)]';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'in-review':
        return 'In Review';
      default:
        return 'Pending';
    }
  };

  return (
    <article className={`bg-white grow font-normal w-full pb-[45px] rounded-[30px] ${className}`}>
      <div className="flex flex-col relative aspect-[5.012] w-[411px] max-w-full text-xl text-white whitespace-nowrap pt-[11px] pb-[47px] px-20 rounded-[30px_30px_0px_0px] max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/de5a1cd411fffbb66f1d400a12d7942b56db7091?placeholderIfAbsent=true"
          className="absolute h-full w-full object-cover inset-0"
          alt="Portfolio background"
        />
        <div className={`relative ${getStatusColor()} px-[15px] rounded-[30px] text-black`}>
          {getStatusText()}
        </div>
      </div>
      <div className="flex w-full flex-col text-base text-[rgba(54,122,255,1)] mt-2 pl-2.5 pr-[63px] max-md:pr-5">
        <div className="flex items-stretch gap-[17px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/be0fa09027540cc023e428bc12a40016a110a94c?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Position icon"
          />
          <div className="basis-auto my-auto">
            {position}
          </div>
        </div>
        <div className="flex items-stretch gap-[17px] whitespace-nowrap">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/69c2856a6961d1eb58347b9fa7f65ac35c8ebf57?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Company icon"
          />
          <div className="my-auto">
            {company}
          </div>
        </div>
        <div className="flex items-stretch gap-[17px] whitespace-nowrap">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/251a46d7aab82b22e97cac40c6e5378c619a6315?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Date icon"
          />
          <div className="my-auto">
            {date}
          </div>
        </div>
        <button 
          onClick={onViewDetails}
          className="bg-[rgba(54,122,255,1)] flex items-stretch gap-[3px] text-xl text-white mt-5 px-[53px] py-4 rounded-[30px] max-md:px-5 hover:bg-blue-600 transition-colors"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/71b66f76dce56b7148bde720a0b07eaf927b7349?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="View icon"
          />
          <span className="basis-auto my-auto">
            View Details
          </span>
        </button>
        <button 
          onClick={onAddReview}
          className="bg-[rgba(92,83,233,1)] text-xl text-white mt-5 px-[70px] py-[19px] rounded-[30px] max-md:px-5 hover:bg-purple-700 transition-colors"
        >
          Add Review
        </button>
      </div>
    </article>
  );
};
