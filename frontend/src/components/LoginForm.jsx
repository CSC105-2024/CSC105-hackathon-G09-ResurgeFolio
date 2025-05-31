import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth.api';
export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [keepLoggedInInternal, setKeepLoggedInInternal] = React.useState(false);
  
  // State for focus
  const [isEmailFocused, setIsEmailFocused] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

  const [errors, setErrors] = React.useState({}); 
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const register = (name) => ({ name });

  const handleSubmit = (onSubmitFunc) => (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.keepLoggedIn = keepLoggedInInternal;
    let currentErrors = {};
    if (!data.email) {
      currentErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      currentErrors.email = "Please enter a valid email address";
    }
    if (!data.password) {
      currentErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      currentErrors.password = "Password must be at least 6 characters";
    }
    
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setErrors({});
    onSubmitFunc(data);
  };

  const onSubmit = async (data) => {
    const { email, password, keepLoggedIn } = data;
    console.log('Login data:', { email, password, keepLoggedIn });

    try {
      setIsSubmitting(true);
      const response = await loginUser(email, password, keepLoggedIn);
      if(!response){
        return console.error("Invalid credentials")
      }
      console.log('Login successful:', response);
      setIsSubmitting(false);
      navigate('/');
      // Redirect to home or dashboard if needed
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      // You may want to show an error message to user here
    } 
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleKeepLoggedIn = () => {
    setKeepLoggedInInternal(!keepLoggedInInternal);
  };

  const Eye = () => (
    <img
      src="openeye.png"
      alt="Password visible"
      style={{ width: '24px', height: '24px', cursor: 'pointer' }}
    />
  );

  const EyeOff = () => (
    <img
      src="closeeye.png"
      alt="Password hidden"
      style={{ width: '24px', height: '24px', cursor: 'pointer' }}
    />
  );

  // Checkbox images
  const CheckboxUnchecked = () => (
    <img
      src="uncheckbox.png" // Path to your unchecked checkbox image
      alt="Checkbox unchecked"
      style={{ width: '24px', height: '24px', cursor: 'pointer' }}
    />
  );

  const CheckboxChecked = () => (
    <img
      src="checkbox.png" // Path to your checked checkbox image
      alt="Checkbox checked"
      style={{ width: '24px', height: '24px', cursor: 'pointer' }}
    />
  );

  const emailBorderColor = errors.email 
    ? 'border-[#FF2A2A]' 
    : isEmailFocused 
    ? 'border-[#367AFF]' 
    : 'border-[#D9D9D9]';
  const emailLabelColor = errors.email 
    ? 'text-[#FF2A2A]' 
    : isEmailFocused 
    ? 'text-[#367AFF]' 
    : 'text-[#9A9A9A]';

  const passwordBorderColor = errors.password 
    ? 'border-[#FF2A2A]' 
    : isPasswordFocused 
    ? 'border-[#367AFF]' 
    : 'border-[#D9D9D9]';
  const passwordLabelColor = errors.password 
    ? 'text-[#FF2A2A]' 
    : isPasswordFocused 
    ? 'text-[#367AFF]' 
    : 'text-[#9A9A9A]';

  return (
    <section className="w-[591px] flex flex-col justify-center items-center pt-16 pb-8 px-8 max-md:w-full max-md:p-8 max-sm:px-4 max-sm:py-6">
      <div className="w-full max-w-[399px]">
        <div className="flex flex-col justify-center items-start gap-3 mb-8">
          <h1 className="text-[#232323] text-[40px] font-bold leading-[44px] max-sm:text-[32px]">
            Login
          </h1>
          <p className="text-[#969696] text-lg font-normal leading-[27px] max-sm:text-base">
            Please login to continue to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-8">
          {/* Email Field */}
          <div className="relative">
            <div className={`flex w-full items-center gap-0.5 p-4 rounded-[10px] border-[1.5px] ${emailBorderColor}`}>
              <input
                {...register('email')}
                name="email"
                type="email"
                placeholder="Email"
                className="flex-1 text-[#9A9A9A] text-lg font-normal leading-[27px] bg-transparent border-none outline-none placeholder:text-[#9A9A9A] max-sm:text-base"
                aria-describedby={errors.email ? 'email-error' : undefined}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </div>
            <div className="absolute top-[-10.5px] flex items-center gap-2.5 bg-white px-1 py-0 left-3">
              <label htmlFor="email" className="text-sm font-normal leading-[21px]">
                <span className={emailLabelColor}>Email</span>
                <span className="text-[#FF2A2A]">*</span>
              </label>
            </div>
            {errors.email && (
              <p id="email-error" className="text-[#FF2A2A] text-sm mt-1 ml-3">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className={`flex w-full justify-center items-center gap-2.5 border p-4 rounded-[10px] ${passwordBorderColor}`}>
              <input
                {...register('password')}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="flex-1 text-[#9A9A9A] text-lg font-normal leading-[27px] bg-transparent border-none outline-none placeholder:text-[#9A9A9A] max-sm:text-base"
                aria-describedby={errors.password ? 'password-error' : undefined}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="flex-shrink-0"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div className="absolute top-[-10.5px] flex items-center gap-2.5 bg-white px-1 py-0 left-3">
              <label htmlFor="password" className="text-sm font-normal leading-[21px]">
                <span className={passwordLabelColor}>Password</span>
                <span className="text-[#FF2A2A]">*</span>
              </label>
            </div>
            {errors.password && (
              <p id="password-error" className="text-[#FF2A2A] text-sm mt-1 ml-3">
                {errors.password}
              </p>
            )}
          </div>

          {/* Keep me logged in */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleKeepLoggedIn}
              className="flex items-center justify-center w-[24px] h-[24px]" // Ensure button size accommodates the image
              aria-label="Keep me logged in"
            >
              {keepLoggedInInternal ? <CheckboxChecked /> : <CheckboxUnchecked />}
            </button>
            <label htmlFor="keepLoggedIn" className="text-[#232323] text-base font-normal leading-6 cursor-pointer" onClick={toggleKeepLoggedIn}>
              Keep me logged in
            </label>
            <input name="keepLoggedIn" type="checkbox" id="keepLoggedIn" checked={keepLoggedInInternal} onChange={(e) => setKeepLoggedInInternal(e.target.checked)} className="sr-only"/>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting} className="text-white text-lg font-bold leading-[21.6px] gap-2 w-full bg-[#367AFF] cursor-pointer px-2 py-4 rounded-[10px] hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="w-full text-center text-lg leading-[27px] max-sm:text-base">
          <span className="text-[#6C6C6C] font-normal">
            Need an account?{' '}
          </span>
          <Link to="/register" className="text-[#367AFF] font-bold underline cursor-pointer hover:text-[#2563EB] transition-colors">
            Create one
          </Link>
        </div>
      </div>
    </section>
  );
};