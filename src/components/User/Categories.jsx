import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ImageIcon,
  Brush,
  Video,
  Star
} from 'lucide-react'

const initialApps = [
  {
    name: "PixelMaster",
    icon: <ImageIcon className="text-violet-500 w-6 h-6" />,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  },
  {
    name: "VectorPro",
    icon: <Brush className="text-orange-500 w-6 h-6" />,
    description: "Professional vector graphics creation",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    starred: true,
  },
  {
    name: "VideoStudio",
    icon: <Video className="text-pink-500 w-6 h-6" />,
    description: "Cinematic video editing and production",
    category: "Video",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  },
  {
    name: "VideoStudio",
    icon: <Video className="text-pink-500 w-6 h-6" />,
    description: "Cinematic video editing and production",
    category: "Video",
    recent: true,
    new: false,
    progress: 100,
    starred: false,
  }
]

export function Categories() {
  const [apps, setApps] = useState(initialApps)

  const toggleStar = (name) => {
    setApps(prevApps =>
      prevApps.map(app =>
        app.name === name ? { ...app, starred: !app.starred } : app
      )
    )
  }

  return (
    <div className="min-h-screen flex items-center  justify-center">
      <section className="space-y-4 w-full px-6 pb-20 md:px-8 py-10 bg-black text-white">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl pb-10 font-semibold font-sans ">Explore Categorie </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps.map((app) => (
            <motion.div
              key={app.name}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="flex"
            >
              {/* Custom Card component container with premium border hover effects */}
              <div className="flex flex-col w-full overflow-hidden rounded-3xl border-2 border-[oklch(0.92_0_0)] bg-white p-5 hover:border-[oklch(0.45_0.18_270_/_0.5)] hover:shadow-lg transition-all duration-300">

                {/* CardHeader */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-40 w-12 items-center justify-center rounded-2xl bg-[oklch(0.96_0_0)]">
                    {app.icon}
                  </div>
                  <button
                    onClick={() => toggleStar(app.name)}
                    className={`flex h-8 w-8 items-center justify-center rounded-2xl transition-colors duration-200 ${app.starred
                      ? 'text-amber-500 hover:bg-amber-50'
                      : 'text-[oklch(0.60_0_0)] hover:bg-[oklch(0.96_0_0)]'
                      }`}
                  >
                    <Star
                      className="h-4 w-4"
                      fill={app.starred ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                {/* CardContent */}
                <div className="flex-1 mb-5">
                  <h3 className="text-lg font-semibold text-[oklch(0.12_0_0)] mb-1">{app.name}</h3>
                  <p className="text-sm text-[oklch(0.50_0_0)] leading-relaxed">{app.description}</p>
                </div>

                {/* CardFooter */}
                <div>
                  <button
                    className="w-full rounded-2xl py-2.5 text-sm font-semibold text-[oklch(0.20_0_0)] bg-[oklch(0.96_0_0)] hover:bg-[oklch(0.92_0_0)] active:bg-[oklch(0.88_0_0)] transition-colors duration-200"
                  >
                    Open
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
