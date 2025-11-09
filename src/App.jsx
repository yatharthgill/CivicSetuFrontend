import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import Home from './pages/Home.jsx'
import VerifyOTP from './pages/Auth/VerifyOTP.jsx'
import VerifySuccess from './pages/Auth/VerifySuccess.jsx'
import Login from './pages/Auth/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>

      <Footer/>
    </div>
  )
}

export default App
