import { HeroBanner } from '../../components/Common/HeroBanner'
import { Categories } from '../../components/User/Categories'
import { WhyVigyanJagat } from '../../components/User/WhyVigyanJagat'

export default function UserDashboard({ sidebarOpen }) {
    return (
        <main className="space-y-8 pb-12">
            <div className="px-6 md:px-8 pt-6">
                <HeroBanner sidebarOpen={sidebarOpen} />
            </div>
            <Categories />
            <div className="px-6 md:px-8">
                <WhyVigyanJagat />
            </div>
        </main>
    )
}