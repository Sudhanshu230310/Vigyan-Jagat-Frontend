import { useState } from 'react'

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const PanelLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" />
  </svg>
)

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
)

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

export function Navbar({ sidebarOpen, onToggleSidebar, onOpenMobileMenu }) {
  const [notifications] = useState(5)
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
      className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[oklch(0.90_0_0)] px-4"
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
        className="flex md:hidden items-center justify-center w-9 h-9 rounded-2xl text-[oklch(0.40_0_0)] hover:bg-[oklch(0.95_0_0)] transition-colors"
      >
        <MenuIcon />
      </button>

      {/* Desktop toggle sidebar */}
      <button
        id="sidebar-toggle-btn"
        onClick={onToggleSidebar}
        className="hidden md:flex items-center justify-center w-9 h-9 rounded-2xl text-[oklch(0.40_0_0)] hover:bg-[oklch(0.95_0_0)] transition-colors"
      >
        <PanelLeftIcon />
      </button>

      {/* Title */}
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-[1.05rem] font-semibold text-[oklch(0.12_0_0)] tracking-tight">
          Vigyan Jagat
        </h1>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <NavButton id="cloud" icon={<CloudIcon />} tooltip="Cloud Storage" />
          <NavButton id="messages" icon={<MessageIcon />} tooltip="Messages" />
          <NavButton id="notifications" icon={<BellIcon />} tooltip="Notifications" badge={notifications} />

          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-full text-white text-sm font-bold ml-1 cursor-pointer select-none"
            style={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, rgb(124,58,237), rgb(37,99,235))',
              border: '2px solid oklch(0.45 0.18 270 / 0.4)',
            }}
          >
            JD
          </div>
        </div>
      </div>
    </header>
  )
}
