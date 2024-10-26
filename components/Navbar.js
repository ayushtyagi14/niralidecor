import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            console.log(scrollPosition); // Debug: Check if this logs
            setScrolled(scrollPosition > 600); // Adjust the value as needed
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300">
            <div
                className={`
                    ${scrolled ? 'bg-[#f4c7ffca] text-[#96034f]' : 'lg:bg-[#00000015] bg-[#f9e1ffbe] text-white lg:w-full w-[90%] rounded-full lg:rounded-none mt-4 lg:mt-0 lg:py-4'} 
                    mx-auto lg:px-32 px-5 transition-all duration-300
                `}
            >
                <div className="flex flex-row justify-between items-center w-full h-16">
                    <Link href="/">
                        <motion.img
                            src={"/assets/logo.png"}
                            alt="Logo"
                            className={`${scrolled ? 'w-[240px]' : 'w-[300px] lg:w-[350px] transition-all duration-300'} mb-2`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        />
                    </Link>
                    <div className={`hidden lg:flex items-center space-x-4 ${scrolled ? 'text-[14px]' : 'text-[16px]'} uppercase tracking-widest`}>
                        <Link href="/about">
                            <h1 className="hover-underline">About Us</h1>
                        </Link>
                        <Link href="/portfolio">
                            <h1 className="hover-underline">Portfolio</h1>
                        </Link>
                        <Link href="/testimonials">
                            <h1 className="hover-underline">Testimonials</h1>
                        </Link>
                        <Link href="/contact">
                            <h1 className="hover-underline">Contact Us</h1>
                        </Link>
                    </div>
                    <div className="lg:hidden block">
                        <input
                            hidden
                            className="check-icon"
                            id="check-icon"
                            name="check-icon"
                            type="checkbox"
                            onClick={toggleMenu}
                        />
                        <label className="icon-menu" htmlFor="check-icon">
                            <div className="bar bar--1"></div>
                            <div className="bar bar--2"></div>
                            <div className="bar bar--3"></div>
                        </label>
                    </div>
                </div>
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? 'auto' : 0 }}
                className="lg:hidden overflow-hidden"
            >
                <div className="flex flex-col items-center space-y-4 py-4 bg-[#f4c7ffc3] w-[90%] mx-auto my-2 rounded-[50px] shadow-lg uppercase tracking-widest text-[#96034f]">
                    <Link href="/about">
                        <h1 onClick={toggleMenu}>About Us</h1>
                    </Link>
                    <Link href="/portfolio">
                        <h1 onClick={toggleMenu}>Portfolio</h1>
                    </Link>
                    <Link href="/certification">
                        <h1 onClick={toggleMenu}>Testimonials</h1>
                    </Link>
                    <Link href="/contact">
                        <h1 onClick={toggleMenu}>Contact Us</h1>
                    </Link>
                </div>
            </motion.div>

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
        </nav>
    );
};

export default Navbar;
