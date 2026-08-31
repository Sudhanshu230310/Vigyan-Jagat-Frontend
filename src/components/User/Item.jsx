import { useParams, useNavigate, Link } from "react-router-dom";
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
    Globe,
    Tag,
    ChevronRight,
    Copy,
    Check,
    FileText,
    Building2,
    Layers,
    SlidersHorizontal,
    PhoneCall
} from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || BackendURL;

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

function SpecTable({ title, rows, onRequestVariantQuote }) {
    const [filterQuery, setFilterQuery] = useState("");
    const [copiedCode, setCopiedCode] = useState(null);
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

    const handleCopyCode = (code) => {
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {title && (
                    <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-900 flex items-center gap-2 font-bold">
                        <span className="w-2 h-4 bg-cyan-600 rounded-full" />
                        {title}
                    </h3>
                )}
                {rows.length > 3 && (
                    <div className="relative max-w-xs w-full ml-auto">
                        <input
                            type="text"
                            value={filterQuery}
                            onChange={(e) => setFilterQuery(e.target.value)}
                            placeholder="Filter technical variants..."
                            className="w-full rounded-2xl border border-zinc-200 bg-white/90 px-4 py-2 pl-9 text-xs text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 shadow-xs"
                        />
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 size-3.5" />
                    </div>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/90 backdrop-blur-xl shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-left">
                        <thead>
                            <tr className="bg-zinc-50/80 border-b border-zinc-200/90 text-zinc-500 font-semibold font-mono text-[11px] uppercase tracking-wider">
                                {columns.map((col) => (
                                    <th
                                        key={col}
                                        className={`whitespace-nowrap px-6 py-4 ${isPriceCol(col) ? "text-right" : ""}`}
                                    >
                                        {col}
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-right">Quote</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            <AnimatePresence initial={false}>
                                {filteredRows.map((row, i) => {
                                    const codeVal = columns.find(c => isCodeCol(c)) ? row[columns.find(c => isCodeCol(c))] : null;
                                    return (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2, delay: Math.min(i * 0.015, 0.15) }}
                                            className="hover:bg-cyan-50/30 transition-colors group"
                                        >
                                            {columns.map((col) => {
                                                const val = row[col];
                                                const isCode = isCodeCol(col);
                                                const isPrice = isPriceCol(col);

                                                return (
                                                    <td
                                                        key={col}
                                                        className={`whitespace-nowrap px-6 py-3.5 text-zinc-700 ${isCode
                                                            ? "font-mono text-zinc-900 font-semibold text-xs"
                                                            : ""
                                                            } ${isPrice
                                                                ? "text-right font-semibold text-cyan-700 tabular-nums text-sm"
                                                                : ""
                                                            }`}
                                                    >
                                                        {isCode && val ? (
                                                            <div className="flex items-center gap-2">
                                                                <span>{val}</span>
                                                                <button
                                                                    onClick={() => handleCopyCode(val)}
                                                                    title="Copy item code"
                                                                    className="text-zinc-300 hover:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    {copiedCode === val ? (
                                                                        <Check className="size-3.5 text-emerald-600" />
                                                                    ) : (
                                                                        <Copy className="size-3.5" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        ) : isPrice && val != null ? (
                                                            `₹ ${val}`
                                                        ) : typeof val === 'object' && val !== null ? (
                                                            JSON.stringify(val)
                                                        ) : (
                                                            val ?? "—"
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            <td className="px-6 py-3.5 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => onRequestVariantQuote && onRequestVariantQuote(row)}
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-900 hover:underline cursor-pointer"
                                                >
                                                    Inquire
                                                    <ChevronRight className="size-3" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>

                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="text-center py-10 text-zinc-400 text-sm">
                                        No matching variants found.
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
            duration: 0.5,
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
    const [submitError, setSubmitError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
                message: `Hi, I would like to request a quote for "${item.name}" (Brand: ${item.brand || "N/A"}). Please provide wholesale pricing, packaging variants, and lead time information.`
            }));
        }
    }, [item]);

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        setSubmittingInquiry(true);
        setSubmitError(null);
        axios
            .post(`${BackendURL}/quote`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                organization: formData.org,
                quantity: formData.qty,
                message: formData.message,
                product_name: item.name,
                subcategory_name: SubcategoryName,
                brand: item.brand || null
            })
            .then(() => {
                setInquirySuccess(true);
            })
            .catch((err) => {
                console.error(err);
                setSubmitError(
                    err.response?.data?.detail || "Failed to submit request. Please try again."
                );
            })
            .finally(() => setSubmittingInquiry(false));
    };

    const handleVariantInquire = (row) => {
        const rowDetails = Object.entries(row)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ");

        setFormData(prev => ({
            ...prev,
            message: `Hi, I would like to request a wholesale quote for "${item?.name}" variant (${rowDetails}). Please share availability and pricing tier details.`
        }));
        setIsInquiryOpen(true);
    };

    /* Loading State */
    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={pageBg}>
                <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-3xl p-10 shadow-lg text-center flex flex-col items-center max-w-sm w-full">
                    <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin mb-4" />
                    <h3 className="text-base font-bold text-zinc-900">Loading Product Catalog</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">Fetching specifications for "{itemName}"...</p>
                </div>
            </div>
        );
    }

    /* Error State */
    if (error) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 text-center" style={pageBg}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-3xl p-8 max-w-md shadow-2xl"
                >
                    <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <X className="size-6" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 mb-2">Item Unavailable</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl py-3 px-6 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                        <ArrowLeft className="size-4" /> Back to Catalog
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!item) return null;

    const specs = item.specifications || {};
    const scalarEntries = [];
    const tableEntries = [];
    const listEntries = [];

    Object.entries(specs).forEach(([title, val]) => {
        if (val === null || val === undefined) return;

        if (Array.isArray(val)) {
            if (val.length > 0) {
                if (typeof val[0] === "object" && val[0] !== null) {
                    tableEntries.push([title, val]);
                } else {
                    listEntries.push([title, val.map((item) => String(item))]);
                }
            }
        } else if (typeof val === "object") {
            Object.entries(val).forEach(([subKey, subVal]) => {
                if (subVal !== null && subVal !== undefined) {
                    if (typeof subVal === "object") {
                        scalarEntries.push([subKey, JSON.stringify(subVal)]);
                    } else {
                        scalarEntries.push([subKey, String(subVal)]);
                    }
                }
            });
        } else {
            scalarEntries.push([title, String(val)]);
        }
    });

    const images = (Array.isArray(item.images) ? item.images : []).filter(Boolean);
    const hasImages = images.length > 0;

    return (
        <div className="relative w-full min-h-screen pb-24 overflow-hidden" style={pageBg}>
            <motion.div
                variants={pageVariants}
                initial="hidden"
                animate="show"
                className=" mx-auto px-6 md:px-12 lg:px-16 pt-8 relative z-10"
            >
                {/* Breadcrumbs Navigation */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-zinc-200 text-cyan-900 hover:bg-white hover:border-cyan-400 transition cursor-pointer shadow-xs"
                    >
                        <ArrowLeft className="size-3.5" />
                        Back to {SubcategoryName}
                    </button>
                    <span className="text-zinc-300">/</span>
                    <span className="text-zinc-600 font-semibold truncate max-w-xs">{item.name}</span>
                </motion.div>

                {/* Main Product Showcase Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white/85 backdrop-blur-xl border border-zinc-200/90 shadow-xl shadow-cyan-900/5 rounded-3xl p-6 md:p-10"
                >
                    <div className={hasImages ? "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" : "flex flex-col h-full justify-between"}>

                        {/* Image Showcase Gallery (LHS) */}
                        {hasImages && (
                            <div className="lg:col-span-5 flex flex-col gap-4">
                                <div className="relative group/image overflow-hidden bg-white rounded-2xl border border-zinc-200/80 p-8 flex items-center justify-center min-h-[340px] max-h-[400px] shadow-xs hover:shadow-md transition-shadow duration-300">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImgIndex}
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.2 }}
                                            src={`${IMAGE_BASE}/${images[activeImgIndex]}`}
                                            alt={item.name}
                                            className="max-h-72 w-auto object-contain cursor-zoom-in select-none"
                                            onClick={() => setIsLightboxOpen(true)}
                                        />
                                    </AnimatePresence>

                                    <motion.button
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        onClick={() => setIsLightboxOpen(true)}
                                        className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-950 text-white size-9 rounded-xl flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer"
                                        title="Zoom image"
                                    >
                                        <Maximize2 className="size-4" />
                                    </motion.button>
                                </div>

                                {/* Thumbnail Selector */}
                                {images.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto py-1 shrink-0 scrollbar-none">
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImgIndex(i)}
                                                className={`relative size-16 rounded-xl border-2 overflow-hidden p-1.5 bg-white cursor-pointer transition-all duration-200 shrink-0 ${activeImgIndex === i
                                                    ? "border-cyan-500 ring-4 ring-cyan-100 scale-102"
                                                    : "border-zinc-200/80 hover:border-zinc-300"
                                                    }`}
                                            >
                                                <img src={`${IMAGE_BASE}/${img}`} alt={`Thumbnail ${i}`} className="h-full w-full object-contain" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Product Information & Actions (RHS) */}
                        <div className={hasImages ? "lg:col-span-7 flex flex-col h-full justify-between" : "flex flex-col h-full justify-between"}>
                            <div>
                                {/* Badges */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {item.brand && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-mono font-semibold rounded-full uppercase">
                                            <Sparkles className="size-3 text-cyan-600" />
                                            Brand: {item.brand}
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 border border-zinc-200/80 text-zinc-700 text-xs font-mono font-semibold rounded-full uppercase">
                                        <Tag className="size-3 text-zinc-500" />
                                        {SubcategoryName}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="mt-3.5 text-3xl lg:text-4xl font-lora font-semibold tracking-tight text-zinc-900 capitalize leading-snug">
                                    {item.name}
                                </h1>

                                {/* Description */}
                                {item.description && (
                                    <p className="mt-4 text-zinc-600 leading-relaxed text-sm md:text-base max-w-4xl">
                                        {item.description}
                                    </p>
                                )}

                                {/* Scalar Specification Cards */}
                                {scalarEntries.length > 0 && (
                                    <div className={`grid grid-cols-2 sm:grid-cols-3 ${hasImages ? "" : "md:grid-cols-4 lg:grid-cols-5"} gap-3.5 mt-8`}>
                                        {scalarEntries.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="bg-zinc-50/80 border border-zinc-200/80 rounded-2xl p-3.5 flex flex-col hover:border-cyan-400/50 hover:bg-white transition-all duration-200"
                                            >
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1 truncate" title={key}>
                                                    {key}
                                                </span>
                                                <span className="font-bold text-zinc-800 text-sm capitalize truncate" title={typeof value === 'object' ? JSON.stringify(value) : String(value)}>
                                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Feature Lists / Applications / Bullet Specs */}
                                {listEntries.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                        {listEntries.map(([title, items]) => (
                                            <div key={title} className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-4">
                                                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-900 font-bold mb-3 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-cyan-600 rounded-full shrink-0" />
                                                    {title}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {items.map((itemStr, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700 leading-relaxed">
                                                            <CheckCircle2 className="size-3.5 text-cyan-600 shrink-0 mt-0.5" />
                                                            <span>{itemStr}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* B2B Procurement Trust Bar & CTA */}
                            <div className="mt-10 pt-8 border-t border-zinc-200/80">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-2xl">
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-medium">
                                        <div className="size-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                                            <Shield className="size-4" />
                                        </div>
                                        <span>Certified Quality</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-medium">
                                        <div className="size-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                                            <Package className="size-4" />
                                        </div>
                                        <span>Bulk Packaging</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-medium">
                                        <div className="size-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                                            <Globe className="size-4" />
                                        </div>
                                        <span>Pan India Express</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button
                                        onClick={() => setIsInquiryOpen(true)}
                                        className="w-full sm:w-auto flex-1 max-w-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-2xl py-3.5 px-8 text-sm font-semibold shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                                    >
                                        <Inbox className="size-4.5" /> Request Wholesale Quote
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Table Specifications & Variants */}
                {tableEntries.length > 0 && (
                    <motion.section
                        variants={itemVariants}
                        className="mt-12 space-y-10"
                    >
                        <div className="flex items-center gap-3 border-b border-zinc-200/90 pb-4">
                            <SlidersHorizontal className="size-5 text-cyan-600" />
                            <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-zinc-800 font-bold">
                                Technical Specifications &amp; Catalog Variants
                            </h2>
                        </div>
                        <div className="space-y-10">
                            {tableEntries.map(([title, rows]) => (
                                <SpecTable
                                    key={title}
                                    title={tableEntries.length > 1 ? title : null}
                                    rows={rows}
                                    onRequestVariantQuote={handleVariantInquire}
                                />
                            ))}
                        </div>
                    </motion.section>
                )}
            </motion.div>

            {/* Lightbox / Image Zoom Modal */}
            <AnimatePresence>
                {isLightboxOpen && images.length > 0 && (
                    <div
                        className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/10 size-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
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
                            className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl bg-white p-6"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </AnimatePresence>

            {/* Wholesale Quote Request Modal */}
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
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                                            <Inbox className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900">
                                                Request Wholesale Quote
                                            </h3>
                                            <p className="text-zinc-500 text-xs">
                                                Custom B2B pricing &amp; procurement info
                                            </p>
                                        </div>
                                    </div>

                                    <div className="my-4 p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs text-zinc-700 flex items-center gap-2">
                                        <Tag className="size-4 text-cyan-600 shrink-0" />
                                        <span className="truncate font-semibold">{item.name}</span>
                                    </div>

                                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Contact Person Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="e.g. Sudhanshu Gaur"
                                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
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
                                                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="+91 98765 43210"
                                                    pattern="[+]?[0-9\s\-]{7,15}"
                                                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Organization / Firm Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.org}
                                                onChange={(e) => setFormData(prev => ({ ...prev, org: e.target.value }))}
                                                placeholder="Vigyan Jagat Corp"
                                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                                            />
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
                                            <label className="block text-[10px] font-semibold text-zinc-500 mb-1.5 uppercase font-mono tracking-wider">Inquiry Details</label>
                                            <textarea
                                                required
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 resize-none"
                                            />
                                        </div>

                                        {submitError && (
                                            <p className="text-red-500 text-xs font-medium text-center">{submitError}</p>
                                        )}

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
                                    <h3 className="text-xl font-bold text-zinc-950 mb-2">Request Submitted</h3>
                                    <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
                                        We have received your catalog quote request for <span className="font-semibold text-zinc-800">"{item.name}"</span> and will send wholesale pricing to <span className="font-semibold text-zinc-800">{formData.email}</span> shortly.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsInquiryOpen(false);
                                            setInquirySuccess(false);
                                        }}
                                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl py-3 px-8 transition-colors cursor-pointer shadow-md"
                                    >
                                        Return to Product Page
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