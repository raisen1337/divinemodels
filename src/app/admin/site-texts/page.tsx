import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { PlusIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Manage Site Text Content - Divine Models',
};

export default async function AdminSiteTextsPage({
    searchParams
}: {
    searchParams: { success?: string; action?: string; }
}) {
    const session = await getServerSession(authOptions);

    // If not logged in as admin, redirect to login
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/auth/signin');
    }

    // Fetch all site texts
    const siteTexts = await prisma.siteText.findMany({
        orderBy: {
            key: 'asc',
        },
    });

    // Group site texts by location for better organization
    const groupedTexts = siteTexts.reduce((acc, text) => {
        const location = text.location || 'General';
        if (!acc[location]) {
            acc[location] = [];
        }
        acc[location].push(text);
        return acc;
    }, {} as Record<string, typeof siteTexts>);

    // Get success message if it exists
    const { success, action } = searchParams;
    const showSuccess = success === 'true';
    const actionMessage = action === 'created'
        ? 'Site text created successfully!'
        : action === 'updated'
            ? 'Site text updated successfully!'
            : action === 'deleted'
                ? 'Site text deleted successfully!'
                : '';

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
                            Site Text Management
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage editable content across your website with elegant precision.
                        </p>
                    </div>
                    <Link
                        href="/admin/site-texts/new"
                        className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New Text
                    </Link>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && actionMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-green-800">Success!</h3>
                            <p className="text-green-700">{actionMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="bg-blue-100 rounded-lg p-3">
                            <EyeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-2xl font-serif font-light text-gray-900">{siteTexts.length}</p>
                            <p className="text-sm text-gray-600">Total Site Texts</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="bg-green-100 rounded-lg p-3">
                            <PencilIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-2xl font-serif font-light text-gray-900">{Object.keys(groupedTexts).length}</p>
                            <p className="text-sm text-gray-600">Content Sections</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="bg-purple-100 rounded-lg p-3">
                            <PlusIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-2xl font-serif font-light text-gray-900">
                                {siteTexts.filter(text => text.location === 'Homepage').length}
                            </p>
                            <p className="text-sm text-gray-600">Homepage Texts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            {Object.keys(groupedTexts).length > 0 ? (
                <div className="space-y-8">
                    {Object.entries(groupedTexts).map(([location, texts]) => (
                        <div key={location} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-serif font-medium text-gray-900">{location}</h3>
                                <p className="text-sm text-gray-600 mt-1">{texts.length} text{texts.length !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {texts.map((text) => (
                                    <div key={text.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h4 className="text-sm font-medium text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                                                        {text.key}
                                                    </h4>
                                                    {text.description && (
                                                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                            {text.description}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 leading-relaxed line-clamp-3">
                                                    {text.value}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2 ml-6">
                                                <Link
                                                    href={`/admin/site-texts/${text.id}`}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <PencilIcon className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <PlusIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-light text-gray-900 mb-2">No Site Texts Yet</h3>
                    <p className="text-gray-600 mb-6">
                        Start by creating your first editable text content to make your website dynamic.
                    </p>
                    <Link
                        href="/admin/site-texts/new"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create First Site Text
                    </Link>
                </div>
            )}
        </div>
    );
}
