
import React from 'react';

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  iconBg = "bg-[rgba(102,126,234,1)]" 
}) => {
  return (
    <div className="flex grow flex-col items-center max-md:mt-10">
      <div className={`${iconBg} flex w-[100px] flex-col items-center justify-center h-[100px] px-[15px] rounded-[50%]`}>
        <img
          src={icon}
          className="aspect-[1] object-contain w-full"
          alt={title}
        />
      </div>
      <h3 className="text-black text-xl font-normal mt-[34px]">
        {title}
      </h3>
      <p className="text-black text-xl font-normal text-center self-stretch mt-[31px]">
        {description}
      </p>
    </div>
  );
};
