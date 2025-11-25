import React, { useState } from 'react';
// Import react-hook-form and Zod
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { register as apiRegister } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// --- Zod Validation Schema ---
// 1. Define the schema for validation
const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string()
})
// 2. Use .refine() for complex validation, like matching passwords
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Show error on the confirmPassword field
});

// This single component contains all the logic and styling.
export default function SignUp() {
  // State for successful submission (Errors are now handled by react-hook-form)
  const [success, setSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { refresh } = useAuth()

  // --- React Hook Form Setup ---
  const { 
    register, 
    handleSubmit, 
    reset, // Function to reset the form fields
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(signUpSchema) // 3. Connect Zod to react-hook-form
  });

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  /**
   * Handles the form submission event.
   * This function only runs if validation (from Zod) passes.
   * @param {object} data - The validated form data.
   */
  const onSubmit = async (data) => {
    // Clear previous messages
    setSuccess('')
    setErrorMsg('')

    setLoading(true)
    try {
      // Call backend register route
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }

      const res = await apiRegister(payload)

      // Example response handling: show message and optionally set auth token
      const message = res?.data?.message || 'Account created. OTP sent to your email.'
      setSuccess(message)

      // Try to refresh auth (in case backend set cookie or returned token)
      try {
        const u = await refresh()
        if (u) {
          navigate('/')
        } else {
          navigate('/verify-otp', { state: { email: payload.email } })
        }
      } catch {
        navigate('/verify-otp', { state: { email: payload.email } })
      }

      // Reset the form
      reset()
    } catch (err) {
      console.error('Register error', err)
      let msg = 'Registration failed. Please try again.'
      if (err?.response?.data) {
        const d = err.response.data
        // prefer structured message, fallback to JSON
        msg = d.message || (d.errors && d.errors[0]?.msg) || JSON.stringify(d)
      }
      setErrorMsg(msg)
    } finally {
      setLoading(false)
    }
  };

  // Helper function to conditionally apply error styles
  const getErrorStyles = (fieldName) => {
    return errors[fieldName] 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:ring-orange-500';
  };

  return (
    // Main container: Centers the form on the page
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      
      {/* Form Card */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        {/* --- Form --- */}
        {/* 4. Use handleSubmit from react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* Success Message */}
          {success && (
            <div 
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4" 
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          )}
          
          {/* We no longer need a single 'error' state, 
              as Zod and react-hook-form handle errors per-field. */}

          {/* 1. Name Field */}
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              // 5. Register the field with react-hook-form
              {...register('name')}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${getErrorStyles('name')}`}
              placeholder="John Doe"
            />
            {/* 6. Display the error message for this specific field */}
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 2. Email Field */}
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${getErrorStyles('email')}`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* 3. Password Field */}
          <div className="mb-4">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-10 ${getErrorStyles('password')}`}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.98 9.98 0 012.175-5.625M3 3l18 18"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* 4. Confirm Password Field */}
          <div className="mb-6">
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword')}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-10 ${getErrorStyles('confirmPassword')}`}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer">
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.98 9.98 0 012.175-5.625M3 3l18 18"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button (Updated to orange) */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2.5 px-4 rounded-md font-semibold text-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        {/* Footer Link (Updated to orange) */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a 
            href="#" 
            className="text-orange-600 hover:underline font-medium cursor-pointer"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}