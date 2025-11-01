import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getSiteText } from '@/lib/siteText';
import ModelSwiper from '@/components/ModelSwiper';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const model = await prisma.model.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!model) {
        return {
            title: 'Model Not Found - Divine Models',
        };
    }

    return {
        title: `${model.name} - Divine Models`,
        description: model.bio || `Professional model ${model.name} from Divine Models agency in Romania.`,
    };
}

export default async function ModelDetailPage({ params }: Props) {
    const { slug } = await params;
    const model = await prisma.model.findUnique({
        where: {
            slug: slug,
            active: true,
        },
        include: {
            images: {
                where: {
                    visible: true,
                },
                orderBy: {
                    featured: 'desc',
                },
            },
            categories: true,
            features: true,
        },
    });

    if (!model) {
        return notFound();
    }

    // Get site texts for model detail page
    const noImagesText = await getSiteText('model.detail.no.images', 'No images available');
    const heightLabel = await getSiteText('model.detail.height.label', 'Height');
    const bustLabel = await getSiteText('model.detail.bust.label', 'Bust');
    const waistLabel = await getSiteText('model.detail.waist.label', 'Waist');
    const hipsLabel = await getSiteText('model.detail.hips.label', 'Hips');
    const shoeSizeLabel = await getSiteText('model.detail.shoeSize.label', 'Shoe Size');
    const hairColorLabel = await getSiteText('model.detail.hairColor.label', 'Hair Color');
    const eyeColorLabel = await getSiteText('model.detail.eyeColor.label', 'Eye Color');
    const ageLabel = await getSiteText('model.detail.age.label', 'Age');
    const featuresTitle = await getSiteText('model.detail.features.title', 'Features');
    const bookModelButton = await getSiteText('model.detail.button.book', 'BOOK THIS MODEL');
    const backToModelsButton = await getSiteText('model.detail.button.back', 'BACK TO MODELS');

    return (
        <div className="min-h-screen">
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Model Images Gallery */}
                        <div data-aos="fade-right">
                            <ModelSwiper
                                images={model.images}
                                modelName={model.name}
                                noImagesText={noImagesText}
                            />
                        </div>

                        {/* Model Information */}
                        <div data-aos="fade-left">
                            <div className="mb-8">
                                <div className="section-divider mb-8"></div>
                            </div>

                            <h1 className="text-5xl font-serif font-light heading-primary mb-6">
                                {model.name}
                            </h1>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {model.categories && model.categories.map((category: any) => (
                                    <span
                                        key={category.id}
                                        className="bg-black text-white px-4 py-1 text-sm font-medium rounded-full"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>

                            {model.bio && (
                                <div className="prose prose-lg mb-10 text-gray-700">
                                    <p>{model.bio}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-8 mb-10">
                                {model.height && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{heightLabel}</h3>
                                        <p className="text-lg">{model.height}</p>
                                    </div>
                                )}

                                {model.bust && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{bustLabel}</h3>
                                        <p className="text-lg">{model.bust}</p>
                                    </div>
                                )}

                                {model.waist && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{waistLabel}</h3>
                                        <p className="text-lg">{model.waist}</p>
                                    </div>
                                )}

                                {model.hips && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{hipsLabel}</h3>
                                        <p className="text-lg">{model.hips}</p>
                                    </div>
                                )}

                                {model.shoeSize && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{shoeSizeLabel}</h3>
                                        <p className="text-lg">{model.shoeSize}</p>
                                    </div>
                                )}

                                {model.hairColor && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{hairColorLabel}</h3>
                                        <p className="text-lg">{model.hairColor}</p>
                                    </div>
                                )}

                                {model.eyeColor && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{eyeColorLabel}</h3>
                                        <p className="text-lg">{model.eyeColor}</p>
                                    </div>
                                )}

                                {model.age && (
                                    <div>
                                        <h3 className="text-sm !text-gray-700 uppercase tracking-wider mb-1">{ageLabel}</h3>
                                        <p className="text-lg">{model.age}</p>
                                    </div>
                                )}
                            </div>

                            {model.features && model.features.length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-xl font-serif mb-4">{featuresTitle}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {model.features.map((feature: any) => (
                                            <span
                                                key={feature.id}
                                                className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
                                            >
                                                {feature.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    href="/contact"
                                    className="btn-primary text-white px-8 py-4 font-semibold tracking-wide relative z-10 text-center"
                                >
                                    {bookModelButton}
                                </Link>
                                <Link
                                    href="/models"
                                    className="btn-secondary border-2 border-gold text-gold px-8 py-4 font-semibold tracking-wide relative z-10 text-center"
                                >
                                    {backToModelsButton}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
