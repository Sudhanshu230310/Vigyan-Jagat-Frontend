import { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import { HeroBanner } from "../../components/Admin/HeroBanner";
import QuotesManagement from "../../components/Admin/QuotesManagement";

export default function AdminDashboard() {

    return (
        <main className="min-h-screen bg-[oklch(0.99_0_0)] text-zinc-900">
            <Navbar />
            <HeroBanner />
            <QuotesManagement />
        </main>
    );
}