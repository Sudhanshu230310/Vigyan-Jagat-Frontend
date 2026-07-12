import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "../../icons/Search";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);



export function Navbar({
  onToggleSidebar,
  onOpenMobileMenu,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <header
      className="sticky top-0 z-50 h-16 px-4 flex items-center justify-between bg-white/95 backdrop-blur-xl border-b border-zinc-200"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile: opens drawer */}
        <button
          onClick={onOpenMobileMenu}
          className="flex md:hidden w-10 h-10 rounded-full hover:bg-zinc-100 items-center justify-center text-zinc-700"
        >
          <MenuIcon />
        </button>

        {/* Desktop: toggles sidebar panel */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex w-10 h-10 rounded-full hover:bg-zinc-100 items-center justify-center text-zinc-700"
        >
          <MenuIcon />
        </button>

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
            V
          </div>

          <div className="hidden sm:block">
            <h1 className="text-zinc-900 font-semibold text-lg">
              Vigyan Jagat
            </h1>
          </div>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex flex-1 justify-end px-10">
        <div className="flex w-full max-w-2xl">
          <div className="flex items-center flex-1 bg-white border border-zinc-300 rounded-l-full px-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent text-zinc-900 placeholder:text-zinc-400 w-full h-11 px-3 outline-none"
            />
          </div>

          <button
            className="w-16 bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-full hover:bg-zinc-200 transition flex items-center justify-center text-zinc-600"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-700">
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}