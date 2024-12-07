'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [review, setReview] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [isEditingName, setIsEditingName] = useState(false); // Control name editing
    const [isEditingReview, setIsEditingReview] = useState(false); // Control review editing
    const [currentReviewId, setCurrentReviewId] = useState(null); // Track current review being edited
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteConfirmation2, setShowDeleteConfirmation2] = useState(false);
    const [currentDeleteFile, setCurrentDeleteFile] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger re-fetch
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('Reviews')
                    .select('id, mediaUrl, name, review')
                    .eq('page', 'homepage');

                if (error) {
                    console.error('Error fetching data:', error.message);
                    return;
                }

                setReviews(data); // Store reviews in state
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [refresh]);

    // Update specific review field
    const updateReviewField = async (id, field, newValue) => {
        try {
            const { error } = await supabase
                .from('Reviews')
                .update({ [field]: newValue })
                .eq('id', id);

            if (error) {
                console.error(`Error updating ${field}:`, error.message);
                return;
            }

            // Update the local state to reflect the change
            setReviews(prevReviews =>
                prevReviews.map(review =>
                    review.id === id ? { ...review, [field]: newValue } : review
                )
            );
            setRefresh((prev) => !prev); // Toggle the refresh state
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };


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
        }
    };

    // Handle file upload (to store the image)
    const handleFileUpload = async (id) => {
        if (!selectedFile) {
            alert('Select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('path', `assets/homepage/reviews`);

        setUploadStatus("uploading");
        setUploadProgress(0);
        setUploadMessage('Uploading file, please wait...');

        try {
            // Upload the file to your server or cloud storage
            const response = await axios.post('/api/assets/upload', formData, {
                onUploadProgress: (progress) => {
                    setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
                },
            });

            const fileUrl = response.data.fileUrl;
            console.log(fileUrl);

            // Check if the review with the given id exists and if the mediaUrl is empty
            const { data, error: fetchError } = await supabase
                .from('Reviews')
                .select('id, mediaUrl')
                .eq('id', id)
                .single(); // Retrieve one record

            if (fetchError) {
                throw new Error('Review with the given ID does not exist.');
            }

            if (data) {
                // Check if mediaUrl is already set
                if (data.mediaUrl) {
                    throw new Error('This review already has a media file.');
                }

                // Update the review with the new file URL
                const { error: updateError } = await supabase
                    .from('Reviews')
                    .update({ mediaUrl: fileUrl })
                    .eq('id', id);

                if (updateError) {
                    throw new Error('Error updating media URL.');
                }

                setUploadStatus('success')
                setUploadMessage('File uploaded and review updated successfully!');
                setRefresh((prev) => !prev); // Toggle the refresh state
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage(`Upload failed: ${error.message}`);
        }
    };

    // Handle new review submission
    const handleAddReview = async () => {
        if (!name || !review) {
            alert('Name and review text are required');
            return;
        }

        try {
            // Upload media if selected
            let mediaUrl = null;
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('path', `assets/homepage/reviews`);

                setUploadStatus('uploading');
                setUploadProgress(0);
                setUploadMessage('Uploading Review, please wait...');

                try {
                    // Upload the file to your server or cloud storage
                    const response = await axios.post('/api/assets/upload', formData, {
                        onUploadProgress: (progress) => {
                            setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
                        },
                    });

                    mediaUrl = response.data.fileUrl; // Get fileUrl from response
                    console.log('File uploaded successfully:', mediaUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    setUploadMessage(`Upload failed: ${error.message}`);
                    return; // Stop further execution if the file upload fails
                }
            }

            // Insert the new review into the Supabase table
            const { error } = await supabase
                .from('Reviews')
                .insert([{ page: 'homepage', mediaUrl, name, review }]);

            if (error) {
                console.error('Error adding review:', error.message);
                return;
            }

            // Add the new review to local state (assuming reviews are managed in state)
            setReviews((prevReviews) => [
                ...prevReviews,
                { mediaUrl, name, review },
            ]);

            // Close popup and reset form fields
            setShowPopup(false);
            setName('');
            setReview('');
            setSelectedFile(null);
            setUploadStatus('success');
            setUploadMessage('Review Uploaded successfully!');
            setRefresh((prev) => !prev); // Toggle the refresh state
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const deleteMedia = async () => {
        console.log('Deleting media:', currentDeleteFile);
        const url = new URL(currentDeleteFile);
        const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

        if (!key.startsWith('assets/')) {
            alert('Invalid file key.');
            return;
        }

        try {
            // Step 1: Remove `mediaUrl` field from the row in Supabase
            const { data, error } = await supabase
                .from('Reviews')
                .update({ mediaUrl: null }) // Set `mediaUrl` to null
                .eq('mediaUrl', currentDeleteFile)
                .eq('page', 'homepage'); // Ensure you are updating the correct entry

            if (error) {
                throw error;
            }

            console.log('Updated row in Supabase:', data);

            // Step 2: Delete from DigitalOcean Spaces
            const response = await axios.delete('/api/assets/delete', {
                data: { key }, // Send the file key as per your API requirement
            });

            if (response.status === 200) {
                console.log('Deleted from DigitalOcean Spaces:', response.data);
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }

            setShowDeleteConfirmation2(false); // Close the confirmation popup
            setRefresh((prev) => !prev); // Toggle the refresh state
        } catch (error) {
            console.error('Error deleting media:', error);
        }
    };

    // Delete a review
    const deleteReview = async () => {
        const url = new URL(currentDeleteFile);
        const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

        if (!key.startsWith('assets/')) {
            alert('Invalid file key.');
            return;
        }

        try {
            const { error } = await supabase
                .from('Reviews')
                .delete()
                .eq('id', currentId);

            if (error) {
                console.error('Error deleting review:', error.message);
                return;
            }

            const response = await axios.delete('/api/assets/delete', {
                data: { key }, // Send the file key as per your API requirement
            });

            if (response.status === 200) {
                console.log('Deleted from DigitalOcean Spaces:', response.data);
            } else {
                console.error('Failed to delete file from Spaces:', response.data);
            }

            // Remove the deleted review from local state
            setShowDeleteConfirmation(false)
            setUploadMessage('Review Deleted successfully!');
            setReviews(prevReviews => prevReviews.filter(review => review.id !== currentId));
            setRefresh((prev) => !prev); // Toggle the refresh state
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Homepage Reviews</h2>

            {uploadMessage && (
                <p className="text-blue-500 font-semibold">{uploadMessage}</p>
            )}

            <div className='flex w-full justify-end'>
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-[8px] mt-4"
                >
                    Upload New Review
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                        <h3 className="text-lg font-semibold mb-4">Add a New Review</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border mb-2 w-full"
                        />
                        <textarea
                            placeholder="Review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="p-2 border mb-2 w-full"
                        />
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="p-2 border mb-2 w-full"
                        />
                        <button
                            onClick={handleAddReview}
                            className={`p-2 rounded mt-2
                                ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            {uploadStatus === 'uploading'
                                ? `Uploading... ${uploadProgress}%`
                                : 'Add Review'}
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

            {/* Display Reviews */}
            <div className="mt-6">
                {reviews.map((review, index) => (
                    <div key={index} className="flex mb-4 p-4 border shadow-md rounded-lg">
                        {/* Image Section */}
                        {review.mediaUrl ? (
                            <div className='flex flex-col items-center'>
                                <img
                                    src={review.mediaUrl}
                                    alt="Review image"
                                    className="w-[250px] h-[250px] object-cover rounded-[12px]"
                                />
                                <button
                                    onClick={() => {
                                        setCurrentDeleteFile(review.mediaUrl);
                                        setShowDeleteConfirmation2(true);
                                    }}
                                    className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-max"
                                >
                                    Delete This Image
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h1 className='text-[20px] font-bold uppercase mb-4'>Upload Review Image</h1>
                                <input
                                    type="file"
                                    accept="video/mp4,video/mov,video/avi,video/webm,video/ogg,video/mkv,image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
                                    onChange={(e) => handleFileSelect(e)}
                                    className="block mb-2 ml-4 mt-10"
                                />
                                <button
                                    onClick={() => handleFileUpload(review.id)}
                                    className={`py-2 px-4 ml-4 
                                    ${uploadStatus === 'uploading' ? 'bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    {uploadStatus === 'uploading'
                                        ? `Uploading... ${uploadProgress}%`
                                        : 'Upload File'}
                                </button>
                            </div>
                        )}

                        {/* Review Content Section */}
                        <div className="flex flex-col justify-between gap-8">
                            {/* Name */}
                            <div className="flex flex-col justify-between items-center">
                                {isEditingName && currentReviewId === review.id ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="p-2 text-[22px] font-semibold border w-[90%] mx-auto mb-3"
                                    />
                                ) : (
                                    <h3 className="text-[22px] font-semibold w-[90%] mx-auto text-center mb-3">{review.name}</h3>
                                )}
                                {isEditingName && currentReviewId === review.id ? (
                                    <>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsEditingName(true);
                                            setName(review.name);
                                            setCurrentReviewId(review.id);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-[8px]"
                                    >
                                        Edit Name
                                    </button>
                                )}
                                {isEditingName && currentReviewId === review.id && (
                                    <div className='flex flex-row items-center gap-5 mt-2'>
                                        <button
                                            onClick={() => {
                                                updateReviewField(review.id, 'name', name);
                                                setIsEditingName(false);
                                            }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-[8px] ml-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditingName(false);  // Cancel editing and reset the name
                                                setName(review.name);  // Reset to the original name
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-[8px] ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Review */}
                            <div className="flex flex-col justify-between items-center">
                                {isEditingReview && currentReviewId === review.id ? (
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        cols={100}
                                        rows={4}
                                        className="text-[20px] p-2 border mb-3 w-[90%] mx-auto text-center"  // Full width when editing
                                    />
                                ) : (
                                    <p className='text-[20px] mx-auto w-[90%] text-center mb-3'>{review.review}</p>
                                )}
                                {isEditingReview && currentReviewId === review.id ? (
                                    <>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsEditingReview(true);
                                            setReviewText(review.review); // Pass the review text when editing
                                            setCurrentReviewId(review.id);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-[8px]"
                                    >
                                        Edit Review
                                    </button>
                                )}
                                {isEditingReview && currentReviewId === review.id && (
                                    <div className='flex flex-row items-center gap-5 mt-2'>
                                        <button
                                            onClick={() => {
                                                updateReviewField(review.id, 'review', reviewText); // Update review text
                                                setIsEditingReview(false);
                                            }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-[8px] ml-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditingReview(false);  // Cancel editing and reset the review
                                                setReviewText(review.review);  // Reset to the original review text
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-[8px] ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    setCurrentDeleteFile(review.mediaUrl);
                                    setCurrentId(review.id)
                                    setShowDeleteConfirmation(true);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-[8px] w-max ml-auto"
                            >
                                Delete Review
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this Review?</h3>
                        <button
                            onClick={deleteReview}
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

            {showDeleteConfirmation2 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                        <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this Image?</h3>
                        <button
                            onClick={deleteMedia}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-4"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirmation2(false)}
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

export default Reviews;
