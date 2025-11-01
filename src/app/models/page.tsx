import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { getSiteText } from '@/lib/siteText';

export const metadata: Metadata = {
    title: 'Models - Divine Models',
    description: 'Browse our exclusive selection of professional models for fashion, advertising, and events.',
};

export default async function ModelsPage({
    searchParams
}: {
    searchParams: { category?: string }
}) {
    const categorySlug = searchParams.category;

    // Fetch all active models, filtered by category if provided
    const models = await prisma.model.findMany({
        where: {
            active: true,
            ...(categorySlug && {
                categories: {
                    some: {
                        slug: categorySlug
                    }
                }
            })
        },
        include: {
            images: {
                take: 1,
                orderBy: {
                    featured: 'desc',
                },
            },
            categories: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    // Fetch all categories for filter
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    // Get site texts for models page
    const heroTitle = await getSiteText('models.hero.title', 'Modelele Noastre');
    const heroSubtitle = await getSiteText('models.hero.subtitle', 'Descoperă talentele noastre excepționale, pregătite să dea viață viziunii tale creative');

    const filterAllLabel = await getSiteText('models.filter.all', 'Toate');

    const gridShowingAllText = await getSiteText('models.grid.showing.all', 'Showing all {count} models');
    const gridShowingCategoryText = await getSiteText('models.grid.showing.category', 'Showing {count} models in category "{category}"');
    const noImageText = await getSiteText('models.grid.no.image', 'No image');
    const modelSuffix = await getSiteText('models.grid.model.suffix', 'MODEL');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-24 hero-bg">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <div className="mb-8" data-aos="fade-up">
                            <div className="section-divider mb-8"></div>
                        </div>

                        <h1
                            className="text-5xl md:text-6xl font-serif font-light heading-primary mb-8 tracking-wide"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            {heroTitle}
                        </h1>

                        <p
                            className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            {heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 category-nav">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <Link
                            href="/models"
                            className={`font-medium transition-colors ${!categorySlug
                                ? 'text-gold gold-line'
                                : 'text-gray-700 hover:text-gold'
                                }`}
                        >
                            {filterAllLabel}
                        </Link>
                        {categories.map((category: any) => (
                            <Link
                                key={category.id}
                                href={`/models?category=${category.slug}`}
                                className={`font-medium transition-colors ${categorySlug === category.slug
                                    ? 'text-gold gold-line'
                                    : 'text-gray-700 hover:text-gold'
                                    }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Models Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-8 text-center">
                        <p className="text-lg text-gray-600">
                            {categorySlug
                                ? gridShowingCategoryText
                                    .replace('{count}', models.length.toString())
                                    .replace('{category}', categories.find((c: any) => c.slug === categorySlug)?.name || categorySlug)
                                : gridShowingAllText.replace('{count}', models.length.toString())
                            }
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {models.map((model: any, index: number) => (
                            <div
                                key={model.id}
                                className="model-card group relative"
                                data-aos="fade-up"
                                data-aos-delay={(index % 4) * 100}
                            >
                                <Link href={`/models/${model.slug}`} className="block w-full h-full">
                                    <div className="w-full aspect-[3/4] relative overflow-hidden">
                                        {model.images && model.images.length > 0 ? (
                                            <Image
                                                src={model.images[0].url}
                                                alt={model.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <p className="text-gray-500">{noImageText}</p>
                                            </div>
                                        )}
                                        <div className="model-card-overlay absolute inset-0"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-2xl font-serif font-medium mb-2">{model.name}</h3>
                                            <p className="text-sm text-white/90 tracking-wider font-medium">
                                                {model.categories && model.categories.length > 0
                                                    ? model.categories[0].name.toUpperCase() + ' ' + modelSuffix
                                                    : 'PROFESSIONAL ' + modelSuffix
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
