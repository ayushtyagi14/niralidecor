import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { deco } from '@/lib/fonts';

const ContactUs = () => {
    useEffect(() => {
        // This will initialize the iframe resizer to adjust the iframe height
        const iframeScript = document.createElement("script");
        iframeScript.src = "https://462946.17hats.com/vendor/iframeSizer.min.js";
        iframeScript.async = true;
        iframeScript.onload = () => {
            if (window.iFrameResize) {
                window.iFrameResize({ log: false }, "#contactIframe");
            }
        };
        document.body.appendChild(iframeScript);

        return () => {
            document.body.removeChild(iframeScript);
        };
    }, []);

    return (
        <motion.div
            className="mb-16 mt-10 lg:w-[75%] w-[90%] mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Heading Section */}
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Connect with Us
                </h1>
                <p className="lg:text-[18px] text-center">
                    Let&apos;s Bring Your Vision to Life Together
                </p>
            </motion.div>

            {/* Contact Form Section */}
            <div className="mt-10">
                <iframe
                    id="contactIframe"
                    name="lc_contact_form"
                    border="0px"
                    width="100%"
                    src="https://462946.17hats.com/p#/embed/bcgwxdszgrbddhvxbfvhvnbzfwnvbkds"
                    className="rounded-lg"
                    style={{ overflow: "hidden" }}
                ></iframe>
            </div>
        </motion.div>
    );
};

export default ContactUs;
