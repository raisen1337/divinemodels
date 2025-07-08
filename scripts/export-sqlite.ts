import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

async function exportSQLiteData() {
    // Use SQLite directly for export
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: 'file:./prisma/dev.db'
            }
        }
    });

    try {
        console.log('🔄 Starting data export from SQLite...');

        // Export all data
        const users = await prisma.user.findMany();
        const models = await prisma.model.findMany({
            include: {
                categories: true,
                features: true,
                images: true
            }
        });
        const categories = await prisma.category.findMany();
        const features = await prisma.feature.findMany();
        const images = await prisma.image.findMany();
        const siteSettings = await prisma.siteSettings.findMany();
        const siteTexts = await prisma.siteText.findMany();

        const exportData = {
            users,
            models,
            categories,
            features,
            images,
            siteSettings,
            siteTexts,
            exportDate: new Date().toISOString()
        };

        // Write to JSON file
        const exportPath = path.join(process.cwd(), 'data-export.json');
        fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));

        console.log('✅ Data exported successfully to:', exportPath);
        console.log('📊 Export summary:');
        console.log(`   - Users: ${users.length}`);
        console.log(`   - Models: ${models.length}`);
        console.log(`   - Categories: ${categories.length}`);
        console.log(`   - Features: ${features.length}`);
        console.log(`   - Images: ${images.length}`);
        console.log(`   - Site Settings: ${siteSettings.length}`);
        console.log(`   - Site Texts: ${siteTexts.length}`);

    } catch (error) {
        console.error('❌ Error exporting data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

exportSQLiteData();
