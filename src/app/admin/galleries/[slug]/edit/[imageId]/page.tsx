import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import EditImageForm from './EditImageForm';

type Props = {
    params: {
        slug: string;
        imageId: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const model = await prisma.model.findUnique({
        where: { slug: params.slug },
    });

    return {
        title: `Edit Image - ${model?.name || 'Model'}`,
        description: `Edit image details for ${model?.name || 'model'}'s portfolio`,
    };
}

export default async function EditImagePage({ params }: Props) {
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
        },
    });

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
                    <h1 className="text-3xl font-semibold">Edit Image</h1>
                    <p className="text-gray-600 mt-2">Edit image details for {model.name}'s portfolio.</p>
                </div>
            </div>

            <div className="mb-6">
                <Link href={`/admin/galleries/${model.slug}`} className="text-gold hover:underline inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to gallery
                </Link>
            </div>

            <EditImageForm modelId={model.id} modelSlug={model.slug} imageId={params.imageId} modelName={model.name} />
        </div>
    );
}
