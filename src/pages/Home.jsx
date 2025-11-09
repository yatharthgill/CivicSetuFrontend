import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="hero-pattern text-white py-28 md:py-40 flex items-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 opacity-0 animate-fade-in-up">
              Building Better Communities, Together.
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-3xl mx-auto opacity-0 animate-fade-in delay-300">
              Empower your city by effortlessly reporting and resolving local issues, from potholes to park maintenance.
            </p>
            <div className="flex justify-center space-x-6 opacity-0 animate-fade-in delay-500">
              {!user ? (
                <>
                  <Link to="/signup" className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                    Get Started
                  </Link>

                  <Link to="/login" className="bg-orange-500 text-white border-2 border-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                    Report an Issue
                  </Link>

                  <a href="#how-it-works" className="bg-orange-500 text-white border-2 border-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                    Learn More
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        {/* "How It Works" Section */}
        <section id="how-it-works" className="py-24 bg-orange-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Simple Steps</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">Your Impact in 3 Steps</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We make reporting and resolving civic issues straightforward and transparent.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              {/* Step 1: Report */}
              <div className="text-center group p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center justify-center bg-orange-100 text-orange-600 w-24 h-24 rounded-full mx-auto mb-8 shadow-lg group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition duration-300">1. Capture & Submit</h3>
                <p className="text-gray-700 leading-relaxed">
                  Effortlessly report issues with photos, voice notes, and automatic GPS tagging directly from your mobile device.
                </p>
              </div>
              {/* Step 2: Track */}
              <div className="text-center group p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center justify-center bg-orange-100 text-orange-600 w-24 h-24 rounded-full mx-auto mb-8 shadow-lg group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" x2="12" y1="2" y2="6"></line>
                    <line x1="12" x2="12" y1="18" y2="22"></line>
                    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line>
                    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line>
                    <line x1="2" x2="6" y1="12" y2="12"></line>
                    <line x1="18" x2="22" y1="12" y2="12"></line>
                    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line>
                    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition duration-300">2. Monitor Progress</h3>
                <p className="text-gray-700 leading-relaxed">
                  Stay informed with real-time notifications and track the status of your reports on an intuitive map.
                </p>
              </div>
              {/* Step 3: See Resolution */}
              <div className="text-center group p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center justify-center bg-orange-100 text-orange-600 w-24 h-24 rounded-full mx-auto mb-8 shadow-lg group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition duration-300">3. Celebrate Resolution</h3>
                <p className="text-gray-700 leading-relaxed">
                  Receive confirmation once your reported issue has been successfully resolved, contributing to a better city.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Core Features</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">Designed for Seamless Civic Engagement</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful tools for both community members and municipal staff to foster efficiency and transparency.
              </p>
            </div>
            
            {/* Feature: For Citizens */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <span className="text-orange-600 font-bold uppercase text-sm tracking-wide mb-3 block">For Citizens</span>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">Your Voice, Instantly Heard.</h3>
                <ul className="space-y-5 text-gray-700 text-lg">
                  <li className="flex items-start">
                    <svg className="w-7 h-7 text-green-500 mr-4 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                      <strong className="font-semibold text-gray-900">Intuitive Mobile Reporting:</strong> Snap, speak, and submit. Our mobile-first design makes reporting effortless.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-7 h-7 text-green-500 mr-4 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                      <strong className="font-semibold text-gray-900">Transparent Tracking:</strong> Follow your report's journey with real-time updates and notifications.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-7 h-7 text-green-500 mr-4 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                      <strong className="font-semibold text-gray-900">Interactive City Map:</strong> Visualize all reported issues and see what's being done in your neighborhood.
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <img src="https://placehold.co/700x500/fcd34d/c2410c?text=CivicFix+Mobile+App" alt="Mobile App Interface" className="rounded-2xl shadow-2xl w-full transform hover:scale-105 hover:shadow-2xl transition-all duration-500" />
              </div>
            </div>

            {/* Feature: For Municipalities */}
            <div id="admin" className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://placehold.co/700x500/fdba74/f97316?text=Admin+Dashboard+Overview" alt="Admin Dashboard" className="rounded-2xl shadow-2xl w-full transform hover:scale-105 hover:shadow-2xl transition-all duration-500" />
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <span className="text-orange-600 font-bold uppercase text-sm tracking-wide mb-3 block">For Municipalities</span>
                <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">Streamlined Operations, Enhanced Accountability.</h3>
                <ul className="space-y-5 text-gray-700 text-lg">
                  <li className="flex items-start">
                    <svg className="w-7 h-7 text-green-500 mr-4 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                      <strong className="font-semibold text-gray-900">Comprehensive Admin Portal:</strong> Manage, filter, and prioritize all reports with ease from a powerful dashboard.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-7 h-7 text-green-500 mr-4 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                      <strong className="font-semibold text-gray-900">Smart Routing Engine:</strong> Automatically direct reports to the correct department, improving response times.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-7 h-7 text-green-500 mr-4 shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                      <strong className="font-semibold text-gray-900">Actionable Analytics:</strong> Gain insights into reporting trends, departmental performance, and community impact.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (CTA) Section */}
        <section className="bg-orange-600 text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Transform Your Community?</h2>
            <p className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto">
              Join CivicFix and empower your citizens while boosting municipal efficiency and responsiveness.
            </p>
            <a href="#" className="bg-white text-orange-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
              Get Started Today
            </a>
          </div>
        </section>
    </div>
  )
}
