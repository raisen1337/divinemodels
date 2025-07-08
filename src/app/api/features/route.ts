import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const features = await prisma.feature.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        return NextResponse.json(features);
    } catch (error) {
        console.error('Error fetching features:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // Check if feature already exists
        const existingFeature = await prisma.feature.findUnique({
            where: { name },
        });

        if (existingFeature) {
            return NextResponse.json({ error: 'Feature already exists' }, { status: 400 });
        }

        const feature = await prisma.feature.create({
            data: {
                name,
            },
        });

        return NextResponse.json(feature, { status: 201 });
    } catch (error) {
        console.error('Error creating feature:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
