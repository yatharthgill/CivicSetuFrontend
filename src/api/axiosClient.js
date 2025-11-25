import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'
const TOKEN_KEY = 'auth_token'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Default JSON Content-Type will be set automatically by axios when sending JSON bodies.
// We avoid forcing a global Content-Type so multipart/form-data requests can let the
// browser set the proper boundary header.

export function setAuthToken(token) {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {
      // ignore
    }
  } else {
    delete axiosClient.defaults.headers.common['Authorization']
  }
}

export function clearAuthToken() {
  delete axiosClient.defaults.headers.common['Authorization']
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore
  }
}

// Load token from localStorage on module initialization (if present)
try {
  const saved = localStorage.getItem(TOKEN_KEY)
  if (saved) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${saved}`
  }
} catch {
  // ignore
}

export default axiosClient
