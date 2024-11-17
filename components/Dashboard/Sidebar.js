import { useDashboard } from '@/components/Dashboard/DashboardContext';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const { setActiveComponent } = useDashboard();
    const router = useRouter();

    return (
        <nav className="flex flex-col justify-center h-full rounded-[24px] shadow-md my-auto ml-3 w-64 bg-[#f4c7ffca] text-[#96034f] px-5">
            <ul className="space-y-4">
                <li
                    onClick={() => setActiveComponent('Home')}
                    className="cursor-pointer hover:bg-[#f9e1ff] py-4 px-2 rounded-md transition"
                >
                    Home
                </li>
                <li
                    onClick={() => setActiveComponent('About Us')}
                    className="cursor-pointer hover:bg-[#f9e1ff] py-4 px-2 rounded-md transition"
                >
                    About Us
                </li>
                <li
                    onClick={() => setActiveComponent('Portfolio')}
                    className="cursor-pointer hover:bg-[#f9e1ff] py-4 px-2 rounded-md transition"
                >
                    Portfolio
                </li>
                <li
                    onClick={() => setActiveComponent('Testimonials')}
                    className="cursor-pointer hover:bg-[#f9e1ff] py-4 px-2 rounded-md transition"
                >
                    Testimonials
                </li>
                <li
                    onClick={() => setActiveComponent('Contact Us')}
                    className="cursor-pointer hover:bg-[#f9e1ff] py-4 px-2 rounded-md transition"
                >
                    Contact Us
                </li>
                <li
                    onClick={() => router.push('/')}
                    className="cursor-pointer hover:bg-[#f9e1ff] py-4 px-2 rounded-md transition"
                >
                    Back To Website
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
