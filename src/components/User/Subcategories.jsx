import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ArrowLeft,
    ArrowRight,
    Layers,
    Folder,
    Boxes,
    Sparkles,
    X,
    Inbox,
    RefreshCw
} from "lucide-react";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
const BATCH_SIZE = 12;

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

function SubcategoryCard({ item, index, onClick }) {
    const code = `CAT.${String(index + 1).padStart(2, "0")}`;

    return (
        <motion.article
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group relative flex flex-col justify-between h-full min-h-[220px] cursor-pointer overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 p-6 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 hover:border-cyan-400/60 transition-all duration-300"
        >
            {/* Subtle top gradient accent on hover */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                {/* Header badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-100/80 px-3 py-1 rounded-full">
                        <Layers className="size-3 text-cyan-600" />
                        {code}
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 group-hover:border-cyan-100 transition-colors">
                        <Folder className="size-4" />
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-sans font-semibold text-zinc-900 group-hover:text-cyan-700 transition-colors leading-snug tracking-tight">
                    {item.name}
                </h3>

                {/* Optional Description */}
                {item.description ? (
                    <p className="text-sm text-zinc-700 mt-2.5 line-clamp-2 leading-relaxed font-sans">
                        {item.description}
                    </p>
                ) : (
                    <p className="text-xs text-zinc-600 mt-2 font-mono">
                        Explore verified instruments &amp; equipment in this index.
                    </p>
                )}
            </div>

            {/* Action Footer */}
            <div className="pt-5 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-700 group-hover:text-cyan-700 transition-colors">
                <span className="flex items-center gap-1.5">
                    Browse Products
                </span>
                <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-cyan-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                    <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </motion.article>
    );
}

export default function Subcategory() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerTargetRef = useRef(null);

    useEffect(() => {
        if (!categoryName) return;
        setLoading(true);
        setError(null);
        axios
            .get(`${BackendURL}/category/${encodeURIComponent(categoryName)}/subcategories`)
            .then((res) => {
                const names = res.data.subcategories || [];
                setSubcategories(names.map((name) => ({ name })));
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 404) {
                    setSubcategories([]);
                } else {
                    setError("Failed to load subcategories. Please try again.");
                }
            })
            .finally(() => setLoading(false));
    }, [categoryName]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return subcategories;
        return subcategories.filter((s) => s.name.toLowerCase().includes(q));
    }, [subcategories, query]);

    useEffect(() => {
        setVisibleCount(BATCH_SIZE);
    }, [query, subcategories]);

    const visibleSubcategories = useMemo(() => {
        return filtered.slice(0, visibleCount);
    }, [filtered, visibleCount]);

    const hasMore = visibleCount < filtered.length;

    useEffect(() => {
        const element = observerTargetRef.current;
        if (!element || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
                        setIsLoadingMore(false);
                    }, 300);
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, filtered.length]);

    /* Loading State */
    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 px-6" style={pageBg}>
                <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-3xl p-10 shadow-lg text-center flex flex-col items-center max-w-sm w-full">
                    <RefreshCw className="size-8 text-cyan-600 animate-spin mb-4" />
                    <h3 className="text-base font-bold text-zinc-900">Loading Subcategories</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">Fetching catalog index for "{categoryName}"...</p>
                </div>
            </div>
        );
    }

    /* Error State */
    if (error) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center px-6" style={pageBg}>
                <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center max-w-md w-full shadow-lg">
                    <h3 className="text-lg font-bold text-red-800 mb-1">Failed to Load Index</h3>
                    <p className="text-sm text-red-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-md"
                    >
                        ← Back to Categories
                    </button>
                </div>
            </div>
        );
    }

    /* Empty State */
    if (subcategories.length === 0) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center px-6" style={pageBg}>
                <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 rounded-3xl p-10 text-center max-w-md w-full shadow-xl">
                    <Inbox className="size-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 mb-1">No Subcategories Logged</h3>
                    <p className="text-sm text-zinc-500 mb-6">
                        There are currently no subcategory entries listed under <span className="font-semibold text-zinc-800">"{categoryName}"</span>.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-md"
                    >
                        ← Return to All Categories
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen pb-24" style={pageBg}>
            <div className=" mx-auto px-6 md:px-12 lg:px-16 pt-8">
                {/* Navigation Breadcrumb */}
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-zinc-200 text-xs font-semibold text-cyan-900 hover:bg-white hover:border-cyan-400 transition cursor-pointer shadow-xs mb-6"
                >
                    <ArrowLeft className="size-3.5" />
                    <span>All Categories</span>
                </motion.button>

                {/* Hero Header Section */}
                <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/90 rounded-3xl p-6 md:p-10 shadow-lg shadow-cyan-900/5 mb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-100">
                                    <Boxes className="size-3" /> Catalog Category
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-lora font-semibold tracking-tight text-zinc-900 capitalize leading-tight">
                                {categoryName}
                            </h1>
                            <p className="text-sm font-sans text-zinc-700 mt-2 max-w-xl leading-relaxed">
                                Browse specialized subcategories, products, and technical specifications for {categoryName}.
                            </p>
                        </div>

                        {/* Search Input Box */}
                        <div className="relative w-full md:w-80 shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Filter subcategories..."
                                    className="w-full bg-white border border-zinc-300 rounded-2xl pl-10 pr-9 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 shadow-xs"
                                />
                                <Search className="size-4 text-zinc-400 absolute left-3.5" />
                                {query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        className="absolute right-3 text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
                                    >
                                        <X className="size-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Subcategory Count Badge */}
                    <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                        <div>
                            Showing <span className="font-bold text-zinc-800">{visibleSubcategories.length}</span> of {filtered.length} subcategories
                            {query && (
                                <span> for "<span className="text-cyan-700 font-semibold">{query}</span>"</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filtered Empty State */}
                <AnimatePresence>
                    {filtered.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white/80 backdrop-blur-md border border-zinc-200 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm"
                        >
                            <Search className="size-10 text-zinc-300 mx-auto mb-3" />
                            <h4 className="text-base font-bold text-zinc-800 mb-1">No Matching Subcategories</h4>
                            <p className="text-xs text-zinc-500 mb-4">
                                No subcategories match "{query}". Try clearing your search term.
                            </p>
                            <button
                                onClick={() => setQuery("")}
                                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                            >
                                Clear Search
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subcategories Cards Grid */}
                {filtered.length > 0 && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.04 } }
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {visibleSubcategories.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 16 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full"
                                >
                                    <SubcategoryCard
                                        item={item}
                                        index={idx}
                                        onClick={() => navigate(`/products/${encodeURIComponent(item.name)}`)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Infinite Scroll Trigger & Loader */}
                        {hasMore && (
                            <div ref={observerTargetRef} className="py-12 flex items-center justify-center">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 border border-zinc-200/90 shadow-md text-xs font-semibold text-cyan-800 backdrop-blur-md">
                                    <RefreshCw className="size-4 text-cyan-600 animate-spin" />
                                    <span>Loading more subcategories...</span>
                                </div>
                            </div>
                        )}

                        {!hasMore && filtered.length > BATCH_SIZE && (
                            <div className="py-8 text-center text-xs font-mono text-zinc-500">
                                Showing all {filtered.length} subcategories
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}