import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Wallet from './pages/Wallet'
import Campaigns from './pages/Campaigns'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
        <nav className="flex gap-4 mb-6">
          <Link to="/" className="text-indigo-600">Home</Link>
          <Link to="/wallet" className="text-indigo-600">Wallet</Link>
          <Link to="/campaigns" className="text-indigo-600">Campaigns</Link>
          <Link to="/login" className="text-indigo-600">Login</Link>
          <Link to="/signup" className="text-indigo-600">Signup</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/" element={<div className="text-center">Welcome to Credit Wallet</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
