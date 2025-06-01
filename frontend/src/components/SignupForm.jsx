import React, { useState } from 'react'; // useEffect was not used, so removed it from this specific thought block. The user's code only has useState.
import { registerUser } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';

// Define Eye Icon Components (or import them if they are in separate files)
const Eye = () => (
  <img
    src="/openeye.png"
    alt="Show password"
    style={{ width: '20px', height: '20px' }} // Adjusted size slightly for better fit
  />
);

const EyeOff = () => (
  <img
    src="/closeeye.png"
    alt="Hide password"
    style={{ width: '20px', height: '20px' }} // Adjusted size slightly for better fit
  />
);

export const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Moved preventDefault to the top
    try {
      if (validateForm()) {
        const register = await registerUser(email, name, password); // Ensure params match API
        if (!register) { // Or check based on actual API response structure
          // Handle registration failure from API, e.g., set an error message
          setErrors(prevErrors => ({ ...prevErrors, form: 'Registration failed. Please try again.' }));
          console.error("Register failed due to API response.");
          return; 
        }
        console.log("Registration successful"); // Or handle success feedback
        navigate('/'); // Navigate on successful registration
      }
    } catch (error) { // Changed 'err' to 'error'
      console.error("Registration submission failed:", error.response?.data || error.message);
      setErrors(prevErrors => ({ ...prevErrors, form: error.response?.data?.message || 'An unexpected error occurred.' }));
    }
  };

  // Toggle visibility functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const inputBaseClass = "w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#367AFF] focus:border-transparent";
  const inputErrorClass = "border-red-500 focus:ring-red-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorTextClass = "text-red-500 text-xs mt-1";
  const passwordInputClass = "pr-10"; // Added padding for the icon

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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputBaseClass} ${passwordInputClass} ${errors.password ? inputErrorClass : ''}`}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.password && <p id="password-error" className={errorTextClass}>{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${inputBaseClass} ${passwordInputClass} ${errors.confirmPassword ? inputErrorClass : ''}`}
                aria-describedby="confirmPassword-error"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.confirmPassword && <p id="confirmPassword-error" className={errorTextClass}>{errors.confirmPassword}</p>}
          </div>
          
          {errors.form && <p className={errorTextClass}>{errors.form}</p>}


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
          {/* Corrected Link usage - Link component itself should be styled */}
          <Link to='/login' className="text-[#367AFF] font-bold underline hover:text-[#2563EB] transition-colors">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};