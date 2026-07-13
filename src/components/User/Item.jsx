import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
// Where the product_images/... files are served from. Falls back to the API host.
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL || BackendURL;

// Union of keys across all rows, preserving first-seen order.
function deriveColumns(rows) {
    const cols = [];
    rows.forEach((row) =>
        Object.keys(row).forEach((k) => {
            if (!cols.includes(k)) cols.push(k);
        })
    );
    return cols;
}

const isPriceCol = (c) => /price/i.test(c);
const isCodeCol = (c) => /item code/i.test(c);

function SpecTable({ title, rows }) {
    const columns = deriveColumns(rows);

    return (
        <div className="space-y-3">
            {title && (
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-700">
                    {title}
                </h3>
            )}
            <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-zinc-50 text-left">
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className={`whitespace-nowrap px-4 py-3 font-medium text-zinc-600 border-b border-zinc-200 ${isPriceCol(col) ? "text-right" : ""
                                        }`}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-zinc-100 last:border-0 hover:bg-cyan-50/40 transition-colors"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col}
                                        className={`whitespace-nowrap px-4 py-3 text-zinc-700 ${isCodeCol(col) ? "font-mono text-zinc-900" : ""
                                            } ${isPriceCol(col)
                                                ? "text-right font-medium text-zinc-900 tabular-nums"
                                                : ""
                                            }`}
                                    >
                                        {isPriceCol(col) && row[col] != null
                                            ? `\u20B9 ${row[col]}`
                                            : row[col] ?? "\u2014"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function Item() {
    const { SubcategoryName, itemName } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios
            .get(
                `${BackendURL}/product/${encodeURIComponent(
                    SubcategoryName
                )}/${encodeURIComponent(itemName)}`
            )
            .then((res) => setItem(res.data.product))
            .catch((err) => {
                console.error(err);
                setError(
                    err.response?.status === 404
                        ? "This product could not be found."
                        : "Something went wrong loading this product."
                );
            })
            .finally(() => setLoading(false));
    }, [SubcategoryName, itemName]);

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-24 text-center">
                <p className="text-red-500 font-medium">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-sm text-cyan-700 hover:underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    if (!item) return null;

    const specs = item.specifications || {};
    const scalarEntries = Object.entries(specs).filter(
        ([, v]) => !Array.isArray(v)
    );
    const tableEntries = Object.entries(specs).filter(([, v]) =>
        Array.isArray(v)
    );
    const images = Array.isArray(item.images) ? item.images : [];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-zinc-50/60 pt-14">
            <div className="mx-auto w-screen px-6 md:px-10 pb-24">
                {/* Back link */}
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    onClick={() => navigate(-1)}
                    className="mt-8 flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-cyan-700 transition-colors"
                >
                    <motion.span
                        whileHover={{ x: -3 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                    >
                        ←
                    </motion.span>
                    {SubcategoryName}
                </motion.button>

                {/* Top: image + identity */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-8 md:gap-10 items-start border-b border-zinc-200/80 pb-10">
                    {/* Image panel */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-4 flex items-center justify-center min-h-[220px]">
                        {images.length > 0 ? (
                            <img
                                src={`${IMAGE_BASE}/${images[0]}`}
                                alt={item.name}
                                className="max-h-56 w-auto object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.parentElement.querySelector(
                                        ".img-fallback"
                                    ).style.display = "flex";
                                }}
                            />
                        ) : null}
                        <div
                            className="img-fallback h-full w-full items-center justify-center text-zinc-300 text-5xl"
                            style={{ display: images.length > 0 ? "none" : "flex" }}
                        >
                            ⚗
                        </div>
                    </div>

                    {/* Identity */}
                    <div>
                        <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-600">
                            {item.brand}
                        </p>
                        <h1 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 capitalize leading-[1.15]">
                            {item.name}
                        </h1>
                        {item.description && (
                            <p className="mt-4 text-zinc-600 leading-relaxed max-w-2xl">
                                {item.description}
                            </p>
                        )}

                        {/* Scalar specs as chips */}
                        {scalarEntries.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {scalarEntries.map(([key, value]) => (
                                    <span
                                        key={key}
                                        className="inline-flex items-baseline gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm"
                                    >
                                        <span className="text-zinc-400">{key}</span>
                                        <span className="font-medium text-zinc-800">
                                            {value}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Pricing / variant tables */}
                {tableEntries.length > 0 && (
                    <section className="mt-10 space-y-10">
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">
                            Specifications & Pricing
                        </h2>
                        {tableEntries.map(([title, rows]) => (
                            <SpecTable
                                key={title}
                                title={tableEntries.length > 1 ? title : null}
                                rows={rows}
                            />
                        ))}
                    </section>
                )}

                {/* Additional images */}
                {images.length > 1 && (
                    <section className="mt-12">
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400 mb-4">
                            More views
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {images.slice(1).map((img, i) => (
                                <img
                                    key={i}
                                    src={`${IMAGE_BASE}/${img}`}
                                    alt={`${item.name} view ${i + 2}`}
                                    className="h-28 w-auto object-contain rounded-xl border border-zinc-200 bg-white p-2"
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}