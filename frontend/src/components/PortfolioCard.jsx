
import React from 'react';
import { TagBadge } from './TagBadge';
import { StatusBadge } from './StatusBadge';

export const PortfolioCard = ({
  id,
  title,
  company,
  position,
  date,
  status,
  tags,
  imageUrl,
  onViewDetails
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  return (
    <article className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <img
        src={imageUrl}
        alt={`${title} portfolio preview`}
        className="aspect-[5] object-contain w-full rounded-[30px_30px_0px_0px]"
      />
      
      <div className="flex w-full flex-col mt-[22px] px-[31px] pb-[39px]">
        <div className="self-stretch flex w-full items-stretch gap-5 flex-wrap justify-between">
          <div className="flex items-stretch gap-[19px] text-[rgba(54,122,255,1)] font-normal">
            <img
              src="/person.png"
              alt="Position icon"
              className="aspect-[1] object-contain w-[30px] shrink-0"
            />
            <span className="basis-auto">{position}</span>
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="flex items-stretch gap-4 text-[rgba(54,122,255,1)] font-normal whitespace-nowrap ml-2.5 mt-2">
          <img
            src="/work.png"
            alt="Company icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
          />
          <span className="my-auto">{company}</span>
        </div>
        
        <div className="flex items-stretch gap-[17px] text-[rgba(54,122,255,1)] font-normal whitespace-nowrap ml-2.5 mt-[5px]">
          <img
            src="/calendar.png"
            alt="Date icon"
            className="aspect-[1] object-contain w-[30px] shrink-0"
          />
          <time className="basis-auto my-auto" dateTime={date}>
            {date}
          </time>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-[42px]">
          {tags.map((tag, index) => (
            <TagBadge key={index} variant={index === 0 ? 'secondary' : 'primary'}>
              {tag}
            </TagBadge>
          ))}
        </div>
        
        <button
          onClick={handleViewDetails}
          className="bg-[rgba(54,122,255,1)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-stretch flex flex-col items-center text-white font-normal justify-center mt-[15px] px-[70px] py-4 rounded-[30px] hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`View details for ${title}`}
        >
          <div className="flex w-[157px] max-w-full items-stretch gap-2.5">
            <img
              src="/openeye.png"
              alt=""
              className="aspect-[1] object-contain w-[30px] shrink-0"
            />
            <span className="grow shrink w-[111px] my-auto">
              View Details
            </span>
          </div>
        </button>
      </div>
    </article>
  );
};
