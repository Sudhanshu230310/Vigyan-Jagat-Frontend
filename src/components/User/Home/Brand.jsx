import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Beaker, Search, AlertCircle } from "lucide-react";

// Point this at your FastAPI backend
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [status, setStatus] = useState("loading"); // loading | success | empty | error
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        async function fetchBrands() {
            setStatus("loading");
            try {
                const res = await fetch(`${API_BASE_URL}/brands`);
                if (res.status === 404) {
                    if (!cancelled) {
                        setBrands([]);
                        setStatus("empty");
                    }
                    return;
                }
                if (!res.ok) throw new Error(`Request failed with ${res.status}`);
                const data = await res.json();
                if (!cancelled) {
                    setBrands(data.brands || []);
                    setStatus("success");
                }
            } catch (err) {
                if (!cancelled) setStatus("error");
            }
        }

        fetchBrands();
        return () => {
            cancelled = true;
        };
    }, []);

    const filteredBrands = brands.filter((b) =>
        b.brand.toLowerCase().includes(query.toLowerCase())
    );

    function goToBrand(brand) {
        navigate(`/brands/${encodeURIComponent(brand)}`);
    }

    return (
        <div className="min-h-screen mt-30 bg-black relative overflow-hidden">
            {/* ambient background accents */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full  blur-3xl" />

            <div className="relative  mx-auto px-20 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 text-cyan-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Beaker className="h-3.5 w-3.5" />
                        Our Brands
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Brands we{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
                            supply
                        </span>
                    </h1>
                    <p className="mt-3 text-slate-200 max-w-xl">
                        Every manufacturer represented in our laboratory equipment,
                        chemicals, and glassware catalog. Tap a brand to see its products.
                    </p>
                </motion.div>

                {/* Search */}
                {status === "success" && brands.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="relative mb-10 max-w-md"
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search brands..."
                            className="w-full rounded-xl border border-sky-200 bg-white/80 backdrop-blur pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                        />
                    </motion.div>
                )}

                {/* Loading state */}
                {status === "loading" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {status === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm max-w-md">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Couldn't load brands right now. Please try again shortly.
                    </div>
                )}

                {/* Empty state */}
                {status === "empty" && (
                    <div className="rounded-xl border border-sky-200 bg-white px-6 py-10 text-center text-slate-500 max-w-md">
                        No brands found yet.
                    </div>
                )}

                {/* Success state */}
                {status === "success" && (
                    <>
                        {filteredBrands.length === 0 ? (
                            <p className="text-slate-500 text-sm">
                                No brands match "{query}".
                            </p>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.04 } },
                                }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                            >
                                {filteredBrands.map((b) => (
                                    <motion.div
                                        key={b.brand}
                                        variants={{
                                            hidden: { opacity: 0, y: 12 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        whileHover={{ y: -4 }}
                                        onClick={() => goToBrand(b.brand)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") goToBrand(b.brand);
                                        }}
                                        className="group relative rounded-2xl border border-sky-100 bg-white backdrop-blur px-5 py-6 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    >
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative">
                                            <h3 className="text-base font-semibold text-slate-800 group-hover:text-cyan-700 transition-colors truncate">
                                                {b.brand}
                                            </h3>
                                            <p className="mt-1 text-xs text-slate-400">
                                                {b.product_count}{" "}
                                                {b.product_count === 1 ? "product" : "products"}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}