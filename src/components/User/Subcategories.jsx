import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";

const GlasswareAndPlasticware = [
    { name: "Beakers", description: "High-quality laboratory beakers for mixing, heating, and measuring liquids." },
    { name: "Bottles & Containers", description: "Laboratory bottles and containers for safe storage and transportation of chemicals." },
    { name: "Burettes", description: "High-precision burettes designed for titration and analytical laboratory work." },
    { name: "Cryogenic Storage Ware", description: "Cryogenic storage products designed for ultra-low temperature sample preservation." },
    { name: "Desiccators", description: "Laboratory desiccators for moisture-free storage of sensitive materials and chemicals." },
    { name: "Distillation Glassware", description: "Complete distillation glassware for chemical separation and purification processes." },
    { name: "Flasks", description: "Laboratory flasks for chemical reactions, mixing, and sample preparation." },
    { name: "Funnels & Filtration Ware", description: "Laboratory funnels and filtration equipment for efficient liquid separation." },
    { name: "General Laboratory Glassware & Plasticware", description: "Comprehensive range of laboratory glassware and plasticware for scientific and industrial applications." },
    { name: "Joints, Adapters & Tubing", description: "Laboratory joints, adapters, and tubing for secure apparatus connections." },
    { name: "Laboratory Racks & Holders", description: "Laboratory racks and holders for organized storage of glassware and instruments." },
    { name: "Measuring Cylinders", description: "Graduated measuring cylinders for precise liquid volume measurement." },
    { name: "Microplates & Well Plates", description: "Microplates and well plates for high-throughput screening and laboratory assays." },
    { name: "Microscope Slides & Cover Glasses", description: "Premium microscope slides and cover glasses for microscopy and specimen analysis." },
    { name: "Petri Dishes & Culture Ware", description: "Sterile petri dishes and culture ware for microbiology and cell culture applications." },
    { name: "Pipettes & Droppers", description: "Precision pipettes and droppers for accurate liquid transfer and dispensing." },
    { name: "Sample & Specimen Containers", description: "Secure containers for collecting, storing, and transporting laboratory samples." },
    { name: "Tubes", description: "Laboratory tubes for sample storage, testing, and chemical analysis." },
    { name: "Vials", description: "Glass and plastic vials for sample storage, pharmaceuticals, and laboratory testing." },
    { name: "Volumetric Glassware", description: "Precision volumetric glassware for accurate measurement and solution preparation." },
];

const LabEquipmentsAndInstruments = [
    { name: "Autoclaves & Sterilizers", description: "Reliable autoclaves and sterilizers for laboratory sterilization and safety." },
    { name: "Balances & Weighing Equipment", description: "Precision balances and weighing equipment for accurate laboratory measurements." },
    { name: "Cell Culture Equipment", description: "Cell culture equipment for biological research and tissue engineering applications." },
    { name: "Centrifuges", description: "High-performance centrifuges for sample separation and laboratory applications." },
    { name: "Chromatography Systems", description: "Chromatography systems for chemical separation and analytical research." },
    { name: "Cooling & Refrigeration Equipment", description: "Cooling and refrigeration systems for safe storage of laboratory samples and reagents." },
    { name: "Electrophoresis Equipment", description: "Electrophoresis equipment for DNA, RNA, and protein analysis." },
    { name: "Environmental & Temperature Monitoring Instruments", description: "Monitoring instruments for environmental conditions and temperature control." },
    { name: "Filtration & Vacuum Equipment", description: "Filtration and vacuum systems for efficient laboratory sample processing." },
    { name: "General Laboratory Equipment", description: "Comprehensive range of laboratory equipment for research, testing, and industrial applications." },
    { name: "Heating Equipment", description: "Laboratory heating equipment for controlled sample processing and experiments." },
    { name: "Homogenizers & Disruptors", description: "Homogenizers and disruptors for sample preparation and cell disruption." },
    { name: "Incubators", description: "Laboratory incubators for controlled environmental conditions in research applications." },
    { name: "Laboratory Pumps", description: "Durable laboratory pumps for fluid transfer, filtration, and vacuum applications." },
    { name: "Laboratory Safety Equipment", description: "Essential laboratory safety equipment for secure and compliant work environments." },
    { name: "Microbiology Equipment", description: "Laboratory equipment designed for microbiology research and microbial analysis." },
    { name: "Microscopes", description: "Advanced microscopes for scientific research, education, and analysis." },
    { name: "Ovens & Furnaces", description: "High-quality laboratory ovens and furnaces for drying, heating, and thermal processing." },
    { name: "Particle Size & Material Analysis Instruments", description: "Instruments for particle size measurement and advanced material characterization." },
    { name: "PCR & Thermal Cyclers", description: "PCR systems and thermal cyclers for molecular biology and genetic research." },
    { name: "pH & Electrochemistry Meters", description: "Accurate pH and electrochemistry meters for laboratory testing and analysis." },
    { name: "Pipettes & Liquid Handling Equipment", description: "Precision pipettes and liquid handling systems for accurate sample dispensing." },
    { name: "Shakers & Rockers", description: "Laboratory shakers and rockers for consistent mixing and incubation applications." },
    { name: "Spectrophotometers & Photometers", description: "Reliable spectrophotometers and photometers for quantitative laboratory analysis." },
    { name: "Stirrers & Mixers", description: "Laboratory stirrers and mixers for efficient sample preparation and mixing." },
    { name: "Water Baths & Circulators", description: "Water baths and circulators for precise temperature control in laboratory procedures." },
    { name: "Water Purification Systems", description: "Advanced water purification systems for producing high-purity laboratory water." },
];

const ChemicalReagent = [
    { name: "Acids", description: "High-purity laboratory acids for analytical, research, and industrial applications." },
    { name: "Analytical Reagents", description: "High-purity analytical reagents for precise testing and quality control." },
    { name: "Bases & Alkalis", description: "Premium laboratory bases and alkalis for chemical synthesis and analysis." },
    { name: "Biochemical Reagents", description: "Biochemical reagents for life science research, diagnostics, and laboratory studies." },
    { name: "Buffers & Solutions", description: "Ready-to-use buffer solutions for laboratory experiments and analytical procedures." },
    { name: "Cell Culture & Microbiology Reagents", description: "Quality reagents for cell culture, microbiology, and biological research applications." },
    { name: "General Laboratory Reagents", description: "Comprehensive range of laboratory reagents for routine research and testing applications." },
    { name: "Indicators, Stains & Dyes", description: "Laboratory indicators, stains, and dyes for chemical analysis and biological applications." },
    { name: "Molecular Biology Reagents", description: "Specialized reagents for molecular biology, genomics, and biotechnology research." },
    { name: "Salts", description: "High-quality laboratory salts for research, testing, and industrial use." },
    { name: "Solvents", description: "Analytical-grade solvents for laboratories, pharmaceuticals, and chemical processing." },
    { name: "Standards & Reference Materials", description: "Certified reference materials and standards for calibration and laboratory validation." },
];

const LabConsumables = [
    { name: "Cell Culture Consumables", description: "High-quality consumables for cell culture, tissue culture, and biological research." },
    { name: "Chromatography Consumables", description: "Chromatography consumables for efficient separation and analytical applications." },
    { name: "Cleaning & Wiping Consumables", description: "Cleaning and wiping consumables for maintaining laboratory hygiene and equipment." },
    { name: "Cryogenic Consumables", description: "Cryogenic consumables for ultra-low temperature storage of biological samples." },
    { name: "Cuvettes", description: "Optically clear cuvettes for spectrophotometry and laboratory measurements." },
    { name: "Filters & Membranes", description: "Premium filters and membranes for laboratory filtration and sample preparation." },
    { name: "General Laboratory Consumables", description: "Comprehensive range of laboratory consumables for research, testing, and industrial applications." },
    { name: "Labels, Tapes & Sealing Consumables", description: "Labels, sealing tapes, and accessories for secure sample identification and storage." },
    { name: "Microbiology Consumables", description: "Laboratory consumables for microbiological testing, culturing, and analysis." },
    { name: "Microplates & Well Plates", description: "Microplates and well plates for high-throughput screening and laboratory assays." },
    { name: "Microscopy Consumables", description: "Essential consumables for microscopy, specimen preparation, and imaging." },
    { name: "PCR & Molecular Biology Consumables", description: "Consumables for PCR, genomics, molecular biology, and biotechnology research." },
    { name: "Personal Protective Consumables", description: "Disposable personal protective consumables for laboratory safety and compliance." },
    { name: "Petri Dishes & Culture Plates", description: "Sterile petri dishes and culture plates for microbiology and cell culture applications." },
    { name: "Pipette Tips", description: "High-quality pipette tips for precise and contamination-free liquid handling." },
    { name: "Sample Collection Consumables", description: "Reliable consumables for safe and efficient laboratory sample collection." },
    { name: "Sample Storage Consumables", description: "Consumables designed for secure storage and preservation of laboratory samples." },
    { name: "Syringes & Needles", description: "Disposable syringes and needles for accurate liquid transfer and sampling." },
    { name: "Tubes & Microtubes", description: "Laboratory tubes and microtubes for sample storage, processing, and analysis." },
    { name: "Weighing & Sampling Consumables", description: "Consumables for accurate weighing, sampling, and laboratory preparation tasks." },
];

// Category -> short prefix used for the specimen-tag label on each card
const CATEGORY_PREFIX = {
    "laboratory consumables": "LC",
    "chemical & reagent": "CR",
    "laboratory equipments and instruments": "EQ",
    "glassware & plasticware": "GP",
};

const cardVariants = {
    initial: {
        y: 0,
        boxShadow:
            "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.04)"
    },
    hover: {
        y: -6,
        boxShadow:
            "0 18px 40px rgba(37, 99, 235, 0.12), 0 6px 18px rgba(8, 145, 178, 0.10)"
    }
};

const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5 }
};

function SubcategoryCard({ item, prefix, onClick }) {
    const tagLabel = `${prefix}-${String(item._idx + 1).padStart(2, "0")}`;

    return (
        <motion.article
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.985 }}
            variants={cardVariants}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group relative flex flex-col h-full min-h-[15rem] bg-white rounded-2xl border border-gray-300 overflow-hidden cursor-pointer"
        >
            {/* Thin accent rail */}
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300" />

            <div className="flex flex-col flex-grow gap-4 p-6 pt-7">
                {/* Specimen tag + name */}
                <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[11px] tracking-wider text-cyan-600/90">
                        {tagLabel}
                    </span>
                    <h3 className="text-[17px] font-medium text-zinc-900 capitalize leading-snug">
                        {item.name}
                    </h3>
                </div>

                {/* Description */}
                {item.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {item.description}
                    </p>
                )}

                {/* CTA pinned to the bottom */}
                <div className="mt-auto pt-2 flex items-center gap-1.5 text-sm font-medium text-blue-600">
                    Open
                    <motion.span variants={arrowVariants} transition={{ duration: 0.25 }}>
                        →
                    </motion.span>
                </div>
            </div>
        </motion.article>
    );
}

export default function Subcategory() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const cat = categoryName?.toLowerCase();
    const source =
        cat === "laboratory consumables" ? LabConsumables :
            cat === "chemical & reagent" ? ChemicalReagent :
                cat === "laboratory equipments and instruments" ? LabEquipmentsAndInstruments :
                    cat === "glassware & plasticware" ? GlasswareAndPlasticware :
                        [];

    const prefix = CATEGORY_PREFIX[cat] || "GN";

    // Stable catalog index per item, preserved through filtering.
    const indexed = useMemo(
        () => source.map((s, i) => ({ ...s, _idx: i })),
        [source]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return indexed;
        return indexed.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                (s.description || "").toLowerCase().includes(q)
        );
    }, [indexed, query]);

    if (source.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-zinc-400 text-lg"
                >
                    No subcategories found for{" "}
                    <span className="font-semibold text-zinc-600">"{categoryName}"</span>.
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-8">
            <div className="mx-auto w-screen px-6 md:px-10 pb-24">
                {/* Back link */}
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className="mt-8 flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-cyan-700 transition-colors"
                >
                    <motion.span
                        whileHover={{ x: -3 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                    >
                        ←
                    </motion.span>
                    All categories
                </motion.button>

                {/* Header block */}
                <header className="mt-8 border-b border-zinc-200/80 pb-8">
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-600">
                        Catalog
                    </p>
                    <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h1 className="text-3xl lg:text-4xl font-sans tracking-tight text-zinc-900 capitalize max-w-3xl leading-[1.1]">
                            {categoryName}
                        </h1>

                        {/* Search */}
                        <div className="relative w-full md:w-72 shrink-0">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search subcategories"
                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pr-9 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                <SearchIcon className="size-4" />
                            </span>
                        </div>
                    </div>

                    <p className="mt-5 text-sm text-zinc-500">
                        <span className="font-medium text-zinc-700">{filtered.length}</span>{" "}
                        {filtered.length === 1 ? "subcategory" : "subcategories"}
                        {query && (
                            <>
                                {" "}matching{" "}
                                <span className="text-zinc-700">"{query}"</span>
                            </>
                        )}
                    </p>
                </header>

                {/* Empty search state */}
                {filtered.length === 0 && (
                    <div className="text-center py-28 text-zinc-400 text-lg">
                        No subcategories match{" "}
                        <span className="font-semibold text-zinc-600">"{query}"</span>.
                    </div>
                )}

                {/* Grid */}
                {filtered.length > 0 && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.04 } }
                        }}
                        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filtered.map((item) => (
                            <motion.div
                                key={item.name}
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <SubcategoryCard
                                    item={item}
                                    prefix={prefix}
                                    onClick={() =>
                                        navigate(`/products/${encodeURIComponent(item.name)}`)
                                    }
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}