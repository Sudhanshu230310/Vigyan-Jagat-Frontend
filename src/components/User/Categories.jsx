import { useState } from 'react'
import { motion } from 'framer-motion'
import LEImage from "../../images/laboratory-equipments-and-instruments.png";
import RightArrow from '../../icons/RightArrow';
import { useNavigate } from 'react-router-dom';

const initialApps = [
  {
    name: "Laboratory Equipments and Instruments",
    image: LEImage,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  },
  {
    name: "Glassware & Plasticware",
    image: LEImage,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  },
  {
    name: "laboratory equipments and instruments",
    image: LEImage,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  },
  {
    name: "laboratory equipments and instruments",
    image: LEImage,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  },
]

const cardVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
  },
  hover: {
    scale: 1.03,
    y: -6,
    boxShadow: `
      0 15px 35px rgba(59, 130, 246, 0.25),
      0 25px 60px rgba(173, 216, 230, 0.70),
      0 0 50px rgba(180, 255, 255, 0.50)
    `
  }
}

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.04 }
}

const textVariants = {
  initial: {
    opacity: 0,
    width: 0,
    marginRight: 0
  },
  hover: {
    opacity: 1,
    width: "auto",
    marginRight: 6
  }
}

const arrowVariants = {
  initial: { x: 0, color: "black" }, // text-blue-600
  hover: { x: 4, color: "black" }    // text-blue-700
}

export function Categories() {
  const [apps, setApps] = useState(initialApps)
  const navigate = useNavigate();
  const toggleStar = (name) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.name === name ? { ...app, starred: !app.starred } : app
      )
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="space-y-4 w-full px-6 pb-20 md:px-8 py-10 text-black">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl pb-10 font-semibold font-sans">Explore Categories</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps.map((app) => (
            <motion.div
              key={app.name}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              variants={cardVariants}
              onClick={() => {
                navigate(`/subcategory/${app.name}`);
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden border border-zinc-200"
            >
              {/* Image container */}
              <div className="overflow-hidden w-full relative">
                <motion.img
                  variants={imageVariants}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={app.image}
                  alt={app.name}
                  className="w-full object-cover rounded-t-2xl pb-4"
                />
              </div>

              {/* Text & Button content */}
              <div className="flex flex-col justify-between items-center text-center p-6 pt-0 w-full flex-grow">
                <div className="mb-4">
                  <div className="text-lg font-bold text-[oklch(0.12_0_0)] mb-2 capitalize">{app.name}</div>
                  <div className="text-sm text-zinc-500 leading-relaxed">{app.description}</div>
                </div>

                <div className="flex items-center justify-center font-bold cursor-pointer">
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
          ))}
        </div>
      </section>
    </div>
  )
}
