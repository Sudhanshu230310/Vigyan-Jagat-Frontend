import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "lucide-react";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

/* ---- Design tokens ------------------------------------------------
   Subject: a laboratory supplier's catalog index. The card is styled
   as a specimen/reagent tag — a punched paper label you'd find tied
   to a sample — pinned at a slight, individual angle and straightening
   when picked up (hovered). Page background is faint lab-notebook
   graph paper. Numbers read as batch/index codes, not process steps.
--------------------------------------------------------------------- */
const INK = "#182430";
const INK_SOFT = "#5B6670";
const BLUE = "#1D4E89";
const TEAL = "#0F8F86";
const AMBER = "#B8791F";
const PAPER = "#F7F8F4";
const SKY_TOP = "#E4F7FB";
const SKY_MID = "#D3EEF6";
const SKY_BOTTOM = "#EAF9F6";
const LINE = "rgba(29,78,137,0.12)";
const LINE_SOFT = "rgba(29,78,137,0.10)";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');
  .vj-display { font-family: 'Space Grotesk', sans-serif; }
  .vj-mono { font-family: 'IBM Plex Mono', monospace; }
  .vj-body { font-family: 'Inter', sans-serif; }
`;

function SubcategoryCard({ item, index, onClick }) {
    const code = `VJ.${String(index + 1).padStart(2, "0")}`;

    return (
        <motion.article
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            variants={{
                initial: { y: 0, boxShadow: "0 1px 2px rgba(24,36,48,0.06)" },
                hover: { y: -6, boxShadow: "0 18px 32px rgba(29,78,137,0.14)" },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group vj-body relative flex flex-col h-full min-h-[228px] cursor-pointer overflow-hidden bg-white"
            style={{
                border: `1px solid ${LINE}`,
                borderRadius: "20px",
            }}
        >
            {/* punch hole */}
            <span
                className="absolute left-4 top-4 w-3 h-3 rounded-full"
                style={{ border: `1.5px solid ${BLUE}`, background: PAPER }}
            />
            <span
                className="absolute left-[19px] top-[19px] w-[3px] h-[3px] rounded-full"
                style={{ background: BLUE, opacity: 0.5 }}
            />

            {/* stamp, appears on hover */}
            <motion.span
                initial={{ opacity: 0, rotate: -14, scale: 0.85 }}
                whileHover={{ opacity: 1 }}
                animate={{}}
                className="pointer-events-none absolute right-4 top-4 flex items-center justify-center w-11 h-11 rounded-full text-[9px] font-bold tracking-wider vj-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    border: `1.5px double ${AMBER}`,
                    color: AMBER,
                    transform: "rotate(-14deg)",
                }}
            >
                VJ&nbsp;LAB
            </motion.span>

            <div className="relative flex flex-col flex-grow gap-3 px-6 pt-9 pb-5">
                <div
                    className="vj-mono text-[12px] font-semibold tracking-wide"
                    style={{ color: BLUE }}
                >
                    {code}
                </div>

                <div style={{ borderBottom: `1px dashed ${LINE}` }} className="pb-3">
                    <h3 className="vj-display text-[19px] font-semibold text-zinc-900 capitalize leading-snug tracking-tight">
                        {item.name}
                    </h3>
                </div>

                {item.description && (
                    <p className="text-sm leading-relaxed line-clamp-3" style={{ color: INK_SOFT }}>
                        {item.description}
                    </p>
                )}

                <div
                    className="mt-auto pt-1 flex items-center gap-1.5 text-[13.5px] font-semibold vj-mono"
                    style={{ color: TEAL }}
                >
                    <span className="group-hover:hidden">OPEN INDEX</span>
                    <span className="hidden group-hover:inline" style={{ color: AMBER }}>
                        OPEN INDEX
                    </span>
                    <motion.span
                        variants={{ initial: { x: 0 }, hover: { x: 5 } }}
                        transition={{ duration: 0.25 }}
                    >
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
        return subcategories.filter((s) => s.name.toLowerCase().includes(q));
    }, [subcategories, query]);

    const gridBg = {
        backgroundColor: SKY_MID,
        backgroundImage: `linear-gradient(180deg, ${SKY_TOP} 0%, ${SKY_MID} 45%, ${SKY_BOTTOM} 100%), linear-gradient(${LINE_SOFT} 1px, transparent 1px), linear-gradient(90deg, ${LINE_SOFT} 1px, transparent 1px)`,
        backgroundSize: "auto, 28px 28px, 28px 28px",
        backgroundAttachment: "fixed, scroll, scroll",
    };

    /* Loading state */
    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 vj-body" style={gridBg}>
                <style>{FONT_STYLE}</style>
                <motion.div
                    animate={{ scaleY: [0.15, 1, 0.15] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2.5 h-10 rounded-full origin-bottom"
                    style={{ background: TEAL }}
                />
                <p className="vj-mono text-xs tracking-widest uppercase" style={{ color: INK_SOFT }}>
                    Loading index…
                </p>
            </div>
        );
    }

    /* Error state */
    if (error) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center vj-body" style={gridBg}>
                <style>{FONT_STYLE}</style>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center font-medium px-6 py-4 rounded"
                    style={{ color: "#B4432E", border: "1px solid rgba(180,67,46,0.25)", background: "#FFF8F6" }}
                >
                    {error}
                </motion.div>
            </div>
        );
    }

    /* Empty category state */
    if (subcategories.length === 0) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center vj-body" style={gridBg}>
                <style>{FONT_STYLE}</style>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-lg"
                    style={{ color: INK_SOFT }}
                >
                    No entries logged yet under{" "}
                    <span className="font-semibold" style={{ color: INK }}>
                        "{categoryName}"
                    </span>
                    .
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen vj-body" style={gridBg}>
            <style>{FONT_STYLE}</style>
            <div className="mx-auto w-full px-6 md:px-14 pb-24">
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className=" pt-10 flex items-center gap-1.5 text-xs font-semibold tracking-wide vj-mono uppercase text-cyan-900 cursor-pointer"

                >
                    <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }} className="inline-block">
                        ←
                    </motion.span>
                    All categories
                </motion.button>

                <header
                    className="z-40 -mx-6 md:-mx-14 px-6 md:px-14 pb-6 pt-5 border-b"
                    style={{
                        background: "linear-gradient(180deg, rgba(228,247,251,0.92) 0%, rgba(211,238,246,0.86) 100%)",
                        backdropFilter: "blur(10px)",
                        borderColor: LINE,
                    }}
                >
                    <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h1
                            className="vj-display max-w-3xl bg-gradient-to-r from-cyan-600 via-cyan-800  to-slate-900 bg-clip-text text-3xl font-semibold leading-[1.1] tracking-tight text-transparent capitalize lg:text-4xl"
                        >
                            {categoryName}
                        </h1>

                        <div className="relative w-full md:w-72 shrink-0">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search this index"
                                className="w-full bg-white px-4 py-2.5 pr-9 text-sm placeholder:text-zinc-400 border border-gray-300 rounded-3xl outline-none transition vj-body"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: INK_SOFT }}>
                                <SearchIcon className="size-4" />
                            </span>
                        </div>
                    </div>

                    <p className="mt-5 text-sm vj-mono" style={{ color: INK_SOFT }}>
                        <span className="font-semibold" style={{ color: INK }}>
                            {String(filtered.length).padStart(2, "0")}
                        </span>{" "}
                        {filtered.length === 1 ? "entry" : "entries"} logged
                        {query && (
                            <>
                                {" "}
                                for "<span style={{ color: INK }}>{query}</span>"
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
                            className="text-center py-28 text-lg"
                            style={{ color: INK_SOFT }}
                        >
                            No entries match{" "}
                            <span className="font-semibold" style={{ color: INK }}>
                                "{query}"
                            </span>
                            .
                        </motion.div>
                    )}
                </AnimatePresence>

                {filtered.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
                        className="mt-12 grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
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