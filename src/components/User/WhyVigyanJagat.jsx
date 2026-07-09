import { useRef, useEffect } from 'react'

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
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let intervalId

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container

        // Wrap around to 0 if we reached the end (with 10px tolerance)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth',
          })
        } else {
          container.scrollTo({
            left: scrollLeft + 300, // Scroll roughly by one card width
            behavior: 'smooth',
          })
        }
      }, 3000) // Scroll every 3 seconds
    }

    startAutoScroll()

    // Pause scrolling when mouse is over or screen is touched
    const handlePause = () => clearInterval(intervalId)
    const handleResume = () => startAutoScroll()

    container.addEventListener('mouseenter', handlePause)
    container.addEventListener('mouseleave', handleResume)
    container.addEventListener('touchstart', handlePause, { passive: true })
    container.addEventListener('touchend', handleResume, { passive: true })

    return () => {
      clearInterval(intervalId)
      container.removeEventListener('mouseenter', handlePause)
      container.removeEventListener('mouseleave', handleResume)
      container.removeEventListener('touchstart', handlePause)
      container.removeEventListener('touchend', handleResume)
    }
  }, [])

  return (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <section className="py-12 pb-20 bg-gray-200 px-4 md:px-8 ">
        {/* Heading */}
        <h2 className="flex justify-center text-3xl md:text-4xl font-semibold font-sans mb-10 text-zinc-900 tracking-tight">
          Why Vigyan Jagat ??
        </h2>

        {/* Carousel container */}
        <div className="relative p-4 md:p-6 bg-gray-200">
          {/* Cards Scrollable Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[200px] w-[260px] sm:w-[320px] flex-shrink-0"
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

