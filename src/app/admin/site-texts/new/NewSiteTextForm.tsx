'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function NewSiteTextForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const key = formData.get('key') as string;
        const value = formData.get('value') as string;
        const description = formData.get('description') as string;
        const location = formData.get('location') as string;

        try {
            const response = await fetch('/api/site-texts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key,
                    value,
                    description: description || null,
                    location: location || null,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create site text');
            }

            setSuccess(true);

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/site-texts?success=true&action=created');
                router.refresh();
            }, 1500);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-12">
            <div className="flex items-center mb-6">
                <Link
                    href="/admin/site-texts"
                    className="mr-4 text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add New Site Text</h1>
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
                                Site text created successfully! Redirecting...
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
                <div className="mb-6">
                    <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                        Text Key *
                    </label>
                    <input
                        type="text"
                        name="key"
                        id="key"
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. homepage.hero.title"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        A unique identifier for this text. Use dot notation for better organization.
                    </p>
                </div>

                <div className="mb-6">
                    <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                        Text Value *
                    </label>
                    <textarea
                        name="value"
                        id="value"
                        rows={4}
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter the text content here"
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Optional description of where this text is used"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. Homepage, About Page, etc."
                    />
                </div>

                <div className="flex justify-end">
                    <Link
                        href="/admin/site-texts"
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
                        {loading ? 'Saving...' : 'Save Text'}
                    </button>
                </div>
            </form>
        </div>
    );
}
