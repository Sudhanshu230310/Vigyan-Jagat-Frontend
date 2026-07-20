import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "lucide-react";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const HUES = [255, 165, 275, 75, 20, 230, 280, 190, 55];

const cardVariants = {
    initial: { y: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" },
    hover: { y: -4, boxShadow: "0 12px 28px rgba(37,99,235,0.10)" }
};

const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5 }
};

function SubcategoryCard({ item, index, onClick }) {
    const tagLabel = String(index + 1).padStart(2, "0");
    const hue = HUES[index % HUES.length];

    return (
        <motion.article
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.985 }}
            variants={cardVariants}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group relative flex flex-col h-full min-h-[220px] rounded-xl border cursor-pointer overflow-hidden"
            style={{
                borderColor: `oklch(90% 0.01 260)`,
                background: `linear-gradient(150deg, oklch(96% 0.03 ${hue}) 0%, oklch(99% 0.01 ${hue}) 55%, oklch(98% 0.005 260) 100%)`
            }}
        >
            <div className="relative flex flex-col flex-grow gap-3.5 p-6">
                <div className="flex items-center gap-2.5">
                    <span
                        className="font-mono text-[13px] font-bold"
                        style={{ color: "oklch(50% 0.18 255)" }}
                    >
                        {tagLabel}
                    </span>
                    <span className="w-px h-3.5" style={{ background: "oklch(70% 0.02 260 / 0.4)" }} />
                </div>

                <h3 className="text-[19px] font-bold text-zinc-900 capitalize leading-snug tracking-tight">
                    {item.name}
                </h3>

                {item.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {item.description}
                    </p>
                )}

                <div
                    className="mt-auto pt-1 flex items-center gap-1.5 text-[13.5px] font-semibold"
                    style={{ color: "oklch(50% 0.18 255)" }}
                >
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

    /* Loading state */
    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center" style={{ background: "oklch(98% 0.004 260)" }}>
                <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "oklch(90% 0.03 255)", borderTopColor: "oklch(55% 0.18 255)" }} />
            </div>
        );
    }

    /* Error state */
    if (error) {
        return (
            <div className="w-full min-h-screen pt-20 flex items-center justify-center" style={{ background: "oklch(98% 0.004 260)" }}>
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

    /* Empty category state */
    if (subcategories.length === 0) {
        return (
            <div className="w-full min-h-screen pt-20 flex items-center justify-center" style={{ background: "oklch(98% 0.004 260)" }}>
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
        <div className="w-full min-h-screen" style={{ background: "oklch(98% 0.004 260)", fontFamily: "Helvetica, Arial, sans-serif" }}>
            <div className="mx-auto w-full px-6 md:px-14 pb-24">
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className="mt-9 flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: "oklch(50% 0.01 260)" }}
                >
                    <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }} className="inline-block">
                        ←
                    </motion.span>
                    All categories
                </motion.button>

                <header
                    className="sticky top-16 z-40 -mx-6 md:-mx-14 px-6 md:px-14 pb-6 pt-5 border-b"
                    style={{
                        background: "linear-gradient(180deg, oklch(98.5% 0.01 260 / 0.92) 0%, oklch(97.5% 0.012 260 / 0.92) 100%)",
                        backdropFilter: "blur(16px)",
                        borderColor: "oklch(90% 0.01 260)"
                    }}
                >
                    <p
                        className="font-mono text-xs tracking-[0.2em] uppercase font-bold"
                        style={{ color: "oklch(55% 0.16 255)" }}
                    >
                        Catalog
                    </p>
                    <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 capitalize max-w-3xl leading-[1.1]">
                            {categoryName}
                        </h1>

                        <div className="relative w-full md:w-72 shrink-0">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search subcategories"
                                className="w-full rounded-xl border bg-white px-4 py-2.5 pr-9 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition"
                                style={{ borderColor: "oklch(88% 0.01 260)" }}
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

                {filtered.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filtered.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                )}
            </div>
        </div>
    );
}
