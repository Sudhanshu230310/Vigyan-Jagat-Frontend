import { useState } from 'react'
import SearchIcon from '../../icons/Search'

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)


export function Navbar({ sidebarOpen, onToggleSidebar, onOpenMobileMenu }) {
  const [activeTooltip, setActiveTooltip] = useState(null)

  const NavButton = ({ id, icon, tooltip, badge }) => (
    <div className="relative">
      <button
        id={id}
        onMouseEnter={() => setActiveTooltip(id)}
        onMouseLeave={() => setActiveTooltip(null)}
        className="relative flex items-center justify-center w-9 h-9 rounded-2xl text-[oklch(0.40_0_0)] hover:bg-[oklch(0.95_0_0)] transition-colors"
      >
        {icon}
        {badge > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-semibold"
          >
            {badge}
          </span>
        )}
      </button>
      {activeTooltip === id && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 rounded-xl bg-[oklch(0.12_0_0)] text-white text-xs whitespace-nowrap z-50 pointer-events-none"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          {tooltip}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[oklch(0.12_0_0)] rotate-45" />
        </div>
      )}
    </div>
  )

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center gap-3 mb-10 border-b border-gray-300 px-4"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Mobile hamburger */}
      <button
        id="mobile-menu-btn"
        onClick={onOpenMobileMenu}
        className="flex md:hidden items-center justify-center w-16 h-16 rounded-2xl font-bold text-black hover:bg-[oklch(0.95_0_0)] transition-colors"
      >
        <MenuIcon />
      </button>

      {/* Desktop toggle sidebar */}
      <button
        id="sidebar-toggle-btn"
        onClick={onToggleSidebar}
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl text-black hover:bg-[oklch(0.95_0_0)] transition-colors"
      >
        <MenuIcon />
      </button>

      {/* Title */}
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-[1.4rem] font-bold text-[oklch(0.12_0_0)]">
          <div className="flex">Vigyan Jagat</div>
        </h1>

        {/* Right actions */}
        <div className="lg:flex lg:visible hidden justify-end items-center pr-6 md:pr-8 gap-1.5 w-[40%]">
          <div className="flex items-center border border-gray-400 py-1 pl-4 rounded-xl w-[90%]">
            <SearchIcon />
            <input type="text" placeholder="Search..." className="w-full px-2 h-full outline-0"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-1 rounded-xl transition-colors cursor-pointer">
            Search
          </button>
        </div>
      </div>
    </header>
  )
}
