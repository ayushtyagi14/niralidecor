"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTiktok } from 'react-icons/fa6';
import { deco } from '@/lib/fonts';

const Navbar = ({ forceScrolled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (forceScrolled) {
            setScrolled(true);
            return;
        }
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 300); // Trigger navbar background after 300px
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [forceScrolled]);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300">
            <div
                className={`
                    ${scrolled
                        ? 'bg-[#f4c7ff] text-[#96034f] shadow-md'
                        : 'bg-transparent text-white lg:w-full w-[90%] rounded-full lg:rounded-none mt-4 lg:mt-0 lg:py-4'} 
                    mx-auto lg:px-28 px-5 transition-all duration-300
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
                    <div className={`hidden lg:flex items-center space-x-3 ${scrolled ? 'text-[13px] font-semibold' : 'text-[14px]'} tracking-wide ${deco.className}`}>
                        <Link href="/about-us">
                            <h1 className="hover-underline">About Us</h1>
                        </Link>
                        <Link href="/portfolio">
                            <h1 className="hover-underline">Portfolio</h1>
                        </Link>
                        <Link href="/blog">
                            <h1 className="hover-underline">Blog</h1>
                        </Link>
                        <Link href="/testimonials">
                            <h1 className="hover-underline">Testimonials</h1>
                        </Link>
                        <Link href="/faq">
                            <h1 className="hover-underline">FAQs</h1>
                        </Link>
                        <Link href="/contact-us">
                            <h1 className="hover-underline">Contact</h1>
                        </Link>
                        <div className='flex flex-row items-center gap-2'>
                            <img
                                src={scrolled ? "/assets/instagram-pink.png" : "/assets/instagram-white.png"}
                                alt="Instagram"
                                className='cursor-pointer hover:scale-110 duration-300 transition-all'
                                onClick={() => router.push('https://instagram.com/niralidecor')}
                            />
                            <img
                                src={scrolled ? "/assets/facebook-pink.png" : "/assets/facebook-white.png"}
                                alt="Facebook"
                                className='cursor-pointer hover:scale-110 duration-300 transition-all'
                                onClick={() => router.push('https://www.facebook.com/profile.php?id=61587084800669')}
                            />
                            <div 
                                className={`${scrolled ? 'bg-[#96034f] text-white' : 'bg-white text-black'} p-[4px] rounded-[7px] cursor-pointer hover:scale-110 duration-300 transition-all flex items-center justify-center w-[26px] h-[26px]`}
                                onClick={() => router.push('https://www.tiktok.com/@niralidecor')}
                            >
                                <FaTiktok size={15} />
                            </div>
                        </div>
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
                <div className={`flex flex-col items-center space-y-4 py-4 ${scrolled ? 'bg-[#f4c7ffca]' : 'bg-[#f9e1ffbe]'} w-[90%] mx-auto my-2 rounded-[50px] shadow-lg uppercase tracking-widest text-[#96034f]`}>
                    <Link href="/about-us">
                        <h1 onClick={toggleMenu}>About Us</h1>
                    </Link>
                    <Link href="/portfolio">
                        <h1 onClick={toggleMenu}>Portfolio</h1>
                    </Link>
                    <Link href="/blog">
                        <h1 onClick={toggleMenu}>Blog</h1>
                    </Link>
                    <Link href="/testimonials">
                        <h1 onClick={toggleMenu}>Testimonials</h1>
                    </Link>
                    <Link href="/faq">
                        <h1 onClick={toggleMenu}>FAQs</h1>
                    </Link>
                    <Link href="/contact-us">
                        <h1 onClick={toggleMenu}>Contact</h1>
                    </Link>
                    <div className='flex flex-row items-center gap-2'>
                        <img
                            src={"/assets/instagram-pink.png"}
                            alt="Instagram"
                            className='cursor-pointer hover:scale-110 duration-300 transition-all'
                            onClick={() => router.push('https://instagram.com/niralidecor')}
                        />
                        <img
                            src={"/assets/facebook-pink.png"}
                            alt="Facebook"
                            className='cursor-pointer hover:scale-110 duration-300 transition-all'
                            onClick={() => router.push('https://www.facebook.com/profile.php?id=61587084800669')}
                        />
                        <div 
                            className={`bg-[#96034f] text-white p-[5px] rounded-[8px] cursor-pointer hover:scale-110 duration-300 transition-all flex items-center justify-center w-[28px] h-[28px]`}
                            onClick={() => router.push('https://www.tiktok.com/@niralidecor')}
                        >
                            <FaTiktok size={16} />
                        </div>
                    </div>
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
