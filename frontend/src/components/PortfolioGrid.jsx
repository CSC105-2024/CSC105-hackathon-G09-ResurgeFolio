import React, { useEffect, useState } from 'react';
import { PortfolioCard } from './PortfolioCard';
import { TagBadge } from './TagBadge';
import { getAllTag } from '../api/tag.api';
import { getPortByTag, getRejectedResume } from '../api/post.api';
import { fetchCurrentUser } from '../api/auth.api'; // Import fetchCurrentUser

export const PortfolioGrid = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // State for current user

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        setCurrentUser(userData);
      } catch (err) {
        console.error('Failed to fetch current user:', err);
        // Potentially set an error state for user fetching if needed
      }
    };
    getUser();
  }, []);


  const handleViewDetails = (id) => {
    console.log(`Viewing details for portfolio ${id}`);
    // Potentially navigate to a details page: navigate(`/portfolio/${id}`);
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
      setError(null); // Reset error before new fetch
      try {
        let data;
        if (selectedTags.length === 0) {
          const res = await getRejectedResume();
          data = res.data;
        } else {
          // Assuming getPortByTag returns an object with a data property (like Axios response)
          const res = await getPortByTag(selectedTags);
          data = res.data.filter((p) => p.status === 'REJECTED');
        }
        setPortfolios(data || []); // Ensure data is an array
      } catch (err) {
        console.error('Failed to load portfolios:', err);
        setError('Failed to load portfolios');
        setPortfolios([]); // Set to empty array on error
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

      <div className="flex gap-[23px] text-white font-normal ml-9 mt-[45px] max-md:ml-2.5 max-md:mt-10 items-center flex-wrap">
        <label className="text-black text-[32px] font-semibold text-center">
          Tags:{" "}
        </label>
        <div className="flex gap-2 flex-wrap">
          {availableTags.length === 0 && !error && !loading ? ( // Check loading for tags
            <span className="text-gray-500 text-xl">Loading tags...</span>
          ) : error && availableTags.length === 0 ? ( // Ensure error is specific to tags if tags are empty
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
        ) : error && portfolios.length === 0 ? ( // Show error if loading failed and no portfolios
           <span className="text-red-500 text-center text-xl">⚠️ {error}</span>
        ): portfolios.length === 0 ? (
          <span className="text-gray-600 text-center text-xl">No rejected portfolios found for the selected tags.</span>
        ) : (
          portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              id={portfolio.id}
              title={portfolio.title}
              company={portfolio.company}
              position={portfolio.jobPosition}
              date={portfolio.createdAt ? portfolio.createdAt.slice(0, 10) : 'N/A'}
              status={portfolio.status ? portfolio.status.toLowerCase() : 'unknown'}
              tags={portfolio.tags ? portfolio.tags.map((t) => t.name) : []}
              imageUrl="https://cdn.builder.io/api/v1/image/assets/f44bb98f767d43ab8d3aa46adfd6d87f/7c3bdb62a87bcfb52f8838537f2e3c2e40463ebc?placeholderIfAbsent=true"
              onViewDetails={handleViewDetails}
              userRole={currentUser?.user?.role} // Pass the user's role
            />
          ))
        )}
      </section>
    </main>
  );
};