import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Wallet from './pages/Wallet'
import Campaigns from './pages/Campaigns'
import Profile from './pages/Profile'
import CheckoutReturn from './pages/CheckoutReturn'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout-return" element={<CheckoutReturn />} />
          <Route path="/" element={<div className="text-center">Welcome to Credit Wallet</div>} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
