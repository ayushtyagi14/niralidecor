import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Gallery = ({ mediaItems }) => {
    const [selectedImage, setSelectedImage] = useState(null); // To track the selected image
    const [isOpen, setIsOpen] = useState(false); // To manage modal visibility

    // Open modal with the selected image
    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage(null);
    };

    return (
        <>
            <motion.div
                className="mb-16 lg:w-[75%] w-[90%] mx-auto mt-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 auto-rows-[300px]">
                    {mediaItems && mediaItems.map((item) => (
                        <motion.div
                            key={item?.id}
                            className="overflow-hidden rounded-[12px] relative group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            {/* <div className="relative w-full h-[300px]"> */}
                            <img
                                src={item?.mediaUrl}  // Use Image component from Next.js
                                alt={`Gallery item ${item?.id}`}
                                className="object-cover w-full h-[300px] rounded-[12px] transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                onClick={() => openModal(item?.mediaUrl)}  // Trigger modal on image click
                                loading="lazy"  // Ensure lazy loading of images for better performance
                            />
                            {/* </div> */}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Modal for Full-Screen Image */}
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="relative bg-white p-4 rounded-lg"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-0.5 right-0.5 py-2 px-4 text-white bg-gray-800 rounded-full"
                        >
                            X
                        </button>
                        <motion.img
                            src={selectedImage}
                            alt="Full screen"
                            className="max-w-[90vw] max-h-[90vh] object-contain"
                            loading='lazy'
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Gallery;
