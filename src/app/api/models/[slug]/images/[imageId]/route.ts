import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { deleteImage } from '@/lib/uploadThingStorage';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string; imageId: string }> }
) {
    noStore();
    const { imageId } = await params;

    try {
        const image = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json(image);
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string; imageId: string }> }
) {
    noStore();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageId, slug: modelSlug } = await params;

    try {
        const data = await request.json();
        const { alt, featured } = data;

        // Find model by slug
        const model = await prisma.model.findUnique({
            where: { slug: modelSlug },
        });

        if (!model) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        // Verify the image exists and belongs to the specified model
        const existingImage = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!existingImage) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        if (existingImage.modelId !== model.id) {
            return NextResponse.json(
                { error: 'Image does not belong to this model' },
                { status: 403 }
            );
        }

        // Update the image
        const updatedImage = await prisma.image.update({
            where: { id: imageId },
            data: {
                alt: alt,
                featured: featured,
            },
        });

        return NextResponse.json(updatedImage);
    } catch (error) {
        console.error('Error updating image:', error);
        return NextResponse.json(
            { error: 'Failed to update image' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string; imageId: string }> }
) {
    noStore();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageId, slug: modelSlug } = await params;

    try {
        // Find model by slug
        const model = await prisma.model.findUnique({
            where: { slug: modelSlug },
        });

        if (!model) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        // Verify the image exists and belongs to the specified model
        const image = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        if (image.modelId !== model.id) {
            return NextResponse.json(
                { error: 'Image does not belong to this model' },
                { status: 403 }
            );
        }

        // Delete the image file
        await deleteImage(image.publicId);

        // Delete the image record
        await prisma.image.delete({
            where: { id: imageId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { error: 'Failed to delete image' },
            { status: 500 }
        );
    }
}
