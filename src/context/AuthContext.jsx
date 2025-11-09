/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getMe as apiGetMe, login as apiLogin, logout as apiLogout, setToken as apiSetToken, clearToken as apiClearToken } from '../api'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // refresh: fetch current user from backend (/api/auth/me)
  const refresh = async () => {
    try {
      const res = await apiGetMe()
      // normalize response shapes from backend
      // backend may return { success: true, data: { user: {...} } }
      // or directly { user: {...} } or the user object itself
      const maybe = res?.data
      const userObj = maybe?.data?.user || maybe?.user || maybe || null
      setUser(userObj)
      return userObj
    } catch {
      setUser(null)
      return null
    }
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const u = await refresh()
        if (!mounted) return
        setUser(u)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
    // no dependencies - run once
  }, [])

  // login: call login endpoint; if token returned, set it and fetch user; otherwise rely on cookie and fetch user
  const login = async (credentials) => {
    const res = await apiLogin(credentials)
    const token = res?.data?.accessToken || res?.data?.token
    if (token) {
      apiSetToken(token)
    }
    const u = await refresh()
    return u
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch {
      // ignore
    }
    apiClearToken()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    refresh,
    setToken: apiSetToken,
    clearToken: apiClearToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
