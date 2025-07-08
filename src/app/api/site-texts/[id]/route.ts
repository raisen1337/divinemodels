import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const siteText = await prisma.siteText.findUnique({
            where: { id },
        });

        if (!siteText) {
            return NextResponse.json({ error: 'Site text not found' }, { status: 404 });
        }

        return NextResponse.json(siteText);
    } catch (error) {
        console.error('Error fetching site text:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const { key, value, description, location } = await req.json();

        if (!value) {
            return NextResponse.json({ error: 'Value is required' }, { status: 400 });
        }

        const existingText = await prisma.siteText.findUnique({
            where: { id },
        });

        if (!existingText) {
            return NextResponse.json({ error: 'Site text not found' }, { status: 404 });
        }

        // If key is changing, check if new key already exists
        if (key && key !== existingText.key) {
            const duplicateText = await prisma.siteText.findUnique({
                where: { key },
            });

            if (duplicateText) {
                return NextResponse.json({ error: 'Text key already exists' }, { status: 400 });
            }
        }

        const updatedText = await prisma.siteText.update({
            where: { id },
            data: {
                key: key || existingText.key,
                value,
                description,
                location,
            },
        });

        return NextResponse.json(updatedText);
    } catch (error) {
        console.error('Error updating site text:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        // Check if site text exists
        const existingText = await prisma.siteText.findUnique({
            where: { id },
        });

        if (!existingText) {
            return NextResponse.json({ error: 'Site text not found' }, { status: 404 });
        }

        await prisma.siteText.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Site text deleted successfully' });
    } catch (error) {
        console.error('Error deleting site text:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
