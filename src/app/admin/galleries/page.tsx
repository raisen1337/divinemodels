import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

export const metadata: Metadata = {
    title: 'Admin - Image Galleries',
    description: 'Manage image galleries for Divine Models',
};

type Image = {
    id: string;
    url: string;
    publicId: string;
    alt: string | null;
    featured: boolean;
    modelId: string;
    createdAt: Date;
    updatedAt: Date;
};

type Model = {
    id: string;
    name: string;
    slug: string;
    images: Image[];
};

export default async function GalleriesPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/signin');
    }

    const models = await prisma.model.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            images: true,
        },
        orderBy: {
            name: 'asc',
        },
    }) as Model[];

    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Image Galleries</h1>
                <p className="text-gray-600 mt-2">Manage model image galleries and portfolios.</p>
            </header>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-medium mb-4">Model Galleries</h2>
                    <p className="text-gray-600 mb-6">Click on a model to view and manage their image gallery.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {models.map((model) => (
                            <div key={model.id} className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-lg transition-shadow">
                                <div className="p-5">
                                    <h3 className="text-lg font-medium">{model.name}</h3>
                                    <div className="flex items-center mt-2 text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {model.images.length} images
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={`/admin/galleries/${model.slug}`}
                                            className="bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded text-sm inline-block transition-colors"
                                        >
                                            Manage Gallery
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
