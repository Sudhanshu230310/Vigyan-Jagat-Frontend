import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sidebarItems = [
  {
    title: 'Home',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3l10 9h-3v9H15v-6H9v6H5v-9H2z" />
      </svg>
    ),
    url: '/',
    isActive: true,
  },
  {
    title: 'Categories',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    items: [
      { title: 'Laboratory Equipments', url: '/subcategory/Laboratory Equipments and Instruments' },
      { title: 'Glassware & Plasticware', url: '/subcategory/Glassware & Plasticware' },
      { title: 'Chemical & Reagent', url: '/subcategory/chemical & reagent' },
      { title: 'Laboratory Consumables', url: '/subcategory/laboratory consumables' },
    ],
  },
  {
    title: 'About Us',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
    url: '/AboutUs',
  },
  {
    title: 'Contact',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    url: '/contact',
  },
]

const ChevronDownIcon = ({ rotated }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: 'transform 0.2s ease',
      transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export function Sidebar({ isOpen, isMobile, onClose }) {
  const [expandedItems, setExpandedItems] = useState({})
  const navigate = useNavigate()

  const toggleExpanded = (title) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const handleItemClick = (item) => {
    if (item.items) {
      toggleExpanded(item.title)
    } else if (item.url) {
      navigate(item.url)
      if (isMobile) onClose()
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-zinc-800">
      {/* Mobile Header with Logo (only visible in mobile drawer) */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 pl-5 border-b border-zinc-200 h-16">
          <div
            onClick={() => { navigate('/'); onClose(); }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              V
            </div>
            <h1 className="text-zinc-900 font-semibold text-lg">Vigyan Jagat</h1>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Nav items — scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {sidebarItems.map((item) => {
          const hasSubItems = !!item.items
          const isExpanded = expandedItems[item.title]

          return (
            <div key={item.title}>
              <div
                onClick={() => handleItemClick(item)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors cursor-pointer ${item.isActive
                  ? 'bg-blue-50'
                  : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`${item.isActive ? '' : 'text-zinc-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  {hasSubItems && <ChevronDownIcon rotated={isExpanded} />}
                </div>
              </div>

              {hasSubItems && isExpanded && (
                <div className="mt-1 mb-2 space-y-1">
                  {item.items.map((sub) => (
                    <div
                      key={sub.title}
                      onClick={() => {
                        navigate(sub.url)
                        if (isMobile) onClose()
                      }}
                      className="flex items-center pl-12 pr-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      {sub.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[90] bg-black/60 transition-opacity md:hidden"
            onClick={onClose}
          />
        )}
        {/* Drawer */}
        <aside
          className="fixed inset-y-0 left-0 z-[100] w-64 bg-white shadow-2xl border-r border-zinc-200 md:hidden"
          style={{
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {sidebarContent}
        </aside>
      </>
    )
  }

  // Desktop Sidebar
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-zinc-200 hidden md:block pt-16"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {sidebarContent}
    </aside>
  )
}
