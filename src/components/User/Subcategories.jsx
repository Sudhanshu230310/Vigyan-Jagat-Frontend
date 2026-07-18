import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "lucide-react";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

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

function SubcategoryCard({ item, index, onClick }) {
    const tagLabel = String(index + 1).padStart(2, "0");

    return (
        <motion.article
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.985 }}
            variants={cardVariants}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group relative flex flex-col h-full min-h-[15rem] bg-white rounded-2xl border border-gray-300 overflow-hidden cursor-pointer"
        >
            {/* Thin accent rail */}
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300" />

            <div className="flex flex-col flex-grow gap-4 p-6 pt-7">
                {/* Specimen tag + name */}
                <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[11px] tracking-wider text-cyan-600/90">
                        {tagLabel}
                    </span>
                    <h3 className="text-[17px] font-medium text-zinc-900 capitalize leading-snug">
                        {item.name}
                    </h3>
                </div>

                {/* Description */}
                {item.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {item.description}
                    </p>
                )}

                {/* CTA pinned to the bottom */}
                <div className="mt-auto pt-2 flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    Open
                    <motion.span variants={arrowVariants} transition={{ duration: 0.25 }}>
                        →
                    </motion.span>
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

    useEffect(() => {
        if (!categoryName) return;
        setLoading(true);
        setError(null);
        axios
            .get(`${BackendURL}/category/${encodeURIComponent(categoryName)}/subcategories`)
            .then((res) => {
                // API returns { category, subcategories: string[] }
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
        return subcategories.filter((s) =>
            s.name.toLowerCase().includes(q)
        );
    }, [subcategories, query]);

    /* ── Loading state ──────────────────────────────────────── */
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    /* ── Error state ─────────────────────────────────────────── */
    if (error) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-red-500 font-medium"
                >
                    {error}
                </motion.div>
            </div>
        );
    }

    /* ── Empty category state ────────────────────────────────── */
    if (subcategories.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-zinc-400 text-lg"
                >
                    No subcategories found for{" "}
                    <span className="font-semibold text-zinc-600">"{categoryName}"</span>.
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-8">
            <div className="mx-auto w-full px-6 md:px-10 pb-24">
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
                    All categories
                </motion.button>

                {/* Header block — sticky below Navbar (h-16 = 4rem) */}
                <header className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 -mx-6 md:-mx-10 px-6 md:px-10 pb-5 pt-4">
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-600">
                        Catalog
                    </p>
                    <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h1 className="text-3xl lg:text-4xl font-sans tracking-tight text-zinc-900 capitalize max-w-3xl leading-[1.1]">
                            {categoryName}
                        </h1>

                        {/* Search */}
                        <div className="relative w-full md:w-72 shrink-0">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search subcategories"
                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pr-9 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                <SearchIcon className="size-4" />
                            </span>
                        </div>
                    </div>

                    <p className="mt-5 text-sm text-zinc-500">
                        <span className="font-medium text-zinc-700">{filtered.length}</span>{" "}
                        {filtered.length === 1 ? "subcategory" : "subcategories"}
                        {query && (
                            <>
                                {" "}matching{" "}
                                <span className="text-zinc-700">"{query}"</span>
                            </>
                        )}
                    </p>
                </header>

                {/* Empty search state */}
                <AnimatePresence>
                    {filtered.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-28 text-zinc-400 text-lg"
                        >
                            No subcategories match{" "}
                            <span className="font-semibold text-zinc-600">"{query}"</span>.
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Grid */}
                {filtered.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.04 } }
                        }}
                        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filtered.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <SubcategoryCard
                                    item={item}
                                    index={idx}
                                    onClick={() =>
                                        navigate(`/products/${encodeURIComponent(item.name)}`)
                                    }
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}