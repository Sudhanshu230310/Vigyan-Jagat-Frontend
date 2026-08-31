import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Beaker, Search, AlertCircle, ArrowLeft, Building2 } from "lucide-react";

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

export default function AllBrandsPage() {
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

    // Sort featured brands to the top in priority order, then sort remaining brands alphabetically
    const sortedBrands = [...brands].sort((a, b) => {
        const indexA = getFeaturedIndex(a.brand);
        const indexB = getFeaturedIndex(b.brand);

        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return a.brand.localeCompare(b.brand);
    });

    const filteredBrands = sortedBrands.filter((b) =>
        b.brand.toLowerCase().includes(query.toLowerCase())
    );

    function goToBrand(brand) {
        navigate(`/brands/${encodeURIComponent(brand)}`);
    }

    return (
        <div className="min-h-screen " style={pageBg}>
            <Helmet>
                <title>All Brands | Lab Equipment &amp; Chemical Suppliers — ShodhIX</title>
                <meta name="description" content="Browse all laboratory equipment and chemical brands available on ShodhIX. Trusted suppliers of scientific instruments, glassware, and reagents for universities, research institutes and hospitals across India." />
                <link rel="canonical" href="https://shodhix.com/brands" />
            </Helmet>
            <div className="relative mx-auto px-6 md:px-12 lg:px-16 py-12">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-cyan-700 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-cyan-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                        <Building2 className="h-3.5 w-3.5 text-cyan-600" />
                        Brand Registry
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 font-lora tracking-tight">
                        All Partner{" "}
                        <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                            Brands
                        </span>
                    </h1>
                    <p className="mt-3 font-sans text-zinc-600 max-w-2xl text-base leading-relaxed">
                        Explore every manufacturer represented in our catalog. Click on any brand to view all available products, specifications, and request wholesale quotes.
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
                    >
                        <div className="relative w-full sm:max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search all brands..."
                                className="w-full rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur-md px-10 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 shadow-sm"
                            />
                        </div>
                        <div className="text-xs font-medium text-zinc-500 bg-white/70 px-3.5 py-2 rounded-xl border border-zinc-200/80 shadow-xs">
                            Showing <span className="font-bold text-cyan-700">{filteredBrands.length}</span> of {brands.length} brands
                        </div>
                    </motion.div>
                )}

                {/* Loading state */}
                {status === "loading" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 15 }).map((_, i) => (
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
                        No brands found in catalog.
                    </div>
                )}

                {/* Success state */}
                {status === "success" && (
                    <>
                        {filteredBrands.length === 0 ? (
                            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-8 text-center max-w-md mx-auto">
                                <Search className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                                <p className="text-zinc-600 font-medium text-sm">No brands match "{query}"</p>
                                <button
                                    onClick={() => setQuery("")}
                                    className="mt-3 text-xs text-cyan-600 hover:text-cyan-800 font-semibold"
                                >
                                    Clear search query
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.03 } },
                                }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
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
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
