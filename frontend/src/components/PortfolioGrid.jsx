import React, { useEffect, useState } from 'react';
import { PortfolioCard } from './PortfolioCard';
import { TagBadge } from './TagBadge';
import { getAllTag } from '../api/tag.api'; 
import { getPortByTag, getRejectedResume } from '../api/post.api';
import { PortfolioDetailModal } from './PortfolioDetailModel';
export const PortfolioGrid = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const handleViewDetails = (id) => {
    const found = portfolios.find(p => p.id === id);
    setSelectedPortfolio(found);
  };


  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTag();
        const tagNames = tags.map((tag) => tag.name);
        setAvailableTags(tagNames);
      } catch (err) {
        console.error('Failed to load tags:', err);
        setError('Failed to load tags');
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        let data;

        if (selectedTags.length === 0) {
          const res = await getRejectedResume();
          data = res.data;
        } else {
          const res = await getPortByTag(selectedTags);
          data = res.data.filter((p) => p.status === 'REJECTED');
        }

        setPortfolios(data);
      } catch (err) {
        console.error('Failed to load portfolios:', err);
        setError('Failed to load portfolios');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [selectedTags]);

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
          {availableTags.length === 0 && !error ? (
            <span className="text-gray-500 text-xl">Loading tags...</span>
          ) : error ? (
            <span className="text-red-500 text-xl">⚠️ {error}</span>
          ) : (
            availableTags.map((tag) => (
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
            ))
          )}
        </div>
      </div>

      <section 
        className="grid gap-[60px] mt-[45px] max-md:mt-10"
        aria-label="Portfolio cases"
      >
        {loading ? (
          <span className="text-gray-600 text-center text-xl">Loading portfolios...</span>
        ) : portfolios.length === 0 ? (
          <span className="text-gray-600 text-center text-xl">No rejected portfolios found.</span>
        ) : (
          portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              id={portfolio.id}
              title={portfolio.title}
              company={portfolio.company}
              position={portfolio.jobPosition}
              date={portfolio.createdAt.slice(0, 10)}
              status={portfolio.status.toLowerCase()}
              tags={portfolio.tags.map((t) => t.name)}
              imageUrl="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/7c3bdb62a87bcfb52f8838537f2e3c2e40463ebc?placeholderIfAbsent=true"
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </section>
      {selectedPortfolio && (
      <PortfolioDetailModal
        portfolio={{
          id: selectedPortfolio.id,
          status: selectedPortfolio.status.toLowerCase(),
          title: selectedPortfolio.title,
          url: selectedPortfolio.url,
          position: selectedPortfolio.jobPosition,
          company: selectedPortfolio.company,
          description: selectedPortfolio.shortDesc,
          failure: selectedPortfolio.failure
        }}
        onClose={() => setSelectedPortfolio(null)}
      />
    )}

    </main>
  );
};
