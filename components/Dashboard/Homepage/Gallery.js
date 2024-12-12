'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Supabase from '@/lib/supabase';

const Gallery = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [currentDeleteFile, setCurrentDeleteFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const { data, error } = await Supabase
                    .from('Gallery')
                    .select('id, mediaUrl') // Fetch `id` and `mediaUrl`
                    .eq('page', 'homepage'); // Filter where `page` is `homepage`

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                setMediaItems(data); // Store fetched items in state
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            }
        };

        fetchGalleryItems();
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

            setSelectedFile(file);
            setUploadStatus('idle');
        }
    };

    // Handle file upload (to store the image)
    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('path', `assets/homepage/gallery`);

        setUploadStatus("uploading");
        setUploadProgress(0);
        setUploadMessage('Uploading file, please wait...');

        try {
            const response = await axios.post('/api/assets/upload', formData, {
                onUploadProgress: (progress) => {
                    setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
                },
            });

            const fileUrl = response.data.fileUrl;
            setUploadStatus('success');

            const { error } = await Supabase.from('Gallery').insert([
                {
                    page: 'homepage',
                    mediaUrl: fileUrl,
                },
            ]);

            if (error) throw error;

            setUploadMessage('File Uploaded Successfully!');
            setShowPopup(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
        }
    };

    const handleDelete = async () => {
        if (!currentDeleteFile) {
            console.error('No mediaUrl available to delete.');
            return;
        }

        try {
            // Step 1: Parse the key from the media URL
            const url = new URL(currentDeleteFile);
            const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

            if (!key.startsWith('assets/')) {
                throw new Error('Invalid file key.');
            }

            // Step 2: Delete from Supabase
            const { data, error } = await Supabase
                .from('Gallery')
                .delete()
                .eq('mediaUrl', currentDeleteFile)
                .eq('page', 'homepage'); // Ensure only the relevant entry is deleted

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

            setUploadMessage('File Deleted Successfully!');
            setShowDeleteConfirmation(false); // Close the confirmation popup
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error deleting gallery image:', error);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Homepage Gallery</h2>

            {uploadMessage && (
                <p className="text-blue-500 font-semibold">{uploadMessage}</p>
            )}

            <div className='flex w-full justify-end'>
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-[8px] mt-4"
                >
                    New Upload
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                        <h3 className="text-lg font-semibold mb-4">Add a New Image</h3>
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            className="p-2 border mb-2 w-full"
                        />
                        <button
                            onClick={handleFileUpload}
                            className={`p-2 rounded mt-2
                                ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatus === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload'}
                        </button>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-2 ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className='grid grid-cols-4 gap-5'>
                {mediaItems.map((item, index) => (
                    <div className='flex flex-col items-center gap-2' key={index}>
                        {item.mediaUrl && (item.mediaUrl.endsWith('.mp4') || item.mediaUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-[12px] shadow w-full h-[300px] object-cover">
                                <source src={item.mediaUrl} type="video/mp4" />
                                <source src={item.mediaUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={item.mediaUrl} alt="Image" className="rounded-[12px] shadow w-full h-[300px] object-cover" />
                        )}

                        <button
                            onClick={() => {
                                setCurrentDeleteFile(item.mediaUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-max"
                        >
                            Delete This Image
                        </button>
                    </div>
                ))}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this Image?</h3>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-4"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirmation(false)}
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

export default Gallery
