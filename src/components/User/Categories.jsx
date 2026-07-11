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
    name: "Glassware & Plasticware",
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
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  },
  hover: {
    scale: 1.03,
    y: -6,
    boxShadow: `
      0 15px 35px rgba(59, 130, 246, 0.25),
      0 25px 60px rgba(173, 216, 230, 0.70),
      0 0 50px rgba(180, 255, 255, 0.50)
    `,
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

function CategoryCard({ app, onClick }) {
  return (
    <motion.div variants={cardEntranceVariants} className="h-full w-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        animate="rest"
        variants={cardHoverVariants}
        onClick={onClick}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer"
      >
        {/* Image container — fixed aspect ratio so cards stay even at every breakpoint */}
        <div className="overflow-hidden w-full relative aspect-[4/3]">
          <motion.img
            variants={imageVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src={app.image}
            alt={app.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
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
            <motion.div
              variants={arrowVariants}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <RightArrow />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] rounded-t-3xl md:rounded-t-4xl relative -mt-16 sm:-mt-24 md:-mt-30 bg-white flex items-center justify-center">
      <section className="w-full pt-16 sm:pt-24 md:pt-30 px-6 md:px-8 pb-16 md:pb-20 text-black @container">
        <div className="flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl lg:text-4xl pb-8 md:pb-10 font-sans font-semibold text-zinc-900 text-center"
          >
            Explore Categories
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4"
        >
          {categories.map((app) => (
            <CategoryCard
              key={app.name}
              app={app}
              onClick={() => navigate(`/subcategory/${app.name}`)}
            />
          ))}
        </motion.div>
      </section>
    </div>
  )
}