import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  BadgeCheck,
  IndianRupee,
  Zap,
  Globe,
  Headphones,
} from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Quality & Compliance',
    description:
      'Source products backed by quality certifications, safety documentation, and regulatory compliance.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Chemical Suppliers',
    description:
      'Partner with trusted manufacturers, distributors, and exporters who meet industry standards.',
  },
  {
    icon: IndianRupee,
    title: 'Competitive Bulk Pricing',
    description:
      'Compare quotes from multiple suppliers and secure the best prices for your business.',
  },
  {
    icon: Zap,
    title: 'Fast & Secure Procurement',
    description:
      'Simplify sourcing with quick inquiries, efficient communication, and secure order management.',
  },
  {
    icon: Globe,
    title: 'Global Sourcing Network',
    description:
      'Access a worldwide network of verified suppliers across every major chemical category.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Get expert guidance from our team for every step of your procurement journey.',
  },
]

const CYCLE_MS = 3500

// Variants for the feature card swap (replaces the old featureIn keyframe)
const cardVariants = {
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

export function WhyVigyanJagat() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % features.length)
    }, CYCLE_MS)
    return () => clearInterval(timerRef.current)
  }, [paused])

  const ActiveIcon = features[active].icon

  return (
    <MotionConfig reducedMotion="user">
      <section className="w-full  bg-gray-900 ">
        <div className="mx-auto grid min-h-[80vh] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:px-16 lg:py-24">
          {/* ---- Panel: shows second on mobile, left on desktop ---- */}
          <div
            className="relative order-2 lg:order-1 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-200 via-violet-200 to-slate-100 flex items-center justify-center p-6 sm:p-10 lg:p-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {/* soft glow blobs */}
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-300/40 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-violet-300/40 blur-3xl" />

            {/* The panel — one frame whose content changes automatically */}
            <div className="relative mx-auto w-full max-w-2xl bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/60 p-4 sm:p-6">
              {/* Panel header */}
              <p className="text-xs font-medium uppercase tracking-wider text-white mb-4">
                Why choose us
              </p>

              {/* Animated feature card (crossfade + slide via AnimatePresence) */}
              <div className="relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                      <ActiveIcon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 leading-snug">
                      {features[active].title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed min-h-[80px]">
                      {features[active].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Compact list of the other items */}
              <div className="mt-4 border-t border-zinc-100 pt-4 space-y-2.5">
                {features.map((f, i) => (
                  <button
                    key={f.title}
                    onClick={() => setActive(i)}
                    className={`relative w-full flex items-center gap-3 text-left rounded-lg px-2 py-1.5 ${i === active
                      ? ''
                      : 'hover:bg-zinc-50 opacity-60 hover:opacity-100 transition-opacity duration-300'
                      }`}
                  >
                    {/* Shared-layout highlight pill glides between rows */}
                    {i === active && (
                      <motion.span
                        layoutId="activeRowHighlight"
                        className="absolute inset-0 rounded-lg bg-indigo-400"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <motion.span
                      className="relative w-2 h-2 rounded-full flex-shrink-0"
                      animate={{
                        backgroundColor: i === active ? '#6366f1' : '#d4d4d8',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <span
                      className={`relative text-xs truncate transition-colors duration-300 ${i === active
                        ? 'text-zinc-900 font-semibold'
                        : 'text-zinc-500'
                        }`}
                    >
                      {f.title}
                    </span>
                    {i === active && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative ml-auto text-[10px] text-indigo-500 font-medium flex-shrink-0"
                      >
                        Now
                      </motion.span>
                    )}
                  </button>
                ))}
              </div>

              {/* Progress bar for the current slide */}
              <div className="mt-4 h-1 rounded-full bg-zinc-100 overflow-hidden">
                <motion.div
                  key={`bar-${active}-${paused}`}
                  className="h-full bg-indigo-500 rounded-full"
                  initial={{ width: paused || prefersReducedMotion ? '100%' : '0%' }}
                  animate={{ width: '100%' }}
                  transition={
                    paused || prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: CYCLE_MS / 1000, ease: 'linear' }
                  }
                />
              </div>
            </div>
          </div>

          {/* ---- Text: shows first on mobile, right on desktop ---- */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wide">
              Since 1962
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
              Why Vigyan Jagat?
            </h2>
            <p className="mt-8 max-w-md mx-auto lg:mx-0 text-base md:text-lg text-zinc-300 leading-relaxed">
              From quality-certified products and verified suppliers to
              competitive bulk pricing and dedicated support — everything your
              lab needs, sourced through one trusted partner.
            </p>

            {/* Dot navigation */}
            <div className="flex gap-2 mt-12 justify-center lg:justify-start">
              {features.map((f, i) => (
                <motion.button
                  key={f.title}
                  aria-label={`Show ${f.title}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full ${i === active ? 'bg-indigo-200' : 'bg-zinc-300 hover:bg-zinc-400'
                    }`}
                  animate={{ width: i === active ? 32 : 8 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default WhyVigyanJagat