
import React from 'react';

export const FormSection = ({ title, children, onSubmit }) => {
  return (
    <section className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[996px] max-w-full text-2xl font-normal mt-8">
      <form 
        className="bg-white border flex flex-col items-stretch px-[25px] py-3.5 border-black border-solid max-md:max-w-full max-md:px-5"
        onSubmit={onSubmit}
      >
        <h2 className="text-[rgba(56,47,111,1)] font-bold">
          {title}
        </h2>
        <div className="border w-[900px] shrink-0 max-w-full h-px ml-[23px] mr-3.5 mt-3 border-black border-solid max-md:mr-2.5" />
        {children}
      </form>
    </section>
  );
};

export const FormField = ({ 
  label, 
  id, 
  type = "text", 
  value, 
  onChange, 
  required = false,
  marginTop = "mt-[15px]"
}) => {
  return (
    <>
      <label 
        htmlFor={id}
        className={`text-black ml-7 ${marginTop} max-md:ml-2.5`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="border flex w-[879px] shrink-0 max-w-full h-[53px] ml-7 mr-[30px] mt-[23px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent"
      />
    </>
  );
};

export const SubmitButton = ({ children, marginTop = "mt-[21px]" }) => {
  return (
    <button
      type="submit"
      className={`bg-[rgba(54,122,255,1)] text-xl text-[rgba(240,255,247,1)] ${marginTop} px-[7px] py-0.5 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300`}
    >
      {children}
    </button>
  );
};
