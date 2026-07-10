import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/User/Navbar'
import { Sidebar } from './components/User/Sidebar'
import { Footer } from './components/Common/Footer'
import UserDashboard from './Dashboards/User/User'
import Subcategory from './components/User/Subcategories'
import { ScrollToTop } from './components/Common/ScrollToTop'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          style={{ paddingLeft: sidebarOpen ? '16rem' : '0' }}
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
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

