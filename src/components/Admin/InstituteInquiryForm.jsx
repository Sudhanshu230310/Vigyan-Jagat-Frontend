import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Layers,
    FlaskConical,
    Settings,
    Send,
    Loader2,
    CheckCircle2,
    RotateCcw,
    User,
    Mail,
    Phone,
} from "lucide-react";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const EMPTY_FORM = {
    name: "",
    email: "",
    contact: "",
    institute_name: "",
    department: "",
    frequent_items: "",
    customization: "",
};

const fields = [
    {
        id: "name",
        label: "Contact Person Name",
        placeholder: "e.g. Dr. Ramesh Kumar",
        icon: User,
        type: "input",
        inputType: "text",
        required: true,
        col: "third",
    },
    {
        id: "email",
        label: "Email Address",
        placeholder: "e.g. ramesh@iitd.ac.in",
        icon: Mail,
        type: "input",
        inputType: "email",
        required: true,
        col: "third",
    },
    {
        id: "contact",
        label: "Phone / Contact Number",
        placeholder: "e.g. +91 98765 43210",
        icon: Phone,
        type: "input",
        inputType: "tel",
        required: true,
        col: "third",
    },
    {
        id: "institute_name",
        label: "Institute Name",
        placeholder: "e.g. IIT Delhi, AIIMS Patna, DRDO",
        icon: Building2,
        type: "input",
        inputType: "text",
        required: true,
        col: "half",
    },
    {
        id: "department",
        label: "Department",
        placeholder: "e.g. Chemistry, Biochemistry, Physics",
        icon: Layers,
        type: "input",
        inputType: "text",
        required: true,
        col: "half",
    },
    {
        id: "frequent_items",
        label: "Frequent Items Used",
        placeholder: "e.g. Beakers, Centrifuge tubes, Analytical reagents, Micropipettes...",
        icon: FlaskConical,
        type: "textarea",
        required: true,
        rows: 4,
        col: "full",
    },
    {
        id: "customization",
        label: "Customization Requirements",
        placeholder: "Describe specific branding, sizing, labelling, or special requirements...",
        icon: Settings,
        type: "textarea",
        required: false,
        rows: 4,
        col: "full",
    },
];

export default function InstituteInquiryForm() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [lastSubmitted, setLastSubmitted] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errorMsg) setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");
        try {
            const res = await axios.post(`${BackendURL}/institute-inquiry`, form);
            setLastSubmitted({ ...form, id: res.data.inquiry_id });
            setSubmitted(true);
            setForm(EMPTY_FORM);
        } catch (err) {
            console.error("Error submitting institute inquiry:", err);
            setErrorMsg(
                err.response?.data?.detail ||
                "Failed to submit. Please check your connection and try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full px-6 md:px-12 lg:px-20 py-8">
            {/* Page header */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FlaskConical className="size-5 text-cyan-600" />
                    Add Institute Inquiry
                </h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                    Manually record a new institute inquiry into the system
                </p>
            </div>

            <div className="w-full">
                {/* Success banner */}
                <AnimatePresence>
                    {submitted && lastSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6 flex items-start gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4"
                        >
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="size-4 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-emerald-800">
                                    Inquiry #{lastSubmitted.id} saved successfully
                                </p>
                                <p className="text-xs text-emerald-600 mt-0.5">
                                    <span className="font-semibold">{lastSubmitted.institute_name}</span>
                                    {" — "}{lastSubmitted.department}
                                </p>
                            </div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-emerald-500 hover:text-emerald-700 transition-colors text-xs font-semibold flex-shrink-0 cursor-pointer"
                            >
                                Dismiss
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form card */}
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                    {/* Top accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        {/* Two-column grid for short inputs, full-width for textareas */}
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                            {fields.map((field) => {
                                const Icon = field.icon;
                                const colSpan =
                                    field.col === "full"
                                        ? "md:col-span-6"
                                        : field.col === "half"
                                        ? "md:col-span-3"
                                        : "md:col-span-2";
                                return (
                                    <div key={field.id} className={colSpan}>
                                        <label
                                            htmlFor={`admin-${field.id}`}
                                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            <Icon className="size-4 text-cyan-600" />
                                            {field.label}
                                            {field.required ? (
                                                <span className="text-rose-500 text-xs">*</span>
                                            ) : (
                                                <span className="text-zinc-400 text-xs font-normal">(optional)</span>
                                            )}
                                        </label>

                                        {field.type === "input" ? (
                                            <input
                                                id={`admin-${field.id}`}
                                                name={field.id}
                                                type={field.inputType || "text"}
                                                required={field.required}
                                                value={form[field.id]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-slate-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-white transition-all"
                                            />
                                        ) : (
                                            <textarea
                                                id={`admin-${field.id}`}
                                                name={field.id}
                                                rows={field.rows}
                                                required={field.required}
                                                value={form[field.id]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-slate-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-white transition-all resize-none"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {errorMsg && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-4 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
                                >
                                    {errorMsg}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-100">
                            <motion.button
                                type="submit"
                                disabled={submitting}
                                whileHover={{ scale: submitting ? 1 : 1.02 }}
                                whileTap={{ scale: submitting ? 1 : 0.98 }}
                                className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-400 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-cyan-700/20 transition-all cursor-pointer"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <Send className="size-4" />
                                        Save Inquiry
                                    </>
                                )}
                            </motion.button>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm(EMPTY_FORM);
                                    setErrorMsg("");
                                    setSubmitted(false);
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="size-4" />
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                {/* Helper note */}
                <p className="text-xs text-zinc-400 mt-4 text-center">
                    Saved entries will appear immediately in the <strong>Institute Inquiries</strong> tab.
                </p>
            </div>
        </div>
    );
}
