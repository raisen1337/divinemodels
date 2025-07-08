'use client';

import { useState, FormEvent, useEffect } from 'react';
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

export default function EditImageForm({ modelId, modelSlug, imageId, modelName }: Props) {
    const router = useRouter();
    const [image, setImage] = useState<ImageData | null>(null);
    const [alt, setAlt] = useState('');
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    // Fetch image data
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`/api/models/${modelSlug}/images/${imageId}`);
                const imageData = response.data;
                setImage(imageData);
                setAlt(imageData.alt || '');
                setFeatured(imageData.featured || false);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch image data:', error);
                setError('Failed to load image data. Please try again.');
                setLoading(false);
            }
        };

        fetchImageData();
    }, [modelSlug, imageId]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setError('');

        try {
            await axios.put(`/api/models/${modelSlug}/images/${imageId}`, {
                alt,
                featured,
            });

            // Navigate back to the gallery page using slug
            router.push(`/admin/galleries/${modelSlug}`);
            router.refresh();
        } catch (error) {
            console.error('Error updating image:', error);
            setError('Failed to update image. Please try again.');
            setUpdating(false);
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
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
        <div className="bg-white shadow-md rounded-lg overflow-hidden px-4 sm:px-6">
            <div className="p-6">
                <h2 className="text-xl font-medium mb-4">Edit Image Details</h2>
                <p className="text-gray-600 mb-6">
                    Update the details for this image in {modelName}'s portfolio.
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={image.url}
                            alt={alt || modelName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-1">
                                Image Description (Alt Text)
                            </label>
                            <input
                                type="text"
                                id="alt"
                                name="alt"
                                value={alt}
                                onChange={(e) => setAlt(e.target.value)}
                                className="shadow-sm focus:ring-gold focus:border-gold block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400"
                                placeholder="Describe the image for accessibility"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                A good description helps with accessibility and SEO.
                            </p>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="featured"
                                name="featured"
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                            />
                            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                                Featured Image
                            </label>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Featured images may be highlighted on the model's profile and homepage.
                        </p>

                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href={`/admin/galleries/${modelSlug}`}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
                                disabled={updating}
                            >
                                {updating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
