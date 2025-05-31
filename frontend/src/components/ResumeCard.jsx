import React from 'react';
import { Link } from 'react-router-dom';

export const ResumeCard = ({
  image,
  jobTitle,
  company,
  date,
  category,
  status
}) => {
  return (
    <article className="bg-white w-full max-w-[1334px] text-xl mt-[61px] pb-[39px] rounded-[30px] max-md:max-w-full max-md:mt-10">
      <img
        src={image}
        className="aspect-[5] object-contain w-full rounded-[30px_30px_0px_0px] max-md:max-w-full"
        alt={`${jobTitle} portfolio preview`}
      />
      <div className="flex w-full flex-col mt-[22px] px-[31px] max-md:max-w-full max-md:px-5">
        <div className="self-stretch flex w-full items-stretch gap-5 flex-wrap justify-between max-md:max-w-full">
          {/* Modified the div containing the Job Icon and Job Title to add ml-2.5 */}
          <div className="flex items-stretch gap-[19px] text-[rgba(54,122,255,1)] font-normal ml-2.5"> {/* Added ml-2.5 here */}
            <img
              src="/person.png"
              className="aspect-[1] object-contain w-[30px] shrink-0" // Removed -ml-2 from previous incorrect change
              alt="Job icon"
            />
            <span className="basis-auto">{jobTitle}</span>
          </div>
          <div className={`${
            status === 'Rejected'
              ? 'bg-[rgba(255,42,42,1)]'
              : 'bg-[rgba(42,255,42,1)]'
          } text-[rgba(253,253,253,1)] font-semibold whitespace-nowrap my-auto px-3.5 rounded-md`}>
            {status}
          </div>
        </div>
        <div className="flex items-stretch gap-4 text-[rgba(54,122,255,1)] font-normal whitespace-nowrap ml-2.5 mt-2">
          <img
            src="/work.png"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Company icon"
          />
          <span className="my-auto">{company}</span>
        </div>
        <div className="flex items-stretch gap-[17px] text-[rgba(54,122,255,1)] font-normal whitespace-nowrap ml-2.5 mt-[5px]">
          <img
            src="calendar.png"
            className="aspect-[1] object-contain w-[30px] shrink-0"
            alt="Date icon"
          />
          <time className="basis-auto my-auto">{date}</time>
        </div>
        <div className="bg-[rgba(182,156,248,1)] text-white font-normal whitespace-nowrap mt-[42px] px-[18px] py-1.5 rounded-[30px] max-md:ml-[5px] max-md:mt-10 w-fit">
          {category}
        </div>
        <Link
          to="/register"
          className="bg-[rgba(54,122,255,1)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-stretch flex flex-col items-center text-white text-center font-normal justify-center mt-[15px] px-[70px] py-4 rounded-[30px] max-md:max-w-full max-md:mr-[7px] max-md:px-5 hover:bg-[rgba(44,102,235,1)] transition-colors no-underline"
        >
          <div className="flex w-[157px] max-w-full items-stretch gap-2.5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/71b66f76dce56b7148bde720a0b07eaf927b7349?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[30px] shrink-0"
              alt="View icon"
            />
            <span className="grow shrink w-[111px] my-auto">
              View Details
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
};