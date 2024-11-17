'use client';

import { useEffect, useState } from 'react';
import { DashboardProvider, useDashboard } from '@/components/Dashboard/DashboardContext';
import LoginPage from '@/components/Dashboard/LoginPage';
import Sidebar from '@/components/Dashboard/Sidebar';
import Home from '@/components/Dashboard/Home';
import About from '@/components/Dashboard/About';
import Portfolio from '@/components/Dashboard/Portfolio';
import Testimonials from '@/components/Dashboard/Testimonials';
import Contact from '@/components/Dashboard/Contact';

const DashboardContent = () => {
    const { activeComponent } = useDashboard();

    return (
        <div className="flex-1 p-8">
            {activeComponent === 'Home' && <Home />}
            {activeComponent === 'About Us' && <About />}
            {activeComponent === 'Portfolio' && <Portfolio />}
            {activeComponent === 'Testimonials' && <Testimonials />}
            {activeComponent === 'Contact Us' && <Contact />}
        </div>
    );
};

const DashboardPage = () => {
    const [isUser, setIsUser] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const user = sessionStorage.getItem('isUser');
        if (user === 'true') setIsUser(true);

        // Check the screen width
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };

        // Set initial screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogin = () => setIsUser(true);

    if (isSmallScreen) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-xl text-gray-700 text-center">
                    Please use a larger screen to access the dashboard.
                </p>
            </div>
        );
    }

    if (!isUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <DashboardProvider>
            <div className="flex">
                <div className="pt-6 h-[97vh]">
                    <Sidebar />
                </div>
                <DashboardContent />
            </div>
        </DashboardProvider>
    );
};

export default DashboardPage;
