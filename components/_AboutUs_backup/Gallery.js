import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { deco } from "@/lib/fonts";

const Gallery = ({ mediaItems }) => {
    const [width, setWidth] = useState(null);
    let mobile = false;

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        return () => {
            window.removeEventListener("resize", () => setWidth(window.innerWidth));
        };
    }, []);

    if (width < 1000) {
        mobile = true;
    } else {
        mobile = false;
    }

    const slidesToShow = mobile ? 2.5 : 4.5;

    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: slidesToShow, // Use the conditional value
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        prevArrow: false,
        nextArrow: false,
    };

    return (
        <motion.div
            className='mt-24 lg:w-[75%] w-[90%] mx-auto'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className='flex flex-col items-center'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className={`${deco.className} lg:text-[48px] text-[30px] text-center text-[#96034f]`}>
                    Behind The Scenes
                </h1>
            </motion.div>

            <Slider {...settings}>
                {mediaItems && mediaItems.map((item) => (
                    <div key={item?.id} className="px-1.5 mt-10">
                        <img
                            src={item?.mediaUrl}
                            alt={`Image ${item?.id}`}
                            className="mx-0 rounded-xl"
                        />
                    </div>
                ))}
            </Slider>
        </motion.div>
    );
};

export default Gallery;
