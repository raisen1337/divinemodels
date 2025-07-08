'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
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

type Model = {
    id: string;
    name: string;
    slug: string;
    bio: string | null;
    height: string | null;
    bust: string | null;
    waist: string | null;
    hips: string | null;
    shoeSize: string | null;
    hairColor: string | null;
    eyeColor: string | null;
    age: string | null;
    featured: boolean;
    categories: Category[];
    features: Feature[];
    images: Array<{ url: string; key: string; name: string }>;
};

export default function EditModelForm({
    model,
    categories,
    features
}: {
    model: Model;
    categories: Category[];
    features: Feature[];
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [existingImages, setExistingImages] = useState<Array<{ url: string; key?: string; name?: string }>>(model.images || []);
    const [newImages, setNewImages] = useState<Array<{ url: string; key: string; name: string }>>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(model.categories.map(cat => cat.id));
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(model.features.map(feat => feat.id));

    // Form state
    const [formData, setFormData] = useState({
        name: model.name || '',
        bio: model.bio || '',
        height: model.height || '',
        bust: model.bust || '',
        waist: model.waist || '',
        hips: model.hips || '',
        shoeSize: model.shoeSize || '',
        hairColor: model.hairColor || '',
        eyeColor: model.eyeColor || '',
        age: model.age || '',
        featured: model.featured || false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleUploadComplete = (files: Array<{ url: string; key: string; name: string }>) => {
        setNewImages(prev => [...prev, ...files]);
    };

    const handleUploadError = (error: Error) => {
        setError(error.message);
    };

    const removeImage = (index: number, isNew: boolean = false) => {
        if (isNew) {
            setNewImages(newImages.filter((_, i) => i !== index));
        } else {
            setExistingImages(existingImages.filter((_, i) => i !== index));
        }
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
            active: true, // Default to true since there's no checkbox for this
            categoryIds: selectedCategories,
            featureIds: selectedFeatures,
            newImageUrls: newImages, // Only new uploaded images
            imagesToDelete: [], // Not implemented in current form
            featuredImageId: null // Not implemented in current form
        };

        console.log('Sending data to API:', modelData);

        try {
            const response = await fetch(`/api/models/${model.slug}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modelData),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to update model';
                try {
                    const data = await response.json();
                    errorMessage = data.error || errorMessage;
                } catch (jsonError) {
                    // If JSON parsing fails, use the status text
                    errorMessage = `Server error: ${response.status} ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            let updatedModel;
            try {
                updatedModel = await response.json();
            } catch (jsonError) {
                throw new Error('Invalid response from server');
            }

            setSuccess(true);

            // Redirect after a short delay
            setTimeout(() => {
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
                    <h1 className="text-2xl font-bold text-gray-900">Edit Model: {model.name}</h1>
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
                            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Success</h3>
                            <div className="mt-2 text-sm text-green-700">
                                Model updated successfully! Redirecting...
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
                                value={formData.name}
                                onChange={handleInputChange}
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
                                value={formData.age}
                                onChange={handleInputChange}
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
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us about this model..."
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white placeholder-gray-400 px-3 py-2"
                            />
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
                                value={formData.height}
                                onChange={handleInputChange}
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
                                value={formData.hairColor}
                                onChange={handleInputChange}
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
                                value={formData.eyeColor}
                                onChange={handleInputChange}
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
                                value={formData.bust}
                                onChange={handleInputChange}
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
                                value={formData.waist}
                                onChange={handleInputChange}
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
                                value={formData.hips}
                                onChange={handleInputChange}
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
                                value={formData.shoeSize}
                                onChange={handleInputChange}
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
                                    checked={formData.featured}
                                    onChange={handleInputChange}
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

                        {(existingImages.length > 0 || newImages.length > 0) && (
                            <div className="mt-6">
                                {existingImages.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Images:</h4>
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mb-4">
                                            {existingImages.map((image, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={image.url}
                                                        alt={image.name || 'Existing image'}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index, false)}
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
                                    </div>
                                )}

                                {newImages.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">New Images:</h4>
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                            {newImages.map((image, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index, true)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <XCircleIcon className="h-4 w-4" />
                                                    </button>
                                                    <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                        New
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                            {loading ? 'Updating...' : 'Update Model'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
