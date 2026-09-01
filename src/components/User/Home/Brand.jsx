import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Beaker, ArrowRight, AlertCircle } from "lucide-react";

// Point this at your FastAPI backend
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

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

const FEATURED_BRANDS = [
    "Merck",
    "Loba Chemie",
    "Hanna Instruments",
    "Systronics",
    "Eppendorf",
    "ZEISS",
    "Sartorius",
    "HiMedia",
    "Glassco",
    "Tarsons",
    "Whatman",
    "Tecan",
    "Shimadzu"
];

const getFeaturedIndex = (brandName) => {
    if (!brandName) return -1;
    const nameLower = brandName.trim().toLowerCase();
    return FEATURED_BRANDS.findIndex(fb => fb.toLowerCase() === nameLower);
};

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [status, setStatus] = useState("loading"); // loading | success | empty | error
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

    // Filter & sort to show only specified featured brands in home page section
    const displayedBrands = brands
        .filter((b) => getFeaturedIndex(b.brand) !== -1)
        .sort((a, b) => getFeaturedIndex(a.brand) - getFeaturedIndex(b.brand));

    function goToBrand(brand) {
        navigate(`/brands/${encodeURIComponent(brand)}`);
    }

    return (
        <div className="py-16" style={pageBg}>
            <div className="relative  mx-auto px-6 md:px-12 lg:px-16">
                {/* Header with View All Action */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-cyan-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                            <Beaker className="h-3.5 w-3.5 text-cyan-600" />
                            Our Brands
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 font-lora tracking-tight">
                            Brands We{" "}
                            <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                                Supply
                            </span>
                        </h2>
                        <p className="mt-3 font-sans text-zinc-600 max-w-xl text-sm sm:text-base">
                            Top Laboratory Equipment, Chemical, and Glassware Manufacturers available in our catalog.
                        </p>
                    </div>

                    {status === "success" && brands.length > 0 && (
                        <button
                            onClick={() => navigate("/brands")}
                            className="inline-flex items-center gap-2 rounded-xl bg-white border border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300 px-5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer group self-start sm:self-auto shrink-0"
                        >
                            <span>View All Brands</span>
                            <ArrowRight className="h-4 w-4 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </motion.div>

                {/* Loading state */}
                {status === "loading" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 rounded-2xl bg-white/60 border border-zinc-200 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {status === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm max-w-md shadow-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Couldn't load brands right now. Please try again shortly.
                    </div>
                )}

                {/* Empty state */}
                {status === "empty" && (
                    <div className="rounded-xl border border-zinc-200 bg-white/80 px-6 py-10 text-center text-zinc-500 max-w-md shadow-sm">
                        No brands found yet.
                    </div>
                )}

                {/* Success state (Limit to 8 brands) */}
                {status === "success" && (
                    <>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.04 } },
                            }}
                            className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-4"
                        >
                            {displayedBrands.map((b) => (
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
                                    className="group relative rounded-2xl border border-zinc-200/90 bg-white/85 backdrop-blur-xl px-5 py-6 shadow-md hover:shadow-lg hover:border-cyan-300 transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative">
                                        <h3 className="text-base font-semibold text-zinc-800 group-hover:text-cyan-700 transition-colors truncate font-sans">
                                            {b.brand}
                                        </h3>
                                        <p className="mt-1 text-xs text-zinc-400">
                                            {b.product_count}{" "}
                                            {b.product_count === 1 ? "product" : "products"}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Bottom CTA to View All */}
                        {brands.length > 0 && (
                            <div className="mt-10 text-center">
                                <button
                                    onClick={() => navigate("/brands")}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white px-7 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <span>View All {brands.length} Brands</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}