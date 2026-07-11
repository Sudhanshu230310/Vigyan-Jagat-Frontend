import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

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

const textVariants = {
    initial: { opacity: 0, width: 0, marginRight: 0 },
    hover: { opacity: 1, width: "auto", marginRight: 6 }
}

const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 4 }
}

function ProductCard({ product }) {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            variants={cardVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer"
        >
            {/* Colored top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-cyan-300" />

            {/* Card Body */}
            <div className="flex flex-col justify-between p-5 flex-grow gap-3">
                {/* Top: name + category badge */}
                <div>
                    {product.subcategory && (
                        <span className="inline-block text-xs font-sans text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5 mb-2 capitalize">
                            {product.subcategory}
                        </span>
                    )}
                    <h3 className="text-base font-sans text-zinc-900 capitalize leading-snug mb-1">
                        {product.name || product.product_name || "Unnamed Product"}
                    </h3>
                    {product.description && (
                        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Middle: key details */}
                <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
                    {product.cas_no && (
                        <span className="bg-zinc-100 rounded-lg px-2.5 py-1 font-mono">
                            CAS: {product.cas_no}
                        </span>
                    )}
                    {product.purity && (
                        <span className="bg-zinc-100 rounded-lg px-2.5 py-1">
                            Purity: {product.purity}
                        </span>
                    )}
                    {product.grade && (
                        <span className="bg-zinc-100 rounded-lg px-2.5 py-1">
                            Grade: {product.grade}
                        </span>
                    )}
                    {product.pack_size && (
                        <span className="bg-zinc-100 rounded-lg px-2.5 py-1">
                            Pack: {product.pack_size}
                        </span>
                    )}
                </div>

                {/* Bottom: View Details CTA */}
                <div className="flex items-center font-semibold text-sm text-zinc-800 mt-1">
                    <motion.span
                        variants={textVariants}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="inline-block overflow-hidden whitespace-nowrap"
                    >
                        View Details
                    </motion.span>
                    <motion.span
                        variants={arrowVariants}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="ml-0.5"
                    >
                        →
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}

export default function Products() {
    const { SubcategoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`https://vigyan-jagat-backend-1.onrender.com/${SubcategoryName}`)
            .then(res => {
                const items = res.data.items || [];
                const sorted = [...items].sort((a, b) =>
                    (a.name || a.product_name || "").localeCompare(
                        b.name || b.product_name || "",
                        undefined,
                        { sensitivity: "base" }
                    )
                );
                setProducts(sorted);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load products.");
            })
            .finally(() => setLoading(false));
    }, [SubcategoryName]);

    return (
        <div className="w-full min-h-screen pt-14">
            <section className="w-full px-6 md:px-8 py-10 text-black space-y-8 pb-20">

                {/* Header */}
                <h2 className="lg:text-4xl text-3xl font-sans  capitalize">
                    {SubcategoryName}
                </h2>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-20 text-red-500 font-medium">{error}</div>
                )}

                {/* Empty state */}
                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-20 text-zinc-400 text-lg">
                        No products found for <span className="font-semibold text-zinc-600">"{SubcategoryName}"</span>.
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product, idx) => (
                            <ProductCard key={product._id || idx} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
