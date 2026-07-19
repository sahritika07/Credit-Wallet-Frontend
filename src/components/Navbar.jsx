import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/api'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-semibold text-indigo-600">CreditWallet</Link>
        <Link to="/wallet" className="text-sm text-gray-600">Wallet</Link>
        <Link to="/campaigns" className="text-sm text-gray-600">Campaigns</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/profile" className="text-sm text-gray-600">Profile</Link>
        <Link to="/login" className="text-sm text-gray-600">Login</Link>
        <Link to="/signup" className="text-sm text-gray-600">Signup</Link>
        <button onClick={() => { logout(); window.location.href = '/'; }} className="text-sm text-red-600">Logout</button>
      </div>
    </div>
  )
}
