"use client";

import React, { useState, useEffect } from 'react';
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
                const { data, error } = await Supabase
                    .from('Banners')
                    .select('mediaUrl')
                    .eq('page', 'homepage')
                    .maybeSingle();

                if (error) {
                    throw error;
                }

                if (data) {
                    setMediaUrl(data.mediaUrl);
                } else {
                    setMediaUrl(null);
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
            const maxSize = 50 * 1024 * 1024;

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
        formData.append('path', 'assets/homepage/banner');

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

            const fileType = selectedFile.type.startsWith('video') ? 'video' : 'image';
            const { error } = await Supabase.from('Banners').insert([
                {
                    page: 'homepage',
                    mediaUrl: fileUrl,
                    type: fileType,
                },
            ]);

            if (error) throw error;

            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
        }
    };

    const deleteBannerVideo = async () => {
        if (!mediaUrl) {
            console.error('No mediaUrl available to delete.');
            return;
        }

        try {
            const url = new URL(mediaUrl);
            const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

            if (!key.startsWith('assets/')) {
                throw new Error('Invalid file key.');
            }

            const { data, error } = await Supabase
                .from('Banners')
                .delete()
                .eq('mediaUrl', mediaUrl)
                .eq('page', 'homepage');

            if (error) {
                throw error;
            }

            const response = await axios.delete('/api/assets/delete', {
                data: { key },
            });

            if (response.status === 200) {
                console.log('Deleted from DigitalOcean Spaces:', response.data);
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }

            setMediaUrl(null);
            setShowConfirmDelete(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error deleting banner video:', error);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Homepage Banner</h2>
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
                        onClick={() => setShowConfirmDelete(true)}
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
                        className={`py-2 px-4 rounded ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        {uploadStatus === 'uploading' ? `Uploading... ${uploadProgress}%` : 'Upload File'}
                    </button>
                </div>
            )}

            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this media?</h3>
                        <button
                            onClick={deleteBannerVideo}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-4"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowConfirmDelete(false)}
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

export default Banner;
