import React, { useState } from 'react';
import Banner from './ContactUs/Banner';

const Contact = () => {
    // State to track which section is active
    const [activeSection, setActiveSection] = useState('Banner');

    return (
        <div className="p-4">
            <h1 className='text-center text-[24px] mb-4 uppercase font-light'>Contact Us Page</h1>
            {/* Top Navigation */}
            <div className="flex justify-around mb-4 bg-[#f4c7ffca] text-[#96034f]  px-2 py-3 rounded-[24px] shadow-md">
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Banner' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Banner')}
                >
                    Banner
                </button>
            </div>

            {/* Conditional Rendering of Content */}
            <div className="bg-white p-4 rounded-md shadow-md">
                {activeSection === 'Banner' && <Banner />}
            </div>
        </div>
    );
};

export default Contact;
