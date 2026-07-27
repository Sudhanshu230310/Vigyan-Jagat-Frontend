import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, AlertCircle, ImageOff } from "lucide-react";

// Point this at your FastAPI backend
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function BrandProductsPage() {
    const { brand } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading"); // loading | success | empty | error

    const brandName = decodeURIComponent(brand || "");

    useEffect(() => {
        let cancelled = false;

        async function fetchProducts() {
            setStatus("loading");
            try {
                const res = await fetch(
                    `${API_BASE_URL}/brands/${encodeURIComponent(brandName)}/products`
                );
                if (res.status === 404) {
                    if (!cancelled) {
                        setProducts([]);
                        setStatus("empty");
                    }
                    return;
                }
                if (!res.ok) throw new Error(`Request failed with ${res.status}`);
                const data = await res.json();
                if (!cancelled) {
                    setProducts(data.products || []);
                    setStatus("success");
                }
            } catch (err) {
                if (!cancelled) setStatus("error");
            }
        }

        if (brandName) fetchProducts();
        return () => {
            cancelled = true;
        };
    }, [brandName]);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* ambient background accents */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl" />

            <div className="relative mx-auto px-20 py-16">
                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to brands
                </button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 text-cyan-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Package className="h-3.5 w-3.5" />
                        Brand
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
                            {brandName}
                        </span>
                    </h1>
                    {status === "success" && (
                        <p className="mt-3 text-slate-300">
                            {products.length} {products.length === 1 ? "product" : "products"}{" "}
                            found
                        </p>
                    )}
                </motion.div>

                {/* Loading state */}
                {status === "loading" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-48 rounded-xl bg-gradient-to-br from-sky-950 to-cyan-950 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {status === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm max-w-md">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Couldn't load products for this brand right now.
                    </div>
                )}

                {/* Empty state */}
                {status === "empty" && (
                    <div className="rounded-xl border border-sky-200 bg-white px-6 py-10 text-center text-slate-500 max-w-md">
                        No products found for {brandName}.
                    </div>
                )}

                {/* Success state */}
                {status === "success" && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.04 } },
                        }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {products.map((p, i) => (
                            <motion.div
                                key={`${p.name}-${i}`}
                                variants={{
                                    hidden: { opacity: 0, y: 12 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ y: -3 }}
                                className="group relative rounded-xl border border-sky-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all"
                            >
                                <div className="aspect-[4/3] bg-sky-50 flex items-center justify-center overflow-hidden">
                                    {p.images && p.images.length > 0 ? (
                                        <img
                                            src={p.images[0]}
                                            alt={p.name}
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <ImageOff className="h-6 w-6 text-slate-300" />
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-[9px] font-semibold uppercase tracking-wide text-cyan-600 mb-1 truncate">
                                        {p.category} {p.subcategory ? `- ${p.subcategory}` : ""}
                                    </p>
                                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-cyan-700 transition-colors line-clamp-2">
                                        {p.name}
                                    </h3>
                                    {p.description && (
                                        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}