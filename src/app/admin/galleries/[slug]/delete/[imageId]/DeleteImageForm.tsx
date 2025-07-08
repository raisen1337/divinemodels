'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    modelId: string;
    modelSlug: string;
    imageId: string;
    modelName: string;
};

type ImageData = {
    id: string;
    url: string;
    alt: string | null;
    featured: boolean;
};

export default function DeleteImageForm({ modelId, modelSlug, imageId, modelName }: Props) {
    const router = useRouter();
    const [image, setImage] = useState<ImageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    // Fetch image data
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`/api/models/${modelSlug}/images/${imageId}`);
                const imageData = response.data;
                setImage(imageData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch image data:', error);
                setError('Failed to load image data. Please try again.');
                setLoading(false);
            }
        };

        fetchImageData();
    }, [modelSlug, imageId]);

    const handleDelete = async () => {
        setDeleting(true);
        setError('');

        try {
            await axios.delete(`/api/models/${modelSlug}/images/${imageId}`);

            // Navigate back to the gallery page using slug
            router.push(`/admin/galleries/${modelSlug}`);
            router.refresh();
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Failed to delete image. Please try again.');
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="animate-pulse flex flex-col space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!image) {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {error || 'Image not found. Please select a valid image.'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href={`/admin/galleries/${modelSlug}`} className="text-gold hover:underline">
                        &larr; Back to gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-medium mb-4 text-red-600">Delete Image</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this image from {modelName}'s portfolio? This action cannot be undone.
                </p>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-sm mx-auto mb-6">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={image.url}
                            alt={image.alt || modelName}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <Link
                        href={`/admin/galleries/${modelSlug}`}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </Link>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete Image'}
                    </button>
                </div>
            </div>
        </div>
    );
}
