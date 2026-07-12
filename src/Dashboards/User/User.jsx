import { HeroBanner } from '../../components/User/HeroBanner'
import AboutUs from '../../components/User/AboutUs'
import { Categories } from '../../components/User/Categories'
import { WhyVigyanJagat } from '../../components/User/WhyVigyanJagat'
import Contact from '../../components/User/Contact'

export default function UserDashboard({ sidebarOpen }) {
    return (
        <main className="">
            <div className="">
                <HeroBanner sidebarOpen={sidebarOpen} />
            </div>
            <div className="">
                <Categories />
                <AboutUs />
                <Contact />
                <WhyVigyanJagat />
            </div>
        </main>
    )
}