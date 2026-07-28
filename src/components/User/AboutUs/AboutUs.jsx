import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Beaker,
    Building2,
    MapPin,
    ShieldCheck,
    ArrowUpRight,
    ArrowRight,
} from "lucide-react";

const OFFICES = [
    { city: "Muzaffarpur", state: "Bihar", tag: "Head Office", code: "HQ–01" },
    { city: "Delhi", tag: "Branch Office", code: "BR–02" },
    { city: "Kanpur", tag: "Branch Office", code: "BR–03" },
    { city: "Patna", tag: "Branch Office", code: "BR–04" },
    { city: "Durgapur", tag: "Branch Office", code: "BR–05" },
    { city: "Dehradun", tag: "Branch Office", code: "BR–06" },
];

const BRAND_SAMPLE = [
    "Zeiss", "Shimadzu", "Waters", "Agilent", "PerkinElmer", "Bruker",
    "Sartorius", "Merck", "Cole-Parmer", "Whatman", "IKA", "Hanna",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-white text-slate-900 font-body">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-mono-lab { font-family: 'JetBrains Mono', monospace; }
                .font-body { font-family: 'Inter', sans-serif; }
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

            <div className="relative mx-auto px-6 sm:px-20 py-16">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 text-sky-700 px-3 py-1 text-[11px] font-mono-lab font-medium tracking-widest uppercase mb-5">
                        <Beaker className="h-3.5 w-3.5" />
                        About the Company
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                        Equipping India's labs{" "}
                        <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                            since 1962
                        </span>
                    </h1>
                    <p className="mt-4 text-slate-500 leading-relaxed">
                        Vigyan Jagat is an authorized dealer and supplier of laboratory
                        equipment, chemicals, glassware, and consumables — built on more
                        than six decades of serving research institutions, colleges, and
                        industry across India.
                    </p>
                </motion.div>

                {/* Nameplate stat block — styled like an equipment data plate */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-12 rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden"
                >
                    <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-200 bg-white">
                        <span className="font-mono-lab text-[10px] tracking-widest text-slate-400 uppercase">
                            Registered Entity
                        </span>
                        <span className="font-mono-lab text-[10px] tracking-widest text-cyan-600">
                            EST. 1962
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200">
                        {[
                            { label: "Founded", value: "1962" },
                            { label: "Offices", value: "6" },
                            { label: "Brands Represented", value: "25+" },
                            { label: "Procurement", value: "GeM Listed" },
                        ].map((stat) => (
                            <div key={stat.label} className="px-5 py-5">
                                <p className="font-display text-2xl font-semibold text-slate-800">
                                    {stat.value}
                                </p>
                                <p className="mt-1 font-mono-lab text-[10px] uppercase tracking-wide text-slate-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Story */}
                <div className="mt-20 grid md:grid-cols-5 gap-10 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-3"
                    >
                        <span className="font-mono-lab text-[11px] tracking-widest text-cyan-600 uppercase">
                            Our Story
                        </span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-slate-900">
                            A supply chain built one relationship at a time
                        </h2>
                        <p className="mt-4 text-slate-500 leading-relaxed">
                            From our head office in Muzaffarpur, Bihar, Vigyan Jagat has
                            grown into a multi-city supplier network trusted by
                            laboratories, universities, and industrial buyers. What began
                            as a single storefront in 1962 has expanded into branch
                            offices across Delhi, Kanpur, Patna, Durgapur, and Dehradun —
                            without losing the personal, advisory approach that shaped the
                            business from the start.
                        </p>
                        <p className="mt-4 text-slate-500 leading-relaxed">
                            Today we represent instrumentation, glassware, and chemical
                            brands from across the world, and we operate as a listed
                            supplier on the Government e-Marketplace (GeM), supporting
                            institutional and government procurement alongside our private
                            sector business.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-2"
                    >
                        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-6">
                            <ShieldCheck className="h-6 w-6 text-cyan-600" />
                            <p className="mt-4 font-display text-sm font-semibold text-slate-800">
                                Authorized GeM Supplier
                            </p>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                Vigyan Jagat is registered on the Government e-Marketplace,
                                enabling direct, compliant procurement for government
                                and public institutions.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Office network — spec-plate cards, consistent with the Brands registry */}
                <div className="mt-20">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <span className="font-mono-lab text-[11px] tracking-widest text-cyan-600 uppercase">
                                Our Network
                            </span>
                            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-slate-900">
                                Six offices, one supply line
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {OFFICES.map((office, i) => (
                            <motion.div
                                key={office.code}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: i * 0.04 }}
                                whileHover={{ y: -3 }}
                                className="group relative rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-cyan-300 hover:shadow-md transition-all overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono-lab text-[10px] tracking-wider text-slate-300 group-hover:text-cyan-500 transition-colors">
                                        {office.code}
                                    </span>
                                    <Building2 className="h-3.5 w-3.5 text-slate-200 group-hover:text-cyan-500 transition-colors" />
                                </div>
                                <h3 className="font-display text-[15px] font-semibold text-slate-800 group-hover:text-cyan-700 transition-colors">
                                    {office.city}
                                </h3>
                                <p className="mt-1 flex items-center gap-1 font-mono-lab text-[11px] text-slate-400">
                                    <MapPin className="h-3 w-3" />
                                    {office.tag}
                                </p>
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Brands preview strip */}
                <div className="mt-20">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <span className="font-mono-lab text-[11px] tracking-widest text-cyan-600 uppercase">
                                What We Supply
                            </span>
                            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-slate-900">
                                25+ manufacturers, one point of contact
                            </h2>
                        </div>
                        <Link
                            to="/brands"
                            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-800 transition-colors whitespace-nowrap"
                        >
                            View full registry
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {BRAND_SAMPLE.map((brand) => (
                            <span
                                key={brand}
                                className="font-mono-lab text-xs tracking-wide text-slate-600 border border-slate-200 rounded-full px-3.5 py-1.5 hover:border-cyan-300 hover:text-cyan-700 transition-colors"
                            >
                                {brand}
                            </span>
                        ))}
                        <Link
                            to="/brands"
                            className="sm:hidden inline-flex items-center gap-1.5 font-mono-lab text-xs text-cyan-700 border border-cyan-200 bg-cyan-50 rounded-full px-3.5 py-1.5"
                        >
                            View all
                            <ArrowUpRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}