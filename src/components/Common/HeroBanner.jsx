import { motion } from 'framer-motion'

export function HeroBanner() {
  return (
    <section className="min-h-[80vh] ">
      <div className="w-full h-10 mb-3 md:flex md:items-center hidden md:gap-20 md:visible px-4 pl-10 pb-5">
        <div>Home</div>
        <div>Categories</div>
        <div>About</div>
        <div>Contact</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden bg-gradient-to-br from-black to-blue-400 rounded-3xl p-8 h-80 text-white"
      // style={{
      //   background: 'linear-gradient(to right, rgb(124,58,237), rgb(79,70,229), rgb(37,99,235))',
      // }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Text content */}
          <div className="space-y-4">
            {/* Badge */}
            <span
              className="inline-block rounded-xl px-3 py-1 text-sm font-medium text-white"
              style={{ background: 'rgba(255,255,255,0.20)' }}
            >
              Premium
            </span>

            <h2 className="text-3xl font-bold">Welcome to Vigyan Jagat</h2>

            <p className="text-white/80" style={{ maxWidth: '600px' }}>
              Your one-stop platform to source , compare and grow your business.
            </p>

            <div className="flex flex-wrap gap-3">
              {/* Primary button */}
              <button
                className="rounded-2xl px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{
                  background: 'white',
                  color: 'rgb(67,56,202)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.90)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
              >
                Explore Plans
              </button>

              {/* Outline button */}
              <button
                className="rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{
                  background: 'transparent',
                  border: '1px solid white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Take a Tour
              </button>
            </div>
          </div>

          {/* Right: Rotating concentric circles */}
          <div className="hidden lg:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="relative"
              style={{ width: 160, height: 160 }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}
              />
              <div className="absolute rounded-full" style={{ inset: 16, background: 'rgba(255,255,255,0.20)' }} />
              <div className="absolute rounded-full" style={{ inset: 32, background: 'rgba(255,255,255,0.30)' }} />
              <div className="absolute rounded-full" style={{ inset: 48, background: 'rgba(255,255,255,0.40)' }} />
              <div className="absolute rounded-full" style={{ inset: 64, background: 'rgba(255,255,255,0.50)' }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
