import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function Navbar({ onToggleSidebar, onOpenMobileMenu }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileInputRef = useRef(null);

  // Autofocus the input when the mobile search opens
  useEffect(() => {
    if (mobileSearchOpen) {
      mobileInputRef.current?.focus();
    }
  }, [mobileSearchOpen]);

  const handleSearch = () => {
    const query = search.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setMobileSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-16 px-4 flex items-center justify-between bg-white backdrop-blur-xl border-b border-zinc-200">
      {/* ===== Mobile search overlay (< lg), YT Music style ===== */}
      {mobileSearchOpen && (
        <div className="absolute inset-0 z-10 flex lg:hidden items-center gap-2 px-2 bg-white">
          {/* Back — closes search */}
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="w-10 h-10 shrink-0 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-700"
            aria-label="Close search"
          >
            <BackIcon />
          </button>

          <input
            ref={mobileInputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="flex-1 min-w-0 h-11 bg-transparent text-zinc-900 placeholder:text-zinc-400 outline-none text-base"
          />

          {/* Clear text (only when there's text) */}
          {search && (
            <button
              onClick={() => {
                setSearch("");
                mobileInputRef.current?.focus();
              }}
              className="w-9 h-9 shrink-0 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500"
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}

          {/* Submit search */}
          <button
            onClick={handleSearch}
            className="w-10 h-10 shrink-0 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-700"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      )}

      {/* ===== Left ===== */}
      <div className="flex items-center gap-3">
        {/* Mobile: opens drawer */}
        <button
          onClick={onOpenMobileMenu}
          className="flex md:hidden w-10 h-10 rounded-full hover:bg-zinc-100 items-center justify-center text-zinc-700 cursor-pointer"
        >
          <MenuIcon />
        </button>

        {/* Desktop: toggles sidebar panel */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex w-10 h-10 rounded-full hover:bg-zinc-100 items-center justify-center text-zinc-700 cursor-pointer"
        >
          <MenuIcon />
        </button>

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold">
            S
          </div>

          <div className="hidden sm:block">
            <h1 className="text-zinc-900 font-semibold text-lg">
              Shodhix
            </h1>
          </div>
        </div>
      </div>

      {/* ===== Center Search (lg and up) ===== */}
      <div className="hidden lg:flex flex-1 justify-end px-10">
        <div className="flex w-full max-w-2xl">
          <div className="flex items-center flex-1 bg-white border border-zinc-300 rounded-l-xl px-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="bg-transparent text-zinc-900 placeholder:text-zinc-400 w-full h-11 px-3 outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-16 bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-xl hover:bg-zinc-200 transition flex items-center justify-center text-zinc-600"
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* ===== Right ===== */}
      <div className="flex items-center gap-3">
        {/* < lg: opens the full-navbar search overlay */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="lg:hidden w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-700"
          aria-label="Open search"
        >
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}