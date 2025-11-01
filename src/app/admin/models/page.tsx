import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    EyeIcon,
    PhotoIcon,
    StarIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Manage Models - Admin',
};

export default async function AdminModelsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/auth/signin');
    }

    const models = await prisma.model.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            images: {
                where: { featured: true },
                take: 1,
                orderBy: { featured: 'desc' },
            },
            categories: true,
            _count: {
                select: { images: true }
            },
        },
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-light text-gray-900">
                        Models
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your model portfolio
                    </p>
                </div>
                <Link
                    href="/admin/models/new"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add New Model
                </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">{models.length}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <PhotoIcon className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active</p>
                            <p className="text-2xl font-semibold text-green-600">
                                {models.filter(m => m.active).length}
                            </p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Featured</p>
                            <p className="text-2xl font-semibold text-yellow-600">
                                {models.filter(m => m.featured).length}
                            </p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <StarIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Inactive</p>
                            <p className="text-2xl font-semibold text-gray-500">
                                {models.filter(m => !m.active).length}
                            </p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <XCircleIcon className="h-6 w-6 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Models Grid */}
            {models.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12">
                    <div className="text-center">
                        <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No models yet</h3>
                        <p className="text-gray-600 mb-6">Get started by creating your first model profile</p>
                        <Link
                            href="/admin/models/new"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Add First Model
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {models.map((model: any) => (
                        <div
                            key={model.id}
                            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                            {/* Model Image */}
                            <div className="relative aspect-[3/4] bg-gray-100">
                                {model.images && model.images[0] ? (
                                    <Image
                                        src={model.images[0].url}
                                        alt={model.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PhotoIcon className="h-16 w-16 text-gray-300" />
                                    </div>
                                )}
                                
                                {/* Status Badges */}
                                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                    {model.featured && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white shadow-sm">
                                            <StarIcon className="h-3 w-3 mr-1" />
                                            Featured
                                        </span>
                                    )}
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                                        model.active 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-gray-500 text-white'
                                    }`}>
                                        {model.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                {/* Image Count */}
                                <div className="absolute bottom-2 right-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm text-white">
                                        <PhotoIcon className="h-3 w-3 mr-1" />
                                        {model._count.images}
                                    </span>
                                </div>
                            </div>

                            {/* Model Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 truncate mb-1">
                                    {model.name}
                                </h3>
                                <p className="text-sm text-gray-500 truncate mb-3">
                                    {model.slug}
                                </p>

                                {/* Categories */}
                                {model.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {model.categories.slice(0, 2).map((category: any) => (
                                            <span
                                                key={category.id}
                                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                                            >
                                                {category.name}
                                            </span>
                                        ))}
                                        {model.categories.length > 2 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                                                +{model.categories.length - 2}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Model Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                                    {model.height && (
                                        <div>
                                            <p className="text-xs text-gray-500">Height</p>
                                            <p className="text-sm font-medium text-gray-900">{model.height}</p>
                                        </div>
                                    )}
                                    {model.age && (
                                        <div>
                                            <p className="text-xs text-gray-500">Age</p>
                                            <p className="text-sm font-medium text-gray-900">{model.age}</p>
                                        </div>
                                    )}
                                    {model.hairColor && (
                                        <div>
                                            <p className="text-xs text-gray-500">Hair</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">{model.hairColor}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/models/${model.slug}`}
                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-1" />
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/admin/galleries/${model.slug}`}
                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <PhotoIcon className="h-4 w-4 mr-1" />
                                        Gallery
                                    </Link>
                                    <Link
                                        href={`/models/${model.slug}`}
                                        target="_blank"
                                        className="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
