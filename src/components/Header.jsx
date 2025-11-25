import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, loading, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const initials = (() => {
    if (!user) return ''
    const name = user.name || user.email || ''
    return name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
  })()

  // close dropdown on outside click
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <svg className="w-9 h-9 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" className="text-orange-600" />
            </svg>
            <span className="text-2xl font-bold text-orange-600">Civic Setu</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm">
                  <Link to="/" className="font-semibold text-xl">Reports</Link>
      <nav className="flex gap-3 items-center">
        <Link to="/reports/create" className="text-sm">Create</Link>
        <Link to="/reports/my-reports" className="text-sm">My Reports</Link>
        <Link to="/reports/nearby" className="text-sm">Nearby</Link>
        <Link to="/dashboard" className="text-sm">Dashboard</Link>
        <Link to="/admin" className="text-sm text-red-600">Admin</Link>
      </nav>
          </div>

          {loading ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            </div>
          ) : user ? (
            <div className="relative" ref={ref}>
              <button onClick={() => setOpen(v => !v)} className="flex items-center gap-3 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-semibold">{initials}</div>
                <span className="text-sm text-gray-700">{user.name || user.email}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Profile</Link>
                  <button onClick={() => { setOpen(false); logout() }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/signup" className="hidden sm:inline-block bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-all duration-300 shadow hover:shadow-md cursor-pointer">Sign Up</Link>
              <Link to="/login" className="text-sm text-gray-700 hover:text-orange-600 cursor-pointer">Log In</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
