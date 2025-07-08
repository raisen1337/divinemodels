import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const siteTexts = await prisma.siteText.findMany({
            orderBy: {
                key: 'asc',
            },
        });

        return NextResponse.json(siteTexts);
    } catch (error) {
        console.error('Error fetching site texts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { key, value, description, location } = await req.json();

        if (!key || !value) {
            return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
        }

        // Check if key already exists
        const existingText = await prisma.siteText.findUnique({
            where: { key },
        });

        if (existingText) {
            return NextResponse.json({ error: 'Text key already exists' }, { status: 400 });
        }

        const siteText = await prisma.siteText.create({
            data: {
                key,
                value,
                description,
                location,
            },
        });

        return NextResponse.json(siteText, { status: 201 });
    } catch (error) {
        console.error('Error creating site text:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
