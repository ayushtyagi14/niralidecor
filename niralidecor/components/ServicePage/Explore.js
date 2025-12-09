import React from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/app/layout';
import Link from 'next/link'; // Import the Link component

const Explore = ({ serviceName }) => {
    const services = [
        { name: 'Wedding', url: '/service/wedding' },
        { name: 'Reception', url: '/service/reception' },
        { name: 'Vidhi & Haldi', url: '/service/vidhi-and-haldi' },
        { name: 'Sangeet & Garba', url: '/service/sangeet-and-garba' },
        { name: 'Centerpiece', url: '/service/centerpiece' },
    ];

    // Filter out the service that matches the serviceName prop
    const filteredServices = services.filter(service => service.name !== serviceName);

    return (
        <motion.div
            className="mb-16 mt-24 lg:w-[75%] w-[90%] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className='flex flex-col'>
                <h1 className={`${deco.className} text-[34px] font-light text-center mb-4 text-[#96034f]`}>Explore Our Other Services:</h1>
                <div className='lg:flex lg:flex-row grid grid-cols-2 gap-10 lg:w-[80%] mx-auto justify-between'>
                    {filteredServices.map((service, index) => (
                        <Link key={index} href={service.url}>
                            <button className='mx-4 hover-underline uppercase font-light text-[20px]'>
                                {service.name}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hover-underline {
                    position: relative;
                    transition: all 0.3s ease;
                }
                .hover-underline::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -3px;
                    width: 100%;
                    height: 1.5px;
                    background-color: currentColor;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }
                .hover-underline:hover::after {
                    transform: scaleX(1);
                }
            `}</style>
        </motion.div>
    );
};

export default Explore;
