import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.png';
import { AdminProvider } from './contexts/AdminContext';

// Main Website Components
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import FeaturedCollectionsFirebase from './components/FeaturedCollectionsFirebase';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategoriesFirebase from './components/ProductCategoriesFirebase';
import Testimonials from './components/Testimonials';

// Admin Components
import AdminRouter from './components/admin/AdminRouter';
import AdminSetup from './components/admin/AdminSetup';

function MainWebsite() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <img src={logo} alt="Manivra Jewels" className="loading-logo" />
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <FeaturedCollectionsFirebase />
        <ProductCategoriesFirebase />
        <AboutUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainWebsite />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </Router>
    </AdminProvider>
  )
}

export default App
