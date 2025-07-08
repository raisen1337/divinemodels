import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

type ImageType = {
    id: string;
    url: string;
    publicId: string;
    alt: string | null;
    featured: boolean;
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
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const model = await prisma.model.findUnique({
        where: { slug: params.slug },
    });

    return {
        title: `Admin - ${model?.name || 'Model'} Gallery`,
        description: `Manage image gallery for ${model?.name || 'model'}`,
    };
}

export default async function ModelGalleryPage({ params }: Props) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin');
    }

    const model = await prisma.model.findUnique({
        where: { slug: params.slug },
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
            <div className="p-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm leading-5 text-red-700">
                                Model not found. Please select a valid model.
                            </p>
                        </div>
                    </div>
                </div>
                <Link href="/admin/galleries" className="text-gold hover:underline">
                    &larr; Back to galleries
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">{model.name}'s Gallery</h1>
                    <p className="text-gray-600 mt-2">Manage images for this model's portfolio.</p>
                </div>
                <div>
                    <Link
                        href={`/admin/galleries/${model.slug}/upload`}
                        className="bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded text-sm font-medium flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Images
                    </Link>
                </div>
            </div>

            <div className="mb-6">
                <Link href="/admin/galleries" className="text-gold hover:underline inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to galleries
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-medium">Image Gallery</h2>
                        <p className="text-sm text-gray-600">{model.images.length} images total</p>
                    </div>

                    {model.images.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                            </svg>
                            <h3 className="mt-4 text-gray-600">No images found</h3>
                            <p className="text-gray-500 text-sm mt-2">Upload images to build this model's portfolio.</p>
                            <div className="mt-6">
                                <Link
                                    href={`/admin/galleries/${model.slug}/upload`}
                                    className="bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded text-sm font-medium inline-flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Upload Images
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {model.images.map((image) => (
                                <div key={image.id} className="relative group">
                                    <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={image.url}
                                            alt={image.alt || model.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Link
                                                href={`/admin/galleries/${model.slug}/edit/${image.id}`}
                                                className="bg-white text-gray-800 p-2 rounded-full mr-2 hover:bg-gold hover:text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={`/admin/galleries/${model.slug}/delete/${image.id}`}
                                                className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {image.featured && (
                                            <span className="inline-flex items-center bg-gold/10 text-gold text-xs px-2 py-1 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
