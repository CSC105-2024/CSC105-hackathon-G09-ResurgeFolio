import React, { useState } from 'react';
import { addReview } from '../api/post.api';

export const ReviewModal = ({ portfolio, onClose, onReviewSubmitted }) => {
  const [status, setStatus] = useState('');
  const [failureDesc, setFailureDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!status) {
      setError('Please select a status');
      return;
    }

    if (status === 'REJECTED' && !failureDesc.trim()) {
      setError('Please provide a description for rejection');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addReview(
        portfolio.id, 
        status, 
        status === 'REJECTED' ? failureDesc : null
      );
      
      // Notify parent component that review was submitted
      if (onReviewSubmitted) {
        onReviewSubmitted(portfolio.id, status, failureDesc);
      }
      
      onClose();
    } catch (err) {
      console.error('Failed to submit review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[30px] p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Add Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {portfolio.position} at {portfolio.company}
          </h3>
          <p className="text-gray-600">Date: {portfolio.date}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-black mb-4">
              Status:
            </label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="APPROVED"
                  checked={status === 'APPROVED'}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setFailureDesc(''); // Clear failure description when approved
                  }}
                  className="mr-3 w-4 h-4"
                  disabled={isSubmitting}
                />
                <span className="text-green-600 font-medium">Approved</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="REJECTED"
                  checked={status === 'REJECTED'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mr-3 w-4 h-4"
                  disabled={isSubmitting}
                />
                <span className="text-red-600 font-medium">Rejected</span>
              </label>
            </div>
          </div>

          {status === 'REJECTED' && (
            <div className="mb-6">
              <label className="block text-lg font-semibold text-black mb-2">
                Description of the Failure:
              </label>
              <textarea
                value={failureDesc}
                onChange={(e) => setFailureDesc(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe why this portfolio was rejected..."
                disabled={isSubmitting}
              />
            </div>
          )}

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-[30px] text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-[rgba(54,122,255,1)] text-white rounded-[30px] hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={isSubmitting || !status}
            >
              {isSubmitting ? 'Submitting...' : 'Add Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};