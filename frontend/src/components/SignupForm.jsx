import React, { useState } from 'react';
import { registerUser } from '../api/auth.api';
import { Link,useNavigate } from 'react-router-dom';
export const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
      if (validateForm()) {
        const register = await registerUser(email,name,password);
        if(!register){
          console.error("Register failed.")
        }
        navigate('/');
      }
    } catch (error) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  const inputBaseClass = "w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#367AFF] focus:border-transparent";
  const inputErrorClass = "border-red-500 focus:ring-red-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorTextClass = "text-red-500 text-xs mt-1";

  return (
    <section className="w-[591px] flex flex-col justify-center items-center pt-16 pb-8 px-8 max-md:w-full max-md:p-8 max-sm:p-4">
      <div className="w-full max-w-[399px]">
        <header className="flex flex-col justify-center items-start gap-3 mb-8">
          <h1 className="text-[#232323] text-[40px] font-bold leading-[44px] max-md:text-4xl max-sm:text-[32px]">
            Sign up
          </h1>
          <p className="text-[#969696] text-lg font-normal leading-[27px] max-sm:text-base">
            Sign up to enjoy the portfolio of our website
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-8">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputBaseClass} ${errors.name ? inputErrorClass : ''}`}
              aria-describedby="name-error"
            />
            {errors.name && <p id="name-error" className={errorTextClass}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBaseClass} ${errors.email ? inputErrorClass : ''}`}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className={errorTextClass}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputBaseClass} ${errors.password ? inputErrorClass : ''}`}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className={errorTextClass}>{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputBaseClass} ${errors.confirmPassword ? inputErrorClass : ''}`}
              aria-describedby="confirmPassword-error"
            />
            {errors.confirmPassword && <p id="confirmPassword-error" className={errorTextClass}>{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="text-white text-lg font-bold leading-[21.6px] gap-2 w-full bg-[#367AFF] px-2 py-4 rounded-[10px] max-sm:text-base hover:bg-[#2563EB] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#367AFF]"
          >
            Sign up
          </button>
        </form>

        <div className="w-full text-center text-lg leading-[27px] max-sm:text-base">
          <span className="text-[#6C6C6C] font-normal">
            Already have an account?{' '}
          </span>
          <Link to='/login'>
          <a href="#" className="text-[#367AFF] font-bold underline hover:text-[#2563EB] transition-colors">
            Login
          </a>
          </Link>
          
        </div>
      </div>
    </section>
  );
};