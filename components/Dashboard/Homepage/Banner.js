'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerVideo, setBannerVideo] = useState(null);
    const [bannerData, setBannerData] = useState(null);
    const hasFetched = useRef(false); // Track if fetchBannerVideo has already run

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            console.log('Fetching');
            fetchBannerVideo();
        }
    }, []);

    // Fetch the banner video from DigitalOcean Spaces
    const fetchBannerVideo = async () => {
        try {
            const { data } = await axios.get('/api/assets/list');

            console.log(data)

            // Find the banner video file inside the folder
            const banner = data.find((item) => item.key === 'assets/homepage/banner/hero-video');

            // Set the banner data in the state
            setBannerData(banner);

            // Log banner immediately
            console.log('Fetched Banner:', banner);

            // Log updated state after setting
            setTimeout(() => {
                console.log('Updated State BannerData:', bannerData);
            }, 0); // Ensure state is logged after it updates
        } catch (error) {
            console.error('Error fetching banner video:', error);
        }
    };

    // UseEffect to update bannerVideo when bannerData changes
    useEffect(() => {
        if (bannerData) {
            console.log('Updated State BannerData:', bannerData);
            // Set the video URL from bannerData
            setBannerVideo(bannerData.publicUrl);
        }
    }, [bannerData]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type and size
            const allowedTypes = ['video/mp4', 'image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 50 * 1024 * 1024; // 50MB

            if (!allowedTypes.includes(file.type)) {
                alert('Invalid file type. Please upload a video or image.');
                return;
            }

            if (file.size > maxSize) {
                alert('File is too large. Maximum size is 50MB.');
                return;
            }

            // Rename the file to 'hero-video' without adding an extension
            const renamedFile = new File([file], 'hero-video', {
                type: file.type,
            });

            setSelectedFile(renamedFile);
            setUploadStatus('idle');
            setUploadedFileUrl(null);
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('path', 'assets/homepage/banner'); // Customize path as needed

        setUploadStatus('uploading');
        setUploadProgress(0);

        try {
            const response = await axios.post('/api/assets/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            setUploadedFileUrl(response.data.fileUrl);
            setUploadStatus('success');
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
            alert('File upload failed');
        }
    };

    const deleteBannerVideo = async () => {
        if (!bannerVideo) {
            alert('No banner video to delete.');
            return;
        }

        const key = `assets/homepage/banner/${bannerVideo.split('/').pop()}`;
        try {
            await axios.delete('/api/assets/delete', { data: { key } });
            setBannerVideo(null);
            setBannerData(null);
            alert('Banner video deleted successfully.');
        } catch (error) {
            console.error('Error deleting banner video:', error);
        }
    };

    const handleDeleteClick = () => {
        const fileName = bannerVideo?.split('/').pop(); // Extract the file name from the URL
        const confirmation = window.confirm(`Are you sure you want to delete the file: ${fileName}?`);
        if (confirmation) {
            deleteBannerVideo();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Banner Section</h2>

            {bannerVideo ? (
                <div className="mb-4">
                    <video
                        controls
                        playsInline
                        className="w-full max-w-md rounded shadow"
                    >
                        <source src={bannerVideo} type="video/mp4" />
                    </video>
                </div>
            ) : (
                <p className="mb-4 text-gray-500">No banner video available.</p>
            )}

            {!bannerVideo && (
                <>
                    <input
                        type="file"
                        accept="video/mp4,image/jpeg,image/png,image/gif"
                        onChange={handleFileSelect}
                        className="mb-4 block"
                    />
                    <button
                        onClick={uploadFile}
                        disabled={!selectedFile || uploadStatus === 'uploading'}
                        className={`px-4 py-2 rounded ${!selectedFile
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload File'}
                    </button>
                </>
            )}

            {uploadStatus === 'uploading' && (
                <div className="mt-4">
                    <div
                        className="bg-blue-500 h-2 rounded"
                        style={{ width: `${uploadProgress}%` }}
                    />
                    <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
                </div>
            )}

            {uploadStatus === 'success' && uploadedFileUrl && (
                <div className="mt-4 bg-green-100 p-3 rounded">
                    <p className="text-green-700">File uploaded successfully!</p>
                    <a
                        href={uploadedFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        View Uploaded File
                    </a>
                </div>
            )}

            {uploadStatus === 'error' && (
                <div className="mt-4 bg-red-100 p-3 rounded">
                    <p className="text-red-700">Upload failed. Please try again.</p>
                </div>
            )}

            {bannerVideo && (
                <button
                    onClick={handleDeleteClick}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete Banner Video
                </button>
            )}
        </div>
    );
};

export default Banner;
