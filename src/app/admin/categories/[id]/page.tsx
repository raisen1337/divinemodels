import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditCategoryForm from './EditCategoryForm';

export const metadata = {
    title: 'Edit Category - Divine Models Admin',
};

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // Fetch the category with all related data
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    models: true,
                },
            },
        },
    });

    if (!category) {
        notFound();
    }

    return <EditCategoryForm category={category} />;
}
