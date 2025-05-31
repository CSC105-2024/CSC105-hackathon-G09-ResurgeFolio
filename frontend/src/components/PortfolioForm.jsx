import React, { useState, useEffect } from 'react';
import { FormField } from '../components/FormField';
import { TextAreaField } from '../components/TextAreaField';
import { TagSelector } from '../components/TagSelector';
import { getAllTag } from '../api/tag.api';
import { submitPortfolio } from '../api/post.api';
import { useNavigate } from 'react-router-dom';

export const PortfolioForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    position: '',
    company: '',
    description: '',
    failures: '',
    tags: []
  });
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTag();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Portfolio title is required';
    if (!formData.url.trim()) {
      newErrors.url = 'Portfolio URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData.position.trim()) newErrors.position = 'Job position is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.description.trim()) newErrors.description = 'Short description is required';
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log('Submitting portfolio for userId:', userId);

    try {
      const tagIds = formData.tags.map(tag => Number(tag.id));
      const submit = await submitPortfolio(
        userId,
        formData.title,
        formData.url,
        formData.position,
        formData.company,
        formData.description,
        formData.failures,
        tagIds
      );
      console.log(submit);
      setFormData({
        title: '',
        url: '',
        position: '',
        company: '',
        description: '',
        failures: '',
        tags: []
      });
      navigate('/notification')
    } catch (error) {
      alert('Error submitting portfolio. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="w-[862px] bg-white shadow p-8 max-md:w-full max-sm:p-6">
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Portfolio Title"
          required
          placeholder="eg. My Web Development Journey"
          description="A catchy title of your portfolio"
          value={formData.title}
          onChange={updateField('title')}
          error={errors.title}
        />
        <FormField
          label="Portfolio URL"
          required
          type="url"
          placeholder="https://yourportfolio.com/"
          description="The direct link to your online portfolio"
          value={formData.url}
          onChange={updateField('url')}
          error={errors.url}
        />
        <FormField
          label="Job Position"
          required
          placeholder="eg. UX/UI Designer"
          description="The job position that you have registered to."
          value={formData.position}
          onChange={updateField('position')}
          error={errors.position}
        />
        <FormField
          label="Company"
          required
          placeholder="eg. Facebook"
          description="The company that you have registered to."
          value={formData.company}
          onChange={updateField('company')}
          error={errors.company}
        />
        <TextAreaField
          label="Short Description"
          required
          placeholder="Briefly describe your portfolio and what it showcases....."
          description="Highlight key aspects of your work."
          value={formData.description}
          onChange={updateField('description')}
          error={errors.description}
        />
        <TextAreaField
          label="Failures & Learnings (Optional)"
          placeholder="Optionally, mention any specific failures or challenges showcased in your portfolio and what you learned from them..."
          description="This helps connect your portfolio to our theme."
          value={formData.failures}
          onChange={updateField('failures')}
        />
        <TagSelector
          selectedTags={formData.tags}
          onTagsChange={updateField('tags')}
          availableTags={availableTags}
          error={errors.tags}
        />
        <div className="flex justify-start mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white text-lg font-bold bg-[#367AFF] hover:bg-[#2563eb] disabled:opacity-50 rounded-[10px] px-4 py-3 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Portfolio'}
          </button>
        </div>
      </form>
    </section>
  );
};
