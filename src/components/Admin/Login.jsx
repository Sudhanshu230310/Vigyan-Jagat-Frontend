import React, { useState } from "react";
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || import.meta.env.ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || import.meta.env.ADMIN_PASSWORD;

        if (form.email.trim() === adminEmail && form.password.trim() === adminPassword) {
            setSubmitted(true);
            setError("");
            setTimeout(() => {
                setSubmitted(false);
                navigate('/admin');
            }, 800);
        } else {
            setError("Invalid email or password. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen w-full">
            <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                {/* Left column */}
                <div className="px-6 lg:px-10 min-h-[280px] lg:min-h-screen flex flex-col w-full bg-cyan-100 py-10 lg:py-0">
                    <div onClick={() => { navigate("/") }} className="cursor-pointer pt-2 lg:pt-10 text-2xl font-bold"><span className="text-cyan-500">S</span>hodhIX</div>
                    <div className="flex-1 flex flex-col justify-center py-8 lg:py-0 mt-10 lg:mt-0">
                        <p className="text-[13px] font-semibold tracking-widest text-[#3FAE8C] mb-4">
                            WELCOME BACK
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-6">
                            Log In
                        </h1>
                        <p className="text-[15px] leading-relaxed text-[#6B6B6B] max-w-md mb-10">
                            Sign in to access your Vigyan Jagat account — track orders, view
                            catalog pricing, and manage your procurement requests.
                        </p>

                        <div className="space-y-6">
                            <ContactRow
                                color="#5B4FE9"
                                Icon={Mail}
                                label="Registered Email"
                                value="Use the email linked to your account"
                            />
                            <ContactRow
                                color="#3FAE8C"
                                Icon={Lock}
                                label="Password"
                                value="Forgot it? Reset it below"
                            />
                            <ContactRow
                                color="#D9694F"
                                Icon={ShieldCheck}
                                label="Secure Access"
                                value="Your data is kept private and protected"
                            />
                        </div>
                    </div>

                </div>

                {/* Right column - form card */}
                <div className="bg-white w-full flex flex-col justify-center lg:min-h-screen shadow-sm p-6 sm:p-8 md:p-10 lg:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                                {error}
                            </div>
                        )}

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

                        <Field label="Password">
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="input-field"
                                required
                            />
                        </Field>

                        <button
                            type="submit"
                            disabled={submitted}
                            className="w-full py-3.5 rounded-xl text-white font-semibold text-[15px] hover:scale-[1.02] transition-all duration-100 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: "#20B6C7" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#20B6C0")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#20B6C7")}
                        >
                            {submitted ? "Logged In ✓" : "Log In"}
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