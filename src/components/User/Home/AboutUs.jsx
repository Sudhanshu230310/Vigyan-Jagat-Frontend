import heroImg from "../../../images/main2.png"

const stats = [
    { value: "1962", label: "Established" },
    { value: "6", label: "Offices across India" },
    { value: "25+", label: "Global brands supplied" },
]

export default function AboutUs() {
    return (
        <section className="w-full mt-20 min-h-[80vh]">
            <div className="mx-10 border  border-gray-300 shadow-md shadow-gray-300 rounded-4xl  my-auto grid h-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-16 lg:py-24">

                {/* ── Text column ───────────────────────────── */}
                <div className="flex flex-col justify-center ">
                    <h2 className=" text-3xl font-sans leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
                        <span className='text-cyan-600'>Trusted</span> by labs
                        <br className="hidden sm:block" /> since 1962
                    </h2>

                    <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-800">
                        Vigyan Jagat is an authorized dealer and supplier of laboratory
                        equipment, chemicals, glassware, and consumables. Headquartered
                        in Muzaffarpur with offices across India, we bring world-class
                        scientific brands to research institutions, universities, and
                        industry — backed by dependable service and GeM-enabled
                        procurement.
                    </p>

                </div>


                {/* inset glass card */}
                <div className="relative mx-auto max-w-2xl rounded-2xl border border-gray-300 bg-white p-4 shadow-xl backdrop-blur-md sm:p-6">
                    <img
                        src={heroImg}
                        alt="Vigyan Jagat laboratory equipment"
                        className="h-64 w-full rounded-xl object-cover sm:h-80 border border-gray-400 lg:h-[20rem]"
                        loading="lazy"
                    />
                    <p className="mt-4 px-1 text-sm leading-relaxed text-neutral-600">
                        Precision instruments, chemicals & glassware from Zeiss,
                        Shimadzu, Agilent, Sartorius and more — delivered across
                        India.
                    </p>
                </div>
            </div>
        </section>
    )
}