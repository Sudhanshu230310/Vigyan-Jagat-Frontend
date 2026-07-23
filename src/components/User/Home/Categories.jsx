import { motion } from 'framer-motion'
import LEImage from "../../../images/laboratory-equipments-and-instruments.png";
import GWImage from "../../../images/glassware.png"
import CRImage from "../../../images/chemical-reagents.png"
import LCImage from "../../../images/laboratory-consumables.png"
import RightArrow from '../../../icons/RightArrow';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: "Laboratory Equipments and Instruments",
    image: LEImage,
    description: "Balances, centrifuges, microscopes, analytical instruments and more for every lab.",
  },
  {
    name: "Laboratory Glassware & Plasticware",
    image: GWImage,
    description: "Beakers, flasks, volumetric ware and plasticware for measurement and storage.",
  },
  {
    name: "Chemical & Reagent",
    image: CRImage,
    description: "High-purity acids, solvents, buffers and analytical reagents for research and QC.",
  },
  {
    name: "Laboratory Consumables",
    image: LCImage,
    description: "Pipette tips, tubes, filters, culture plates and everyday lab consumables.",
  },
]

// ---- Motion variants (same pattern as Subcategory) ----

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -6,

  },
}

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
}

const textVariants = {
  rest: { opacity: 0, width: 0, marginRight: 0 },
  hover: { opacity: 1, width: "auto", marginRight: 6 },
}

const arrowVariants = {
  rest: { x: 0, color: "white" },
  hover: { x: 4, color: "white" },
}

// ---- Deterministic particle positions (computed once, not per render) ----

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 23) % 100}%`,
  size: 3 + (i % 3) * 2,               // 3px, 5px, 7px
  duration: 6 + (i % 5) * 1.6,          // 6s – 12.4s
  delay: (i % 7) * 0.9,
  drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 5),
}))

// ---- Ambient background: molecule/hex network + dot grid + rings + corner wave ----

function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-t-3xl md:rounded-t-4xl pointer-events-none" aria-hidden="true">
      {/* Soft cyan wash */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #eafbfc 0%, #f5fdfd 35%, #ffffff 55%)",
        }}
      />

      {/* Molecule / hexagon network, top-left */}
      <svg className="absolute -top-6 -left-10 w-80 h-72 opacity-40" viewBox="0 0 320 260">
        <g stroke="#5eead4" strokeWidth="1.4" fill="none">
          <polygon points="60,20 100,42 100,86 60,108 20,86 20,42" />
          <polygon points="140,60 180,82 180,126 140,148 100,126 100,82" />
          <polygon points="40,120 80,142 80,186 40,208 0,186 0,142" />
          <line x1="100" y1="64" x2="140" y2="82" />
          <line x1="60" y1="108" x2="40" y2="120" />
        </g>
        <g fill="#2dd4bf">
          <circle cx="60" cy="20" r="3" />
          <circle cx="100" cy="42" r="2.5" />
          <circle cx="140" cy="60" r="3" />
          <circle cx="80" cy="142" r="2.5" />
          <circle cx="40" cy="208" r="3" />
        </g>
      </svg>

      {/* Dot grid, top-right */}
      <svg className="absolute top-8 right-10 w-36 h-28 opacity-60" viewBox="0 0 120 90">
        <defs>
          <pattern id="dotPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#22d3ee" />
          </pattern>
        </defs>
        <rect width="120" height="90" fill="url(#dotPattern)" />
      </svg>

      {/* Soft rings, top-right */}
      <motion.div
        className="absolute -top-28 right-0 w-96 h-96 rounded-full border border-cyan-200/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(94,234,212,0.35), transparent 70%)" }}
      />

      {/* Floating blurred blobs, kept subtle */}
      <motion.div
        className="absolute -top-20 -left-24 w-[26rem] h-[26rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.12), transparent 70%)" }}
        animate={{ x: [0, 50, -20, 0], y: [0, 30, 60, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-400/25"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], x: [0, p.drift, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Bottom-right corner wave, tucked into the corner like the reference */}
      <svg
        className="absolute bottom-0 right-0 w-1/2 h-40"
        viewBox="0 0 720 220"
        preserveAspectRatio="none"
      >
        <path
          d="M720,220 L720,60 C600,20 520,120 400,90 C300,66 260,140 180,150 C110,158 60,190 0,220 Z"
          fill="#5eead4"
          opacity="0.45"
        />
      </svg>
    </div>
  )
}

function CategoryCard({ app, onClick, index }) {
  return (
    <motion.div variants={cardEntranceVariants} className="h-full w-full ">
      {/* Gently floating card + breathing shadow (idle loop lives on this
          wrapper so it never fights the hover variants on the inner card) */}
      <motion.div
        className="h-full w-full rounded-2xl border border-gray-300 "
        animate={{
          boxShadow: [
            "0 4px 6px -1px rgba(13,148,136,0.08), 0 2px 4px -1px rgba(13,148,136,0.05)",
            "0 16px 28px -8px rgba(13,148,136,0.22), 0 6px 12px -4px rgba(13,148,136,0.08)",
            "0 4px 6px -1px rgba(13,148,136,0.08), 0 2px 4px -1px rgba(13,148,136,0.05)",
          ],
        }}
        transition={{
          duration: 5 + index * 0.7,      // slightly different rhythm per card
          delay: index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          animate="rest"
          variants={cardHoverVariants}
          onClick={onClick}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col h-full w-full bg-white hover:bg-cyan-100/50  rounded-2xl overflow-visible cursor-pointer shadow-sm"
        >
          {/* Image container — fixed aspect ratio so cards stay even at every breakpoint */}
          <div className="overflow-hidden w-full relative aspect-[4/3] rounded-t-2xl">
            {/* Slowly moving image (Ken Burns) — idle loop on a wrapper,
                hover zoom stays on the img itself */}
            <motion.div
              className="w-full h-full"

              transition={{
                duration: 14 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.img
                variants={imageVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                src={app.image}
                alt={app.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>

          {/* Text & CTA */}
          <div className="flex flex-col justify-between items-center text-center px-5 sm:px-6 pt-11 pb-6 w-full flex-grow gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 capitalize leading-snug">
                {app.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                {app.description}
              </p>
            </div>

            <div className="flex items-center justify-center font-bold text-sm sm:text-base text-white bg-cyan-600 px-4 py-2 rounded-lg">
              <span className="mr-1">View Products</span>
              <motion.span
                variants={textVariants}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="inline-block overflow-hidden whitespace-nowrap"
              />
              {/* Animated arrow — idle nudge loop on wrapper, hover shift on inner */}
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.8,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  variants={arrowVariants}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <RightArrow />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] mx-auto  md:rounded-t-4xl relative pb-20 bg-white flex items-center justify-center overflow-hidden">

      <section className="w-[95%] pt-2 sm:pt-10 md:pt-30 px-3 md:px-8 lg:px-10 pb-10 xl:pb-0 text-black @container relative z-10">
        <div className="flex flex-col items-center justify-center pb-10">
          {/* Eyebrow pill */}


          {/* Floating heading — entrance once, then a gentle idle bob */}
          <motion.div
            className="pb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="text-3xl lg:text-5xl font-extrabold font-serif text-center"
            >
              <span className="text-cyan-700">Explore </span>
              <span className="text-black">Categories</span>
            </motion.h2>
            <p className="text-center text-slate-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Discover a wide range of laboratory products for research, analysis and everyday experiments.
            </p>
          </motion.div>
        </div>

        <motion.div

          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4"
        >
          {categories.map((app, index) => (
            <CategoryCard
              key={app.name}
              app={app}
              index={index}
              onClick={() => navigate(`/subcategory/${app.name}`)}
            />
          ))}
        </motion.div>
      </section>
    </div>
  )
}