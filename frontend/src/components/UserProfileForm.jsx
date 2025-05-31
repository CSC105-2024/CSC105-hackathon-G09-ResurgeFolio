
import React, { useState } from 'react';
import { FormSection, FormField, SubmitButton } from './FormSection';

export const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
      return;
    }
    console.log('Updating name:', formData.name);
    alert('Name updated successfully!');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }
    console.log('Updating email:', formData.email);
    alert('Email updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }

    console.log('Updating password');
    alert('Password updated successfully!');
    // Clear password fields after successful update
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <main className="flex flex-col items-center">
      <FormSection title="Change name" onSubmit={handleNameSubmit}>
        <FormField
          label="Name"
          id="name"
          value={formData.name}
          onChange={handleInputChange('name')}
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm ml-7 mt-1">{errors.name}</p>
        )}
        <SubmitButton>
          Update Name
        </SubmitButton>
      </FormSection>

      <FormSection title="Change email" onSubmit={handleEmailSubmit}>
        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm ml-7 mt-1">{errors.email}</p>
        )}
        <SubmitButton>
          Update Email
        </SubmitButton>
      </FormSection>

      <section className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[996px] max-w-full text-2xl text-black font-normal mt-8">
        <form 
          className="bg-white border flex flex-col items-stretch pt-[11px] pb-6 px-7 border-black border-solid max-md:max-w-full max-md:px-5"
          onSubmit={handlePasswordSubmit}
        >
          <h2 className="text-[rgba(56,47,111,1)] font-bold">
            Change Password
          </h2>
          <div className="border w-[900px] shrink-0 max-w-full h-px ml-5 mr-[19px] mt-[23px] border-black border-solid max-md:mr-2.5" />
          
          <label 
            htmlFor="currentPassword"
            className="ml-[30px] mt-[26px] max-md:ml-2.5"
          >
            Current Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange('currentPassword')}
            required
            className="border flex w-[879px] shrink-0 max-w-full h-[53px] mt-[22px] mx-[30px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm ml-[30px] mt-1">{errors.currentPassword}</p>
          )}

          <label 
            htmlFor="newPassword"
            className="ml-[30px] mt-[15px] max-md:ml-2.5"
          >
            New Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange('newPassword')}
            required
            className="border flex w-[879px] shrink-0 max-w-full h-[53px] mt-6 mx-[30px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm ml-[30px] mt-1">{errors.newPassword}</p>
          )}

          <label 
            htmlFor="confirmPassword"
            className="ml-[30px] mt-[26px] max-md:ml-2.5"
          >
            Confirm Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            required
            className="border flex w-[879px] shrink-0 max-w-full h-[53px] mt-[26px] mx-[30px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm ml-[30px] mt-1">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            className="bg-[rgba(54,122,255,1)] text-xl text-[rgba(240,255,247,1)] mt-[77px] px-[18px] py-0.5 max-md:mt-10 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update Password
          </button>
        </form>
      </section>
    </main>
  );
};
