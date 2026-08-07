import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Package, Inbox, RefreshCw } from "lucide-react";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || BackendURL;
const BATCH_SIZE = 12;

const SKY_TOP = "#E4F7FB";
const SKY_MID = "#D3EEF6";
const SKY_BOTTOM = "#EAF9F6";
const LINE_SOFT = "rgba(29,78,137,0.08)";

const pageBg = {
  backgroundColor: SKY_MID,
  backgroundImage: `linear-gradient(180deg, ${SKY_TOP} 0%, ${SKY_MID} 45%, ${SKY_BOTTOM} 100%), linear-gradient(${LINE_SOFT} 1px, transparent 1px), linear-gradient(90deg, ${LINE_SOFT} 1px, transparent 1px)`,
  backgroundSize: "auto, 28px 28px, 28px 28px",
  backgroundAttachment: "fixed, scroll, scroll",
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTargetRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`${BackendURL}/search?q=${encodeURIComponent(query)}`)
      .then((res) => {
        setResults(res.data?.results || []);
      })
      .catch((err) => {
        console.error("Error searching products:", err);
        setError("Failed to load search results. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [query, results]);

  const visibleResults = useMemo(() => {
    return results.slice(0, visibleCount);
  }, [results, visibleCount]);

  const hasMore = visibleCount < results.length;

  useEffect(() => {
    const element = observerTargetRef.current;
    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, results.length));
            setIsLoadingMore(false);
          }, 300);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, results.length]);

  return (
    <div className="min-h-screen w-full py-10 px-6 md:px-12 lg:px-20" style={pageBg}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-700 font-semibold mb-2">
            <Search className="size-4" /> Search Catalog
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
            Search Results for <span className="text-cyan-600">"{query}"</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-1">
            {loading ? "Searching..." : `Showing ${visibleResults.length} of ${results.length} matching item(s)`}
          </p>
        </div>

        {/* Results grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-white/60 animate-pulse rounded-2xl border border-zinc-200" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700">
            <p className="font-semibold">{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md border border-zinc-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <Inbox className="size-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-800 mb-2">No Matching Products Found</h3>
            <p className="text-zinc-500 text-sm mb-6">
              We couldn't find any products matching "{query}". Try checking spelling or using broader search keywords.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition cursor-pointer"
            >
              Browse Catalog Categories
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleResults.map((item, idx) => {
                const imgPath = item.images && item.images.length > 0 ? `${IMAGE_BASE}/${item.images[0]}` : null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                    onClick={() => navigate(`/products/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.name)}`)}
                    className="group bg-white/90 backdrop-blur-md border border-zinc-200/80 hover:border-cyan-400 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full h-40 bg-zinc-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-zinc-100 p-2">
                        {imgPath ? (
                          <img
                            src={imgPath}
                            alt={item.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Package className="size-10 text-zinc-300" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded-full border border-cyan-100">
                          {item.subcategory}
                        </span>
                        {item.brand && (
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                            {item.brand}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-cyan-600 group-hover:text-cyan-700">
                      <span>View Specifications</span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scrolling Load Trigger & Indicator */}
            {hasMore && (
              <div ref={observerTargetRef} className="py-12 flex items-center justify-center">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 border border-zinc-200/90 shadow-md text-xs font-semibold text-cyan-800 backdrop-blur-md">
                  <RefreshCw className="size-4 text-cyan-600 animate-spin" />
                  <span>Loading more items...</span>
                </div>
              </div>
            )}

            {!hasMore && results.length > BATCH_SIZE && (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                Showing all {results.length} matching items
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
