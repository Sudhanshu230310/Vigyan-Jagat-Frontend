import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const cardVariants = {
    initial: {
        y: 0,
        boxShadow:
            "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.04)"
    },
    hover: {
        y: -6,
        boxShadow:
            "0 18px 40px rgba(37, 99, 235, 0.12), 0 6px 18px rgba(8, 145, 178, 0.10)"
    }
};

const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5 }
};

function ProductCard({ product, index, onClick }) {
    const name = product.name || product.product_name || "Unnamed Product";
    const material = product.specifications?.Material;

    return (
        <motion.article
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.985 }}
            variants={cardVariants}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group relative flex flex-col h-full min-h-[15rem] bg-white rounded-2xl border border-zinc-200/80 overflow-hidden cursor-pointer"
        >
            {/* Thin accent rail */}
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300" />

            <div className="flex flex-col flex-grow gap-4 p-6 pt-7">
                {/* Header: index tick + name */}
                <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[11px] tracking-wider text-cyan-600/90">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[17px] font-medium text-zinc-900 capitalize leading-snug">
                        {name}
                    </h3>
                </div>

                {/* Description */}
                {product.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {product.description}
                    </p>
                )}

                {/* Detail chips (adapt to whichever dataset feeds this) */}
                {(product.brand ||
                    material ||
                    product.cas_no ||
                    product.purity ||
                    product.grade ||
                    product.pack_size) && (
                        <div className="flex flex-wrap gap-2 text-xs text-zinc-600">
                            {product.brand && (
                                <span className="bg-zinc-50 border border-zinc-200/70 rounded-lg px-2.5 py-1">
                                    {product.brand}
                                </span>
                            )}
                            {material && (
                                <span className="bg-zinc-50 border border-zinc-200/70 rounded-lg px-2.5 py-1">
                                    {material}
                                </span>
                            )}
                            {product.cas_no && (
                                <span className="bg-zinc-50 border border-zinc-200/70 rounded-lg px-2.5 py-1 font-mono">
                                    CAS {product.cas_no}
                                </span>
                            )}
                            {product.purity && (
                                <span className="bg-zinc-50 border border-zinc-200/70 rounded-lg px-2.5 py-1">
                                    Purity {product.purity}
                                </span>
                            )}
                            {product.grade && (
                                <span className="bg-zinc-50 border border-zinc-200/70 rounded-lg px-2.5 py-1">
                                    {product.grade}
                                </span>
                            )}
                            {product.pack_size && (
                                <span className="bg-zinc-50 border border-zinc-200/70 rounded-lg px-2.5 py-1">
                                    Pack {product.pack_size}
                                </span>
                            )}
                        </div>
                    )}

                {/* CTA pinned to the bottom */}
                <div className="mt-auto pt-2 flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    View details
                    <motion.span variants={arrowVariants} transition={{ duration: 0.25 }}>
                        →
                    </motion.span>
                </div>
            </div>
        </motion.article>
    );
}

export default function Products() {
    const { SubcategoryName } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const BackendURL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios
            .get(`${BackendURL}/${encodeURIComponent(SubcategoryName)}`)
            .then((res) => {
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
            .catch((err) => {
                console.error(err);
                setError("We couldn't load these products. Please try again.");
            })
            .finally(() => setLoading(false));
    }, [SubcategoryName, BackendURL]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => {
            const name = (p.name || p.product_name || "").toLowerCase();
            const desc = (p.description || "").toLowerCase();
            return name.includes(q) || desc.includes(q);
        });
    }, [products, query]);

    const handleProductClick = (product) => {
        const productName = product.name || product.product_name;
        if (!productName) return;
        navigate(
            `/product/${encodeURIComponent(SubcategoryName)}/${encodeURIComponent(
                productName
            )}`
        );
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-14">
            <div className="mx-auto w-screen px-6 md:px-10 pb-24">
                {/* Back link */}
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className="mt-8 flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-cyan-700 transition-colors"
                >
                    <motion.span
                        whileHover={{ x: -3 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                    >
                        ←
                    </motion.span>
                    All subcategories
                </motion.button>

                {/* Header block */}
                <header className="mt-8 border-b border-zinc-200/80 pb-8">
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-600">
                        Catalog
                    </p>
                    <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight text-zinc-900 capitalize max-w-3xl leading-[1.1]">
                            {SubcategoryName}
                        </h1>

                        {/* Search */}
                        <div className="relative w-full md:w-72 shrink-0">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search this subcategory"
                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pr-9 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                &#8981;
                            </span>
                        </div>
                    </div>

                    {!loading && !error && (
                        <p className="mt-5 text-sm text-zinc-500">
                            <span className="font-medium text-zinc-700">
                                {filtered.length}
                            </span>{" "}
                            {filtered.length === 1 ? "product" : "products"}
                            {query && (
                                <>
                                    {" "}matching{" "}
                                    <span className="text-zinc-700">"{query}"</span>
                                </>
                            )}
                        </p>
                    )}
                </header>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-28">
                        <div className="w-10 h-10 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin" />
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-28 text-red-500 font-medium">
                        {error}
                    </div>
                )}

                {/* Empty states */}
                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-28 text-zinc-400 text-lg">
                        Nothing here yet for{" "}
                        <span className="font-semibold text-zinc-600">
                            "{SubcategoryName}"
                        </span>
                        .
                    </div>
                )}

                {!loading && !error && products.length > 0 && filtered.length === 0 && (
                    <div className="text-center py-28 text-zinc-400 text-lg">
                        No products match{" "}
                        <span className="font-semibold text-zinc-600">"{query}"</span>.
                    </div>
                )}

                {/* Product grid */}
                {!loading && !error && filtered.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.04 } }
                        }}
                        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filtered.map((product, idx) => (
                            <motion.div
                                key={product._id || idx}
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <ProductCard
                                    product={product}
                                    index={idx}
                                    onClick={() => handleProductClick(product)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}