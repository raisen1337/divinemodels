import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    try {
        // Create admin user if not exists
        const existingAdmin = await prisma.user.findUnique({
            where: {
                email: 'admin@divinemodels.com',
            },
        });

        if (!existingAdmin) {
            const hashedPassword = await hash('adminPassword123', 12);

            await prisma.user.create({
                data: {
                    name: 'Admin',
                    email: 'admin@divinemodels.com',
                    password: hashedPassword,
                    role: 'ADMIN',
                },
            });

            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }

        // Create default site settings if not exists
        const existingSettings = await prisma.siteSettings.findFirst();

        if (!existingSettings) {
            await prisma.siteSettings.create({
                data: {
                    siteName: 'Divine Models',
                    siteTagline: 'Discover Extraordinary Talent',
                    contactEmail: 'contact@divinemodels.com',
                },
            });

            console.log('Default site settings created successfully');
        } else {
            console.log('Site settings already exist');
        }

        // Sample categories
        const categories = [
            { name: 'Fashion', slug: 'fashion' },
            { name: 'Commercial', slug: 'commercial' },
            { name: 'Fitness', slug: 'fitness' },
            { name: 'Runway', slug: 'runway' },
        ];

        for (const category of categories) {
            const existingCategory = await prisma.category.findUnique({
                where: { slug: category.slug },
            });

            if (!existingCategory) {
                await prisma.category.create({
                    data: category,
                });
                console.log(`Category ${category.name} created`);
            } else {
                console.log(`Category ${category.name} already exists`);
            }
        }

        // Sample features
        const features = [
            { name: 'International Experience' },
            { name: 'Speaks Multiple Languages' },
            { name: 'Acting Experience' },
            { name: 'Dance Experience' },
        ];

        for (const feature of features) {
            const existingFeature = await prisma.feature.findUnique({
                where: { name: feature.name },
            });

            if (!existingFeature) {
                await prisma.feature.create({
                    data: feature,
                });
                console.log(`Feature ${feature.name} created`);
            } else {
                console.log(`Feature ${feature.name} already exists`);
            }
        }

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
