import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './pages/Checkout/Checkout'
import Detail from './pages/Product/Detail';
import HomePage from './pages/HomePage/HomePage';

export default function App() {
  return (
    <div>
      <Header />
      <Detail />
      <Footer />
    </div>
  )
}
