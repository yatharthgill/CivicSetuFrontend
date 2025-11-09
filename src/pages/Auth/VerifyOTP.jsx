import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyOtp as apiVerifyOtp, resendOtp as apiResendOtp, setToken as setAuthToken } from '../../api'
import { useAuth } from '../../context/AuthContext'

const verifySchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z.string().min(1, { message: 'OTP is required' }),
})

export default function VerifyOTP() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: { email: state?.email || '' },
  })

  const { refresh } = useAuth()

  const [resendLoading, setResendLoading] = useState(false)
  const [resendMsg, setResendMsg] = useState('')

  const onSubmit = async (data) => {
    setErrorMsg('')
    setSuccess('')
    setLoading(true)
    try {
      const res = await apiVerifyOtp(data)
      const message = res?.data?.message || 'OTP verified successfully.'
      setSuccess(message)

      // If backend returns a token on verification, set it and navigate to home
      const token = res?.data?.accessToken || res?.data?.token
      if (token) {
        setAuthToken(token)
        navigate('/')
      } else {
        // Refresh auth state (cookie-based login) and navigate accordingly
        try {
          const u = await refresh()
          if (u) {
            navigate('/')
          } else {
            navigate('/verify-success')
          }
        } catch {
          navigate('/verify-success')
        }
      }

      reset()
    } catch (err) {
      console.error('Verify OTP error', err)
      let msg = 'OTP verification failed. Please try again.'
      if (err?.response?.data) {
        const d = err.response.data
        msg = d.message || (d.errors && d.errors[0]?.msg) || JSON.stringify(d)
      }
      setErrorMsg(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
            <span className="block sm:inline">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
            <input
              id="otp"
              type="text"
              {...register('otp')}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
              placeholder="Enter OTP"
            />
            {errors.otp && <p className="text-xs text-red-600 mt-1">{errors.otp.message}</p>}
          </div>

          <div className="flex gap-3 items-center">
            <button type="submit" disabled={loading} className="flex-1 bg-orange-600 text-white py-2.5 px-4 rounded-md font-semibold text-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button type="button" onClick={async () => {
              setResendMsg('')
              setResendLoading(true)
              try {
                await apiResendOtp({ email: (document.getElementById('email')?.value) })
                setResendMsg('OTP resent — check your email')
              } catch (err) {
                let msg = 'Could not resend OTP.'
                if (err?.response?.data) {
                  const d = err.response.data
                  msg = d.message || JSON.stringify(d)
                }
                setResendMsg(msg)
              } finally {
                setResendLoading(false)
              }
            }} className="px-4 py-2 rounded-md border bg-white text-gray-700 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed" disabled={resendLoading}>
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>

          {resendMsg && (
            <p className="text-sm text-gray-700 mt-2">{resendMsg}</p>
          )}
        </form>
      </div>
    </div>
  )
}
