import heroImg from "../../images/main.png"

const stats = [
    { value: "1962", label: "Established" },
    { value: "6", label: "Offices across India" },
    { value: "25+", label: "Global brands supplied" },
]

export default function AboutUs() {
    return (
        <section className="w-full bg-black">
            <div className="mx-auto my-40 grid min-h-[80vh] max-w-[1600px] grid-cols-1 items-center gap-12 px-6 pt-16 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-16 lg:py-24">

                {/* ── Text column ───────────────────────────── */}
                <div className="">
                    <h2 className=" text-3xl font-sans leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Trusted by labs
                        <br className="hidden sm:block" /> since 1962
                    </h2>

                    <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-400">
                        Vigyan Jagat is an authorized dealer and supplier of laboratory
                        equipment, chemicals, glassware, and consumables. Headquartered
                        in Muzaffarpur with offices across India, we bring world-class
                        scientific brands to research institutions, universities, and
                        industry — backed by dependable service and GeM-enabled
                        procurement.
                    </p>

                    {/* Stats */}
                    <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-neutral-200 pt-8">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <dd className="text-2xl font-semibold text-white sm:text-3xl">
                                    {stat.value}
                                </dd>
                                <dt className="mt-1 text-xs leading-snug text-white sm:text-sm">
                                    {stat.label}
                                </dt>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* ── Gradient showcase panel ───────────────── */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-100 via-violet-200 to-indigo-400 p-6 sm:p-10 lg:p-14">
                    {/* soft glow accents */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/60 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl"
                    />

                    {/* inset glass card */}
                    <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-md sm:p-6">
                        <img
                            src={heroImg}
                            alt="Vigyan Jagat laboratory equipment"
                            className="h-64 w-full rounded-xl object-cover sm:h-80 lg:h-[26rem]"
                            loading="lazy"
                        />
                        <p className="mt-4 px-1 text-sm leading-relaxed text-neutral-600">
                            Precision instruments, chemicals & glassware from Zeiss,
                            Shimadzu, Agilent, Sartorius and more — delivered across
                            India.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}