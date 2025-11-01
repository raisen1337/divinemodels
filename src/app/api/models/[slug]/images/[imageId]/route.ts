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

        // Try to delete the image file from storage, but don't fail if it doesn't work
        try {
            await deleteImage(image.publicId);
        } catch (storageError) {
            console.warn('Failed to delete image from storage, continuing with DB deletion:', storageError);
            // Continue with database deletion even if storage deletion fails
        }

        // Delete the image record from database
        await prisma.image.delete({
            where: { id: imageId },
        });

        return NextResponse.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { error: 'Failed to delete image', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// PATCH route to update image visibility
export async function PATCH(
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
        const { visible } = data;

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

        // Update the image visibility
        // Check if visible column exists (for backward compatibility during migration)
        let updateData: any = {};
        if (visible !== undefined) {
            updateData.visible = visible;
        } else if ('visible' in existingImage) {
            updateData.visible = existingImage.visible;
        }

        // Only update if we have data to update
        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ success: true, image: existingImage });
        }

        try {
            const updatedImage = await prisma.image.update({
                where: { id: imageId },
                data: updateData,
            });

            return NextResponse.json({ success: true, image: updatedImage });
        } catch (dbError: any) {
            // Check if it's a column missing error
            if (dbError?.message?.includes('column') || dbError?.code === 'P2021') {
                console.warn('Visibility column does not exist yet. Migration needed.');
                return NextResponse.json(
                    {
                        error: 'Visibility column not found. Please run the database migration first.',
                        migrationRequired: true
                    },
                    { status: 400 }
                );
            }
            throw dbError;
        }
    } catch (error) {
        console.error('Error updating image visibility:', error);
        return NextResponse.json(
            { error: 'Failed to update image visibility' },
            { status: 500 }
        );
    }
}
