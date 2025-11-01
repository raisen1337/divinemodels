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

        const feature = await prisma.feature.findUnique({
            where: { id },
            include: {
                models: true,
            },
        });

        if (!feature) {
            return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
        }

        return NextResponse.json(feature);
    } catch (error) {
        console.error('Error fetching feature:', error);
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

        const existingFeature = await prisma.feature.findUnique({
            where: { id },
        });

        if (!existingFeature) {
            return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
        }

        // Check if the new name is already taken by another feature
        const duplicateFeature = await prisma.feature.findFirst({
            where: {
                name,
                NOT: {
                    id,
                },
            },
        });

        if (duplicateFeature) {
            return NextResponse.json({ error: 'Feature name already exists' }, { status: 400 });
        }

        const updatedFeature = await prisma.feature.update({
            where: { id },
            data: {
                name,
            },
        });

        return NextResponse.json(updatedFeature);
    } catch (error) {
        console.error('Error updating feature:', error);
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

        // Check if feature exists
        const existingFeature = await prisma.feature.findUnique({
            where: { id },
            include: {
                models: true,
            },
        });

        if (!existingFeature) {
            return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
        }

        // Check if feature is used by any models
        if (existingFeature.models.length > 0) {
            return NextResponse.json({
                error: 'Cannot delete feature that is used by models',
                modelsCount: existingFeature.models.length
            }, { status: 400 });
        }

        await prisma.feature.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Feature deleted successfully' });
    } catch (error) {
        console.error('Error deleting feature:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
