import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Contact() {
    return (
        <section className="w-full min-h-[60vh] flex flex-col justify-center bg-[#faf9f7] px-6 md:px-12 lg:px-20 py-10">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 to-cyan-800 px-8 md:px-14 py-10 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
                {/* Decorative glow circle, bleeding off the right edge like the reference */}
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/10 pointer-events-none" />

                <div className="relative z-10 max-w-xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                        Have a question for Vigyan Jagat?
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-indigo-100/90 leading-relaxed">
                        Reach out for product enquiries, bulk quotes, or partnership support —
                        our team typically responds within 24 hours.
                    </p>
                </div>

                <Link to="/contact" className="relative z-10 shrink-0">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 bg-white text-zinc-900 font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-indigo-900/20 text-sm"
                    >
                        Contact Us
                        <span className="text-base leading-none">&rarr;</span>
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    )
}

export default Contact