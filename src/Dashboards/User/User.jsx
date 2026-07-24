import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../../components/User/Navbar";
import { Sidebar } from "../../components/User/Sidebar";
import { Footer } from "../../components/User/Footer";
import { ScrollToTop } from "../../components/User/ScrollToTop";

import { HeroBanner } from "../../components/User/Home/HeroBanner";
import { Categories } from "../../components/User/Home/Categories";
import WhyVigyanJagat from "../../components/User/Home/WhyVigyanJagat";
import AboutUs from "../../components/User/Home/AboutUs";
import { Contact } from "../../components/User/Home/Contact";

export function UserHome() {
    return (
        <div>
            <HeroBanner />
            <Categories />
            <WhyVigyanJagat />
            <AboutUs />
            <Contact />
        </div>
    );
}

export default function UserDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMd, setIsMd] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const onResize = () => {
            const isDesktop = window.innerWidth >= 768;
            setIsMd(isDesktop);

            if (isDesktop) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <main className="min-h-screen bg-[oklch(0.99_0_0)] text-zinc-900">
            <ScrollToTop />

            {/* Desktop Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                isMobile={false}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Mobile Sidebar */}
            <Sidebar
                isOpen={mobileMenuOpen}
                isMobile={true}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div
                className="min-h-screen flex flex-col justify-between transition-all duration-300 ease-in-out"
                style={{
                    paddingLeft: isMd && sidebarOpen ? "16rem" : "0",
                }}
            >
                <div>
                    <Navbar
                        sidebarOpen={sidebarOpen}
                        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                        onOpenMobileMenu={() => setMobileMenuOpen(true)}
                    />

                    <Outlet />
                </div>

                <Footer />
            </div>
        </main>
    );
}