import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditModelForm from './EditModelForm';

export const metadata = {
    title: 'Edit Model - Divine Models Admin',
};

export default async function EditModelPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Fetch the model with all related data using slug
    const model = await prisma.model.findUnique({
        where: { slug },
        include: {
            categories: true,
            features: true,
            images: true,
        },
    });

    if (!model) {
        notFound();
    }

    // Fetch all categories and features for the form
    const [categories, features] = await Promise.all([
        prisma.category.findMany({
            orderBy: { name: 'asc' },
        }),
        prisma.feature.findMany({
            orderBy: { name: 'asc' },
        }),
    ]);

    return <EditModelForm model={model} categories={categories} features={features} />;
}
