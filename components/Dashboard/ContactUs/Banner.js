'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Supabase from '@/lib/supabase';

const Banner = () => {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                // Query the Banners table for the homepage banner
                const { data, error } = await Supabase
                    .from('Banners')
                    .select('mediaUrl')
                    .eq('page', 'contact-us')
                    .maybeSingle(); // Allows for no results without throwing an error

                if (error) {
                    throw error;
                }

                if (data) {
                    setMediaUrl(data.mediaUrl);
                } else {
                    console.warn('No banner found for the portfolio page.');
                    setMediaUrl(null); // Clear the state if no data is found
                }
            } catch (error) {
                console.error('Error fetching banner:', error.message || error);
            }
        };

        fetchBanner();
    }, [refresh]);

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = [
                // Image types
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                'image/svg+xml',
                'image/bmp',
                'image/tiff',
                // Video types
                'video/mp4',
                'video/mov',
                'video/avi',
                'video/webm',
                'video/ogg',
                'video/mkv',
            ];
            const maxSize = 50 * 1024 * 1024; // 50MB limit

            if (!allowedTypes.includes(file.type)) {
                alert(`Invalid file type. Supported types are: ${allowedTypes.join(', ')}`);
                return;
            }

            if (file.size > maxSize) {
                alert('File size exceeds the 50MB limit.');
                return;
            }

            const sanitizedFile = new File([
                file
            ], file.name.replace(/\s+/g, '-'), { type: file.type });

            setSelectedFile(sanitizedFile);
            setUploadStatus('idle');
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('Select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('path', 'assets/contact-us/banner');

        setUploadStatus('uploading');
        setUploadProgress(0);

        try {
            const response = await axios.post('/api/assets/upload', formData, {
                onUploadProgress: (progress) => {
                    setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
                },
            });

            const fileUrl = response.data.fileUrl;
            setMediaUrl(fileUrl);
            setUploadStatus('success');

            // Insert new banner entry into Supabase
            const fileType = selectedFile.type.startsWith('video') ? 'video' : 'image';
            const { error } = await Supabase.from('Banners').insert([
                {
                    page: 'contact-us',
                    mediaUrl: fileUrl,
                    type: fileType,
                },
            ]);

            if (error) throw error;

            // Refresh the page after successful upload
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
        }
    };

    const deleteBanner = async () => {
        if (!mediaUrl) {
            console.error('No mediaUrl available to delete.');
            return;
        }

        try {
            // Step 1: Parse the key from the media URL
            const url = new URL(mediaUrl);
            const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

            if (!key.startsWith('assets/')) {
                throw new Error('Invalid file key.');
            }

            // Step 2: Delete from Supabase
            const { data, error } = await Supabase
                .from('Banners')
                .delete()
                .eq('mediaUrl', mediaUrl)
                .eq('page', 'contact-us'); // Ensure only the relevant entry is deleted

            if (error) {
                throw error;
            }

            console.log('Deleted from Supabase:', data);

            // Step 3: Delete from DigitalOcean Spaces
            const response = await axios.delete('/api/assets/delete', {
                data: { key }, // Send the file key as per your API requirement
            });

            if (response.status === 200) {
                console.log('Deleted from DigitalOcean Spaces:', response.data);
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }

            setMediaUrl(null); // Clear the media URL
            setShowConfirmDelete(false); // Close the confirmation popup
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Contact Us Page Banner</h2>
            {mediaUrl ? (
                <div>
                    {mediaUrl && (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.mov')) ? (
                        <video controls className="rounded-md shadow w-[50%]">
                            <source src={mediaUrl} type="video/mp4" />
                            <source src={mediaUrl} type="video/mov" />
                        </video>
                    ) : (
                        <img src={mediaUrl} alt="Banner" className="rounded-md shadow w-[50%]" />
                    )}
                    <button
                        onClick={() => setShowConfirmDelete(true)} // Show the confirmation popup
                        className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete Banner
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="file"
                        accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                        onChange={handleFileSelect}
                        className="block mb-2"
                    />
                    <button
                        onClick={uploadFile}
                        className={`py-2 px-4 rounded ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {uploadStatus === 'uploading' ? `Uploading... ${uploadProgress}%` : 'Upload File'}
                    </button>
                </div>
            )}

            {/* Confirmation Popup */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this media?</h3>
                        <button
                            onClick={deleteBanner}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-4"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowConfirmDelete(false)} // Close the popup without deleting
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Banner
