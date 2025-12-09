import React, { useState } from 'react';
import Banner from './Portfolio/Banner';
import Layout from './Portfolio/Layout';
import Wedding from './Portfolio/Wedding';
import Reception from './Portfolio/Reception';
import Centerpiece from './Portfolio/Centerpiece';
import Sangeet from './Portfolio/Sangeet';
import Vidhi from './Portfolio/Vidhi';

const Portfolio = () => {
    // State to track which section is active
    const [activeSection, setActiveSection] = useState('Banner');

    return (
        <div className="p-4">
            <h1 className='text-center text-[24px] mb-4 uppercase font-light'>Portfolio Page</h1>
            {/* Top Navigation */}
            <div className="flex justify-around mb-4 bg-[#f4c7ffca] text-[#96034f]  px-2 py-3 rounded-[24px] shadow-md">
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Banner' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Banner')}
                >
                    Banner
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Layout' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Layout')}
                >
                    Layout
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Wedding' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Wedding')}
                >
                    Wedding
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Reception' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Reception')}
                >
                    Reception
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Centerpiece' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Centerpiece')}
                >
                    Centerpiece
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Sangeet' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Sangeet')}
                >
                    Sangeet/Garba
                </button>
                <button
                    className={`py-2 px-4 rounded-[12px] ${activeSection === 'Vidhi' ? 'bg-[#96034f] text-white' : 'bg-white'}`}
                    onClick={() => setActiveSection('Vidhi')}
                >
                    Vidhi/Haldi
                </button>
            </div>

            {/* Conditional Rendering of Content */}
            <div className="bg-white p-4 rounded-md shadow-md">
                {activeSection === 'Banner' && <Banner />}
                {activeSection === 'Layout' && <Layout />}
                {activeSection === 'Wedding' && <Wedding />}
                {activeSection === 'Reception' && <Reception />}
                {activeSection === 'Centerpiece' && <Centerpiece />}
                {activeSection === 'Sangeet' && <Sangeet />}
                {activeSection === 'Vidhi' && <Vidhi />}
            </div>
        </div>
    );
};

export default Portfolio;
