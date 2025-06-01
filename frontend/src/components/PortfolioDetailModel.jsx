import React from 'react';

export const PortfolioDetailModal = ({ portfolio, onClose }) => {
  if (!portfolio) return null;

  const { status, title, url, position, company, description, failure } = portfolio;

  const getStatusColor = () => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-400';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  const getFailureLabel = () => {
    return status === 'rejected' ? 'Description of the Failure' : 'Failures & Learnings (Optional)';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-[600px] relative max-md:w-[90%]">
        <button className="absolute top-4 right-4 text-black text-2xl" onClick={onClose}>×</button>

        <div className={`flex items-center p-3 rounded-md mb-6 ${getStatusColor()}`}>
          <strong className="text-white mr-2">Status:</strong>
          <span className="bg-white text-black px-2 py-1 rounded">{getStatusText()}</span>
          <span className="text-white ml-2">
            {status === 'approved' && 'No issues were found in your portfolio.'}
            {status === 'rejected' && 'Some issues were found in your portfolio.'}
            {status === 'pending' && 'Your portfolio is under review.'}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold">Portfolio Title</h3>
            <p>{title}</p>
          </div>
          <div>
            <h3 className="font-bold">Portfolio URL</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-words"
          >
            {url}
          </a>
          </div>
          <div>
            <h3 className="font-bold">Job Position</h3>
            <p>{position}</p>
          </div>
          <div>
            <h3 className="font-bold">Company</h3>
            <p>{company}</p>
          </div>
          <div>
            <h3 className="font-bold">Short Description</h3>
            <p>{description}</p>
          </div>
          <div>
            <h3 className="font-bold">{getFailureLabel()}</h3>
            <p>{failure || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
