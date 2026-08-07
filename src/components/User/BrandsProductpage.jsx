import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, AlertCircle, ImageOff, RefreshCw } from "lucide-react";

// Point this at your FastAPI backend
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || API_BASE_URL;
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

export default function BrandProductsPage() {
    const { brand } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading"); // loading | success | empty | error

    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerTargetRef = useRef(null);

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

    useEffect(() => {
        setVisibleCount(BATCH_SIZE);
    }, [products]);

    const visibleProducts = useMemo(() => {
        return products.slice(0, visibleCount);
    }, [products, visibleCount]);

    const hasMore = visibleCount < products.length;

    useEffect(() => {
        const element = observerTargetRef.current;
        if (!element || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, products.length));
                        setIsLoadingMore(false);
                    }, 300);
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, products.length]);

    return (
        <div className="min-h-screen py-10" style={pageBg}>
            <div className="relative mx-auto px-6 md:px-12 lg:px-20 py-16">
                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-cyan-700 transition-colors mb-8 cursor-pointer"
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
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-cyan-700 px-3 py-1 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                        <Package className="h-3.5 w-3.5 text-cyan-600" />
                        Brand
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight">
                        <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                            {brandName}
                        </span>
                    </h1>
                    {status === "success" && (
                        <p className="mt-3 text-zinc-500 font-mono text-xs">
                            Showing <span className="font-bold text-zinc-800">{visibleProducts.length}</span> of {products.length}{" "}
                            {products.length === 1 ? "product" : "products"}
                        </p>
                    )}
                </motion.div>

                {/* Loading state */}
                {status === "loading" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-48 rounded-xl bg-white/60 border border-zinc-200 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {status === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm max-w-md shadow-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        Couldn't load products for this brand right now.
                    </div>
                )}

                {/* Empty state */}
                {status === "empty" && (
                    <div className="rounded-xl border border-zinc-200 bg-white/85 px-6 py-10 text-center text-zinc-500 max-w-md shadow-sm">
                        No products found for {brandName}.
                    </div>
                )}

                {/* Success state */}
                {status === "success" && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.04 } },
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {visibleProducts.map((p, i) => (
                                <motion.div
                                    key={`${p.name}-${i}`}
                                    variants={{
                                        hidden: { opacity: 0, y: 12 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    whileHover={{ y: -4 }}
                                    className="group relative rounded-3xl border border-zinc-200 bg-white/85 backdrop-blur-xl overflow-hidden shadow-md hover:shadow-lg hover:border-cyan-300 transition-all"
                                >
                                    <div className="aspect-[4/3] bg-zinc-50/50 flex items-center justify-center overflow-hidden p-4 border-b border-zinc-100">
                                        {p.images && p.images.length > 0 ? (
                                            <img
                                                src={`${IMAGE_BASE}/${p.images[0]}`}
                                                alt={p.name}
                                                className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <ImageOff className="h-6 w-6 text-zinc-300 group-hover:scale-110 transition-all duration-300" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-[9px] font-semibold uppercase tracking-wide text-cyan-600 mb-1 truncate">
                                            {p.category} {p.subcategory ? `- ${p.subcategory}` : ""}
                                        </p>
                                        <h3 className="text-sm font-bold text-zinc-800 group-hover:text-cyan-700 transition-colors line-clamp-2">
                                            {p.name}
                                        </h3>
                                        {p.description && (
                                            <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2">
                                                {p.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Scrolling Load Trigger & Indicator */}
                        {hasMore && (
                            <div ref={observerTargetRef} className="py-12 flex items-center justify-center">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 border border-zinc-200/90 shadow-md text-xs font-semibold text-cyan-800 backdrop-blur-md">
                                    <RefreshCw className="size-4 text-cyan-600 animate-spin" />
                                    <span>Loading more products...</span>
                                </div>
                            </div>
                        )}

                        {!hasMore && products.length > BATCH_SIZE && (
                            <div className="py-8 text-center text-xs font-mono text-zinc-500">
                                Showing all {products.length} products
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}