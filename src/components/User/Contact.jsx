import { motion } from "framer-motion";

const floating = {
    animate: {
        y: [0, -20, 0, 20, 0],
        x: [0, 15, 0, -15, 0],
    },
    transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

export default function Contact() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[30vh] overflow-hidden bg-white flex items-center justify-center"
        >
            {/* Floating Blob 1 */}
            <motion.div
                {...floating}
                className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
            />

            {/* Floating Blob 2 */}
            <motion.div
                animate={{
                    y: [0, 30, 0, -30, 0],
                    x: [0, -20, 0, 20, 0],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl"
            />

            {/* Rotating Circle */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute h-[700px] w-[700px] rounded-full border border-blue-200/40"
            />

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
                <motion.span
                    key={i}
                    animate={{
                        y: [0, -25, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                    className="absolute h-2 w-2 rounded-full bg-blue-500/50"
                    style={{
                        left: `${8 + i * 8}%`,
                        top: `${15 + (i % 5) * 15}%`,
                    }}
                />
            ))}

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                {/* Floating Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={{
                        y: [0, -6, 0],
                    }}
                    transition={{
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                        opacity: {
                            duration: 0.8,
                        },
                    }}
                    className="text-4xl md:text-6xl font-semibold"
                >
                    Get in Touch
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 max-w-2xl text-gray-600 text-lg"
                >
                    Our team is ready to assist you with product inquiries,
                    quotations, and technical support. Let's build something
                    together.
                </motion.p>

                {/* Breathing Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{
                        scale: [1, 1.04, 1],
                        boxShadow: [
                            "0 0 0px rgba(37,99,235,.2)",
                            "0 0 35px rgba(37,99,235,.45)",
                            "0 0 0px rgba(37,99,235,.2)",
                        ],
                    }}
                    transition={{
                        scale: {
                            duration: 2.5,
                            repeat: Infinity,
                        },
                        boxShadow: {
                            duration: 2.5,
                            repeat: Infinity,
                        },
                    }}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 45px rgba(37,99,235,.6)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-10 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white"
                >
                    Contact Us
                </motion.button>
            </div>
        </motion.section>
    );
}