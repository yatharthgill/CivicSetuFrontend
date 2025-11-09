import React from 'react'

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the protected dashboard. You are logged in.</p>
      </div>
    </div>
  )
}
