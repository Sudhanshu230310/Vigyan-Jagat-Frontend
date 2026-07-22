import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import EquipImg from '../../../images/main2.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
})

const TRUST_LABELS = [
  'Universities',
  'Research Institutes',
  'Hospitals',
  'Industries',
  'Govt. Labs',
  'Pharma Firms',
  'Defence Labs',
]

export function HeroBanner() {
  return (
    <div className="w-full bg-white min-h-[92vh] flex items-center overflow-hidden relative">

      {/* Ambient glow blobs, kept subtle so the layout reads clean like the reference */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[360px] h-[360px] bg-indigo-100/40 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* ── LEFT COLUMN — content ── */}
        <div className="flex flex-col gap-8 max-w-xl">

          {/* Trust badge pill */}
          <motion.div {...fadeUp(0.05)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Trusted since 1962 — labs across India
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.12)}
            className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.05]"
          >
            <span className="text-blue-600">S</span>hodhix
          </motion.h1>

          {/* Tagline / description */}
          <motion.p {...fadeUp(0.18)} className="text-lg md:text-xl text-zinc-600 leading-relaxed">
            Laboratory equipment, chemicals &amp; glassware — since 1962.
            Trusted by universities, research institutes, hospitals, industries,
            government labs, pharma firms and defence labs across India.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.24)} className="flex items-center gap-6 pt-2">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-blue-600/20 transition-all text-sm cursor-pointer"
              >
                Contact Us
              </motion.button>
            </Link>
            <Link to="/AboutUs">
              <motion.button
                whileHover={{ x: 3 }}
                className="flex cursor-pointer items-center gap-2 text-zinc-900 font-semibold text-sm transition-colors border-b border-zinc-900 pb-1"
              >
                About Us
                <span className="text-lg font-medium leading-none">&rarr;</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust labels, condensed to a single inline row instead of an icon grid */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-x-3 gap-y-2 pt-4 border-t border-zinc-100">
            {TRUST_LABELS.map((label, i) => (
              <span key={label} className="flex items-center text-xs text-zinc-500 font-medium">
                {label}
                {i < TRUST_LABELS.length - 1 && <span className="mx-3 w-1 h-1 rounded-full bg-zinc-300" />}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — single image card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative h-[420px] md:h-[520px]"
        >
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 bg-gradient-to-br from-blue-50 to-indigo-100 border border-gray-300">
            <img src={EquipImg} alt="Vigyan Jagat laboratory equipment" className="w-full h-full object-cover " />
          </div>

          {/* Floating status card, like the reference's "Order dispatched" chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-xl shadow-blue-900/10 border border-zinc-100 px-4 py-3 flex items-center gap-3"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
              ✓
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-zinc-900">Est. 1962</p>
              <p className="text-xs text-zinc-500">Muzaffarpur, Bihar</p>
            </div>
          </motion.div>

          {/* Floating accent dots */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 z-10"
          />
        </motion.div>
      </div>
    </div>
  )
}