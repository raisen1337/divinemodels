import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { deleteImage } from '@/lib/uploadThingStorage';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const model = await prisma.model.findUnique({
            where: { slug },
            include: {
                categories: true,
                features: true,
                images: true,
            },
        });

        if (!model) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        return NextResponse.json(model);
    } catch (error) {
        console.error('Error fetching model:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;

        // Find the model to update
        const existingModel = await prisma.model.findUnique({
            where: { slug },
            include: { images: true },
        });

        if (!existingModel) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        const body = await req.json();
        const {
            name,
            bio,
            height,
            bust,
            waist,
            hips,
            shoeSize,
            hairColor,
            eyeColor,
            age,
            featured,
            active,
            categoryIds,
            featureIds,
            newImageUrls,
            imagesToDelete,
            featuredImageId
        } = body;

        // Create a new slug if name changes
        let newSlug = slug;
        if (name && name !== existingModel.name) {
            newSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // Check if new slug already exists for a different model
            const modelWithSlug = await prisma.model.findUnique({
                where: { slug: newSlug },
            });

            if (modelWithSlug && modelWithSlug.id !== existingModel.id) {
                return NextResponse.json({ error: 'A model with this name already exists' }, { status: 400 });
            }
        }

        // Delete images from UploadThing and the database
        if (imagesToDelete && imagesToDelete.length > 0) {
            const imagePromises = [];

            for (const imageId of imagesToDelete) {
                const image = existingModel.images.find((img: any) => img.id === imageId);

                if (image) {
                    imagePromises.push(deleteImage(image.publicId));
                }
            }

            await Promise.all(imagePromises);

            // Delete images from the database
            await prisma.image.deleteMany({
                where: {
                    id: { in: imagesToDelete },
                },
            });
        }

        // Create new images in the database
        if (newImageUrls && newImageUrls.length > 0) {
            await prisma.image.createMany({
                data: newImageUrls.map((imageData: any) => ({
                    url: imageData.url,
                    publicId: imageData.key,
                    modelId: existingModel.id,
                    featured: false,
                })),
            });
        }

        // Update featured image if specified
        if (featuredImageId) {
            // First, set all images to not featured
            await prisma.image.updateMany({
                where: { modelId: existingModel.id },
                data: { featured: false },
            });

            // Then set the specified image as featured
            await prisma.image.update({
                where: { id: featuredImageId },
                data: { featured: true },
            });
        }

        // Update the model
        const updatedModel = await prisma.model.update({
            where: { id: existingModel.id },
            data: {
                name,
                bio,
                height,
                bust,
                waist,
                hips,
                shoeSize,
                hairColor,
                eyeColor,
                age: age ? parseInt(age) : null,
                featured: featured === true,
                active: active === true,
                slug: newSlug,
                categories: {
                    set: [], // First disconnect all existing categories
                    connect: categoryIds.map((id: string) => ({ id })),
                },
                features: {
                    set: [], // First disconnect all existing features
                    connect: featureIds.map((id: string) => ({ id })),
                },
            },
            include: {
                categories: true,
                features: true,
                images: true,
            },
        });

        return NextResponse.json(updatedModel);
    } catch (error) {
        console.error('Error updating model:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;

        // Find the model to delete
        const existingModel = await prisma.model.findUnique({
            where: { slug },
            include: { images: true },
        });

        if (!existingModel) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        // Delete all images from Cloudinary
        const imagePromises = [];

        for (const image of existingModel.images) {
            imagePromises.push(deleteImage(image.publicId));
        }

        await Promise.all(imagePromises);

        // Delete the model (cascades to images)
        await prisma.model.delete({
            where: { id: existingModel.id },
        });

        return NextResponse.json({ message: 'Model deleted successfully' });
    } catch (error) {
        console.error('Error deleting model:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
