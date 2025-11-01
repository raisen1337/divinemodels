import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                models: true,
            },
        });

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });

        if (!existingCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Check if the new name/slug is already taken by another category
        const duplicateCategory = await prisma.category.findFirst({
            where: {
                OR: [
                    { name },
                    { slug },
                ],
                NOT: {
                    id,
                },
            },
        });

        if (duplicateCategory) {
            return NextResponse.json({ error: 'Category name already exists' }, { status: 400 });
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                slug,
            },
        });

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id },
            include: {
                models: true,
            },
        });

        if (!existingCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        // Check if category is used by any models
        if (existingCategory.models.length > 0) {
            return NextResponse.json({
                error: 'Cannot delete category that is used by models',
                modelsCount: existingCategory.models.length
            }, { status: 400 });
        }

        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
