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

// Column color themes, cycling like the three reference cards (blue / green / orange)
const themes = [
  {
    tint: 'bg-indigo-50/70',
    eyebrow: 'text-indigo-600',
    check: 'text-indigo-500',
    link: 'text-indigo-600',
  },
  {
    tint: 'bg-emerald-50/70',
    eyebrow: 'text-emerald-600',
    check: 'text-emerald-500',
    link: 'text-emerald-600',
  },
  {
    tint: 'bg-orange-50/70',
    eyebrow: 'text-orange-600',
    check: 'text-orange-500',
    link: 'text-orange-600',
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

// Group the 6 features into 3 columns of 2, so each column reads as one
// themed card with a checklist, matching the reference layout.
function groupIntoColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => [])
  items.forEach((item, i) => {
    columns[i % columnCount].push(item)
  })
  return columns
}

export function WhyVigyanJagat() {
  const columns = groupIntoColumns(features, 3)

  return (
    <section className="w-full  bg-cyan-800 px-6 md:px-12 lg:px-20 py-8 md:py-20 mt-20">
      <div className="w-full h-full mx-auto">

        <div className="flex flex-col items-center text-center mb-14 md:mb-16">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Why choose Vigyan Jagat?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-slate-500 text-base md:text-lg mt-5 max-w-2xl"
          >
            Trusted lab sourcing since 1962 — quality, compliance, and support
            in every order.
          </motion.p>
        </div>

        {/* Themed columns, each holding a checklist of features (like the
            reference's three role-based cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {columns.map((columnItems, colIndex) => {
            const theme = themes[colIndex % themes.length]
            const headline = columnItems[0]
            return (
              <motion.div
                key={colIndex}
                variants={itemVariants}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white flex flex-col"
              >
                {/* Colored header zone */}
                <div className={`${theme.tint} px-6 py-8`}>
                  <p className={`text-xs font-bold tracking-[0.15em] uppercase mb-3 ${theme.eyebrow}`}>
                    Feature {headline.number}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {headline.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {headline.description}
                  </p>
                </div>

                {/* Checklist body */}
                <div className="px-6 py-6 flex-grow border-t border-slate-100">
                  <ul className="space-y-4">
                    {columnItems.map((f) => (
                      <li key={f.number} className="flex gap-3">
                        <span className={`mt-0.5 font-bold ${theme.check}`}>✓</span>
                        <span className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-800">{f.title}: </span>
                          {f.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA footer */}
                <div className="px-6 py-5 border-t border-slate-100">
                  <a
                    href="#"
                    className={`text-sm font-bold ${theme.link} hover:underline underline-offset-2`}
                  >
                    Learn more →
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyVigyanJagat