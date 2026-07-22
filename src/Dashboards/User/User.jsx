import { Contact } from "../../components/User/Home/Contact";
import AboutUs from "../../components/User/Home/AboutUs";
import { Categories } from "../../components/User/Home/Categories";
import { HeroBanner } from "../../components/User/Home/HeroBanner";
import WhyVigyanJagat from "../../components/User/Home/WhyVigyanJagat";


export default function UserDashboard({ sidebarOpen }) {
    return (
        <main className="">
            <div className="">
                <HeroBanner sidebarOpen={sidebarOpen} />
            </div>
            <div className=''>
                {/* <StatsBar /> */}
                <Categories />
                <WhyVigyanJagat />
                <AboutUs />
                <Contact />

            </div>
        </main>
    )
}