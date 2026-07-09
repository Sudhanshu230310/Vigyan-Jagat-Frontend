import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import UserDashboard from './Dashboards/User/User'
import Subcategory from './components/User/Subcategories'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[oklch(0.99_0_0)]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserDashboard
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            }
          />
          <Route path="/subcategory/:categoryName" element={<Subcategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
