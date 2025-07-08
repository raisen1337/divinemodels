import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Model data extracted from the HTML file
const modelsData = [
    {
        name: 'Alexandra Lazar',
        folderName: 'Alexandra Lazar',
        height: '177 cm',
        bust: '94 cm',
        waist: '68 cm',
        hips: '100 cm',
        shoeSize: '39 EU',
        hairColor: 'Blonde',
        eyeColor: 'Brown',
        bio: 'Professional model with exceptional talent and graceful presence.',
        age: 25
    },
    {
        name: 'Alexandru Cutuca',
        folderName: 'Alexandru Cutuca',
        height: '185 cm',
        bust: '100 cm', // Chest for male model
        waist: '80 cm',
        hips: '95 cm', // Using suit size as reference
        shoeSize: '42 EU',
        hairColor: 'Black',
        eyeColor: 'Brown',
        bio: 'Professional male model with strong presence and versatile style.',
        age: 28
    },
    {
        name: 'Anissia Dumitrescu',
        folderName: 'Anissia Dumitrescu',
        height: '162 cm',
        bust: '82 cm',
        waist: '64 cm',
        hips: '94 cm',
        shoeSize: '36 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown-Black',
        bio: 'Dynamic model known for versatility and professional approach.',
        age: 22
    },
    {
        name: 'Antonia Gonzalez',
        folderName: 'Antonia Gonzalez',
        height: '179 cm',
        bust: '80 cm',
        waist: '60 cm',
        hips: '88 cm',
        shoeSize: '38 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Elegant model with international experience and refined style.',
        age: 24
    },
    {
        name: 'Ariana Armega',
        folderName: 'Ariana Armega',
        height: '168 cm',
        bust: '80 cm',
        waist: '62 cm',
        hips: '92 cm',
        shoeSize: '38 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Professional model with natural beauty and striking presence.',
        age: 23
    },
    {
        name: 'Daria Croitoru',
        folderName: 'Daria Croitoru',
        height: '165 cm',
        bust: '84 cm',
        waist: '64 cm',
        hips: '94 cm',
        shoeSize: '37 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Young talent with fresh perspective and natural charisma.',
        age: 20
    },
    {
        name: 'Erika Iovan',
        folderName: 'Erika Iovan',
        height: '150 cm',
        bust: '70 cm',
        waist: '58 cm',
        hips: '86 cm',
        shoeSize: '35 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Petite model with captivating style and professional dedication.',
        age: 19
    },
    {
        name: 'Eva Pircalabescu',
        folderName: 'Eva Pircalabescu',
        height: '130 cm',
        bust: '64 cm',
        waist: '56 cm',
        hips: '84 cm',
        shoeSize: '33 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Young model with unique charm and natural talent.',
        age: 16
    },
    {
        name: 'Miryam Buneci',
        folderName: 'Miryam Buneci',
        height: '160 cm',
        bust: '75 cm',
        waist: '60 cm',
        hips: '88 cm',
        shoeSize: '36 EU',
        hairColor: 'Blonde',
        eyeColor: 'Blue',
        bio: 'Striking model with unique features and professional experience.',
        age: 21
    },
    {
        name: 'Roberta Marin',
        folderName: 'Roberta Marin',
        height: '170 cm',
        bust: '90 cm',
        waist: '66 cm',
        hips: '96 cm',
        shoeSize: '37 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Experienced model with elegant proportions and commanding presence.',
        age: 26
    },
    {
        name: 'Tiana Strainu',
        folderName: 'Tiana Strainu',
        height: '165 cm',
        bust: '84 cm',
        waist: '62 cm',
        hips: '92 cm',
        shoeSize: '37 EU',
        hairColor: 'Brown',
        eyeColor: 'Brown',
        bio: 'Professional model with distinctive style and natural elegance.',
        age: 23
    }
];

// Function to create slug from name
function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

// Function to copy images from assets to public/uploads
async function copyModelImages(folderName: string, modelSlug: string): Promise<string[]> {
    const sourcePath = path.join(process.cwd(), '..', 'assets', 'img', folderName);
    const targetDir = path.join(process.cwd(), 'public', 'uploads', 'models', modelSlug);

    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const imageUrls: string[] = [];

    try {
        const files = fs.readdirSync(sourcePath);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];
            const sourceFile = path.join(sourcePath, file);
            const targetFile = path.join(targetDir, `${i + 1}${path.extname(file)}`);

            fs.copyFileSync(sourceFile, targetFile);

            const imageUrl = `/uploads/models/${modelSlug}/${i + 1}${path.extname(file)}`;
            imageUrls.push(imageUrl);
        }

        console.log(`✅ Copied ${imageFiles.length} images for ${folderName}`);
        return imageUrls;
    } catch (error) {
        console.error(`❌ Error copying images for ${folderName}:`, error);
        return [];
    }
}

// Function to get or create default categories
async function getDefaultCategories() {
    const defaultCategories = [
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Commercial', slug: 'commercial' },
        { name: 'Editorial', slug: 'editorial' }
    ];

    const categories = [];
    for (const cat of defaultCategories) {
        let category = await prisma.category.findUnique({
            where: { slug: cat.slug }
        });

        if (!category) {
            category = await prisma.category.create({
                data: cat
            });
        }
        categories.push(category);
    }

    return categories;
}

// Function to get or create default features
async function getDefaultFeatures() {
    const defaultFeatures = [
        { name: 'Professional' },
        { name: 'Experienced' },
        { name: 'Versatile' }
    ];

    const features = [];
    for (const feat of defaultFeatures) {
        let feature = await prisma.feature.findUnique({
            where: { name: feat.name }
        });

        if (!feature) {
            feature = await prisma.feature.create({
                data: feat
            });
        }
        features.push(feature);
    }

    return features;
}

// Main import function
async function importModels() {
    try {
        console.log('🚀 Starting model import...');

        // Get default categories and features
        const categories = await getDefaultCategories();
        const features = await getDefaultFeatures();

        console.log(`📋 Created/found ${categories.length} categories and ${features.length} features`);

        let successCount = 0;
        let errorCount = 0;

        for (const modelData of modelsData) {
            try {
                const slug = createSlug(modelData.name);

                // Check if model already exists
                const existingModel = await prisma.model.findUnique({
                    where: { slug }
                });

                if (existingModel) {
                    console.log(`⏭️  Model ${modelData.name} already exists, skipping...`);
                    continue;
                }

                // Copy images
                console.log(`📸 Processing images for ${modelData.name}...`);
                const imageUrls = await copyModelImages(modelData.folderName, slug);

                // Create model
                const model = await prisma.model.create({
                    data: {
                        name: modelData.name,
                        slug,
                        bio: modelData.bio,
                        age: modelData.age,
                        height: modelData.height,
                        bust: modelData.bust,
                        waist: modelData.waist,
                        hips: modelData.hips,
                        shoeSize: modelData.shoeSize,
                        hairColor: modelData.hairColor,
                        eyeColor: modelData.eyeColor,
                        featured: false,
                        active: true,
                        categories: {
                            connect: categories.slice(0, 2).map(cat => ({ id: cat.id }))
                        },
                        features: {
                            connect: features.slice(0, 2).map(feat => ({ id: feat.id }))
                        }
                    }
                });

                // Create images
                for (let i = 0; i < imageUrls.length; i++) {
                    await prisma.image.create({
                        data: {
                            url: imageUrls[i],
                            publicId: `model-${slug}-${i + 1}`,
                            alt: `${modelData.name} - Photo ${i + 1}`,
                            featured: i === 0, // First image is featured
                            modelId: model.id
                        }
                    });
                }

                console.log(`✅ Successfully imported ${modelData.name} with ${imageUrls.length} images`);
                successCount++;

            } catch (error) {
                console.error(`❌ Error importing ${modelData.name}:`, error);
                errorCount++;
            }
        }

        console.log(`\n🎉 Import completed!`);
        console.log(`✅ Successfully imported: ${successCount} models`);
        console.log(`❌ Failed imports: ${errorCount} models`);

    } catch (error) {
        console.error('💥 Fatal error during import:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the import
importModels().catch(console.error);
