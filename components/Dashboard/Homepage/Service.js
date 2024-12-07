'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Service = () => {
    const [floralUrl, setFloralUrl] = useState(null);
    const [centerpieceUrl, setCenterpieceUrl] = useState(null);
    const [customDesignUrl, setCustomDesignUrl] = useState(null);
    const [stageSetupUrl, setStageSetupUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatuses, setUploadStatuses] = useState({
        floral: 'idle',
        centerpiece: 'idle',
        customDesign: 'idle',
        stageSetup: 'idle',
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentDeleteFile, setCurrentDeleteFile] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('Sections')
                    .select('mediaUrl, title')
                    .eq('page', 'homepage');

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                const floralImage = data.find(item => item.title === 'service-floral');
                const centerpieceImage = data.find(item => item.title === 'service-centerpiece');
                const customDesignImage = data.find(item => item.title === 'service-custom-design');
                const stageSetupImage = data.find(item => item.title === 'service-stage-setup');

                if (floralImage) setFloralUrl(floralImage.mediaUrl);
                if (centerpieceImage) setCenterpieceUrl(centerpieceImage.mediaUrl);
                if (customDesignImage) setCustomDesignUrl(customDesignImage.mediaUrl);
                if (stageSetupImage) setStageSetupUrl(stageSetupImage.mediaUrl);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchServices();
    }, []);

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
            // setUploadStatuses((prev) => ({ ...prev, [type]: 'idle' }));
        }
    };

    const uploadFile = async (type) => {
        if (!selectedFile) {
            alert('Select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('path', `assets/homepage/service`);

        setUploadStatuses((prev) => ({ ...prev, [type]: 'uploading' }));
        setUploadProgress(0);
        setUploadMessage('Uploading file, please wait...');

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

            switch (type) {
                case 'service-floral':
                    title = 'service-floral';
                    mediaUrl = fileUrl;
                    setFloralUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'service-centerpiece':
                    title = 'service-centerpiece';
                    mediaUrl = fileUrl;
                    setCenterpieceUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'service-custom-design':
                    title = 'service-custom-design';
                    mediaUrl = fileUrl;
                    setCustomDesignUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'service-stage-setup':
                    title = 'service-stage-setup';
                    mediaUrl = fileUrl;
                    setStageSetupUrl(fileUrl); // Optionally store the URL in the state
                    break;
                default:
                    console.error('Unknown type:', type);
                    return; // Exit if an invalid type is provided
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

            setUploadStatuses((prev) => ({ ...prev, [type]: 'success' }));
            setUploadMessage('Upload completed successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatuses((prev) => ({ ...prev, [type]: 'error' }));
            setUploadMessage('Upload failed. Please try again.');
        }
    };

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

                switch (currentDeleteFile) {
                    case floralUrl:
                        setFloralUrl(null);
                        break;
                    case centerpieceUrl:
                        setCenterpieceUrl(null);
                        break;
                    case customDesignUrl:
                        setCustomDesignUrl(null);
                        break;
                    case stageSetupUrl:
                        setStageSetupUrl(null);
                        break;
                    default:
                        console.warn('No matching file found for deletion.');
                }
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }
            setShowDeleteConfirmation(false); // Close the confirmation popup
        } catch (error) {
            console.error('Error deleting banner video:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Service Section</h2>
            {uploadMessage && (
                <p className="text-blue-500 font-semibold">{uploadMessage}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
                {floralUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Floral Service Image</h1>
                        {floralUrl && (floralUrl.endsWith('.mp4') || floralUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={floralUrl} type="video/mp4" />
                                <source src={floralUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={floralUrl} alt="About Us Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(floralUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Floral Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Floral Service Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('service-floral')}
                            className={`py-2 px-4 ${uploadStatuses.floral === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.floral === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {centerpieceUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Centerpiece Service Image</h1>
                        {centerpieceUrl && (centerpieceUrl.endsWith('.mp4') || centerpieceUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={centerpieceUrl} type="video/mp4" />
                                <source src={centerpieceUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={centerpieceUrl} alt="About Us Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(centerpieceUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Centerpiece Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Centerpiece Service Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('service-centerpiece')}
                            className={`py-2 px-4 ${uploadStatuses.centerpiece === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.centerpiece === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {customDesignUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Custom Design Service Image</h1>
                        {customDesignUrl && (customDesignUrl.endsWith('.mp4') || customDesignUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={customDesignUrl} type="video/mp4" />
                                <source src={customDesignUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={customDesignUrl} alt="About Us Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(customDesignUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Custom Design Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Custom Design Service Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('service-custom-design')}
                            className={`py-2 px-4 ${uploadStatuses.customDesign === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.customDesign === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {stageSetupUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Stage Setup Service Image</h1>
                        {stageSetupUrl && (stageSetupUrl.endsWith('.mp4') || stageSetupUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={stageSetupUrl} type="video/mp4" />
                                <source src={stageSetupUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={stageSetupUrl} alt="About Us Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(stageSetupUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Stage Setup Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Stage Setup Service Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('service-stage-setup')}
                            className={`py-2 px-4 ${uploadStatuses.stageSetup === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.stageSetup === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
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
    )
}

export default Service
