
import React from 'react';
import { ResumeCard } from './ResumeCard';

export const FeaturedResumes = () => {
  const resumes = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/7c3bdb62a87bcfb52f8838537f2e3c2e40463ebc?placeholderIfAbsent=true",
      jobTitle: "UX/UI Designer",
      company: "Google",
      date: "2025-05-15",
      category: "Designer",
      status: "Rejected"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/7c3bdb62a87bcfb52f8838537f2e3c2e40463ebc?placeholderIfAbsent=true",
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
