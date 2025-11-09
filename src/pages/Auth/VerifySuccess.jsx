import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifySuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/login')
    }, 3000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Verification Successful</h2>
        <p className="text-gray-600 mb-4">Your account has been verified. Redirecting to login...</p>
        <p className="text-sm text-gray-500">If you are not redirected, <a className="text-orange-600 cursor-pointer" href="/login">click here</a>.</p>
      </div>
    </div>
  )
}
