import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Building2,
  Package,
  Calendar,
  RefreshCw,
  Search,
  Eye,
  Inbox,
  FileText,
  X,
  Tag,
  CheckCircle2,
  Clock,
  Trash2
} from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export default function QuotesManagement() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteQuote = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this quotation request? This action cannot be undone.")) {
      return;
    }
    setDeletingId(id);
    try {
      await axios.delete(`${BackendURL}/quotes/${id}`);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote(null);
      }
    } catch (err) {
      console.error("Error deleting quote:", err);
      alert(err.response?.data?.detail || "Failed to delete quotation request.");
    } finally {
      setDeletingId(null);
    }
  };

  const fetchQuotes = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${BackendURL}/quotes`);
      if (res.data && res.data.quotes) {
        setQuotes(res.data.quotes);
      } else {
        setQuotes([]);
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError(
        err.response?.data?.detail || "Failed to load wholesale quote requests."
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filteredQuotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return quotes;
    return quotes.filter((item) => {
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.organization && item.organization.toLowerCase().includes(q)) ||
        (item.product_name && item.product_name.toLowerCase().includes(q)) ||
        (item.subcategory_name && item.subcategory_name.toLowerCase().includes(q)) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q))
      );
    });
  }, [quotes, searchQuery]);

  const uniqueOrgs = useMemo(() => {
    const orgs = new Set(quotes.map((q) => q.organization?.trim()).filter(Boolean));
    return orgs.size;
  }, [quotes]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-100 text-cyan-700">
              <Inbox className="size-5" />
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
              Wholesale Quote Requests
            </h2>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            Manage incoming product inquiries and custom pricing requests from buyers.
          </p>
        </div>

        <button
          onClick={() => fetchQuotes(true)}
          disabled={loading || isRefreshing}
          className="inline-flex items-center justify-center gap-2 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin text-cyan-600" : ""}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
            <FileText className="size-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Total Quotes
            </p>
            <h4 className="text-2xl font-bold text-zinc-900 mt-0.5">{quotes.length}</h4>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Building2 className="size-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Unique Clients
            </p>
            <h4 className="text-2xl font-bold text-zinc-900 mt-0.5">{uniqueOrgs}</h4>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Clock className="size-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Recent Submissions
            </p>
            <h4 className="text-2xl font-bold text-zinc-900 mt-0.5">
              {quotes.filter(q => {
                if (!q.created_at) return false;
                const date = new Date(q.created_at);
                const now = new Date();
                return (now - date) / (1000 * 60 * 60 * 24) <= 7;
              }).length} <span className="text-xs font-normal text-zinc-500">this week</span>
            </h4>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, product, email or company..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 pl-10 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 transition"
          />
          <Search className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs font-mono text-zinc-500">
          Showing <span className="font-bold text-zinc-800">{filteredQuotes.length}</span> of {quotes.length} inquiries
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center shadow-sm">
          <RefreshCw className="size-8 text-cyan-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-600">Loading wholesale quote requests...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700 shadow-sm">
          <p className="font-semibold text-base mb-1">Failed to Load Quotes</p>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchQuotes()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-medium cursor-pointer transition"
          >
            Try Again
          </button>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center shadow-sm">
          <Inbox className="size-10 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-800 mb-1">No Quote Requests Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {searchQuery
              ? `No requests match "${searchQuery}". Try adjusting your search term.`
              : "No wholesale quote inquiries have been submitted yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4">Client / Organization</th>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Est. Qty</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {filteredQuotes.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-cyan-50/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-zinc-400" />
                        {formatDate(q.created_at)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-zinc-900">{q.name}</div>
                      <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Building2 className="size-3 text-zinc-400" />
                          {q.organization}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Mail className="size-3 text-zinc-400" />
                          {q.email}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-semibold text-zinc-900 truncate">
                        {q.product_name}
                      </div>
                      <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">
                          {q.subcategory_name}
                        </span>
                        {q.brand && (
                          <span className="text-zinc-400 text-[11px]">
                            Brand: {q.brand}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <Package className="size-3.5 text-emerald-600" />
                        {q.quantity}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-medium transition cursor-pointer shadow-sm"
                        >
                          <Eye className="size-3.5" />
                          View Quote
                        </button>
                        <button
                          onClick={(e) => handleDeleteQuote(q.id, e)}
                          disabled={deletingId === q.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 rounded-xl text-xs font-medium transition cursor-pointer disabled:opacity-50"
                          title="Delete Quotation"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
              onClick={() => setSelectedQuote(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-2xl p-6 md:p-8 z-10 overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

              <button
                onClick={() => setSelectedQuote(null)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Quote Request #{selectedQuote.id}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Submitted on {formatDate(selectedQuote.created_at)}
                  </p>
                </div>
              </div>

              {/* Grid detail overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Contact Info */}
                <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Client Details
                  </p>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {selectedQuote.name}
                    </p>
                    <p className="text-xs text-zinc-600 flex items-center gap-1.5 mt-1">
                      <Building2 className="size-3.5 text-zinc-400" />
                      {selectedQuote.organization}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/60 space-y-1.5 text-xs text-zinc-700">
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="flex items-center gap-2 hover:text-cyan-600 transition"
                    >
                      <Mail className="size-3.5 text-zinc-400" />
                      {selectedQuote.email}
                    </a>
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="flex items-center gap-2 hover:text-cyan-600 transition"
                    >
                      <Phone className="size-3.5 text-zinc-400" />
                      {selectedQuote.phone}
                    </a>
                  </div>
                </div>

                {/* Product Info */}
                <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Requested Item
                  </p>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {selectedQuote.product_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-600 bg-white border border-zinc-200 px-2.5 py-0.5 rounded-lg">
                        <Tag className="size-3 text-cyan-600" />
                        {selectedQuote.subcategory_name}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium">Quantity Needed:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
                      {selectedQuote.quantity}
                    </span>
                  </div>

                  {selectedQuote.brand && (
                    <div className="text-xs text-zinc-500">
                      Brand: <span className="font-semibold text-zinc-800">{selectedQuote.brand}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Inquiry Message */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Client Note / Inquiry Details
                </label>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm text-zinc-800 leading-relaxed font-sans whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedQuote.message || "No additional message provided."}
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => handleDeleteQuote(selectedQuote.id)}
                  disabled={deletingId === selectedQuote.id}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 rounded-xl text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="size-4" />
                  <span>Delete Quotation</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${selectedQuote.email}?subject=Wholesale%20Quote%20Request%20-%20${encodeURIComponent(selectedQuote.product_name)}`}
                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer shadow-md shadow-cyan-600/15"
                  >
                    <Mail className="size-4" />
                    Reply via Email
                  </a>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-sm font-medium transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
