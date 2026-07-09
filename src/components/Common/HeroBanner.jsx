import { motion } from 'framer-motion'
import { useState } from 'react'
import SearchIcon from '../../icons/Search'

export function HeroBanner({ sidebarOpen = false }) {
  const SIDEBAR_W = '16rem'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // When sidebar open: content starts at 16rem, so the content-center = 16rem + (100vw-16rem)/2 = 8rem + 50vw
  // Pill is already -translate-x-1/2, so we set left to that center point
  const pillLeft = sidebarOpen
    ? `calc(${SIDEBAR_W} / 2 + 50%)`   // = 8rem + 50vw
    : '50%'

  const navItems = ['Home', 'Categories', 'About Us', 'Contact']

  return (
    <div className="min-h-[80vh]">
      {/* Desktop floating pill nav (lg and up only) */}
      <div
        className="w-[min(80%,60rem)] text-md font-sans h-10 xl:flex xl:justify-center xl:items-center hidden xl:gap-24 2xl:gap-30 xl:visible px-4 pl-10 border border-gray-300 items-center rounded-xl py-8 z-50 fixed top-20 -translate-x-1/2 bg-white transition-all duration-300 ease-in-out"
        style={{ left: pillLeft }}
      >
        {navItems.map((item) => (
          <div key={item} className="cursor-pointer hover:text-blue-700 whitespace-nowrap">
            {item}
          </div>
        ))}
      </div>

      <div className="h-10 text-md mb-10 font-sans  visible lg:hidden flex">
        <div className='w-full border border-gray-300 mx-2 rounded-xl h-full pl-3 flex items-center'>
          <SearchIcon />
          <input type="text" placeholder='Search...' className='w-full px-4 h-full outline-none' /></div>
        <button className='text-white px-12 flex justify-center items-center hover:bg-blue-700 bg-blue-600 cursor-pointer w-20 rounded-xl'>Search</button>
      </div>


      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden bg-gradient-to-br from-black to-blue-400 rounded-3xl p-6 sm:p-8 min-h-[22rem] md:h-80 xl:mt-16 text-white"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between h-full">
            {/* Left: Text content */}
            <div className="space-y-4">
              {/* Badge */}
              <span
                className="inline-block rounded-xl px-3 py-1 text-sm font-medium text-white"
                style={{ background: 'rgba(255,255,255,0.20)' }}
              >
                Premium
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold">Welcome to Vigyan Jagat</h2>

              <p className="text-white/80 text-sm sm:text-base max-w-full md:max-w-[600px]">
                Your one-stop platform to source, compare and grow your business.
              </p>

              <div className="flex flex-wrap gap-3">
                {/* Primary button */}
                <button
                  className="rounded-2xl px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    background: 'white',
                    color: 'rgb(67,56,202)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.90)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                >
                  Explore Plans
                </button>

                {/* Outline button */}
                <button
                  className="rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                  style={{
                    background: 'transparent',
                    border: '1px solid white',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Take a Tour
                </button>
              </div>
            </div>

            {/* Right: Rotating concentric circles (lg and up only) */}
            <div className="hidden lg:block flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="relative"
                style={{ width: 160, height: 160 }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}
                />
                <div className="absolute rounded-full" style={{ inset: 16, background: 'rgba(255,255,255,0.20)' }} />
                <div className="absolute rounded-full" style={{ inset: 32, background: 'rgba(255,255,255,0.30)' }} />
                <div className="absolute rounded-full" style={{ inset: 48, background: 'rgba(255,255,255,0.40)' }} />
                <div className="absolute rounded-full" style={{ inset: 64, background: 'rgba(255,255,255,0.50)' }} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}