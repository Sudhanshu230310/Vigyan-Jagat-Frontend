import { motion } from 'framer-motion'
import { useState } from 'react'
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
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Categories',
      path: 'categories'
    },
    {
      name: 'About Us',
      path: 'about'
    },
    {
      name: 'Contact Us',
      path: 'contact'
    }

  ]

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
          <Link to={item.path} key={item.name} className="cursor-pointer hover:text-blue-700 whitespace-nowrap">
            {item.name}
          </Link>
        ))}
      </div>
      {/* Mobile search bar (hidden on xl and up) */}
      <div
        className="w-[90%] max-w-sm text-md font-sans flex justify-center items-center lg:hidden p-1.5 border border-white/60 shadow-2xl rounded-2xl z-20 fixed top-24 -translate-x-1/2 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out"
        style={{ left: pillLeft }}
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