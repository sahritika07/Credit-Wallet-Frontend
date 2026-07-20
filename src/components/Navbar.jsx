import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/api'

export default function Navbar() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <header className="bg-gradient-to-r from-indigo-50 to-white shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-indigo-600">CreditWallet</Link>
          <nav className="hidden md:flex gap-4 items-center">
            <Link to="/wallet" className="text-sm text-gray-700 hover:text-indigo-600">Wallet</Link>
            <Link to="/campaigns" className="text-sm text-gray-700 hover:text-indigo-600">Campaigns</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <Link to="/profile" className="text-sm text-gray-700 hover:text-indigo-600">Profile</Link>
              <button onClick={() => { logout(); window.location.href = '/'; }} className="ml-3 text-sm text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/signup" className="ml-2 inline-block bg-indigo-600 text-white px-3 py-1 rounded shadow-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
