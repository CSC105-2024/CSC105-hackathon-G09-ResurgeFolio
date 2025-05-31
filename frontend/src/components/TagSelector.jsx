import React, { useEffect, useState } from 'react';
import { getAllTag } from '../api/tag.api';

export const TagSelector = ({
  selectedTags,
  onTagsChange,
  error
}) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTag();
        setAvailableTags(tags); // assumes tags is an array of strings or objects with 'name'
      } catch (err) {
        console.error('Failed to fetch tags:', err);
        setFetchError('Unable to load tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const toggleTag = (tagObj) => {
    const exists = selectedTags.some(t => t.id === tagObj.id);
    if (exists) {
      onTagsChange(selectedTags.filter(t => t.id !== tagObj.id));
    } else {
      onTagsChange([...selectedTags, tagObj]);
    }
  };


  return (
    <div className="mb-8">
      <label className="text-xl font-medium leading-normal mb-[22px] block">
        <span className="text-black">Tags</span>
        <span className="text-[#F00]">*</span>
      </label>
      <div className="text-black text-[15px] font-normal leading-normal mb-3">
        Choose a tag based on your registered job.
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
        <span
          key={tag.id}
          className="bg-[#367AFF] text-white px-3 py-1 rounded-md text-sm flex items-center gap-2"
        >
          {tag.name}
          <button
            type="button"
            onClick={() => toggleTag(tag)}
            className="text-white hover:text-gray-200"
            aria-label={`Remove ${tag.name} tag`}
          >
            ×
          </button>
        </span>
      ))}
      </div>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-24 h-7 bg-[#EDEDED] flex items-center justify-center hover:bg-gray-300 transition-colors ${
            error ? 'ring-2 ring-red-500' : ''
          }`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="text-black text-sm font-bold leading-5">Add</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[24px] h-[24px] transform rotate-[-90deg]">
            <path d="M10 16L14 12L10 8" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[200px]">
            {loading ? (
              <div className="p-3 text-sm text-gray-500">Loading...</div>
            ) : fetchError ? (
              <div className="p-3 text-sm text-red-500">{fetchError}</div>
            ) : (
              <ul role="listbox" className="py-1">
                {availableTags.map((tag) => {
                  const tagObj = typeof tag === 'string' ? { id: null, name: tag } : tag;
                  return (
                   <li key={tagObj.id}>
                    <button
                      type="button"
                      onClick={() => {
                        toggleTag(tagObj);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedTags.some(t => t.id === tagObj.id) ? 'bg-blue-50 text-[#367AFF]' : 'text-gray-900'
                      }`}
                      role="option"
                      aria-selected={selectedTags.some(t => t.id === tagObj.id)}
                    >
                      {tagObj.name}
                    </button>
                  </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
    </div>
  );
};