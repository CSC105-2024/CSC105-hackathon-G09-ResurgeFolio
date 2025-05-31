
import React from 'react';

export const TagBadge = ({ 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = "text-white font-normal whitespace-nowrap px-[18px] py-1.5 rounded-[30px]";
  const variantClasses = {
    primary: "bg-[rgba(54,122,255,1)]",
    secondary: "bg-[rgba(182,156,248,1)]"
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
