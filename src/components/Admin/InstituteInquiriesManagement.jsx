import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Layers,
    FlaskConical,
    Settings,
    Calendar,
    RefreshCw,
    Search,
    Eye,
    Inbox,
    X,
    Trash2,
    ClipboardList,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function DetailModal({ inquiry, onClose }) {
    if (!inquiry) return null;
    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-2xl shadow-2xl shadow-black/20 w-full max-w-lg border border-zinc-100 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-gradient-to-r from-cyan-50 to-blue-50">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center">
                                <ClipboardList className="size-4 text-cyan-700" />
                            </div>
                            <div>
                                <p className="text-xs font-mono text-zinc-400">INQ-{String(inquiry.id).padStart(4, "0")}</p>
                                <h3 className="text-sm font-bold text-slate-800 leading-tight">{inquiry.institute_name}</h3>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="px-6 py-5 space-y-5">
                        <Row icon={Building2} label="Institute" value={inquiry.institute_name} />
                        <Row icon={Layers} label="Department" value={inquiry.department} />
                        <Row icon={FlaskConical} label="Frequent Items" value={inquiry.frequent_items} multiline />
                        <Row icon={Settings} label="Customization" value={inquiry.customization || "—"} multiline />
                        <Row icon={Calendar} label="Submitted" value={formatDate(inquiry.created_at)} />
                    </div>

                    <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-white transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function Row({ icon: Icon, label, value, multiline }) {
    return (
        <div className="flex gap-3">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                <Icon className="size-3.5 text-cyan-600" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-400 font-medium mb-0.5">{label}</p>
                <p className={`text-sm text-slate-800 font-medium ${multiline ? "whitespace-pre-wrap break-words" : "truncate"}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function InstituteInquiriesManagement() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const fetchInquiries = async (showRefreshSpinner = false) => {
        if (showRefreshSpinner) setIsRefreshing(true);
        else setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${BackendURL}/institute-inquiries`);
            if (res.data && res.data.inquiries) {
                setInquiries(res.data.inquiries);
            }
        } catch (err) {
            console.error("Error fetching institute inquiries:", err);
            setError(err.response?.data?.detail || "Failed to load institute inquiries.");
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        if (!window.confirm("Delete this institute inquiry? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            await axios.delete(`${BackendURL}/institute-inquiries/${id}`);
            setInquiries((prev) => prev.filter((q) => q.id !== id));
            if (selectedInquiry?.id === id) setSelectedInquiry(null);
        } catch (err) {
            console.error("Error deleting inquiry:", err);
            alert(err.response?.data?.detail || "Failed to delete inquiry.");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = useMemo(() => {
        if (!searchQuery.trim()) return inquiries;
        const q = searchQuery.toLowerCase();
        return inquiries.filter(
            (i) =>
                i.institute_name?.toLowerCase().includes(q) ||
                i.department?.toLowerCase().includes(q) ||
                i.frequent_items?.toLowerCase().includes(q) ||
                i.customization?.toLowerCase().includes(q)
        );
    }, [inquiries, searchQuery]);

    return (
        <div className="w-full px-6 md:px-12 lg:px-20 py-8">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <ClipboardList className="size-5 text-cyan-600" />
                        Institute Inquiries
                        <span className="ml-2 text-sm font-semibold text-zinc-400 bg-zinc-100 px-2.5 py-0.5 rounded-full">
                            {inquiries.length}
                        </span>
                    </h2>
                    <p className="text-sm text-zinc-400 mt-0.5">All institution procurement inquiries submitted via the site</p>
                </div>
                <button
                    onClick={() => fetchInquiries(true)}
                    disabled={isRefreshing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors disabled:opacity-60 cursor-pointer shadow-sm"
                >
                    <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin text-cyan-500" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by institute, department, or items..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-slate-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent shadow-sm"
                />
            </div>

            {/* States */}
            {loading && (
                <div className="flex items-center justify-center py-24">
                    <RefreshCw className="size-7 animate-spin text-cyan-500" />
                </div>
            )}

            {!loading && error && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-rose-500 text-sm font-medium mb-4">{error}</p>
                    <button
                        onClick={() => fetchInquiries()}
                        className="px-5 py-2 rounded-xl bg-cyan-700 text-white text-sm font-semibold hover:bg-cyan-600 transition-colors cursor-pointer"
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4">
                        <Inbox className="size-7 text-zinc-400" />
                    </div>
                    <p className="text-slate-600 font-semibold text-sm">No inquiries found</p>
                    <p className="text-zinc-400 text-xs mt-1">
                        {searchQuery ? "Try a different search term" : "Institute inquiries will appear here once submitted"}
                    </p>
                </div>
            )}

            {/* Cards grid */}
            {!loading && !error && filtered.length > 0 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                    {filtered.map((inq) => (
                        <motion.div
                            key={inq.id}
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            className="group bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all overflow-hidden"
                        >
                            {/* Card top accent */}
                            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400" />

                            <div className="p-5">
                                {/* Card header */}
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Building2 className="size-4 text-cyan-700" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-mono text-zinc-400 mb-0.5">INQ-{String(inq.id).padStart(4, "0")}</p>
                                            <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                                                {inq.institute_name}
                                            </h3>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(inq.id, e)}
                                        disabled={deletingId === inq.id}
                                        className="p-1.5 rounded-lg text-zinc-300 hover:text-rose-500 hover:bg-rose-50 transition-colors flex-shrink-0 cursor-pointer"
                                        title="Delete"
                                    >
                                        {deletingId === inq.id ? (
                                            <RefreshCw className="size-3.5 animate-spin" />
                                        ) : (
                                            <Trash2 className="size-3.5" />
                                        )}
                                    </button>
                                </div>

                                {/* Fields */}
                                <div className="space-y-2.5 mb-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Layers className="size-3.5 text-zinc-400 flex-shrink-0" />
                                        <span className="truncate">{inq.department}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-slate-500">
                                        <FlaskConical className="size-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                                        <span className={`${expandedId === inq.id ? "" : "line-clamp-2"} break-words`}>
                                            {inq.frequent_items}
                                        </span>
                                    </div>
                                    {inq.customization && (
                                        <div className="flex items-start gap-2 text-xs text-slate-500">
                                            <Settings className="size-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                                            <span className={`${expandedId === inq.id ? "" : "line-clamp-2"} break-words`}>
                                                {inq.customization}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                        <Calendar className="size-3" />
                                        {formatDate(inq.created_at)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                                            className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors cursor-pointer"
                                            title={expandedId === inq.id ? "Collapse" : "Expand"}
                                        >
                                            {expandedId === inq.id ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                                        </button>
                                        <button
                                            onClick={() => setSelectedInquiry(inq)}
                                            className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors cursor-pointer"
                                            title="View details"
                                        >
                                            <Eye className="size-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Detail modal */}
            {selectedInquiry && (
                <DetailModal inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />
            )}
        </div>
    );
}
