import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Building2, Layers, FlaskConical, Settings, Send, Loader2, CheckCircle2, ArrowLeft, User, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

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

const fields = [
    {
        id: "name",
        label: "Contact Person Name",
        placeholder: "e.g. Dr. Ramesh Kumar",
        icon: User,
        type: "input",
        inputType: "text",
        required: true,
    },
    {
        id: "email",
        label: "Email Address",
        placeholder: "e.g. ramesh@iitd.ac.in",
        icon: Mail,
        type: "input",
        inputType: "email",
        required: true,
    },
    {
        id: "contact",
        label: "Phone / Contact Number",
        placeholder: "e.g. +91 98765 43210",
        icon: Phone,
        type: "input",
        inputType: "tel",
        required: true,
    },
    {
        id: "institute_name",
        label: "Institute Name",
        placeholder: "e.g. IIT Delhi, AIIMS Patna, DRDO",
        icon: Building2,
        type: "input",
        inputType: "text",
        required: true,
    },
    {
        id: "department",
        label: "Department",
        placeholder: "e.g. Chemistry, Biochemistry, Physics",
        icon: Layers,
        type: "input",
        inputType: "text",
        required: true,
    },
    {
        id: "frequent_items",
        label: "Frequent Items Used",
        placeholder: "e.g. Beakers, Centrifuge tubes, Analytical reagents, Micropipettes...",
        icon: FlaskConical,
        type: "textarea",
        required: true,
        rows: 4,
    },
    {
        id: "customization",
        label: "Customization Requirements",
        placeholder: "Describe any specific branding, sizing, labelling, or special requirements for your institution...",
        icon: Settings,
        type: "textarea",
        required: false,
        rows: 4,
    },
];

export default function InstituteInquiry() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        institute_name: "",
        department: "",
        frequent_items: "",
        customization: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
            await axios.post(`${BackendURL}/institute-inquiry`, form);
            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting institute inquiry:", err);
            setErrorMsg(
                err.response?.data?.detail ||
                "Failed to submit your inquiry. Please try again or contact us directly."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-16 px-6 md:px-12 lg:px-20" style={pageBg}>
            <Helmet>
                <title>Institute Inquiry | ShodhIX — Customised Lab Supply for Institutions</title>
                <meta
                    name="description"
                    content="Submit your institute's lab equipment and chemical requirements to ShodhIX. We provide customised, bulk, and tailored solutions for universities, hospitals, and research labs."
                />
                <link rel="canonical" href="https://shodhix.com/institute-inquiry" />
            </Helmet>

            <div className="max-w-2xl mx-auto">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 hover:text-cyan-600 transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-200 bg-cyan-50 text-xs font-semibold text-cyan-700 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                        Institutional Partnerships
                    </span>
                    <h1 className="text-3xl md:text-4xl font-lora font-bold text-slate-900 tracking-tight leading-tight mb-3">
                        Institute Inquiry
                    </h1>
                    <p className="text-slate-500 text-base leading-relaxed">
                        Tell us about your institution's requirements. We'll reach out with a
                        customised procurement plan tailored to your lab's needs.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-2xl border border-emerald-100 shadow-lg shadow-emerald-900/5 p-10 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                                <CheckCircle2 className="size-8 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-lora font-bold text-slate-900 mb-3">
                                Inquiry Submitted!
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                                Thank you for reaching out. Our team will review your requirements and
                                get back to you with a customised proposal within 1–2 business days.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setForm({ name: "", email: "", contact: "", institute_name: "", department: "", frequent_items: "", customization: "" });
                                    }}
                                    className="px-6 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
                                >
                                    Submit Another
                                </button>
                                <Link to="/">
                                    <button className="px-6 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white text-sm font-semibold transition-colors cursor-pointer">
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl border border-zinc-200 shadow-xl shadow-cyan-900/5 overflow-hidden"
                        >
                            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

                            <div className="p-8 space-y-6">
                                {fields.map((field, idx) => {
                                    const Icon = field.icon;
                                    return (
                                        <motion.div
                                            key={field.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.05 * idx }}
                                        >
                                            <label
                                                htmlFor={field.id}
                                                className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2"
                                            >
                                                <Icon className="size-4 text-cyan-600" />
                                                {field.label}
                                                {field.required && (
                                                    <span className="text-rose-500 text-xs">*</span>
                                                )}
                                                {!field.required && (
                                                    <span className="text-zinc-400 text-xs font-normal">(optional)</span>
                                                )}
                                            </label>
                                            {field.type === "input" ? (
                                                <input
                                                    id={field.id}
                                                    name={field.id}
                                                    type={field.inputType || "text"}
                                                    required={field.required}
                                                    value={form[field.id]}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder}
                                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-slate-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-white transition-all"
                                                />
                                            ) : (
                                                <textarea
                                                    id={field.id}
                                                    name={field.id}
                                                    rows={field.rows}
                                                    required={field.required}
                                                    value={form[field.id]}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder}
                                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-slate-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-white transition-all resize-none"
                                                />
                                            )}
                                        </motion.div>
                                    );
                                })}

                                <AnimatePresence>
                                    {errorMsg && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3"
                                        >
                                            {errorMsg}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    type="submit"
                                    disabled={submitting}
                                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                                    className="w-full flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 disabled:bg-cyan-400 text-white font-semibold py-3.5 rounded-xl text-sm shadow-md shadow-cyan-700/20 transition-all cursor-pointer"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Submitting…
                                        </>
                                    ) : (
                                        <>
                                            <Send className="size-4" />
                                            Submit Inquiry
                                        </>
                                    )}
                                </motion.button>

                                <p className="text-center text-xs text-zinc-400">
                                    By submitting, you agree that ShodhIX may contact you about your requirements.
                                </p>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
