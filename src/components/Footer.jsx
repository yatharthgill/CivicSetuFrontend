import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Link
                    to="/"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <svg
                      className="w-9 h-9 text-orange-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        className="text-orange-600"
                      />
                    </svg>
                    <span className="text-2xl font-bold text-orange-600">
                      Civic Setu
                    </span>
                  </Link>
                </div>
              <p className="mb-4 leading-relaxed text-gray-600">
                Connecting citizens with their local government for a cleaner,
                safer, and more vibrant community.
              </p>
              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-orange-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-orange-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-twitter"
                  >
                    <path d="M22 4s-2 1.1-3 1.1A4.3 4.3 0 0 0 19.5 3c-.9-.4-2-.7-3.2-.7-2 0-3.7 1.2-4.5 3.1-.3.6-.5 1.3-.5 2 0 .5.1 1 .2 1.5C9.5 9.5 6.4 8.2 4.1 5.4c-.6 1-.9 2.2-.9 3.5 0 1.2.5 2.3 1.3 3.1-.9 0-1.7-.3-2.4-.7v.1c0 2.5 1.8 4.6 4.2 5-.4.1-.9.1-1.4.1-.3 0-.7 0-1-.1.7 2.2 2.8 3.8 5.3 3.8-1.8 1.4-4 2.1-6.2 2.1-.4 0-.8 0-1.2-.1C4.9 22.5 7.6 23 10.3 23c7.4 0 12-6.5 12-12.7 0-.2 0-.4 0-.6-.8-.6-1.7-1.3-2.7-1.8z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-orange-600 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-bold text-gray-900 mb-6">
                Quick Links
              </h5>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    Report an Issue
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    Features Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#admin"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    Admin Login
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold text-gray-900 mb-6">Support</h5>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-3D00"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold text-gray-900 mb-6">
                Contact Info
              </h5>
              <ul className="space-y-3">
                <li>
                  <p>123 Community Lane, Metropolis, 12345</p>
                </li>
                <li>
                  <p>info@CivicSetu.com</p>
                </li>
                <li>
                  <p>(123) 456-7890</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 CivicSetu. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
