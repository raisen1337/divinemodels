'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, XCircleIcon } from '@heroicons/react/24/outline';
import ModelImageUploader from '@/components/ModelImageUploader';

type Props = {
    modelId: string;
    modelSlug: string;
    modelName: string;
};

export default function UploadImagesForm({ modelId, modelSlug, modelName }: Props) {
    const router = useRouter();
    const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; key: string; name: string }>>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleUploadComplete = (files: Array<{ url: string; key: string; name: string }>) => {
        setUploadedImages(prev => [...prev, ...files]);
    };

    const handleUploadError = (error: Error) => {
        setError(error.message);
    };

    const removeImage = (index: number) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    const handleSaveImages = async () => {
        if (uploadedImages.length === 0) {
            setError('Please upload at least one image');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const response = await fetch(`/api/models/${modelSlug}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageUrls: uploadedImages
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to save images');
            }

            // Redirect back to the gallery page
            router.push(`/admin/galleries/${modelSlug}`);
            router.refresh();
        } catch (error: any) {
            setError(error.message);
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12 px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link
                        href={`/admin/galleries/${modelSlug}`}
                        className="mr-4 text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Upload Images for {modelName}</h1>
                </div>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Images</h3>

                <ModelImageUploader
                    onUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                    maxFiles={50}
                />

                {uploadedImages.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                            Uploaded Images ({uploadedImages.length})
                        </h4>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {uploadedImages.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image.url}
                                        alt={image.name}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XCircleIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-5 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                        <Link
                            href={`/admin/galleries/${modelSlug}`}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </Link>
                        <button
                            onClick={handleSaveImages}
                            disabled={uploading || uploadedImages.length === 0}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(uploading || uploadedImages.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {uploading ? 'Saving...' : `Save ${uploadedImages.length} Images`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
