import React from 'react';
import { ResumeCard } from './ResumeCard';

export const FeaturedResumes = ({ user }) => {
  const resumes = [
    {
      image: "/banner.png",
      jobTitle: "UX/UI Designer",
      company: "Google",
      date: "2025-05-15",
      category: "Designer",
      status: "Rejected"
    },
    {
      image: "/banner.png",
      jobTitle: "UX/UI Designer",
      company: "Google",
      date: "2025-05-15",
      category: "Designer",
      status: "Rejected"
    }
  ];

  return (
    <section className="flex flex-col items-center w-full">
      <h2 className="text-black text-5xl font-medium mt-[31px] max-md:max-w-full max-md:text-[40px]">
        Featured Failure Resumes
      </h2>
      {resumes.map((resume, index) => (
        <ResumeCard
          key={index}
          user={user}
          image={resume.image}
          jobTitle={resume.jobTitle}
          company={resume.company}
          date={resume.date}
          category={resume.category}
          status={resume.status}
        />
      ))}
    </section>
  );
};
