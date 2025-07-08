import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const featured = url.searchParams.get('featured') === 'true';
        const active = url.searchParams.get('active') === 'true';
        const category = url.searchParams.get('category');
        const feature = url.searchParams.get('feature');

        let query: any = {};

        if (featured) {
            query.featured = true;
        }

        if (active !== null) {
            query.active = active;
        }

        if (category) {
            query.categories = {
                some: {
                    id: category
                }
            };
        }

        if (feature) {
            query.features = {
                some: {
                    id: feature
                }
            };
        }

        const models = await prisma.model.findMany({
            where: query,
            include: {
                categories: true,
                features: true,
                images: {
                    where: {
                        featured: true,
                    },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
            categoryIds,
            featureIds,
            imageUrls
        } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // Create a slug from the name
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Check if slug already exists
        const existingModel = await prisma.model.findUnique({
            where: { slug },
        });

        if (existingModel) {
            return NextResponse.json({ error: 'A model with this name already exists' }, { status: 400 });
        }

        // Create the model with the images
        const model = await prisma.model.create({
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
                slug,
                categories: {
                    connect: categoryIds.map((id: string) => ({ id })),
                },
                features: {
                    connect: featureIds.map((id: string) => ({ id })),
                },
                images: {
                    create: imageUrls.map((imageData: any, index: number) => ({
                        url: imageData.url,
                        publicId: imageData.key, // UploadThing key
                        featured: index === 0, // First image is featured by default
                    })),
                },
            },
            include: {
                categories: true,
                features: true,
                images: true,
            },
        });

        return NextResponse.json(model, { status: 201 });
    } catch (error) {
        console.error('Error creating model:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
