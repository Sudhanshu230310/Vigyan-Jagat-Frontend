import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ---- Footer link data ----

const categoryLinks = [
  { label: "Laboratory Equipments & Instruments", to: "/subcategory/Laboratory Equipments and Instruments" },
  { label: "Glassware & Plasticware", to: "/subcategory/Glassware & Plasticware" },
  { label: "Chemical & Reagent", to: "/subcategory/Chemical & Reagent" },
  { label: "Laboratory Consumables", to: "/subcategory/Laboratory Consumables" },
]

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Our Brands", to: "/brands" },
  { label: "GeM Portal", to: "/gem" },
  { label: "Contact", to: "/contact" },
]

const offices = ["Muzaffarpur (HO)", "Delhi", "Kanpur", "Patna", "Durgapur", "Dehradun"]

// ---- Deterministic particles (computed once, not per render) ----

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${(i * 43 + 9) % 100}%`,
  top: `${(i * 61 + 19) % 100}%`,
  size: 3 + (i % 3) * 2,
  duration: 7 + (i % 4) * 1.6,
  delay: (i % 5) * 0.9,
  drift: (i % 2 === 0 ? 1 : -1) * (6 + (i % 3) * 5),
}))

// ---- Small inline icons (no extra dependencies) ----

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.22 8.22 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.25-8.25m-3.53 4.02c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
    </svg>
  )
}

const socials = [
  { label: "LinkedIn", icon: <LinkedInIcon />, href: "https://www.linkedin.com" },
  { label: "WhatsApp", icon: <WhatsAppIcon />, href: "https://wa.me/910000000000" },
  { label: "Email", icon: <MailIcon />, href: "mailto:info@vigyanjagat.com" },
]

// ---- Ambient background: soft gradients + particles ----

function FooterAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* 🔵 Soft animated cyan gradient blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)" }}
        animate={{ x: [0, 40, -15, 0], y: [0, 25, 45, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(103,232,249,0.12), transparent 70%)" }}
        animate={{ x: [0, -50, 15, 0], y: [0, -30, 20, 0], scale: [1, 0.92, 1.08, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ✨ Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -24, 0], x: [0, p.drift, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* 🌫️ Large faded watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center overflow-hidden select-none">
        <span className="font-sans font-black tracking-tight leading-none whitespace-nowrap text-[16vw] lg:text-[13rem] text-transparent bg-clip-text bg-gradient-to-b from-cyan-100/80 to-transparent translate-y-[28%]">
          VIGYAN JAGAT
        </span>
      </div>
    </div>
  )
}

// ---- Shared link hover style ----

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-cyan-600 transition-colors"
      >
        <span className="h-px w-0 group-hover:w-3 bg-cyan-500 transition-all duration-300" />
        {children}
      </Link>
    </li>
  )
}

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const columnsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export function Footer() {
  return (
    <footer className="relative bg-white text-zinc-700 overflow-hidden border-t border-zinc-300">
      <FooterAmbient />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

        {/* ---- 🌊 Animated divider ---- */}
        <div className="relative h-px w-full bg-zinc-200 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 w-40"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59,130,246,0.7), rgba(34,211,238,0.7), transparent)",
            }}
            animate={{ x: ["-10rem", "100vw"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </div>

        {/* ---- 📦 Four-column layout ---- */}
        <motion.div
          variants={columnsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-12 md:py-16"
        >
          {/* Column 1 — 💬 Company */}
          <motion.div variants={columnVariants} className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-zinc-900">
                Vigyan <span className="text-cyan-600">Jagat</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Authorized dealer and supplier of laboratory equipment,
              chemicals, glassware and consumables — serving research,
              education and industry since 1962.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-100 rounded-full px-3 py-1">
              EST. 1962 · GeM REGISTERED
            </div>
          </motion.div>

          {/* Column 2 — Categories */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((l) => (
                <FooterLink key={l.label} to={l.to}>{l.label}</FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Company */}
          <motion.div variants={columnVariants}>
            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <FooterLink key={l.label} to={l.to}>{l.label}</FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact & offices */}
          <motion.div variants={columnVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
              Reach Us
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 mt-0.5"><PinIcon /></span>
                <span>Head Office — Muzaffarpur, Bihar</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 mt-0.5"><PhoneIcon /></span>
                <a href="tel:+910000000000" className="hover:text-cyan-600 transition-colors">
                  +91 00000 00000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 mt-0.5"><MailIcon /></span>
                <a href="mailto:info@vigyanjagat.com" className="hover:text-cyan-600 transition-colors">
                  info@vigyanjagat.com
                </a>
              </li>
            </ul>
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Branch Offices
              </p>
              <div className="flex flex-wrap gap-1.5">
                {offices.map((city) => (
                  <span
                    key={city}
                    className="text-xs text-zinc-500 bg-zinc-100 hover:bg-cyan-50 hover:text-cyan-600 transition-colors rounded-full px-2.5 py-1 cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}