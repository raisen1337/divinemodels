import { PrismaClient } from '@prisma/client';

async function testConnection() {
    const prisma = new PrismaClient();

    try {
        console.log('🔄 Testing connection to Neon DB...');
        await prisma.$connect();
        console.log('✅ Successfully connected to Neon DB!');

        // Test a simple query
        const result = await prisma.$executeRaw`SELECT 1 as test`;
        console.log('✅ Database query test passed!');

    } catch (error) {
        console.error('❌ Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
