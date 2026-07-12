import { useParams, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

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
]

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
]

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
]

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
]

// ---- Category → short prefix used for the specimen-tag label on each card ----
const CATEGORY_PREFIX = {
    "laboratory consumables": "LC",
    "chemical & reagent": "CR",
    "laboratory equipments and instruments": "EQ",
    "glassware & plasticware": "GP",
};

// ---- Motion variants ----

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.045,
            delayChildren: 0.08,
        },
    },
};

const cardEntranceVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

const cardHoverVariants = {
    rest: {
        scale: 1,
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
    },
    hover: {
        scale: 1.03,
        y: -6,
        boxShadow: `
      0 15px 35px rgba(59, 130, 246, 0.25),
      0 25px 60px rgba(173, 216, 230, 0.70),
      0 0 50px rgba(180, 255, 255, 0.50)
    `
    }
}

const textVariants = {
    initial: { opacity: 0, width: 0, marginRight: 0 },
    hover: { opacity: 1, width: "auto", marginRight: 6 }
}

const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 4 }
}

const tagVariants = {
    rest: { opacity: 0.55, y: 0 },
    hover: { opacity: 1, y: -1 }
}

function SubcategoryCard({ app, index, prefix, onClick }) {
    const tagLabel = `${prefix}-${String(index + 1).padStart(2, "0")}`;

    return (
        <motion.div
            variants={cardEntranceVariants}
            className="h-full w-full"
        >
            <motion.div
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                animate="rest"
                variants={cardHoverVariants}
                onClick={onClick}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer"
            >
                {/* Colored top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300" />

                {/* Specimen-style tag, top right */}
                <motion.span
                    variants={tagVariants}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute top-4 right-5 font-mono text-[11px] tracking-wider text-cyan-700/70 select-none"
                >
                    {tagLabel}
                </motion.span>

                {/* Card Body */}
                <div className="flex flex-col justify-between p-5 pt-6 flex-grow gap-5 text-left">
                    <div>
                        <h3 className="text-base font-sans font-semibold text-zinc-900 capitalize leading-snug mb-2 pr-10">
                            {app.name}
                        </h3>
                        {app.description && (
                            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                                {app.description}
                            </p>
                        )}
                    </div>

                    {/* Bottom: Open CTA */}
                    <div className="flex items-center font-semibold text-sm text-zinc-800 mt-1">
                        <motion.span
                            variants={textVariants}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="inline-block overflow-hidden whitespace-nowrap"
                        >
                            Open
                        </motion.span>
                        <motion.span
                            variants={arrowVariants}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="ml-0.5"
                        >
                            →
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Subcategory() {
    const params = useParams();
    const { categoryName } = params;
    const navigate = useNavigate();

    const getSubcategories = () => {
        const cat = categoryName?.toLowerCase();
        if (cat === "laboratory consumables") return LabConsumables;
        if (cat === "chemical & reagent") return ChemicalReagent;
        if (cat === "laboratory equipments and instruments") return LabEquipmentsAndInstruments;
        if (cat === "glassware & plasticware") return GlasswareAndPlasticware;
        return [];
    };

    const subcategories = getSubcategories();
    const prefix = CATEGORY_PREFIX[categoryName?.toLowerCase()] || "GN";

    if (subcategories.length === 0) {
        return (
            <div className="w-full min-h-screen pt-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-20 text-zinc-400 text-lg"
                >
                    No subcategories found for <span className="font-sans text-zinc-600">"{categoryName}"</span>.
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen pt-14 relative">
            {/* Ambient graph-paper backdrop — a quiet nod to the lab notebook */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            <section className="w-full px-6 md:px-8 pb-10 text-black space-y-8 pb-20 relative">
                {/* Back link */}
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-cyan-700 transition-colors"
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

                {/* Header */}
                <div className="space-y-3">
                    <motion.h2
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:text-4xl text-3xl pb-4 capitalize font-sans text-zinc-900"
                    >
                        {categoryName}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3"
                    >
                        <span className="font-mono text-xs tracking-widest text-cyan-700 uppercase">
                            {String(subcategories.length).padStart(2, "0")} catalogued
                        </span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                            style={{ transformOrigin: "left" }}
                            className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-cyan-400 to-transparent"
                        />
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                    {subcategories.map((app, index) => (
                        <SubcategoryCard
                            key={app.name}
                            app={app}
                            index={index}
                            prefix={prefix}
                            onClick={() => navigate(`/products/${app.name}`)}
                        />
                    ))}
                </motion.div>
            </section>
        </div>
    );
}