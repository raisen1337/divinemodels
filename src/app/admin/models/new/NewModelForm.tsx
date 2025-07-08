'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ModelImageUploader from '@/components/ModelImageUploader';

type Category = {
    id: string;
    name: string;
    slug: string;
};

type Feature = {
    id: string;
    name: string;
};

export default function NewModelForm({
    categories,
    features
}: {
    categories: Category[];
    features: Feature[];
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; key: string; name: string }>>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const handleUploadComplete = (files: Array<{ url: string; key: string; name: string }>) => {
        setUploadedImages(prev => [...prev, ...files]);
    };

    const handleUploadError = (error: Error) => {
        setError(error.message);
    };

    const removeImage = (index: number) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Prepare data for API
        const modelData = {
            name: formData.get('name') as string,
            bio: formData.get('bio') as string,
            height: formData.get('height') as string,
            bust: formData.get('bust') as string,
            waist: formData.get('waist') as string,
            hips: formData.get('hips') as string,
            shoeSize: formData.get('shoeSize') as string,
            hairColor: formData.get('hairColor') as string,
            eyeColor: formData.get('eyeColor') as string,
            age: formData.get('age') as string,
            featured: formData.get('featured') === 'on',
            categoryIds: selectedCategories,
            featureIds: selectedFeatures,
            imageUrls: uploadedImages,
        };

        try {
            const response = await fetch('/api/models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modelData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create model');
            }

            const model = await response.json();
            setSuccess(true);

            // Redirect to the model page after a short delay
            setTimeout(() => {
                router.push(`/admin/models/${model.slug}`);
                router.refresh();
            }, 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id)
                ? prev.filter(catId => catId !== id)
                : [...prev, id]
        );
    };

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id)
                ? prev.filter(featId => featId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="max-w-4xl mx-auto pb-12 px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link
                        href="/admin/models"
                        className="mr-4 text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Model</h1>
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

            {success && (
                <div className="mb-4 bg-green-50 p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <PlusCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Success</h3>
                            <div className="mt-2 text-sm text-green-700">
                                Model created successfully! Redirecting...
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Basic Information */}
                    <div className="sm:col-span-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name *
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Model's full name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="age"
                                id="age"
                                min="1"
                                max="100"
                                placeholder="Age in years"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="bio"
                                name="bio"
                                rows={4}
                                placeholder="Tell us about this model..."
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            ></textarea>
                        </div>
                    </div>

                    {/* Physical Characteristics */}
                    <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Physical Characteristics</h3>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                            Height
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="height"
                                id="height"
                                placeholder="e.g. 175 cm"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">
                            Hair Color
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="hairColor"
                                id="hairColor"
                                placeholder="e.g. Blonde, Brown"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700">
                            Eye Color
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="eyeColor"
                                id="eyeColor"
                                placeholder="e.g. Blue, Brown"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Body Measurements */}
                    <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Body Measurements</h3>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="bust" className="block text-sm font-medium text-gray-700">
                            Bust
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="bust"
                                id="bust"
                                placeholder="e.g. 90 cm"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="waist" className="block text-sm font-medium text-gray-700">
                            Waist
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="waist"
                                id="waist"
                                placeholder="e.g. 60 cm"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="hips" className="block text-sm font-medium text-gray-700">
                            Hips
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="hips"
                                id="hips"
                                placeholder="e.g. 90 cm"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="shoeSize" className="block text-sm font-medium text-gray-700">
                            Shoe Size
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="shoeSize"
                                id="shoeSize"
                                placeholder="e.g. 39 EU"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id={`category-${category.id}`}
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => toggleCategory(category.id)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor={`category-${category.id}`} className="font-medium text-gray-700">
                                            {category.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {features.map((feature) => (
                                <div key={feature.id} className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id={`feature-${feature.id}`}
                                            type="checkbox"
                                            checked={selectedFeatures.includes(feature.id)}
                                            onChange={() => toggleFeature(feature.id)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor={`feature-${feature.id}`} className="font-medium text-gray-700">
                                            {feature.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status Options */}
                    <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Status Options</h3>
                    </div>

                    <div className="sm:col-span-6">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="featured"
                                    name="featured"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="featured" className="font-medium text-gray-700">
                                    Featured
                                </label>
                                <p className="text-gray-500">This model will be featured on the homepage.</p>
                            </div>
                        </div>
                    </div>

                    {/* Images Section */}
                    <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>

                        <ModelImageUploader
                            onUploadComplete={handleUploadComplete}
                            onUploadError={handleUploadError}
                            maxFiles={20}
                        />

                        {uploadedImages.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
                                        {index === 0 && (
                                            <div className="absolute bottom-1 left-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-5 border-t border-gray-200">
                    <div className="flex justify-end">
                        <Link
                            href="/admin/models"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loading || success) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Saving...' : 'Save Model'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
