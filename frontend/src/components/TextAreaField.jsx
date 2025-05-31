import React from 'react';
export const TextAreaField = ({
  label,
  required = false,
  placeholder,
  description,
  value,
  onChange,
  error
}) => {
  return (
    <div className="mb-[22px]">
      <label className="text-xl font-medium leading-normal mb-[22px] block">
        <span className="text-black">{label}</span>
        {required && <span className="text-[#FF2A2A]">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`text-black text-[15px] font-normal leading-normal w-full h-28 bg-[#EFEFEF] mb-[22px] px-3 py-[7px] border-none outline-none resize-none focus:ring-2 focus:ring-[#367AFF] focus:bg-white transition-all ${
          error ? 'ring-2 ring-red-500' : ''
        }`}
        aria-describedby={`${label.toLowerCase().replace(/\s+/g, '-')}-description`}
        aria-invalid={!!error}
      />
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      <div 
        id={`${label.toLowerCase().replace(/\s+/g, '-')}-description`}
        className="text-black text-[15px] font-normal leading-normal"
      >
        {description}
      </div>
    </div>
  );
};
