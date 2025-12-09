import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { deco } from '@/lib/fonts'
import { useRouter } from 'next/navigation'

const LocationCard = ({ title, lines = [], iframeSrc }) => {
    return (
        <div className="rounded-2xl border border-zinc-200/60 shadow-sm bg-white overflow-hidden">
            <div className="p-4">
                <span className="text-xs tracking-wide px-2 py-1 rounded-full bg-[#96034f]/10 text-[#96034f]">
                    {title}
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
                    {lines.map((l, i) => (
                        <span key={i}>
                            {l}
                            {i !== lines.length - 1 ? <><br /></> : null}
                        </span>
                    ))}
                </p>
            </div>
            <div className="relative">
                <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                    <iframe
                        src={iframeSrc}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}

const Contact = () => {
    const router = useRouter()

    return (
        <motion.div
            className="mb-16 mt-24 lg:w-[75%] w-[90%] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Section 1: Studio Location (full width of component) */}
            <section className="space-y-5">
                <h1 className={`${deco.className} text-[24px] lg:text-[32px] text-[#96034f]`}>
                    Studio Location
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <LocationCard
                            title="Middlesex, NJ"
                            lines={['500 Lincoln Blvd.', 'Middlesex, NJ 08846']}
                            iframeSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.738679007284!2d-74.50234262023575!3d40.569447697711865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b8ca9c778ebb%3A0x2ad6ebf4ef475b2e!2sNirali%20Decor%20-Weddings%20%2BEvents%2BFloral%20Design!5e0!3m2!1sen!2sin!4v1729217912098!5m2!1sen!2sin"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        <LocationCard
                            title="Atlanta, GA"
                            lines={['5305 Fulton Industrial Blvd SW, Suite C', 'Atlanta, GA 30336, United States']}
                            iframeSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.7161982793564!2d-84.56464539999999!3d33.74215410000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f51f2cff59e38b%3A0x6ee4b76a4675442f!2sNirali%20Decor%20-Weddings%20%2BEvents%2BFloral%20Design!5e0!3m2!1sen!2sin!4v1760623884945!5m2!1sen!2sin"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Two columns — We Travel to | Connect With Us */}
            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h2 className={`${deco.className} text-[24px] lg:text-[32px] text-[#96034f]`}>
                        We Travel to
                    </h2>
                    <p className="my-4 font-light">
                        New York, New Jersey, Connecticut, Maryland, Atlanta/Georgia, North Carolina, South Carolina, Tennessee, Virginia, Florida, Delaware, Alabama, Boston/Massachusetts, Pennsylvania and Ohio
                    </p>
                </div>

                <div>
                    <h2 className={`${deco.className} text-[24px] lg:text-[32px] text-[#96034f]`}>
                        Connect With Us
                    </h2>
                    <div className="flex flex-col gap-2 my-4 font-light">
                        <Link className="flex flex-row items-center gap-4" href="mailto:niralidecor@gmail.com">
                            <img src="/assets/mail.png" alt="Email" />
                            <span>niralidecor@gmail.com</span>
                        </Link>
                        <Link href={'tel:+6097035879'} className="flex flex-row items-center gap-4">
                            <img src="/assets/call.png" alt="call" />
                            <span>(609) 703-5879</span>
                        </Link>
                        <Link href={'https://www.instagram.com/niralidecor'} className="flex flex-row items-center gap-4">
                            <img src="/assets/instagram.png" alt="Instagram" />
                            <span>@niralidecor</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section 3: Button at ~80% width */}
            <section className="mt-10 flex justify-center">
                <button
                    className="border-2 rounded-[12px] py-2 border-[#96034f] hover:bg-[#96034f] hover:text-white text-[#96034f] transition-all duration-500 w-[80%] md:w-[60%]"
                    onClick={() => router.push('/contact-us')}
                >
                    Book an Appointment
                </button>
            </section>
        </motion.div>
    )
}

export default Contact
