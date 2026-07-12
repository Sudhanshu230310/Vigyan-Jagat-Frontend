import { HeroBanner } from '../../components/User/HeroBanner'
import AboutUs from '../../components/User/AboutUs'
import { Categories } from '../../components/User/Categories'
import { WhyVigyanJagat } from '../../components/User/WhyVigyanJagat'

export default function UserDashboard({ sidebarOpen }) {
    return (
        <main className="">
            <div className="">
                <HeroBanner sidebarOpen={sidebarOpen} />
            </div>
            <div className="">
                <Categories />
                <AboutUs />
                <WhyVigyanJagat />
            </div>
        </main>
    )
}