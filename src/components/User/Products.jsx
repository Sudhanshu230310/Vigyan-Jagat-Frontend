import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Search, ArrowLeft, Package, Sparkles, Tag, ChevronRight, Layers, Box } from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || BackendURL;

const SKY_TOP = "#E4F7FB";
const SKY_MID = "#D3EEF6";
const SKY_BOTTOM = "#EAF9F6";
const LINE_SOFT = "rgba(29,78,137,0.08)";

const pageBg = {
    backgroundColor: SKY_MID,
    backgroundImage: `linear-gradient(180deg, ${SKY_TOP} 0%, ${SKY_MID} 45%, ${SKY_BOTTOM} 100%), linear-gradient(${LINE_SOFT} 1px, transparent 1px), linear-gradient(90deg, ${LINE_SOFT} 1px, transparent 1px)`,
    backgroundSize: "auto, 28px 28px, 28px 28px",
    backgroundAttachment: "fixed, scroll, scroll",
};

const pageVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const cardVariants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    hover: {
        y: -6,
        boxShadow: "0 20px 40px rgba(8, 145, 178, 0.12), 0 8px 16px rgba(8, 145, 178, 0.08)",
        transition: { duration: 0.3 }
    }
};

function ProductCard({ product, index, onClick }) {
    const name = product.name || product.product_name || "Unnamed Product";
    const material = product.specifications?.Material;
    const hasImages = Array.isArray(product.images) && product.images.length > 0;

    return (
        <motion.article
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative flex flex-col h-full bg-white/85 backdrop-blur-xl rounded-3xl border border-zinc-200/90 overflow-hidden cursor-pointer shadow-lg shadow-cyan-900/5 transition-all"
        >
            {/* Top Image / Placeholder Section */}
            <div className="relative h-56 w-full bg-zinc-50/50 flex items-center justify-center overflow-hidden border-b border-zinc-100 p-6">
                {hasImages ? (
                    <img
                        src={`${IMAGE_BASE}/${product.images[0]}`}
                        alt={name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
                        <Box className="size-16 mb-2 stroke-[1.5]" />
                    </div>
                )}

                {/* Index Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-zinc-200/80 text-zinc-500 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    {product.brand && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-50 border border-cyan-100 text-cyan-700 text-[10px] font-semibold rounded-md uppercase font-sans">
                            <Sparkles className="size-3" /> {product.brand}
                        </span>
                    )}
                    {material && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-mono font-semibold rounded-md uppercase truncate max-w-[140px]">
                            {material}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors font-lora">
                    {name}
                </h3>

                {product.description && (
                    <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed font-sans">
                        {product.description}
                    </p>
                )}

                {/* Additional Specs */}
                <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                    {product.cas_no && (
                        <span className="bg-zinc-50 text-zinc-500 text-[10px] px-2 py-1 border border-zinc-200/60 rounded font-mono">CAS: {product.cas_no}</span>
                    )}
                    {product.grade && (
                        <span className="bg-zinc-50 text-zinc-500 text-[10px] px-2 py-1 border border-zinc-200/60 rounded">{product.grade}</span>
                    )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-cyan-700 group-hover:text-cyan-800 transition-colors">
                        View Product
                    </span>
                    <div className="size-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors shadow-sm">
                        <ChevronRight className="size-4" />
                    </div>
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
    }, [SubcategoryName]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => {
            const name = (p.name || p.product_name || "").toLowerCase();
            const desc = (p.description || "").toLowerCase();
            const brand = (p.brand || "").toLowerCase();
            return name.includes(q) || desc.includes(q) || brand.includes(q);
        });
    }, [products, query]);

    const handleProductClick = (product) => {
        const productName = product.name || product.product_name;
        if (!productName) return;
        navigate(
            `/products/${encodeURIComponent(SubcategoryName)}/${encodeURIComponent(
                productName
            )}`
        );
    };

    return (
        <div className="w-full min-h-screen pb-24 pt-6" style={pageBg}>
            <div className="mx-auto px-6 md:px-12 lg:px-16 pt-8">
                {/* Header Section */}
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="show"
                    className="mb-10"
                >
                    {/* Breadcrumbs Navigation */}
                    <motion.div variants={headerVariants} className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-zinc-200 text-cyan-900 hover:bg-white hover:border-cyan-400 transition cursor-pointer shadow-xs"
                        >
                            <ArrowLeft className="size-3.5" />
                            Back to Categories
                        </button>
                        <span className="text-zinc-300">/</span>
                        <span className="text-zinc-600 font-sans font-semibold truncate max-w-xs">{SubcategoryName}</span>
                    </motion.div>

                    <motion.div variants={headerVariants} className="bg-white/80 backdrop-blur-xl border border-zinc-200/90 rounded-3xl p-6 md:p-10 shadow-xl shadow-cyan-900/5 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100/50 border border-cyan-200 text-cyan-800 text-xs font-mono font-bold rounded-full uppercase tracking-wider mb-4">
                                <Layers className="size-3.5 text-cyan-600" />
                                Catalog
                            </div>
                            <h1 className="text-3xl md:text-5xl font-lora font-semibold tracking-tight text-zinc-900 capitalize leading-tight">
                                {SubcategoryName}
                            </h1>
                            <p className="mt-3 text-sm md:text-base text-zinc-600 max-w-2xl leading-relaxed font-sans">
                                Browse our complete range of {SubcategoryName.toLowerCase()} products. Select an item below to view detailed technical specifications, variants, and request wholesale quotes.
                            </p>
                        </div>

                        {/* Search & Stats */}
                        <div className="w-full lg:w-80 shrink-0">
                            <div className="relative w-full mb-3">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={`Search in ${SubcategoryName}...`}
                                    className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 pl-11 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 shadow-sm"
                                />
                                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 size-4.5" />
                            </div>
                            {!loading && !error && (
                                <div className="text-xs font-medium text-zinc-500 text-right px-2">
                                    Showing <span className="text-zinc-900 font-bold">{filtered.length}</span> {filtered.length === 1 ? "product" : "products"}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Loading state */}
                {loading && (
                    <div className="w-full py-32 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin mb-4" />
                        <h3 className="text-base font-bold text-zinc-900">Loading Catalog</h3>
                        <p className="text-xs text-zinc-500 mt-1 font-mono">Fetching {SubcategoryName} products...</p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full py-20 flex justify-center"
                    >
                        <div className="bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 max-w-md shadow-2xl text-center">
                            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Tag className="size-6" />
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-2">Unavailable</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">{error}</p>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl py-3 px-6 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                            >
                                <ArrowLeft className="size-4" /> Go Back
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Empty states */}
                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-28 text-zinc-400 text-lg bg-white/50 backdrop-blur-md rounded-3xl border border-zinc-200/50">
                        Nothing here yet for <span className="font-semibold text-zinc-600">"{SubcategoryName}"</span>.
                    </div>
                )}

                {!loading && !error && products.length > 0 && filtered.length === 0 && (
                    <div className="text-center py-28 text-zinc-400 text-lg bg-white/50 backdrop-blur-md rounded-3xl border border-zinc-200/50">
                        No products match <span className="font-semibold text-zinc-600">"{query}"</span>.
                    </div>
                )}

                {/* Product grid */}
                {!loading && !error && filtered.length > 0 && (
                    <motion.div
                        variants={pageVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                    >
                        {filtered.map((product, idx) => (
                            <ProductCard
                                key={product._id || idx}
                                product={product}
                                index={idx}
                                onClick={() => handleProductClick(product)}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}