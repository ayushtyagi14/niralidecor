'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Layout = () => {
    const [weddingUrl, setWeddingUrl] = useState(null);
    const [centerpieceUrl, setCenterpieceUrl] = useState(null);
    const [receptionUrl, setReceptionUrl] = useState(null);
    const [sangeetGarbaUrl, setSangeetGarbaUrl] = useState(null);
    const [vidhiHaldiUrl, setVidhiHaldiUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatuses, setUploadStatuses] = useState({
        wedding: 'idle',
        centerpiece: 'idle',
        reception: 'idle',
        vidhiHaldi: 'idle',
        sangeetGarba: 'idle',
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [currentDeleteFile, setCurrentDeleteFile] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('Sections')
                    .select('mediaUrl, title')
                    .eq('page', 'portfolio');

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                const centerpieceImage = data.find(item => item.title === 'portfolio-centerpiece');
                const weddingImage = data.find(item => item.title === 'portfolio-wedding');
                const receptionImage = data.find(item => item.title === 'portfolio-reception');
                const vidhiHaldiImage = data.find(item => item.title === 'portfolio-vidhi-haldi');
                const sangeetGarbaImage = data.find(item => item.title === 'portfolio-sangeet-garba');

                if (centerpieceImage) setCenterpieceUrl(centerpieceImage.mediaUrl);
                if (weddingImage) setWeddingUrl(weddingImage.mediaUrl);
                if (receptionImage) setReceptionUrl(receptionImage.mediaUrl);
                if (vidhiHaldiImage) setVidhiHaldiUrl(vidhiHaldiImage.mediaUrl);
                if (sangeetGarbaImage) setSangeetGarbaUrl(sangeetGarbaImage.mediaUrl);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchServices();
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
        formData.append('path', `assets/portfolio/layout`);

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
                case 'portfolio-centerpiece':
                    title = 'portfolio-centerpiece';
                    mediaUrl = fileUrl;
                    setCenterpieceUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'portfolio-wedding':
                    title = 'portfolio-wedding';
                    mediaUrl = fileUrl;
                    setWeddingUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'portfolio-reception':
                    title = 'portfolio-reception';
                    mediaUrl = fileUrl;
                    setReceptionUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'portfolio-vidhi-haldi':
                    title = 'portfolio-vidhi-haldi';
                    mediaUrl = fileUrl;
                    setVidhiHaldiUrl(fileUrl); // Optionally store the URL in the state
                    break;
                case 'portfolio-sangeet-garba':
                    title = 'portfolio-sangeet-garba';
                    mediaUrl = fileUrl;
                    setSangeetGarbaUrl(fileUrl); // Optionally store the URL in the state
                    break;
                default:
                    console.error('Unknown type:', type);
                    return; // Exit if an invalid type is provided
            }

            // Insert new entry into Supabase with the dynamic title and mediaUrl
            const fileType = selectedFile.type.startsWith('video') ? 'video' : 'image';

            const { error } = await supabase.from('Sections').insert([
                {
                    page: 'portfolio',
                    mediaUrl: mediaUrl, // Use the mediaUrl (fileUrl) for each type
                    title: title, // Set the title dynamically based on the type
                    type: fileType,
                },
            ]);

            if (error) throw error;

            setUploadStatuses((prev) => ({ ...prev, [type]: 'success' }));
            setUploadMessage('Upload completed successfully!');
            setRefresh((prev) => !prev);
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
                .eq('page', 'portfolio'); // Ensure only the relevant entry is deleted

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
                    case weddingUrl:
                        setWeddingUrl(null);
                        break;
                    case centerpieceUrl:
                        setCenterpieceUrl(null);
                        break;
                    case receptionUrl:
                        setReceptionUrl(null);
                        break;
                    case vidhiHaldiUrl:
                        setVidhiHaldiUrl(null);
                        break;
                    case sangeetGarbaUrl:
                        setSangeetGarbaUrl(null);
                        break;
                    default:
                        console.warn('No matching file found for deletion.');
                }
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }
            setShowDeleteConfirmation(false); // Close the confirmation popup
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error deleting layout images:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Portolio Layout Section</h2>
            {uploadMessage && (
                <p className="text-blue-500 font-semibold">{uploadMessage}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
                {weddingUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Wedding Image</h1>
                        {weddingUrl && (weddingUrl.endsWith('.mp4') || weddingUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={weddingUrl} type="video/mp4" />
                                <source src={weddingUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={weddingUrl} alt="Portfolio Page Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(weddingUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Wedding Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Wedding Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('portfolio-wedding')}
                            className={`py-2 px-4 ${uploadStatuses.wedding === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.wedding === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {centerpieceUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Centerpiece Image</h1>
                        {centerpieceUrl && (centerpieceUrl.endsWith('.mp4') || centerpieceUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={centerpieceUrl} type="video/mp4" />
                                <source src={centerpieceUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={centerpieceUrl} alt="Portfolio Page Nirali Decor" className="rounded-md shadow h-[80%]" />
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
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Centerpiece Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('portfolio-centerpiece')}
                            className={`py-2 px-4 ${uploadStatuses.centerpiece === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.centerpiece === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {receptionUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Reception Image</h1>
                        {receptionUrl && (receptionUrl.endsWith('.mp4') || receptionUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={receptionUrl} type="video/mp4" />
                                <source src={receptionUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={receptionUrl} alt="Portfolio Page Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(receptionUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Reception Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Reception Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('portfolio-reception')}
                            className={`py-2 px-4 ${uploadStatuses.reception === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.reception === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {vidhiHaldiUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Vidhi & Haldi Image</h1>
                        {vidhiHaldiUrl && (vidhiHaldiUrl.endsWith('.mp4') || vidhiHaldiUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={vidhiHaldiUrl} type="video/mp4" />
                                <source src={vidhiHaldiUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={vidhiHaldiUrl} alt="Portfolio Page Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(vidhiHaldiUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Vidhi & Haldi Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Vidhi & Haldi Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('portfolio-vidhi-haldi')}
                            className={`py-2 px-4 ${uploadStatuses.vidhiHaldi === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.vidhiHaldi === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Upload File'}
                        </button>
                    </div>
                )}

                {sangeetGarbaUrl ? (
                    <div className='h-[500px]'>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Sangeet & Garba Image</h1>
                        {sangeetGarbaUrl && (sangeetGarbaUrl.endsWith('.mp4') || sangeetGarbaUrl.endsWith('.mov')) ? (
                            <video controls className="rounded-md shadow h-[80%]">
                                <source src={sangeetGarbaUrl} type="video/mp4" />
                                <source src={sangeetGarbaUrl} type="video/mov" />
                            </video>
                        ) : (
                            <img src={sangeetGarbaUrl} alt="Portfolio Page Nirali Decor" className="rounded-md shadow h-[80%]" />
                        )}
                        <button
                            onClick={() => {
                                setCurrentDeleteFile(sangeetGarbaUrl);
                                setShowDeleteConfirmation(true);
                            }}
                            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Delete Sangeet & Garba Image
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-[20px] font-bold uppercase mb-4'>Sangeet & Garba Image</h1>
                        <input
                            type="file"
                            accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                            onChange={(e) => handleFileSelect(e)}
                            className="block mb-2"
                        />
                        <button
                            onClick={() => uploadFile('portfolio-sangeet-garba')}
                            className={`py-2 px-4 ${uploadStatuses.sangeetGarba === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatuses.sangeetGarba === 'uploading'
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

export default Layout
