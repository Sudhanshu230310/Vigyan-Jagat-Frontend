import { Users, Globe, Smile } from 'lucide-react'

/* Custom 4-square grid icon matching the red product icon in the design */
function ProductsIcon() {
  return (
    <div className="grid grid-cols-2 gap-[3px] w-6 h-6">
      <div className="rounded-sm bg-red-500 w-full h-full" />
      <div className="rounded-sm bg-red-400 w-full h-full" />
      <div className="rounded-sm bg-red-400 w-full h-full" />
      <div className="rounded-sm bg-red-500 w-full h-full" />
    </div>
  )
}

const stats = [
  {
    icon: <ProductsIcon />,
    value: '15k+',
    label: 'products',
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-500" strokeWidth={1.8} />,
    value: '15k+',
    label: 'users',
  },
  {
    icon: <Globe className="w-6 h-6 text-green-600" strokeWidth={1.8} />,
    value: '20+',
    label: 'states',
  },
  {
    icon: <Smile className="w-6 h-6 text-orange-400" strokeWidth={1.8} />,
    value: '98%',
    label: 'buyers satisfaction',
  },
]

export function StatsBar() {
  return (
    <div className="w-full px-4">
      <div className="border border-black rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-y-6 gap-x-4 bg-white">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 flex-1 min-w-[140px]">
            {/* Icon */}
            <div className="flex-shrink-0">{stat.icon}</div>

            {/* Text */}
            <div className="leading-tight">
              <div className="text-base font-bold text-zinc-900">{stat.value}</div>
              <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
