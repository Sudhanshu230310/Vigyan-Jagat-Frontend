import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/User/Navbar'
import { Sidebar } from './components/User/Sidebar'
import { Footer } from './components/User/Footer'
import UserDashboard from './Dashboards/User/User'
import Subcategory from './components/User/Subcategories'
import { ScrollToTop } from './components/User/ScrollToTop'
import Products from './components/User/Products'
import Item from './components/User/Item'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMd, setIsMd] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const onResize = () => {
      const isDesktop = window.innerWidth >= 768
      setIsMd(isDesktop)
      if (isDesktop) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen bg-[oklch(0.99_0_0)] text-zinc-900">
      <BrowserRouter>
        <ScrollToTop />
        {/* Desktop Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={false}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile Sidebar */}
        <Sidebar
          isOpen={mobileMenuOpen}
          isMobile={true}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Layout Wrapper */}
        <div
          className="transition-all duration-300 ease-in-out min-h-screen flex flex-col justify-between"
          style={{ paddingLeft: isMd && sidebarOpen ? '16rem' : '0' }}
        >
          <div>
            <Navbar
              sidebarOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
              onOpenMobileMenu={() => setMobileMenuOpen(true)}
            />

            <Routes>
              <Route
                path="/"
                element={<UserDashboard sidebarOpen={sidebarOpen} />}
              />
              <Route path="/subcategory/:categoryName" element={<Subcategory />} />
              <Route path="/products/:SubcategoryName" element={<Products />} />
              <Route path="/products/:SubcategoryName/:itemName" element={<Item />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

