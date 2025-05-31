import React from 'react';
export const FormField = ({
  label,
  required = false,
  placeholder,
  description,
  value,
  onChange,
  type = 'text',
  error
}) => {
  return (
    <div className="mb-[22px]">
      <label className="text-xl font-medium leading-normal mb-[22px] block">
        <span className="text-black">{label}</span>
        {required && <span className="text-[#F60909]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`text-black text-[15px] font-normal leading-normal w-full h-[46px] bg-[#EFEFEF] mb-[22px] px-3 border-none outline-none focus:ring-2 focus:ring-[#367AFF] focus:bg-white transition-all ${
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
