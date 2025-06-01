import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ResumeCard = ({
  image = '/placeholder.jpg',
  jobTitle = 'Job Title',
  company = 'Company Name',
  date = 'Date',
  category = 'Category',
  status = 'Pending',
  user = null
}) => {
  const isLoggedIn = user?.loggedIn;
  const navigate = useNavigate();

  const handleViewDetail = () => {
    if (isLoggedIn) {
      navigate('/browse');
    } else {
      navigate('/register');
    }
  };

  const statusColor = status === 'Rejected'
    ? 'bg-[rgba(255,42,42,1)]'
    : 'bg-[rgba(42,255,42,1)]';

  return (
    <article className="bg-white w-full max-w-[1334px] text-xl mt-[61px] pb-[39px] rounded-[30px] max-md:max-w-full max-md:mt-10">
      <img
        src={image}
        alt={`${jobTitle} portfolio preview`}
        className="aspect-[5] object-contain w-full rounded-t-[30px] max-md:max-w-full"
      />
      <div className="flex flex-col mt-[22px] px-[31px] max-md:px-5">
        <div className="flex flex-wrap justify-between items-center gap-5 max-md:max-w-full">
          <div className="flex items-center gap-[19px] text-[rgba(54,122,255,1)] font-normal ml-2.5">
            <img src="/person.png" alt="Person icon" className="w-[30px]" />
            <span>{jobTitle}</span>
          </div>
          <div className={`${statusColor} text-white font-semibold px-3.5 rounded-md`}>
            {status}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[rgba(54,122,255,1)] font-normal ml-2.5 mt-2">
          <img src="/work.png" alt="Company icon" className="w-[30px]" />
          <span>{company}</span>
        </div>

        <div className="flex items-center gap-[17px] text-[rgba(54,122,255,1)] font-normal ml-2.5 mt-[5px]">
          <img src="/calendar.png" alt="Calendar icon" className="w-[30px]" />
          <time>{date}</time>
        </div>

        <div className="bg-[rgba(182,156,248,1)] text-white mt-[42px] px-[18px] py-1.5 rounded-[30px] max-md:ml-[5px] max-md:mt-10 w-fit">
          {category}
        </div>

        <button
          onClick={handleViewDetail}
          className="bg-[rgba(54,122,255,1)] hover:bg-[rgba(44,102,235,1)] text-white shadow-md text-center mt-[15px] px-[70px] py-4 rounded-[30px] transition-colors no-underline flex justify-center items-center gap-2 max-md:max-w-full max-md:px-5"
        >
          <img
            src="openeye.png"
            alt="View icon"
            className="w-[30px]"
          />
          <span>View Details</span>
        </button>
      </div>
    </article>
  );
};
