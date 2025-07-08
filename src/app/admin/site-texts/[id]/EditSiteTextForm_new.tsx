'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, XCircleIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

type SiteText = {
    id: string;
    key: string;
    value: string;
    description: string | null;
    location: string | null;
};

export default function EditSiteTextForm({ siteText }: { siteText: SiteText }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

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
            const response = await fetch(`/api/site-texts/${siteText.id}`, {
                method: 'PATCH',
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
                throw new Error(data.error || 'Failed to update site text');
            }

            setSuccess(true);

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/admin/site-texts?success=true&action=updated');
                router.refresh();
            }, 1500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setDeleteError(null);

        try {
            const response = await fetch(`/api/site-texts/${siteText.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete site text');
            }

            // Redirect to the site texts list page
            router.push('/admin/site-texts?success=true&action=deleted');
            router.refresh();
        } catch (err: any) {
            setDeleteError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/admin/site-texts"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            Back to Site Texts
                        </Link>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h1 className="text-2xl font-serif font-light text-gray-900">
                            Edit Site Text
                        </h1>
                    </div>
                    <button
                        onClick={() => setDeleteConfirmationOpen(true)}
                        className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                    </button>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                    {siteText.key}
                </p>
            </div>

            {/* Success Message */}
            {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                        <div>
                            <h3 className="text-lg font-medium text-green-800">Success!</h3>
                            <p className="text-green-700">Site text updated successfully. Redirecting...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center">
                        <XCircleIcon className="h-6 w-6 text-red-600 mr-3" />
                        <div>
                            <h3 className="text-lg font-medium text-red-800">Error</h3>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
                <div>
                    <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-2">
                        Key *
                    </label>
                    <input
                        type="text"
                        id="key"
                        name="key"
                        defaultValue={siteText.key}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                        placeholder="e.g., homepage.hero.title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Unique identifier for this text (use dot notation for organization)
                    </p>
                </div>

                <div>
                    <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                    </label>
                    <textarea
                        id="value"
                        name="value"
                        defaultValue={siteText.value}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                        placeholder="Enter the text content that will be displayed on the website..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        The actual content that will be displayed on your website
                    </p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={siteText.description || ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Brief description of this text's purpose..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Optional description to help identify this text's purpose
                    </p>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location/Section
                    </label>
                    <select
                        id="location"
                        name="location"
                        defaultValue={siteText.location || ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        <option value="">Select a location...</option>
                        <option value="Homepage">Homepage</option>
                        <option value="About">About Page</option>
                        <option value="Models">Models Page</option>
                        <option value="Contact">Contact Page</option>
                        <option value="Footer">Footer</option>
                        <option value="Navigation">Navigation</option>
                        <option value="General">General</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Helps organize texts by website section
                    </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <Link
                        href="/admin/site-texts"
                        className="inline-flex items-center px-6 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Delete Confirmation Modal */}
            {deleteConfirmationOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
                        <div className="text-center">
                            <TrashIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                            <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                                Delete Site Text
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete "{siteText.key}"? This action cannot be undone.
                            </p>

                            {deleteError && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                    <p className="text-red-700 text-sm">{deleteError}</p>
                                </div>
                            )}

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setDeleteConfirmationOpen(false)}
                                    className="flex-1 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                                >
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
