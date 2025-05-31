import React from 'react';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { SignUpForm } from '../components/SignupForm';

const Register = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <HeaderAnnoy />
      
      <main className="flex flex-1 max-md:flex-col">
        <SignUpForm />
        
        <aside className="flex-1 flex justify-center items-center p-3 max-md:w-full max-md:p-4 max-sm:p-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/045808672ca2b739f6fe22e3a32c00ec39484ef9?placeholderIfAbsent=true"
            alt="Portfolio showcase"
            className="w-full h-auto max-w-[1402px] rounded-[2  4px] max-lg:rounded-[16px] max-sm:rounded-[12px]"
          />
        </aside>
      </main>
    </div>
  );
};

export default Register;