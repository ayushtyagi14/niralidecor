import React, { useState } from 'react';
import Banner from './Homepage/Banner';
import AboutSection from './Homepage/AboutSection';
import Service from './Homepage/Service';
import Reviews from './Homepage/Reviews';
import Gallery from './Homepage/Gallery';

const Home = () => {
    // State to track which section is active
    const [activeSection, setActiveSection] = useState('Banner');

    return (
        <div className="p-4">
            <h1 className='text-center text-[24px] mb-4 uppercase font-light'>Homepage</h1>
            {/* Top Navigation */}
            <div className="flex justify-around mb-4 bg-[#f4c7ffca] text-[#96034f]  px-2 py-3 rounded-[24px] shadow-md">
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Banner' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Banner')}
                >
                    Banner
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'AboutSection' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('AboutSection')}
                >
                    About Section
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Service' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Service')}
                >
                    Service
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Reviews' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Reviews')}
                >
                    Reviews
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Gallery' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Gallery')}
                >
                    Gallery
                </button>
            </div>

            {/* Conditional Rendering of Content */}
            <div className="bg-white p-4 rounded-md shadow-md">
                {activeSection === 'Banner' && <Banner />}
                {activeSection === 'AboutSection' && <AboutSection />}
                {activeSection === 'Service' && <Service />}
                {activeSection === 'Reviews' && <Reviews />}
                {activeSection === 'Gallery' && <Gallery />}
            </div>
        </div>
    );
};

export default Home;
