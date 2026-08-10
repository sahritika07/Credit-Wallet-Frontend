import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Wallet from './pages/Wallet'
import Campaigns from './pages/Campaigns'
import Profile from './pages/Profile'
import CheckoutReturn from './pages/CheckoutReturn'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-shell">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout-return" element={<CheckoutReturn />} />
          <Route path="/payment/success" element={<CheckoutReturn mode="success" />} />
          <Route path="/payment/cancel" element={<CheckoutReturn mode="cancel" />} />
          <Route path="/" element={<Home />} />
        </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
