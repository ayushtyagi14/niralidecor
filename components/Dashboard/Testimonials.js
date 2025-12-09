import React, { useState } from 'react';
import Banner from './Testimonials/Banner';
import Reviews from './Testimonials/Reviews';

const Testimonials = () => {
    // State to track which section is active
    const [activeSection, setActiveSection] = useState('Banner');

    return (
        <div className="p-4">
            <h1 className='text-center text-[24px] mb-4 uppercase font-light'>Testimonials Page</h1>
            {/* Top Navigation */}
            <div className="flex justify-around mb-4 bg-[#f4c7ffca] text-[#96034f]  px-2 py-3 rounded-[24px] shadow-md">
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Banner' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Banner')}
                >
                    Banner
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Reviews' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Reviews')}
                >
                    Reviews
                </button>
            </div>

            {/* Conditional Rendering of Content */}
            <div className="bg-white p-4 rounded-md shadow-md">
                {activeSection === 'Banner' && <Banner />}
                {activeSection === 'Reviews' && <Reviews />}
            </div>
        </div>
    );
};

export default Testimonials;
