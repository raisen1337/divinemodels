import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Migration endpoint to add visible column to Image table
 * Run this once by calling: POST /api/migrations/add-visible-column
 * Only accessible by admins
 */
export async function POST(request: NextRequest) {
    noStore();
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Check if column already exists by trying to query it
        try {
            const testResult = await prisma.$queryRaw`
                SELECT visible FROM "Image" LIMIT 1
            `;
            return NextResponse.json({
                success: true,
                message: 'Column already exists',
                alreadyExists: true
            });
        } catch (error: any) {
            // Column doesn't exist, let's add it
            if (error.message?.includes('column') || error.code === '42703') {
                // Add the column
                await prisma.$executeRaw`
                    ALTER TABLE "Image" 
                    ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true
                `;

                // Create index if it doesn't exist
                try {
                    await prisma.$executeRaw`
                        CREATE INDEX IF NOT EXISTS "Image_modelId_visible_idx" 
                        ON "Image"("modelId", "visible")
                    `;
                } catch (indexError) {
                    console.warn('Index may already exist:', indexError);
                }

                return NextResponse.json({
                    success: true,
                    message: 'Migration completed successfully. Visible column added to Image table.',
                    migrationComplete: true
                });
            }
            throw error;
        }
    } catch (error: any) {
        console.error('Migration error:', error);
        return NextResponse.json(
            {
                error: 'Migration failed',
                details: error.message || 'Unknown error',
                hint: 'Make sure you have proper database permissions'
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    noStore();
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Check if column exists
        const result = await prisma.$queryRaw`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Image' 
            AND column_name = 'visible'
        `;

        const columnExists = Array.isArray(result) && result.length > 0;

        return NextResponse.json({
            columnExists,
            message: columnExists 
                ? 'Visible column exists' 
                : 'Visible column does not exist - run POST to migrate'
        });
    } catch (error: any) {
        return NextResponse.json({
            columnExists: false,
            error: 'Could not check column status',
            details: error.message
        });
    }
}

