import { motion } from 'framer-motion'
import LEImage from "../../images/laboratory-equipments-and-instruments.png";
import GWImage from "../../images/glassware.png"
import CRImage from "../../images/chemical-reagents.png"
import LCImage from "../../images/laboratory-consumables.png"
import RightArrow from '../../icons/RightArrow';
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
  rest: { x: 0, color: "black" },
  hover: { x: 4, color: "black" },
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

// ---- Ambient background: gradient + blobs + rings + particles ----

function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-t-3xl md:rounded-t-4xl pointer-events-none" aria-hidden="true">
      {/* 🌈 Subtle dark animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(15,23,42,0) 0%, rgba(30,58,138,0.18) 40%, rgba(8,47,73,0.14) 70%, rgba(15,23,42,0) 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* 🔵 Floating blurred blobs */}
      <motion.div
        className="absolute -top-20 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)" }}
        animate={{ x: [0, 50, -20, 0], y: [0, 30, 60, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(103,232,249,0.20), transparent 70%)" }}
        animate={{ x: [0, -60, 20, 0], y: [0, -40, 30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-6rem] left-1/3 w-[24rem] h-[24rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(165,180,252,0.18), transparent 70%)" }}
        animate={{ x: [0, 40, -40, 0], y: [0, -50, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🪐 Rotating rings */}
      <motion.div
        className="absolute -top-32 right-[10%] w-[22rem] h-[22rem] rounded-full border border-blue-200/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-blue-300/60" />
      </motion.div>
      <motion.div
        className="absolute bottom-[-8rem] left-[6%] w-[26rem] h-[26rem] rounded-full border border-cyan-200/40 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-cyan-300/60" />
      </motion.div>

      {/* ✨ Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-blue-400/25"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], x: [0, p.drift, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function CategoryCard({ app, onClick, index }) {
  return (
    <motion.div variants={cardEntranceVariants} className="h-full w-full">
      {/* 📦 Gently floating card + 💡 breathing shadow (idle loop lives on this
          wrapper so it never fights the hover variants on the inner card) */}
      <motion.div
        className="h-full w-full rounded-2xl"
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
            "0 12px 24px -6px rgba(59,130,246,0.12), 0 6px 12px -4px rgba(0,0,0,0.04)",
            "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
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
          className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden  cursor-pointer"
        >
          {/* Image container — fixed aspect ratio so cards stay even at every breakpoint */}
          <div className="overflow-hidden w-full relative aspect-[4/3]">
            {/* 🖼️ Slowly moving image (Ken Burns) — idle loop on a wrapper,
                hover zoom stays on the img itself */}
            <motion.div
              className="w-full h-full"
              animate={{ scale: [1, 1.07, 1], x: [0, 6, 0] }}
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
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </motion.div>
          </div>

          {/* Text & CTA */}
          <div className="flex flex-col justify-between items-center text-center p-5 sm:p-6 w-full flex-grow gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[oklch(0.12_0_0)] mb-2 capitalize leading-snug">
                {app.name}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                {app.description}
              </p>
            </div>

            <div className="flex items-center justify-center font-bold text-sm sm:text-base">
              <motion.span
                variants={textVariants}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="inline-block overflow-hidden whitespace-nowrap text-black"
              >
                Open
              </motion.span>
              {/* ➜ Animated arrow — idle nudge loop on wrapper, hover shift on inner */}
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
    <div className="min-h-[90vh] rounded-t-3xl md:rounded-t-4xl -my-4 relative pb-20 bg-zinc-900 flex items-center justify-center">
      {/* Ambient animated backdrop */}
      <AmbientBackground />

      <section className="w-full pt-16 sm:pt-24 md:pt-30 px-6 md:px-8 pb-10 xl:pb-0 text-white @container relative z-10">
        <div className="flex flex-col items-center justify-center pb-10">
          {/* 📝 Floating heading — entrance once, then a gentle idle bob */}
          <motion.div
            className="pb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="text-3xl lg:text-4xl font-sans text-white text-center"
            >
              Explore Categories
            </motion.h2>
          </motion.div>

          {/* 📏 Animated underline — draws in on view, then shimmers */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-24 rounded-full mt-3 mb-8 md:mb-10 origin-center overflow-hidden"
            style={{ background: "linear-gradient(90deg, #93c5fd, #22d3ee, #93c5fd)" }}
          >
            <motion.div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
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