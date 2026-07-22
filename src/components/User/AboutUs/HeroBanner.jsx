import { motion } from 'framer-motion'
import OurStoryImg from '../../../images/main2.png'

export default function HeroBanner() {
    return (
        <section className="w-full bg-[#faf9f7] px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* ---- Left column — text ---- */}
                <div className="max-w-xl">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4 }}
                        className="text-xs font-bold tracking-[0.15em] text-teal-600 uppercase mb-4"
                    >
                        Our Story
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.15]"
                    >
                        Six decades of getting science equipment to where it's needed.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-6 text-base md:text-lg text-zinc-500 leading-relaxed"
                    >
                        Vigyan Jagat began in 1962 as a single supplier out of Muzaffarpur,
                        Bihar, serving local labs and schools. Today we run a distributor
                        network out of five offices — Muzaffarpur, Delhi, Kanpur, Patna,
                        Durgapur and Dehradun — moving laboratory equipment, chemicals,
                        glassware and consumables from verified manufacturers to the
                        institutions and resellers who put them to work.
                    </motion.p>
                </div>

                {/* ---- Right column — actual photo ---- */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-[380px] md:h-[460px] rounded-3xl overflow-hidden border border-zinc-200/60 shadow-sm shadow-zinc-900/5"
                >
                    <img
                        src={OurStoryImg}
                        alt="Vigyan Jagat warehouse and team"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>
        </section>
    )
}