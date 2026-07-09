import { useState } from 'react'
import './App.css'
import { Navbar } from './components/User/Navbar'
import { Sidebar } from './components/User/Sidebar'
import { HeroBanner } from './components/Common/HeroBanner'
import { StatsBar } from './components/User/StatsBar'
import { Categories } from './components/User/Categories'
import { WhyVigyanJagat } from './components/User/WhyVigyanJagat'
import { Footer } from './components/Common/Footer'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[oklch(0.99_0_0)]">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={false}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Mobile sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        isMobile={true}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content area offset by sidebar width on desktop */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{ paddingLeft: sidebarOpen ? '16rem' : '0' }}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Page content */}
        <main className="">
          <div className="px-6 md:px-8">
            <HeroBanner />
          </div>
          <Categories />
          <WhyVigyanJagat />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
