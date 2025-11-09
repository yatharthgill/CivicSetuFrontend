import axiosClient, { setAuthToken, clearAuthToken } from './axiosClient'

export const register = (data) => axiosClient.post('/api/auth/register', data)

export const verifyOtp = (data) => axiosClient.post('/api/auth/verify-otp', data)

export const verifyOtpByUrl = (id, token) => axiosClient.get(`/api/auth/verify-otp/${id}/${token}`)

export const resendOtp = (data) => axiosClient.post('/api/auth/resend-otp', data)

export const login = (data) => axiosClient.post('/api/auth/login', data)

export const getMe = () => axiosClient.get('/api/auth/me')

export const logout = () => axiosClient.get('/api/auth/logout')

export const setToken = setAuthToken
export const clearToken = clearAuthToken

export default {
  register,
  verifyOtp,
  verifyOtpByUrl,
  resendOtp,
  login,
  getMe,
  logout,
  setToken,
  clearToken,
}
