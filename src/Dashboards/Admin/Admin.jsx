import { useState } from "react";
import Navbar from "../../components/Admin/Navbar";
import { HeroBanner } from "../../components/Admin/HeroBanner";
import QuotesManagement from "../../components/Admin/QuotesManagement";
import ContactMessagesManagement from "../../components/Admin/ContactMessagesManagement";
import InstituteInquiriesManagement from "../../components/Admin/InstituteInquiriesManagement";
import InstituteInquiryForm from "../../components/Admin/InstituteInquiryForm";
import { Inbox, MessageSquare, ClipboardList, PlusCircle } from "lucide-react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("quotes"); // "quotes" | "contacts"

    return (
        <main className="min-h-screen bg-[oklch(0.99_0_0)] text-zinc-900">
            <Navbar />
            <HeroBanner />

            {/* Tab Navigation Switcher */}
            <div className="w-full px-6 md:px-12 lg:px-20 pt-6">
                <div className="flex flex-wrap items-center gap-3 border-b border-zinc-200 pb-4">
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

                    <button
                        onClick={() => setActiveTab("institute")}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "institute"
                                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                        }`}
                    >
                        <ClipboardList className="size-4" />
                        Institute Inquiries
                    </button>

                    <button
                        onClick={() => setActiveTab("add-inquiry")}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "add-inquiry"
                                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                        }`}
                    >
                        <PlusCircle className="size-4" />
                        Add Inquiry
                    </button>
                </div>
            </div>

            {/* Tab view selection */}
            {activeTab === "quotes" ? (
                <QuotesManagement />
            ) : activeTab === "contacts" ? (
                <ContactMessagesManagement />
            ) : activeTab === "institute" ? (
                <InstituteInquiriesManagement />
            ) : (
                <InstituteInquiryForm />
            )}
        </main>
    );
}