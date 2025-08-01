import React from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import DetailPage from './pages/DetailPage'

const App = () => {
  return (
    <div className='relative min-h-[100vh] max-w-[screen] sm:mx-20 ' >

      <BrowserRouter>
        <Routes>
          <Route path='' element={<Dashboard />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/:id/:color/:price/:brand' element={<DetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
