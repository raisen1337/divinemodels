import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    noStore();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const modelSlug = params.slug;

    // Find model by slug
    const model = await prisma.model.findUnique({
        where: { slug: modelSlug },
    });

    if (!model) {
        return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    try {
        const body = await request.json();
        const { imageUrls } = body;

        if (!imageUrls || imageUrls.length === 0) {
            return NextResponse.json(
                { error: 'No image URLs provided' },
                { status: 400 }
            );
        }

        const results = [];

        for (const imageData of imageUrls) {
            // Create an image record in the database
            const image = await prisma.image.create({
                data: {
                    url: imageData.url,
                    publicId: imageData.key,
                    alt: model.name,
                    modelId: model.id,
                },
            });

            results.push(image);
        }

        return NextResponse.json({ success: true, images: results });
    } catch (error) {
        console.error('Error creating image records:', error);
        return NextResponse.json(
            { error: 'Failed to create image records' },
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    noStore();
    const modelSlug = params.slug;

    try {
        // Find model by slug
        const model = await prisma.model.findUnique({
            where: { slug: modelSlug },
        });

        if (!model) {
            return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        const images = await prisma.image.findMany({
            where: { modelId: model.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json(
            { error: 'Failed to fetch images' },
            { status: 500 }
        );
    }
}
