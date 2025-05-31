import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    rejected: {
      text: 'Rejected',
      className: 'bg-[rgba(255,42,42,1)] text-[rgba(253,253,253,1)]'
    },
    approved: {
      text: 'Approved',
      className: 'bg-green-500 text-white'
    },
    pending: {
      text: 'Pending',
      className: 'bg-yellow-500 text-white'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`font-semibold whitespace-nowrap px-3.5 rounded-md ${config.className} ${className}`}>
      {config.text}
    </span>
  );
};
