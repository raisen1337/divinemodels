import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditFeatureForm from './EditFeatureForm';

export const metadata = {
    title: 'Edit Feature - Divine Models Admin',
};

export default async function EditFeaturePage({ params }: { params: { id: string } }) {
    const { id } = params;

    // Fetch the feature with all related data
    const feature = await prisma.feature.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    models: true,
                },
            },
        },
    });

    if (!feature) {
        notFound();
    }

    return <EditFeatureForm feature={feature} />;
}
