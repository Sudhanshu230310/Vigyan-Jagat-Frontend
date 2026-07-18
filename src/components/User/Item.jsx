import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
    ArrowLeft, 
    Maximize2, 
    X, 
    Send, 
    CheckCircle2, 
    Search, 
    Inbox,
    Package,
    Shield,
    Sparkles,
    Globe
} from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
// Where the product_images/... files are served from. Falls back to the API host.
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || BackendURL;

// Union of keys across all rows, preserving first-seen order.
function deriveColumns(rows) {
    const cols = [];
    rows.forEach((row) =>
        Object.keys(row).forEach((k) => {
            if (!cols.includes(k)) cols.push(k);
        })
    );
    return cols;
}

const isPriceCol = (c) => /price/i.test(c);
const isCodeCol = (c) => /item code/i.test(c);

function SpecTable({ title, rows }) {
    const [filterQuery, setFilterQuery] = useState("");
    const columns = useMemo(() => deriveColumns(rows), [rows]);

    const filteredRows = useMemo(() => {
        const q = filterQuery.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((row) => 
            columns.some((col) => 
                String(row[col] ?? "").toLowerCase().includes(q)
            )
        );
    }, [rows, columns, filterQuery]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {title && (
                    <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-2 font-semibold">
                        <span className="w-1.5 h-3.5 bg-cyan-500 rounded-full" />
                        {title}
                    </h3>
                )}
                {rows.length > 3 && (
                    <div className="relative max-w-xs w-full ml-auto">
                        <input
                            type="text"
                            value={filterQuery}
                            onChange={(e) => setFilterQuery(e.target.value)}
                            placeholder="Filter variants..."
                            className="w-full rounded-xl border border-zinc-200 bg-white/70 px-3 py-1.5 pl-8 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                        />
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                            <Search className="size-3.5" />
                        </span>
                    </div>
                )}
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 backdrop-blur-md shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-left">
                        <thead>
                            <tr className="bg-zinc-50/70 border-b border-zinc-200/80 text-zinc-500 font-medium">
                                {columns.map((col) => (
                                    <th
                                        key={col}
                                        className={`whitespace-nowrap px-6 py-4 text-[11px] uppercase tracking-wider font-mono font-semibold ${
                                            isPriceCol(col) ? "text-right" : ""
                                        }`}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence initial={false}>
                                {filteredRows.map((row, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
                                        className="border-b border-zinc-100 last:border-0 hover:bg-cyan-50/20 transition-colors"
                                    >
                                        {columns.map((col) => (
                                            <td
                                                key={col}
                                                className={`whitespace-nowrap px-6 py-3.5 text-zinc-700 ${
                                                    isCodeCol(col) ? "font-mono text-zinc-900 font-semibold text-xs" : ""
                                                } ${
                                                    isPriceCol(col)
                                                        ? "text-right font-semibold text-cyan-600 tabular-nums text-sm"
                                                        : ""
                                                }`}
                                            >
                                                {isPriceCol(col) && row[col] != null
                                                    ? `\u20B9 ${row[col]}`
                                                    : row[col] ?? "\u2014"}
                                            </td>
                                        ))}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-10 text-zinc-400 text-sm">
                                        No matching items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const pageVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function Item() {
    const { SubcategoryName, itemName } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [inquirySuccess, setInquirySuccess] = useState(false);
    const [submittingInquiry, setSubmittingInquiry] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        org: "",
        qty: "100",
        message: ""
    });

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios
            .get(
                `${BackendURL}/product/${encodeURIComponent(
                    SubcategoryName
                )}/${encodeURIComponent(itemName)}`
            )
            .then((res) => {
                setItem(res.data.product);
                setActiveImgIndex(0);
            })
            .catch((err) => {
                console.error(err);
                setError(
                    err.response?.status === 404
                        ? "This product could not be found."
                        : "Something went wrong loading this product."
                );
            })
            .finally(() => setLoading(false));
    }, [SubcategoryName, itemName]);

    // Prepopulate message box with dynamic item information once loaded
    useEffect(() => {
        if (item) {
            setFormData(prev => ({
                ...prev,
                message: `Hi, I would like to request a quote for "${item.name}" (Brand: ${item.brand || "N/A"}). Please provide pricing, packaging variants, and lead time information.`
            }));
        }
    }, [item]);

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        setSubmittingInquiry(true);
        setTimeout(() => {
            setSubmittingInquiry(false);
            setInquirySuccess(true);
        }, 1200);
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-cyan-200/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[20%] right-[-10%] w-[25vw] h-[25vw] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative flex items-center justify-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-16 h-16 border-4 border-zinc-200 border-t-cyan-500 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                        className="absolute w-10 h-10 border-4 border-zinc-200 border-t-indigo-500 rounded-full"
                    />
                </div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-6 text-xs font-mono text-zinc-500 tracking-widest uppercase"
                >
                    Securing Catalog Details...
                </motion.p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
                <div className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-red-200/10 rounded-full blur-[120px] pointer-events-none" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 max-w-md shadow-xl shadow-zinc-200/30"
                >
                    <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <X className="size-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-900 mb-2">Item Unavailable</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-xl py-3 px-6 transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="size-4" /> Go back
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!item) return null;

    const specs = item.specifications || {};
    const scalarEntries = Object.entries(specs).filter(
        ([, v]) => !Array.isArray(v)
    );
    const tableEntries = Object.entries(specs).filter(([, v]) =>
        Array.isArray(v)
    );
    const images = Array.isArray(item.images) ? item.images : [];

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-zinc-50/40 to-zinc-100/50 pt-16 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-cyan-200/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[30vw] h-[30vw] bg-indigo-205/15 rounded-full blur-[120px] pointer-events-none" />

            <motion.div 
                variants={pageVariants}
                initial="hidden"
                animate="show"
                className="mx-auto w-full px-6 md:px-12 pb-24 relative z-10"
            >
                {/* Navigation Back */}
                <motion.div variants={itemVariants} className="mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-cyan-700 transition-colors"
                    >
                        <motion.span
                            whileHover={{ x: -3 }}
                            transition={{ duration: 0.2 }}
                            className="inline-block"
                        >
                            <ArrowLeft className="size-4" />
                        </motion.span>
                        Back to {SubcategoryName}
                    </button>
                </motion.div>

                {/* Main Identity & Showcase Area */}
                <motion.div 
                    variants={itemVariants} 
                    className="mt-8 bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-xl shadow-zinc-200/40 rounded-3xl p-6 md:p-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Image Showcase Component (LHS) */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            <div className="relative group/image overflow-hidden bg-white rounded-2xl border border-zinc-200/70 p-8 flex items-center justify-center min-h-[320px] max-h-[380px] shadow-sm hover:shadow-md transition-shadow duration-300">
                                {images.length > 0 ? (
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImgIndex}
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.25 }}
                                            src={`${IMAGE_BASE}/${images[activeImgIndex]}`}
                                            alt={item.name}
                                            className="max-h-64 w-auto object-contain cursor-zoom-in select-none"
                                            onClick={() => setIsLightboxOpen(true)}
                                        />
                                    </AnimatePresence>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="text-zinc-300 text-6xl">⚗</div>
                                        <span className="text-xs text-zinc-400 font-mono">No Image Available</span>
                                    </div>
                                )}
                                
                                {images.length > 0 && (
                                    <motion.button 
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        onClick={() => setIsLightboxOpen(true)}
                                        className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-950 text-white size-8 rounded-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer"
                                    >
                                        <Maximize2 className="size-4" />
                                    </motion.button>
                                )}
                            </div>

                            {/* Thumbnail Row selector */}
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto py-1 shrink-0 scrollbar-none">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImgIndex(i)}
                                            className={`relative size-16 rounded-xl border-2 overflow-hidden p-1.5 bg-white cursor-pointer transition-all duration-200 shrink-0 ${
                                                activeImgIndex === i ? "border-cyan-500 scale-102" : "border-zinc-200/80 hover:border-zinc-300"
                                            }`}
                                        >
                                            <img src={`${IMAGE_BASE}/${img}`} alt={`Thumbnail ${i}`} className="h-full w-full object-contain" />
                                            {activeImgIndex === i && (
                                                <motion.div 
                                                    layoutId="activeIndicator"
                                                    className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Detail Text & Actions (RHS) */}
                        <div className="lg:col-span-7 flex flex-col h-full justify-between">
                            <div>
                                {item.brand && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-mono font-semibold rounded-full uppercase">
                                        <Sparkles className="size-3" />
                                        {item.brand}
                                    </div>
                                )}
                                
                                <h1 className="mt-3.5 text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 capitalize leading-snug">
                                    {item.name}
                                </h1>
                                
                                {item.description && (
                                    <p className="mt-4 text-zinc-600 leading-relaxed text-sm md:text-base max-w-3xl">
                                        {item.description}
                                    </p>
                                )}

                                {/* Scalar specs cards */}
                                {scalarEntries.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                                        {scalarEntries.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="bg-white/50 backdrop-blur-sm border border-zinc-200/50 rounded-2xl p-4 flex flex-col hover:border-cyan-500/25 hover:shadow-lg hover:shadow-zinc-200/25 transition-all duration-300"
                                            >
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                                                    {key}
                                                </span>
                                                <span className="font-semibold text-zinc-800 text-sm sm:text-base capitalize">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Trust elements & CTA block */}
                            <div className="mt-10 pt-8 border-t border-zinc-200/80">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-500">
                                        <div className="size-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                            <Shield className="size-4" />
                                        </div>
                                        <span>Certified Quality</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-500">
                                        <div className="size-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                            <Package className="size-4" />
                                        </div>
                                        <span>Standard Packaging</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-500">
                                        <div className="size-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                            <Globe className="size-4" />
                                        </div>
                                        <span>Pan India Delivery</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsInquiryOpen(true)}
                                        className="flex-1 sm:flex-initial bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl py-3.5 px-8 text-sm font-semibold shadow-lg shadow-cyan-600/15 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                                    >
                                        <Inbox className="size-4.5" /> Request Wholesale Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Table Entries (Variants / ASTM specs) */}
                {tableEntries.length > 0 && (
                    <motion.section 
                        variants={itemVariants} 
                        className="mt-12 space-y-10"
                    >
                        <div className="border-b border-zinc-200/85 pb-4">
                            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 font-bold">
                                Technical Specifications & Variants
                            </h2>
                        </div>
                        <div className="space-y-10">
                            {tableEntries.map(([title, rows]) => (
                                <SpecTable
                                    key={title}
                                    title={tableEntries.length > 1 ? title : null}
                                    rows={rows}
                                />
                            ))}
                        </div>
                    </motion.section>
                )}
            </motion.div>

            {/* Lightbox / Zoom Modal */}
            <AnimatePresence>
                {isLightboxOpen && images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button 
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 size-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="size-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            src={`${IMAGE_BASE}/${images[activeImgIndex]}`}
                            alt={item.name}
                            className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl bg-white p-4"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Inquiry / Quote Slideout Modal */}
            <AnimatePresence>
                {isInquiryOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
                            onClick={() => {
                                setIsInquiryOpen(false);
                                setInquirySuccess(false);
                            }}
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-lg p-6 md:p-8 z-10 overflow-hidden"
                        >
                            <span className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
                            
                            <button
                                onClick={() => {
                                    setIsInquiryOpen(false);
                                    setInquirySuccess(false);
                                }}
                                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>

                            {!inquirySuccess ? (
                                <>
                                    <h3 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
                                        <Inbox className="size-5 text-cyan-600" />
                                        Request Wholesale Quote
                                    </h3>
                                    <p className="text-zinc-500 text-xs mt-1 mb-6">
                                        Fill out your requirement summary below, and we will get back to you with custom catalog pricing.
                                    </p>
                                    
                                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Contact Person Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="e.g. Sudhanshu Gaur"
                                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Business Email</label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="name@company.com"
                                                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Organization</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    value={formData.org}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, org: e.target.value }))}
                                                    placeholder="Vigyan Jagat Corp"
                                                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Estimated Qty Needed</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.qty}
                                                onChange={(e) => setFormData(prev => ({ ...prev, qty: e.target.value }))}
                                                placeholder="e.g. 50 units, 10 packs"
                                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Inquiry details</label>
                                            <textarea 
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 resize-none"
                                            />
                                        </div>
                                        
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="submit"
                                            disabled={submittingInquiry}
                                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl py-3 px-6 font-semibold shadow-lg shadow-cyan-600/15 flex items-center justify-center gap-2 cursor-pointer mt-6 disabled:opacity-75 transition-all"
                                        >
                                            {submittingInquiry ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="size-4" /> Submit Inquiry
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8 flex flex-col items-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.15, 1] }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <CheckCircle2 className="size-16 text-emerald-500 mb-4" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-zinc-950 mb-2">Request Submitted</h3>
                                    <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
                                        We have received your catalog quote request for <span className="font-semibold text-zinc-800">"{item.name}"</span> and will send wholesale pricing to <span className="font-semibold text-zinc-800">{formData.email}</span> shortly.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsInquiryOpen(false);
                                            setInquirySuccess(false);
                                        }}
                                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-xl py-3 px-8 transition-colors cursor-pointer"
                                    >
                                        Return to Catalog
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}