import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  Search,
  Eye,
  MessageSquare,
  X,
  User,
  Clock,
  Send
} from "lucide-react";

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function ContactMessagesManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMessages = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${BackendURL}/contacts`);
      if (res.data && res.data.messages) {
        setMessages(res.data.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Error fetching contact messages:", err);
      setError(
        err.response?.data?.detail || "Failed to load contact page messages."
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((item) => {
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q))
      );
    });
  }, [messages, searchQuery]);

  const uniqueSenders = useMemo(() => {
    const emails = new Set(messages.map((m) => m.email?.trim()).filter(Boolean));
    return emails.size;
  }, [messages]);

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
              <MessageSquare className="size-5" />
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
              Contact Page Messages
            </h2>
          </div>
          <p className="text-zinc-500 text-sm mt-1">
            View and respond to inquiries submitted through the website contact form.
          </p>
        </div>

        <button
          onClick={() => fetchMessages(true)}
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
            <MessageSquare className="size-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Total Messages
            </p>
            <h4 className="text-2xl font-bold text-zinc-900 mt-0.5">{messages.length}</h4>
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <User className="size-6" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Unique Contacts
            </p>
            <h4 className="text-2xl font-bold text-zinc-900 mt-0.5">{uniqueSenders}</h4>
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
              {messages.filter(m => {
                if (!m.created_at) return false;
                const date = new Date(m.created_at);
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
            placeholder="Search by sender, email, phone or message content..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 pl-10 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 transition"
          />
          <Search className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs font-mono text-zinc-500">
          Showing <span className="font-bold text-zinc-800">{filteredMessages.length}</span> of {messages.length} messages
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center shadow-sm">
          <RefreshCw className="size-8 text-cyan-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-zinc-600">Loading contact page messages...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700 shadow-sm">
          <p className="font-semibold text-base mb-1">Failed to Load Messages</p>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchMessages()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-medium cursor-pointer transition"
          >
            Try Again
          </button>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center shadow-sm">
          <MessageSquare className="size-10 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-800 mb-1">No Messages Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {searchQuery
              ? `No messages match "${searchQuery}". Try adjusting your search term.`
              : "No contact messages have been submitted through the website yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4">Sender Details</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Message Snippet</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {filteredMessages.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-cyan-50/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-zinc-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-zinc-400" />
                        {formatDate(m.created_at)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-zinc-900">{m.name}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-zinc-600 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Mail className="size-3 text-zinc-400" />
                          <a href={`mailto:${m.email}`} className="hover:text-cyan-600 transition">{m.email}</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="size-3 text-zinc-400" />
                          <a href={`tel:${m.phone}`} className="hover:text-cyan-600 transition">{m.phone}</a>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {m.message}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedMessage(m)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-medium transition cursor-pointer shadow-sm"
                      >
                        <Eye className="size-3.5" />
                        View Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
              onClick={() => setSelectedMessage(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white border border-zinc-200 shadow-2xl rounded-3xl w-full max-w-xl p-6 md:p-8 z-10 overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Contact Message #{selectedMessage.id}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Received on {formatDate(selectedMessage.created_at)}
                  </p>
                </div>
              </div>

              {/* Sender Details */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 mb-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Sender Information
                </p>

                <div>
                  <p className="text-base font-bold text-zinc-900">
                    {selectedMessage.name}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-2 hover:text-cyan-600 transition"
                  >
                    <Mail className="size-3.5 text-zinc-400" />
                    {selectedMessage.email}
                  </a>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="flex items-center gap-2 hover:text-cyan-600 transition"
                  >
                    <Phone className="size-3.5 text-zinc-400" />
                    {selectedMessage.phone}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Message Body
                </label>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm text-zinc-800 leading-relaxed font-sans whitespace-pre-wrap max-h-56 overflow-y-auto">
                  {selectedMessage.message || "No message content."}
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Inquiry%20Response%20-%20Vigyan%20Jagat`}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer shadow-md shadow-cyan-600/15"
                >
                  <Send className="size-4" />
                  Reply via Email
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
