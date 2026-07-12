import { motion } from 'framer-motion'
import { useState } from 'react'
import Main from '../../images/main.png'

export function HeroBanner({ sidebarOpen = false }) {
  const SIDEBAR_W = '16rem'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // When sidebar open: content starts at 16rem, so the content-center = 16rem + (100vw-16rem)/2 = 8rem + 50vw
  // Pill is already -translate-x-1/2, so we set left to that center point
  const pillLeft = sidebarOpen
    ? `calc(${SIDEBAR_W} / 2 + 50%)` // = 8rem + 50vw
    : '50%'

  const navItems = ['Home', 'Categories', 'About Us', 'Contact']

  const trustedBy = ['Universities', 'Research Institutes', 'Hospitals', 'Industries', 'Govt. Labs']

  return (
    <div className="min-h-screen font-sans relative overflow-hidden ">
      <img src={Main} className="absolute h-screen w-full object-cover" alt="" />
      <div className="bg-black/30 h-screen w-full absolute"></div>
      {/* Desktop floating pill nav (xl and up only) */}
      <div
        className="w-[min(80%,60rem)] xl:mt-6 text-md font-sans h-10 xl:flex xl:justify-center xl:items-center hidden xl:gap-24 2xl:gap-30 xl:visible px-4 pl-10 border border-gray-300 items-center rounded-xl py-8 z-50 fixed top-20 -translate-x-1/2 bg-white transition-all duration-300 ease-in-out"
        style={{ left: pillLeft }}
      >
        {navItems.map((item) => (
          <div key={item} className="cursor-pointer hover:text-blue-700 whitespace-nowrap">
            {item}
          </div>
        ))}
      </div>

      {/* Hero content — minimal, centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] px-6 text-center text-white">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-8"
        >
          <span className="text-blue-800 font-bold text-3xl">VJ</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-sans tracking-tight"
        >
          Vigyan Jagat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-2xl text-gray-100"
        >
          Laboratory equipment, chemicals &amp; glassware — since 1962.
        </motion.p>


        {/* Trusted by strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-12 inset-x-0 px-6"
        >
          <p className="text-sm text-gray-300 mb-6">Trusted by leading institutions</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-lg md:text-xl font-semibold text-white/90">
            {trustedBy.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}