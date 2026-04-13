import React from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/lib/fonts';
import Link from 'next/link'; // Import the Link component

const Explore = ({ serviceName }) => {
    const services = [
        { name: 'Wedding', url: '/service/wedding', img: '/assets/wedding-service.jpg' },
        { name: 'Reception', url: '/service/reception', img: '/assets/reception-service.jpg' },
        { name: 'Vidhi & Haldi', url: '/service/vidhi-and-haldi', img: '/assets/vidhi-and-haldi.jpg' },
        { name: 'Centerpiece', url: '/service/centerpiece', img: '/assets/centerpiece-service.jpg' },
        { name: 'Sangeet & Garba', url: '/service/sangeet-and-garba', img: '/assets/service-banner.jpg' },
    ];

    // Filter out the current service and limit to 4 services for the grid
    const filteredServices = services
        .filter(service => service.name !== serviceName)
        .slice(0, 4);

    return (
        <div className="py-24 bg-[#fff9fd] border-t border-[#f3d4e5]">
            <div className="lg:w-[75%] w-[90%] mx-auto">
                <motion.h2 
                    className={`${deco.className} lg:text-[40px] text-[30px] text-center text-[#96034f] mb-12 uppercase tracking-widest`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Explore Our Other Services
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredServices.map((s, i) => (
                        <Link href={s.url} key={i}>
                            <motion.div
                                className="group cursor-pointer"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="h-[220px] overflow-hidden rounded-[20px] mb-4 shadow-sm">
                                    <img src={s.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={s.name} />
                                </div>
                                <h4 className={`${deco.className} text-center text-gray-700 group-hover:text-[#96034f] transition-colors uppercase text-sm tracking-widest`}>
                                    {s.name}
                                </h4>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center mt-12 pb-10">
                    <Link href="/portfolio" className="w-full flex justify-center">
                        <button
                            className="border-2 rounded-[12px] py-3 px-10 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 w-[80%] md:w-[40%] font-medium uppercase tracking-widest text-sm"
                        >
                            View Full Portfolio
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Explore;
