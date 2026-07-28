import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Wire this up to your backend / form endpoint of choice.
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="py-10  bg-white text-slate-900 font-body">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-mono-lab { font-family: 'JetBrains Mono', monospace; }
                .font-body { font-family: 'Inter', sans-serif; }
                .input-field {
                    width: 100%;
                    padding: 0.7rem 0.9rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    font-size: 0.9rem;
                    color: #0f172a;
                    outline: none;
                    background: #fff;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }
                .input-field::placeholder { color: #94a3b8; }
                .input-field:focus {
                    border-color: #22d3ee;
                    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.15);
                }
            `}</style>

            {/* faint graph-paper field, consistent across the site */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="relative mx-auto  px-6 sm:px-20 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Left column — info */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-sky-700 px-3 py-1 text-[11px] font-mono-lab font-medium tracking-widest uppercase mb-5">
                            Get in Touch
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                            Contact{" "}
                            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                                us
                            </span>
                        </h1>
                        <p className="mt-4 text-slate-500 leading-relaxed max-w-sm">
                            Have a question about a product, an order, or anything else?
                            Send us a message and our team will get back to you shortly.
                        </p>

                        <div className="mt-10 space-y-5">
                            <ContactRow Icon={Mail} label="Email" value="connect@shodhix.com" />
                            <ContactRow Icon={Phone} label="Phone" value="+91 000 000 0000" />
                            <ContactRow Icon={MapPin} label="Head Office" value="Muzaffarpur, Bihar, India" />
                        </div>
                    </motion.div>

                    {/* Right column — form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-3 rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Field label="Full name">
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="input-field"
                                    required
                                />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Email">
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@company.com"
                                        className="input-field"
                                        required
                                    />
                                </Field>
                                <Field label="Mobile number">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91"
                                        className="input-field"
                                        required
                                    />
                                </Field>
                            </div>

                            <Field label="Message">
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you're looking for"
                                    rows={5}
                                    className="input-field resize-none"
                                    required
                                />
                            </Field>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg text-white font-semibold text-[15px] bg-gradient-to-r from-sky-500 to-cyan-500 hover:brightness-110 shadow-sm hover:shadow-md transition-all"
                            >
                                {submitted ? (
                                    "Message Sent ✓"
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="block text-[13px] font-medium text-slate-700 mb-1.5 font-display">
                {label}
            </span>
            {children}
        </label>
    );
}

function ContactRow({ Icon, label, value }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center bg-cyan-50 border border-cyan-100">
                <Icon size={16} className="text-cyan-600" />
            </div>
            <div>
                <p className="font-mono-lab text-[11px] uppercase tracking-wide text-slate-400">
                    {label}
                </p>
                <p className="text-[14px] font-medium text-slate-800">{value}</p>
            </div>
        </div>
    );
}