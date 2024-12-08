'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AboutSection = () => {
    const [aboutLeftUrl, setAboutLeftUrl] = useState(null);
    const [aboutRightUrl, setAboutRightUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentDeleteFile, setCurrentDeleteFile] = useState(null);
    const [refresh, setRefresh] = useState(false);

    // Fetch images from Supabase on mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data, error } = await supabase
                    .from('Sections')
                    .select('mediaUrl, title')
                    .eq('page', 'homepage');

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                const leftImage = data.find(item => item.title === 'about-left');
                const rightImage = data.find(item => item.title === 'about-right');

                if (leftImage) setAboutLeftUrl(leftImage.mediaUrl);
                if (rightImage) setAboutRightUrl(rightImage.mediaUrl);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [refresh]);

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                'image/svg+xml',
                'image/bmp',
                'image/tiff',
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

    // Upload the selected file to DigitalOcean Spaces
    const uploadFile = async (type) => {
        if (!selectedFile) {
            alert('Select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('path', `assets/homepage/about`);

        setUploadStatus('uploading');
        setUploadProgress(0);

        try {
            const response = await axios.post('/api/assets/upload', formData, {
                onUploadProgress: (progress) => {
                    setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
                },
            });

            const fileUrl = response.data.fileUrl;

            console.log(fileUrl);

            // Set the title and mediaUrl based on the type
            let title = '';
            let mediaUrl = '';

            if (type === 'about-left') {
                title = 'about-left';
                mediaUrl = fileUrl;
                setAboutLeftUrl(fileUrl); // Optionally store the URL in the state
            } else if (type === 'about-right') {
                title = 'about-right';
                mediaUrl = fileUrl;
                setAboutRightUrl(fileUrl); // Optionally store the URL in the state
            }

            // Insert new entry into Supabase with the dynamic title and mediaUrl
            const fileType = selectedFile.type.startsWith('video') ? 'video' : 'image';

            const { error } = await supabase.from('Sections').insert([
                {
                    page: 'homepage',
                    mediaUrl: mediaUrl, // Use the mediaUrl (fileUrl) for each type
                    title: title, // Set the title dynamically based on the type
                    type: fileType,
                },
            ]);

            if (error) throw error;

            setUploadStatus('success');
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('error');
        }
    };

    // Delete a file from DigitalOcean Spaces
    const deleteFile = async () => {
        const url = new URL(currentDeleteFile);
        const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

        if (!key.startsWith('assets/')) {
            alert('Invalid file key.');
            return;
        }

        try {
            // Step 2: Delete from Supabase
            const { data, error } = await supabase
                .from('Sections')
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
                if (currentDeleteFile === aboutLeftUrl) {
                    setAboutLeftUrl(null);
                } else if (currentDeleteFile === aboutRightUrl) {
                    setAboutRightUrl(null);
                }
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }
            setShowDeleteConfirmation(false); // Close the confirmation popup
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error deleting banner video:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">About Section</h2>
            <div className="grid grid-cols-2 gap-6">
                {aboutLeftUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>About Left Side Image</h1>
                        {aboutLeftUrl && (aboutLeftUrl.endsWith('.mp4') || aboutLeftUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={aboutLeftUrl} type="video/mp4" />
                                <source src={aboutLeftUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={aboutLeftUrl} alt="About Us Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(aboutLeftUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Left Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>About Left Side Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('about-left')}
                            className={`py-2 px-4 rounded ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatus === 'uploading' ? `Uploading... ${uploadProgress}%` : 'Upload File'}
                        </button>
                    </div>
                )}

                {aboutRightUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>About Right Side Image</h1>
                        {aboutRightUrl && (aboutRightUrl.endsWith('.mp4') || aboutRightUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={aboutRightUrl} type="video/mp4" />
                                <source src={aboutRightUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={aboutRightUrl} alt="About Us Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(aboutRightUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Right Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>About Right Side Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('about-right')}
                            className={`py-2 px-4 rounded ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatus === 'uploading' ? `Uploading... ${uploadProgress}%` : 'Upload File'}
                        </button>
                    </div>
                )}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this media?</h3>
                        <button
                            onClick={deleteFile}
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
    );
};

export default AboutSection;
