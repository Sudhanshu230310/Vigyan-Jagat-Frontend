import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "../../icons/Search";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || BackendURL;

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

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchContainerRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Autofocus the input when the mobile search opens
  useEffect(() => {
    if (mobileSearchOpen) {
      mobileInputRef.current?.focus();
    }
  }, [mobileSearchOpen]);

  // Debounced search for autocomplete suggestions
  useEffect(() => {
    const q = search.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      setLoadingSuggestions(true);
      axios
        .get(`${BackendURL}/search?q=${encodeURIComponent(q)}`)
        .then((res) => {
          setSuggestions(res.data?.results || []);
          setIsOpen(true);
          setSelectedIndex(-1);
        })
        .catch((err) => {
          console.error("Autocomplete error:", err);
          setSuggestions([]);
        })
        .finally(() => setLoadingSuggestions(false));
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const query = search.trim();
    if (!query) return;
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setMobileSearchOpen(false);
  };

  const handleSelectProduct = (item) => {
    setIsOpen(false);
    setSearch(item.name);
    setMobileSearchOpen(false);
    navigate(
      `/products/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.name)}`
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        e.preventDefault();
        handleSelectProduct(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setMobileSearchOpen(false);
    }
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

          <div className="relative flex-1">
            <input
              ref={mobileInputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setIsOpen(true);
              }}
              placeholder="Search products..."
              className="w-full h-11 bg-transparent text-zinc-900 placeholder:text-zinc-400 outline-none text-base"
            />

            {/* Mobile Autocomplete Popup */}
            {isOpen && search.trim().length >= 2 && (
              <div className="absolute left-0 right-0 top-12 bg-white border border-zinc-200 rounded-2xl shadow-2xl py-2 z-50 max-h-[70vh] overflow-y-auto">
                {loadingSuggestions ? (
                  <div className="px-4 py-3 text-xs text-zinc-500 flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /> Searching products...
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-zinc-500">
                    No products matching "{search}"
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Product Suggestions
                    </div>
                    {suggestions.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectProduct(item)}
                        className="px-4 py-2.5 hover:bg-cyan-50 flex items-center gap-3 cursor-pointer border-b border-zinc-100 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 overflow-hidden border border-zinc-200">
                          {item.images && item.images.length > 0 ? (
                            <img
                              src={`${IMAGE_BASE}/${item.images[0]}`}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-zinc-400">📦</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate">
                            {item.subcategory} {item.brand ? `• ${item.brand}` : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div
                      onClick={handleSearch}
                      className="px-4 py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50 cursor-pointer text-center border-t border-zinc-100"
                    >
                      View all results for "{search}" →
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

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
              Shodh<span className="text-cyan-600">IX</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ===== Center Search with Autocomplete (lg and up) ===== */}
      <div className="hidden lg:flex flex-1 justify-end px-10 relative" ref={searchContainerRef}>
        <div className="flex w-full max-w-2xl relative">
          <div className="flex items-center flex-1 bg-white border border-zinc-300 rounded-l-xl px-5 transition focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setIsOpen(true);
              }}
              placeholder="Search equipment, chemicals, glassware..."
              className="bg-transparent text-zinc-900 placeholder:text-zinc-400 w-full h-11 px-3 outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="w-16 bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-xl hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition flex items-center justify-center text-zinc-600 cursor-pointer"
          >
            <SearchIcon />
          </button>

          {/* Autocomplete Dropdown Popup */}
          <AnimatePresence>
            {isOpen && search.trim().length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-14 bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                {loadingSuggestions ? (
                  <div className="px-5 py-4 text-xs text-zinc-500 flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    Searching matching products...
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="px-5 py-4 text-xs text-zinc-500 text-center">
                    No products found matching "<span className="font-semibold text-zinc-800">{search}</span>"
                  </div>
                ) : (
                  <div>
                    <div className="px-5 py-2.5 bg-zinc-50 border-b border-zinc-100 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center justify-between">
                      <span>Products &amp; Equipment</span>
                      <span>{suggestions.length} matches</span>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-zinc-50">
                      {suggestions.slice(0, 7).map((item, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleSelectProduct(item)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`px-5 py-3 flex items-center gap-4 cursor-pointer transition-colors ${isSelected ? "bg-cyan-50/80 text-cyan-900" : "hover:bg-zinc-50 text-zinc-800"
                              }`}
                          >
                            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/80 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                              {item.images && item.images.length > 0 ? (
                                <img
                                  src={`${IMAGE_BASE}/${item.images[0]}`}
                                  alt={item.name}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <span className="text-sm">🔬</span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold truncate leading-snug">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider bg-cyan-100/60 text-cyan-800 px-2 py-0.5 rounded-md font-semibold">
                                  {item.subcategory}
                                </span>
                                {item.brand && (
                                  <span className="text-[11px] text-zinc-400">
                                    Brand: <span className="font-medium text-zinc-700">{item.brand}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div
                      onClick={handleSearch}
                      className="px-5 py-3 bg-zinc-50 hover:bg-cyan-100/50 text-cyan-700 text-xs font-semibold flex items-center justify-between cursor-pointer border-t border-zinc-100 transition-colors"
                    >
                      <span>Press Enter or click to view all search results</span>
                      <span>→</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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