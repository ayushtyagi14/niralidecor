import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null); // To track the selected image
    const [isOpen, setIsOpen] = useState(false); // To manage modal visibility

    const images = [
        { id: 1, src: '/assets/gallery1.jpg' },
        { id: 2, src: '/assets/gallery2.jpg' },
        { id: 3, src: '/assets/gallery8.jpg' },
        { id: 4, src: '/assets/gallery4.jpg' },
        { id: 5, src: '/assets/gallery5.jpg' },
        { id: 6, src: '/assets/gallery6.jpg' },
        { id: 7, src: '/assets/gallery7.jpg' },
        { id: 8, src: '/assets/gallery3.jpg' },
        { id: 9, src: '/assets/gallery1.jpg' },
        { id: 10, src: '/assets/gallery2.jpg' },
        { id: 11, src: '/assets/gallery8.jpg' },
        { id: 12, src: '/assets/gallery4.jpg' },
    ];

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
                className='mb-16 lg:w-[75%] w-[90%] mx-auto'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-[300px]">
                    {images.map((item) => (
                        <motion.div
                            key={item.id}
                            className="overflow-hidden rounded-[12px] relative group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <motion.img
                                src={item.src}
                                alt={`Gallery item ${item.id}`}
                                className="w-full h-[300px] object-cover rounded-[12px] transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 40 }}
                                onClick={() => openModal(item.src)} // Trigger modal on image click
                            />
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
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Gallery;
