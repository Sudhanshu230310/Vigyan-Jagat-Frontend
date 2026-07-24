import React, { useState } from "react";
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    const [form, setForm] = useState({
        fullName: "",
        businessName: "",
        email: "",
        phone: "",
        region: "",
        category: "Laboratory Instruments",
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
        <div className="min-w-screen flex items-center justify-center w-[100vw]">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left column */}
                <div className="px-10 h-[95vh] flex flex-col justify-center w-full bg-cyan-100">
                    <p className="text-[13px] font-semibold tracking-widest text-[#3FAE8C] mb-4">
                        APPLY NOW
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-6">
                        Contact Us
                    </h1>
                    <p className="text-[15px] leading-relaxed text-[#6B6B6B] max-w-md mb-10">
                        Tell us about your business and region. Our partnerships team
                        responds within 48 hours with catalog access and pricing tiers.
                    </p>

                    <div className="space-y-6">
                        <ContactRow
                            color="#5B4FE9"
                            Icon={Mail}
                            label="Email"
                            value="sampark@vigyanjagat.com"
                        />
                        <ContactRow
                            color="#3FAE8C"
                            Icon={Phone}
                            label="Phone"
                            value="+91 000 000 0000"
                        />
                        <ContactRow
                            color="#D9694F"
                            Icon={MapPin}
                            label="Head Office"
                            value="Muzaffarpur, Bihar, India"
                        />
                    </div>
                </div>

                {/* Right column - form card */}
                <div className="bg-white h-[95vh] flex flex-col justify-center rounded-2xl shadow-sm p-8 md:p-9">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Full name">
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="input-field"
                                />
                            </Field>
                            <Field label="Business name">
                                <input
                                    name="businessName"
                                    value={form.businessName}
                                    onChange={handleChange}
                                    placeholder="Company / firm"
                                    className="input-field"
                                />
                            </Field>
                        </div>

                        <Field label="Email">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                className="input-field"
                            />
                        </Field>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Phone">
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91"
                                    className="input-field"
                                />
                            </Field>
                            <Field label="Region / State">
                                <input
                                    name="region"
                                    value={form.region}
                                    onChange={handleChange}
                                    placeholder="e.g. Maharashtra"
                                    className="input-field"
                                />
                            </Field>
                        </div>

                        <Field label="Category of interest">
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="input-field appearance-none bg-white"
                            >
                                <option>Laboratory Instruments</option>
                                <option>Laboratory Chemicals</option>
                                <option>Glassware</option>
                                <option>Consumables</option>
                                <option>Other</option>
                            </select>
                        </Field>

                        <Field label="Message">
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us about your business"
                                rows={4}
                                className="input-field resize-none"
                            />
                        </Field>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl text-white font-semibold text-[15px] hover:scale-102 transition-all duration-100"
                            style={{ background: "#20B6C7" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#20B6C0")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#20B6C7")}
                        >
                            {submitted ? "Application Sent ✓" : "Submit Application"}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        .input-field {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border: 1px solid #E4E1D9;
          border-radius: 0.65rem;
          font-size: 0.9rem;
          color: #1C1C1C;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .input-field::placeholder {
          color: #A9A69E;
        }
        .input-field:focus {
          border-color: #5B4FE9;
          box-shadow: 0 0 0 3px rgba(91, 79, 233, 0.12);
        }
      `}</style>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="block text-[13px] font-semibold text-[#1C1C1C] mb-2">
                {label}
            </span>
            {children}
        </label>
    );
}

function ContactRow({ color, Icon, label, value }) {
    return (
        <div className="flex items-center gap-4">
            <div
                className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center"
                style={{ background: `${color}1A` }}
            >
                <Icon size={16} color={color} />
            </div>
            <div>
                <p className="text-[14px] font-semibold text-[#1C1C1C]">{label}</p>
                <p className="text-[13px] text-[#6B6B6B]">{value}</p>
            </div>
        </div>
    );
}