import { motion } from "framer-motion";

export default function Contact() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] overflow-hidden bg-white text-black flex items-center justify-center"
        >
            {/* Animated Background */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 4, -4, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            />

            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    rotate: [0, -5, 5, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 80,
                    }}
                    className="text-4xl md:text-6xl font-sans"
                >
                    Get in Touch
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.25,
                        duration: 0.7,
                    }}
                    className="mt-6 max-w-2xl text-gray-700 text-lg md:text-xl"
                >
                    Our team is ready to assist you with product inquiries, quotations,
                    and technical support. Let's build something together.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(59,130,246,0.45)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-10 rounded-full text-white bg-blue-600 px-8 py-4 font-semibold transition-colors hover:bg-blue-500"
                >
                    Contact Us
                </motion.button>
            </div>
        </motion.section>
    );
}