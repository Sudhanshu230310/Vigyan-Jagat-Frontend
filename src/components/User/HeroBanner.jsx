import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlasswareImg from '../../images/image.png'
import EquipImg from '../../images/main3.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
})

const TRUST_ICONS = [
  {
    label: 'Universities', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    label: 'Research Institutes', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    )
  },
  {
    label: 'Hospitals', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    )
  },
  {
    label: 'Industries', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    )
  },
  {
    label: 'Govt. Labs', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    )
  },
  {
    label: 'Pharma Firms', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    )
  },
  {
    label: 'Defence Labs', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mx-auto mb-1.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    )
  },
]

export function HeroBanner() {
  return (
    <div className="w-full bg-gradient-to-br from-white to-blue-100 min-h-[92vh] flex items-center overflow-hidden relative">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-200/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-10">


          {/* Logo chip + Heading */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-start items-center gap-4">
              <motion.div {...fadeUp(0.08)} className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-400/20">
                <span className="text-white font-bold text-2xl tracking-tight">S</span>
              </motion.div>

              <motion.h1 {...fadeUp(0.14)} className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.05]">
                <span className="text-blue-600">S</span>hodhix
              </motion.h1>
            </div>


            <motion.p {...fadeUp(0.2)} className="text-2xl md:text-[32px] font-medium text-zinc-800 leading-snug max-w-xl">
              Laboratory equipment, chemicals &amp; glassware — since 1962.
            </motion.p>
          </div>

          {/* Trust Icons */}
          <motion.div {...fadeUp(0.26)} className="flex flex-col gap-5 mt-4">
            <p className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-blue-100/50 border border-blue-200 flex items-center justify-center"></span>
              Trusted by leading institutions
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-6">
              {TRUST_ICONS.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center w-[72px]">
                  <div className="w-12 h-12 bg-blue-100/40 border border-blue-200/50 rounded-xl flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.32)} className="flex items-center gap-6 pt-6">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-blue-600/20 transition-all text-sm"
              >
                Contact Sales
              </motion.button>
            </Link>
            <Link to="/categories">
              <motion.button
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 text-zinc-900 font-semibold text-sm transition-colors"
              >
                About Us
                <span className="text-lg font-medium leading-none">&rarr;</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Overlapping image cards ── */}
        <div className="relative h-[420px] md:h-[500px] hidden lg:block">

          {/* Top card — Lab equipment / molecular */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute top-0 right-0 w-[68%] h-[55%] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/15 border border-white/60"
          >
            <img src={EquipImg} alt="Vigyan Jagat" className="w-full h-full object-cover" />

          </motion.div>

          {/* Bottom card — Glassware */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            className="absolute bottom-0 left-0 w-[68%] h-[55%] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/15 border border-white/60"
          >
            <img src={GlasswareImg} alt="Chemicals & Glassware" className="w-full h-full object-cover" />

          </motion.div>

          {/* Floating accent dot */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[48%] left-[32%] w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 z-10"
          />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-[22%] left-[24%] w-3 h-3 bg-indigo-400 rounded-full shadow-md shadow-indigo-400/40 z-10"
          />
        </div>
      </div>
    </div>
  )
}