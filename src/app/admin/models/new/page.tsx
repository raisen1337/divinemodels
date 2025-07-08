import prisma from '@/lib/prisma';
import NewModelForm from './NewModelForm';

export const metadata = {
    title: 'Add New Model - Divine Models Admin',
};

export default async function NewModelPage() {
    // Fetch all categories
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    // Fetch all features
    const features = await prisma.feature.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return <NewModelForm categories={categories} features={features} />;
}
