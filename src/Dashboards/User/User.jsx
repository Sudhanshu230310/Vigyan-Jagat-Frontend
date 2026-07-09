import { Navbar } from '../../components/User/Navbar'
import { Sidebar } from '../../components/User/Sidebar'
import { HeroBanner } from '../../components/Common/HeroBanner'
import { Categories } from '../../components/User/Categories'
import { WhyVigyanJagat } from '../../components/User/WhyVigyanJagat'
import { Footer } from '../../components/Common/Footer'

export default function UserDashboard({
    sidebarOpen,
    setSidebarOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
}) {
    return (
        <div className="min-h-screen bg-[oklch(0.99_0_0)]">
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

            {/* Main content offset by sidebar on desktop */}
            <div
                className="transition-all duration-300 ease-in-out"
                style={{ paddingLeft: sidebarOpen ? '16rem' : '0' }}
            >
                <Navbar
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen((v) => !v)}
                    onOpenMobileMenu={() => setMobileMenuOpen(true)}
                />

                {/* Page content */}
                <main>
                    <div className="px-6 md:px-8 pt-6">
                        <HeroBanner sidebarOpen={sidebarOpen} />
                    </div>
                    <Categories />
                    <div className="">
                        <WhyVigyanJagat />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}