
import React, { useState } from 'react';
import { PortfolioCard } from './PortfolioCard';
import { TagBadge } from './TagBadge';

const mockPortfolios = [
  {
    id: '1',
    title: 'Portfolio Case that got rejected by HR',
    company: 'Google',
    position: 'UX/UI Designer',
    date: '2025-05-15',
    status: 'rejected',
    tags: ['Designer'],
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/7c3bdb62a87bcfb52f8838537f2e3c2e40463ebc?placeholderIfAbsent=true'
  },
  {
    id: '2',
    title: 'Portfolio Case that got rejected by HR',
    company: 'Google',
    position: 'UX/UI Designer',
    date: '2025-05-15',
    status: 'rejected',
    tags: ['Designer'],
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/7c3bdb62a87bcfb52f8838537f2e3c2e40463ebc?placeholderIfAbsent=true'
  }
];

export const PortfolioGrid = () => {
  const [selectedTags, setSelectedTags] = useState(['Designer', 'Engineer']);
  
  const handleViewDetails = (id) => {
    console.log(`Viewing details for portfolio ${id}`);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <main className="flex w-full flex-col items-stretch text-xl mt-[59px] px-12 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <h1 className="text-black text-5xl font-bold text-center self-center max-md:max-w-full max-md:text-[40px]">
        Portfolio Case that got rejected by HR
      </h1>
      
      <div className="flex gap-[23px] text-white font-normal ml-9 mt-[45px] max-md:ml-2.5 max-md:mt-10">
        <label className="text-black text-[32px] font-semibold text-center self-stretch">
          Tags:{" "}
        </label>
        <div className="flex gap-2 flex-wrap">
          {['Designer', 'Engineer'].map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`transition-opacity duration-200 ${
                selectedTags.includes(tag) ? 'opacity-100' : 'opacity-50'
              }`}
              aria-pressed={selectedTags.includes(tag)}
            >
              <TagBadge>{tag}</TagBadge>
            </button>
          ))}
        </div>
      </div>
      
      <section 
        className="grid gap-[60px] mt-[45px] max-md:mt-10"
        aria-label="Portfolio cases"
      >
        {mockPortfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            {...portfolio}
            onViewDetails={handleViewDetails}
          />
        ))}
      </section>
    </main>
  );
};
