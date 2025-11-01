import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import {
    PlusIcon,
    PhotoIcon,
    PencilSquareIcon,
    TrashIcon,
    StarIcon,
    ArrowLeftIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import ImageVisibilityToggle from './ImageVisibilityToggle';

type ImageType = {
    id: string;
    url: string;
    publicId: string;
    alt: string | null;
    featured: boolean;
    visible: boolean;
    modelId: string;
    createdAt: Date;
    updatedAt: Date;
};

type ModelType = {
    id: string;
    name: string;
    slug: string;
    images: ImageType[];
    [key: string]: any;
};

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const model = await prisma.model.findUnique({
        where: { slug },
    });

    return {
        title: `${model?.name || 'Model'} Gallery - Admin`,
        description: `Manage image gallery for ${model?.name || 'model'}`,
    };
}

export default async function ModelGalleryPage({ params }: Props) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin');
    }

    const { slug } = await params;
    const model = await prisma.model.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true,
            images: {
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    }) as ModelType;

    if (!model) {
        return (
            <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800">
                                Model not found. Please select a valid model.
                            </p>
                        </div>
                    </div>
                </div>
                <Link href="/admin/galleries" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to galleries
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href="/admin/galleries"
                            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">Galleries</span>
                        </Link>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-light text-gray-900">
                        {model.name}'s Gallery
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage images for this model's portfolio
                    </p>
                </div>
                <Link
                    href={`/admin/galleries/${model.slug}/upload`}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Upload Images
                </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Images</p>
                        <p className="text-3xl font-serif font-light text-gray-900">{model.images.length}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Featured</p>
                        <p className="text-3xl font-serif font-light text-yellow-600">
                            {model.images.filter(img => img.featured).length}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Model</p>
                        <p className="text-lg font-medium text-gray-900 truncate">{model.name}</p>
                    </div>
                    <div className="flex items-center justify-end">
                        <Link
                            href={`/models/${model.slug}`}
                            target="_blank"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <PhotoIcon className="h-4 w-4 mr-2" />
                            View Live
                        </Link>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            {model.images.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <PhotoIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Upload images to build this model's portfolio and showcase their work
                        </p>
                        <Link
                            href={`/admin/galleries/${model.slug}/upload`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Upload First Images
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {model.images.map((image) => (
                            <div key={image.id} className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300">
                                <Image
                                    src={image.url}
                                    alt={image.alt || model.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                                
                                {/* Status Badges */}
                                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                    {image.featured && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white shadow-md">
                                            <StarIconSolid className="h-3 w-3 mr-1" />
                                            Featured
                                        </span>
                                    )}
                                    <ImageVisibilityToggle 
                                        modelSlug={model.slug}
                                        imageId={image.id}
                                        initialVisible={image.visible ?? true}
                                    />
                                </div>

                                {/* Hover Overlay with Actions */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`/admin/galleries/${model.slug}/edit/${image.id}`}
                                                className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-lg text-sm font-medium transition-all"
                                            >
                                                <PencilSquareIcon className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/admin/galleries/${model.slug}/delete/${image.id}`}
                                                className="inline-flex items-center justify-center px-3 py-2 bg-red-600/90 backdrop-blur-sm hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Alt Text Tooltip */}
                                {image.alt && (
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-black/75 backdrop-blur-sm text-white text-xs px-2 py-1 rounded max-w-[150px] truncate">
                                            {image.alt}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
