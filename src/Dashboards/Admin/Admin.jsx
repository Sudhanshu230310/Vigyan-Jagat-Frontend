import { useState } from "react";
import Navbar from "../../components/Admin/Navbar";
import { HeroBanner } from "../../components/Admin/HeroBanner";
import QuotesManagement from "../../components/Admin/QuotesManagement";
import ContactMessagesManagement from "../../components/Admin/ContactMessagesManagement";
import { Inbox, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("quotes"); // "quotes" | "contacts"

    return (
        <main className="min-h-screen bg-[oklch(0.99_0_0)] text-zinc-900">
            <Navbar />
            <HeroBanner />

            {/* Tab Navigation Switcher */}
            <div className="w-full px-6 md:px-12 lg:px-20 pt-6">
                <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
                    <button
                        onClick={() => setActiveTab("quotes")}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "quotes"
                                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                        }`}
                    >
                        <Inbox className="size-4" />
                        Wholesale Quotes
                    </button>

                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "contacts"
                                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                        }`}
                    >
                        <MessageSquare className="size-4" />
                        Contact Messages
                    </button>
                </div>
            </div>

            {/* Tab view selection */}
            {activeTab === "quotes" ? (
                <QuotesManagement />
            ) : (
                <ContactMessagesManagement />
            )}
        </main>
    );
}