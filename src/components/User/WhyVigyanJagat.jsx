import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const features = [
  {
    title: 'Quality & Compliance',
    description:
      'Source products backed by quality certifications, safety documentation, and regulatory compliance.',
  },
  {
    title: 'Verified Chemical Suppliers',
    description:
      'Partner with trusted manufacturers, distributors, and exporters who meet industry standards.',
  },
  {
    title: 'Competitive Bulk Pricing',
    description:
      'Compare quotes from multiple suppliers and secure the best prices for your business.',
  },
  {
    title: 'Fast & Secure Procurement',
    description:
      'Simplify sourcing with quick inquiries, efficient communication, and secure order management.',
  },
  {
    title: 'Global Sourcing Network',
    description:
      'Access a worldwide network of verified suppliers across every major chemical category.',
  },
  {
    title: 'Dedicated Support',
    description:
      'Get expert guidance from our team for every step of your procurement journey.',
  },
]

export function WhyVigyanJagat() {
  const [startIndex, setStartIndex] = useState(0)

  const visibleCount = 4
  const maxStart = Math.max(0, features.length - visibleCount)

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStart, prev + 1))
  }

  const visibleFeatures = features.slice(startIndex, startIndex + visibleCount)

  return (
    <div className="min-h-screen flex justify-center items-center">
      <section className="py-12 pb-30 bg-gray-200 px-6 md:px-8">
        {/* Heading */}
        <h2 className="flex justify-center text-3xl md:text-4xl font-semibold font-sans mb-10 text-zinc-900 tracking-tight">
          Why Vigyan Jagat ??
        </h2>

        {/* Carousel container */}
        <div className="relative border border-gray-300 rounded-3xl p-6 md:p-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border-2 border-zinc-400 bg-white/80 backdrop-blur-sm text-zinc-600 flex items-center justify-center transition-all duration-200 hover:bg-white hover:border-zinc-600 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:border-zinc-400 disabled:hover:text-zinc-600"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={startIndex >= maxStart}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border-2 border-zinc-400 bg-white/80 backdrop-blur-sm text-zinc-600 flex items-center justify-center transition-all duration-200 hover:bg-white hover:border-zinc-600 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:border-zinc-400 disabled:hover:text-zinc-600"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-8">
            {visibleFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[220px]"
              >
                <h3 className="text-base font-bold text-zinc-900 mb-4 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
