
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderAnnoy } from '../components/HeaderAnnoy';
import { Footer } from '../components/Footer';
import { FormSection, FormField, SubmitButton } from '../components/FormSection';
import { fetchCurrentUser, updateName, updateEmail, updatePassword, deleteAccount } from '../api/auth.api';

const UserEdit = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    // Function to fetch and update user data
    const refreshUserData = async () => {
        try {
            const userData = await fetchCurrentUser();
            setUser(userData);
            // Update form data with fresh user data
            setFormData(prev => ({
                ...prev,
                name: userData.name || '',
                email: userData.email || ''
            }));
            return userData;
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setErrors(prev => ({ ...prev, general: 'Failed to load user data. Please refresh the page.' }));
            return null;
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        refreshUserData();
    }, []);

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

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setErrors(prev => ({ ...prev, name: 'Name is required' }));
            return;
        }

        setLoading(true);
        try {
            await updateName(user.id, formData.name.trim());
            alert('Name updated successfully!');
            // Refresh user data from server
            await refreshUserData();
        } catch (error) {
            console.error('Name update error:', error);
            setErrors(prev => ({ ...prev, name: 'Failed to update name. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email.trim()) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
            return;
        }
        if (!validateEmail(formData.email)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            return;
        }

        setLoading(true);
        try {
            await updateEmail(user.id, formData.email.trim());
            alert('Email updated successfully!');
            // Refresh user data from server
            await refreshUserData();
        } catch (error) {
            console.error('Email update error:', error);
            setErrors(prev => ({ ...prev, email: 'Failed to update email. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
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

        setLoading(true);
        try {
            await updatePassword(user.id, formData.currentPassword, formData.newPassword);
            alert('Password updated successfully!');

            // Clear password fields after successful update
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));

            // Clear password-related errors
            setErrors(prev => {
                const { currentPassword, newPassword, confirmPassword, ...rest } = prev;
                return rest;
            });

            // Refresh user data from server (though password change won't affect displayed data)
            await refreshUserData();
        } catch (error) {
            console.error('Password update error:', error);
            setErrors(prev => ({
                ...prev,
                currentPassword: 'Failed to update password. Please check your current password.'
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.'
        );

        if (!confirmed) {

            return;
        }


        setIsDeleting(true);

        try {
            await deleteAccount(user.id);
            alert('Account deleted successfully. You will be redirected to the home page.');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Delete account error:', error);
            alert('Failed to delete account. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Show loading state while fetching user data
    if (!user && !errors.general) {
        return (
            <div className="bg-[rgba(239,239,239,1)] flex flex-col overflow-hidden items-center rounded-[32px] min-h-screen">
                <HeaderAnnoy user={null} setUser={setUser}/>
                <main className="flex flex-col items-center py-8">
                    <div className="text-center">
                        <p>Loading user data...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[rgba(239,239,239,1)] flex flex-col overflow-hidden items-center rounded-[32px] min-h-screen">
            <HeaderAnnoy user={user} setUser={setUser}/>

            <main className="flex flex-col items-center">
                {errors.general && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {errors.general}
                    </div>
                )}

                <FormSection title="Change name" onSubmit={handleNameSubmit}>
                    <FormField
                        label="Name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        disabled={loading}
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm ml-7 mt-1">{errors.name}</p>
                    )}
                    <SubmitButton disabled={loading}>
                        {loading ? 'Updating...' : 'Update Name'}
                    </SubmitButton>
                </FormSection>

                <FormSection title="Change email" onSubmit={handleEmailSubmit}>
                    <FormField
                        label="Email"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        disabled={loading}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm ml-7 mt-1">{errors.email}</p>
                    )}
                    <SubmitButton disabled={loading}>
                        {loading ? 'Updating...' : 'Update Email'}
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
                            disabled={loading}
                            required
                            className="border flex w-[879px] shrink-0 max-w-full h-[53px] mt-[22px] mx-[30px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent disabled:bg-gray-100"
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
                            disabled={loading}
                            required
                            className="border flex w-[879px] shrink-0 max-w-full h-[53px] mt-6 mx-[30px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent disabled:bg-gray-100"
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
                            disabled={loading}
                            required
                            className="border flex w-[879px] shrink-0 max-w-full h-[53px] mt-[26px] mx-[30px] border-black border-solid max-md:mr-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(54,122,255,1)] focus:border-transparent disabled:bg-gray-100"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm ml-[30px] mt-1">{errors.confirmPassword}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[rgba(54,122,255,1)] text-xl text-[rgba(240,255,247,1)] mt-[77px] px-[18px] py-0.5 max-md:mt-10 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </section>

                {/* Delete Account Section */}
                <section className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[996px] max-w-full mt-8 mb-8">
                    <div className="bg-white border border-red-500 flex flex-col items-stretch pt-[11px] pb-6 px-7 border-solid max-md:max-w-full max-md:px-5">
                        <h2 className="text-red-700 font-bold text-2xl">
                            Delete Account
                        </h2>
                        <div className="border-t border-red-300 w-[900px] shrink-0 max-w-full h-px ml-5 mr-[19px] mt-[23px] max-md:mr-2.5" />
                        <p className="text-gray-700 text-sm mt-4 ml-[30px] max-md:ml-2.5">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={isDeleting || loading}
                            className="bg-red-600 text-xl text-white mt-6 px-[18px] py-2.5 self-center hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-red-300 disabled:cursor-not-allowed rounded-md"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete My Account'}
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default UserEdit;