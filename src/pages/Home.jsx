import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Multi-Currency Credit Wallet</h1>
      <p className="text-lg text-gray-600 mb-8">Buy credits, fund campaigns, and manage multi-currency wallets securely.</p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/wallet" className="bg-indigo-600 text-white px-6 py-3 rounded shadow">Go to Wallet</Link>
        <Link to="/campaigns" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded shadow-sm">Browse Campaigns</Link>
      </div>
    </div>
  )
}
