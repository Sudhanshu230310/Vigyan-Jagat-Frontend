import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Main from '../../images/main.png'
import { Link } from 'react-router-dom'

export function HeroBanner({ sidebarOpen = false }) {
  const SIDEBAR_W = '16rem'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // When sidebar open: content starts at 16rem, so the content-center = 16rem + (100vw-16rem)/2 = 8rem + 50vw
  // Pill is already -translate-x-1/2, so we set left to that center point
  const pillLeft = sidebarOpen
    ? `calc(${SIDEBAR_W} / 2 + 50%)` // = 8rem + 50vw
    : '50%'

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: 'categories' },
    { name: 'About Us', path: 'about' },
    { name: 'Contact Us', path: 'contact' }
  ]

  const trustedBy = ['Universities', 'Research Institutes', 'Hospitals', 'Industries', 'Govt. Labs']
  // Duplicate for seamless marquee
  const marqueeItems = [...trustedBy, ...trustedBy, ...trustedBy, ...trustedBy]

  // Generate random particles (memoized so they don't jump on re-render)
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2
    }))
  }, [])

  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-black">
      
      {/* 1. Slow zooming background image */}
      <motion.img 
        src={Main} 
        alt="" 
        className="absolute inset-0 h-screen w-full object-cover"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* 2. Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ 
          background: [
            "linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)",
            "linear-gradient(45deg, rgba(0,0,20,0.7) 0%, rgba(20,0,40,0.4) 100%)",
            "linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Two rotating rings behind the content */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 border-dashed z-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-white/5 border-dotted z-0 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* 4. Two floating gradient blobs */}
      <motion.div
        className="absolute -left-32 top-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl mix-blend-screen pointer-events-none z-0"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 bottom-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none z-0"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 0.8, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 5. 20-30 glowing floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/60 blur-[1px] pointer-events-none z-0"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.3)"
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Desktop floating pill nav (xl and up only) */}
      <div
        className="w-[min(80%,60rem)] xl:mt-6 text-md font-sans h-10 xl:flex xl:justify-center xl:items-center hidden xl:gap-24 2xl:gap-30 xl:visible px-4 pl-10 border border-gray-300 items-center rounded-xl py-8 z-50 fixed top-20 -translate-x-1/2 bg-white transition-all duration-300 ease-in-out"
        style={{ left: pillLeft }}
      >
        {navItems.map((item) => (
          <Link to={item.path} key={item.name} className="cursor-pointer hover:text-blue-700 whitespace-nowrap">
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile search bar (hidden on xl and up) */}
      {/* 7. Breathing search bar */}
      <motion.div
        className="w-[90%] max-w-sm text-md font-sans flex justify-center items-center lg:hidden p-1.5 border border-white/60 rounded-2xl z-20 fixed top-24 -translate-x-1/2 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out"
        style={{ left: pillLeft }}
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex w-full items-center">
          <svg className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search Vigyan Jagat..."
            className="flex-1 w-full px-3 py-2 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 focus:ring-0"
          />
          <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap shadow-md">
            Search
          </button>
        </div>
      </motion.div>

      {/* Hero content — minimal, centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] px-6 text-center text-white">
        
        {/* 6. Floating logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0] 
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-8"
        >
          <span className="text-blue-800 font-bold text-3xl">VJ</span>
        </motion.div>

        {/* 6. Floating heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ 
            opacity: 1, 
            y: [0, -8, 0] 
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.1 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
          }}
          className="text-5xl md:text-6xl font-sans tracking-tight drop-shadow-lg"
        >
          Vigyan Jagat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-2xl text-gray-100 drop-shadow-md max-w-2xl"
        >
          Laboratory equipment, chemicals &amp; glassware — since 1962.
        </motion.p>

        {/* 8. Infinite "Trusted By" marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-12 inset-x-0 w-full overflow-hidden"
        >
          <p className="text-sm text-gray-300 mb-6 font-medium tracking-wide uppercase">Trusted by leading institutions</p>
          
          {/* Marquee Container */}
          <div className="relative flex overflow-hidden group">
            {/* The wrapper must be wide enough to translate, masking its overflow */}
            <motion.div
              className="flex whitespace-nowrap gap-16 md:gap-24 px-8 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeItems.map((name, index) => (
                <span 
                  key={`${name}-${index}`} 
                  className="text-lg md:text-xl font-semibold text-white/80 transition-colors hover:text-white"
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}