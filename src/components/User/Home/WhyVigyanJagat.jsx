import { motion } from 'framer-motion'

const features = [
  {
    number: '01',
    title: 'Quality & Compliance',
    description:
      'Source products backed by quality certifications, safety documentation, and regulatory compliance.',
  },
  {
    number: '02',
    title: 'Verified Chemical Suppliers',
    description:
      'Partner with trusted manufacturers, distributors, and exporters who meet industry standards.',
  },
  {
    number: '03',
    title: 'Competitive Bulk Pricing',
    description:
      'Compare quotes from multiple suppliers and secure the best prices for your business.',
  },
  {
    number: '04',
    title: 'Fast & Secure Procurement',
    description:
      'Simplify sourcing with quick inquiries, efficient communication, and secure order management.',
  },
  {
    number: '05',
    title: 'Global Sourcing Network',
    description:
      'Access a worldwide network of verified suppliers across every major chemical category.',
  },
  {
    number: '06',
    title: 'Dedicated Support',
    description:
      'Get expert guidance from our team for every step of your procurement journey.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function WhyVigyanJagat() {
  return (
    <section className="w-full mt-20 bg-[#0f1219] px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-[1600px] mx-auto">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold tracking-[0.2em] text-teal-400 uppercase mb-5"
        >
          Why Vigyan Jagat
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl"
        >
          Why Vigyan Jagat?
        </motion.h2>

        {/* Feature grid with dividers (3 cols x 2 rows on desktop, like the reference) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 divide-y divide-white/10 lg:divide-y-0"
        >
          {features.map((f, i) => {
            const col = i % 3
            const row = Math.floor(i / 3)
            return (
              <motion.div
                key={f.number}
                variants={itemVariants}
                className={`
                  py-8 lg:py-10 px-0 lg:px-10
                  ${col !== 0 ? 'lg:border-l lg:border-white/10' : ''}
                  ${row !== 0 ? 'lg:border-t lg:border-white/10 lg:pt-10' : ''}
                `}
              >
                <p className="text-2xl font-bold text-indigo-400 mb-4">{f.number}</p>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyVigyanJagat