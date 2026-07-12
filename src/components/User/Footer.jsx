import { Youtube, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black h-[60vh] text-white pt-16 pb-6 px-6 md:px-12 relative overflow-hidden w-full">

      {/* Top Main Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative z-10">

        {/* Left: Logo */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="text-2xl font-extrabold tracking-tight select-none">
            <span className="text-blue-400 pr-2">Vigyan</span>Jagat
          </div>
        </div>

        {/* Center: Legal Links */}
        <div className="flex-1 flex flex-col items-center gap-2.5 text-[13.5px] text-zinc-400 font-medium">
          <a href="#" className="hover:text-white transition-colors duration-200">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            Refund & Cancellation
          </a>
        </div>

        {/* Right: Socials & Copyright */}
        <div className="flex-1 w-full flex flex-col items-center md:items-end gap-3">
          {/* Social Icons Grid */}
          <div className="flex gap-2">
            <a
              href="#"
              className="w-11 h-11 rounded-xl bg-zinc-900/60 border border-zinc-800/40 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-xl bg-zinc-900/60 border border-zinc-800/40 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all duration-200"
              aria-label="Twitter/X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-xl bg-zinc-900/60 border border-zinc-800/40 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-xl bg-zinc-900/60 border border-zinc-800/40 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Small Copyright Text */}
        </div>

      </div>

      {/* Bottom: Giant Background Text */}
      <div className="mt-12 select-none pointer-events-none text-center relative z-0">
        <h2
          className="font-black tracking-widest md:text-[9vw] text-[10vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-950/5 to-transparent select-none uppercase"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <div className="flex justify-center">Vigyan Jagat</div>
        </h2>
      </div>

    </footer>
  )
}
