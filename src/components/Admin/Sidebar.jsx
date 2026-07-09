import { useState } from 'react'

const sidebarItems = [
  {
    title: 'Home',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    isActive: true,
  },
  {
    title: 'Apps',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
    badge: '2',
    items: [
      { title: 'All Apps', url: '#' },
      { title: 'Recent', url: '#' },
      { title: 'Updates', url: '#', badge: '2' },
      { title: 'Installed', url: '#' },
    ],
  },
  {
    title: 'Files',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    items: [
      { title: 'Recent', url: '#' },
      { title: 'Shared with me', url: '#', badge: '3' },
      { title: 'Favorites', url: '#' },
      { title: 'Trash', url: '#' },
    ],
  },
  {
    title: 'Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </svg>
    ),
    badge: '4',
    items: [
      { title: 'Active Projects', url: '#', badge: '4' },
      { title: 'Archived', url: '#' },
      { title: 'Templates', url: '#' },
    ],
  },
  {
    title: 'Learn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    items: [
      { title: 'Tutorials', url: '#' },
      { title: 'Courses', url: '#' },
      { title: 'Webinars', url: '#' },
      { title: 'Resources', url: '#' },
    ],
  },
  {
    title: 'Community',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    items: [
      { title: 'Explore', url: '#' },
      { title: 'Following', url: '#' },
      { title: 'Challenges', url: '#' },
      { title: 'Events', url: '#' },
    ],
  },
  {
    title: 'Resources',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    ),
    items: [
      { title: 'Stock Photos', url: '#' },
      { title: 'Fonts', url: '#' },
      { title: 'Icons', url: '#' },
      { title: 'Templates', url: '#' },
    ],
  },
]

const ChevronDownIcon = ({ rotated }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
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

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export function Sidebar({ isOpen, isMobile, onClose }) {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (title) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="flex items-center justify-between p-4 border-b border-[oklch(0.90_0_0)]">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-2xl text-white"
            style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, rgb(124,58,237), rgb(37,99,235))',
              flexShrink: 0,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8 19 13" /><path d="M15 9h.01" /><path d="M17.8 6.2 19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-sm text-[oklch(0.09_0_0)]">Designali</h2>
            <p className="text-xs text-[oklch(0.50_0_0)]">Creative Suite</p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[oklch(0.96_0_0)] text-[oklch(0.45_0_0)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.55_0_0)]"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-2xl bg-[oklch(0.96_0_0)] pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[oklch(0.45_0.18_270)] focus:ring-offset-0 placeholder:text-[oklch(0.60_0_0)]"
          />
        </div>
      </div>

      {/* Nav items — scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {sidebarItems.map((item) => (
          <div key={item.title}>
            <button
              onClick={() => item.items && toggleExpanded(item.title)}
              className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors ${
                item.isActive
                  ? 'bg-[oklch(0.94_0.04_270)] text-[oklch(0.35_0.20_270)]'
                  : 'text-[oklch(0.30_0_0)] hover:bg-[oklch(0.96_0_0)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={item.isActive ? 'text-[oklch(0.45_0.18_270)]' : 'text-[oklch(0.55_0_0)]'}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="rounded-full border border-[oklch(0.85_0_0)] px-2 py-0.5 text-xs font-normal text-[oklch(0.45_0_0)]">
                    {item.badge}
                  </span>
                )}
                {item.items && <ChevronDownIcon rotated={expandedItems[item.title]} />}
              </div>
            </button>

            {item.items && expandedItems[item.title] && (
              <div className="mt-0.5 ml-6 border-l border-[oklch(0.88_0_0)] pl-3 space-y-0.5">
                {item.items.map((sub) => (
                  <a
                    key={sub.title}
                    href={sub.url}
                    className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm text-[oklch(0.40_0_0)] hover:bg-[oklch(0.96_0_0)] transition-colors"
                  >
                    {sub.title}
                    {sub.badge && (
                      <span className="rounded-full border border-[oklch(0.85_0_0)] px-2 py-0.5 text-xs text-[oklch(0.45_0_0)]">
                        {sub.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[oklch(0.90_0_0)] p-3 space-y-0.5">
        <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-[oklch(0.35_0_0)] hover:bg-[oklch(0.96_0_0)] transition-colors">
          <span className="text-[oklch(0.55_0_0)]"><SettingsIcon /></span>
          Settings
        </button>
        <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium text-[oklch(0.35_0_0)] hover:bg-[oklch(0.96_0_0)] transition-colors">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full text-white text-xs font-bold"
              style={{ width: 28, height: 28, background: 'linear-gradient(135deg, rgb(124,58,237), rgb(37,99,235))' }}
            >
              JD
            </div>
            <span>John Doe</span>
          </div>
          <span className="rounded-full border border-[oklch(0.85_0_0)] px-2 py-0.5 text-xs text-[oklch(0.45_0_0)]">
            Pro
          </span>
        </button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
        )}
        {/* Drawer */}
        <aside
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-[oklch(0.90_0_0)]"
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

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 w-64 bg-[oklch(0.98_0_0)] border-r border-[oklch(0.90_0_0)] hidden md:block"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {sidebarContent}
    </aside>
  )
}
