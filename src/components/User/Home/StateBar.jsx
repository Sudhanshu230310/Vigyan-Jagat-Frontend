import { motion } from 'framer-motion'

const STATS = [
    { value: '1962', label: 'Established since' },
    { value: '5', label: 'Offices across India' },
    { value: '19+', label: 'Brands supplied' },
    { value: 'GeM', label: 'Registered supplier' },
]

export default function StatsBar() {
    return (
        <div className="w-full px-6  md:px-12 lg:px-20 py-10 md:py-14">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-7xl bg-white mx-auto rounded-2xl border border-zinc-100 shadow-sm shadow-zinc-900/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100"
            >
                {STATS.map((stat, i) => (
                    <div key={stat.label} className={`px-6 py-6 md:py-8  ${i >= 2 ? 'border-t md:border-t-0 md:border-zinc-100 ' : ''}`}>
                        <p className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">{stat.value}</p>
                        <p className="text-xs md:text-sm text-zinc-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}