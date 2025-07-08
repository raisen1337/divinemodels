import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
    UserGroupIcon,
    PhotoIcon,
    TagIcon,
    ChartBarIcon,
    DocumentTextIcon,
    CogIcon,
    EyeIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default async function AdminDashboard() {
    // Fetch counts for the dashboard
    const [
        modelsCount,
        categoriesCount,
        featuresCount,
        imagesCount,
        featuredModelsCount,
        activeModelsCount,
        siteTextsCount,
    ] = await Promise.all([
        prisma.model.count(),
        prisma.category.count(),
        prisma.feature.count(),
        prisma.image.count(),
        prisma.model.count({ where: { featured: true } }),
        prisma.model.count({ where: { active: true } }),
        prisma.siteText.count(),
    ]);

    // Fetch latest models for the dashboard
    const latestModels = await prisma.model.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            images: {
                where: { featured: true },
                take: 1,
            },
        },
    });

    const stats = [
        {
            name: 'Total Models',
            value: modelsCount,
            icon: UserGroupIcon,
            color: 'bg-gradient-to-r from-blue-500 to-blue-600',
            link: '/admin/models',
            description: `${activeModelsCount} active, ${featuredModelsCount} featured`
        },
        {
            name: 'Categories',
            value: categoriesCount,
            icon: TagIcon,
            color: 'bg-gradient-to-r from-green-500 to-green-600',
            link: '/admin/categories',
            description: 'Model categories'
        },
        {
            name: 'Images',
            value: imagesCount,
            icon: PhotoIcon,
            color: 'bg-gradient-to-r from-purple-500 to-purple-600',
            link: '/admin/galleries',
            description: 'Total images uploaded'
        },
        {
            name: 'Site Texts',
            value: siteTextsCount,
            icon: DocumentTextIcon,
            color: 'bg-gradient-to-r from-orange-500 to-orange-600',
            link: '/admin/site-texts',
            description: 'Editable content'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-serif font-light text-gray-900 mb-4">
                        Welcome to Divine Models
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Manage your modeling agency with elegance and precision.
                        From here you can oversee models, content, and all aspects of your divine portfolio.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item.color} text-white`}>
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <Link
                                    href={item.link}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <EyeIcon className="h-5 w-5" />
                                </Link>
                            </div>
                            <div className="mb-2">
                                <p className="text-3xl font-serif font-light text-gray-900">{item.value}</p>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{item.name}</p>
                            </div>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                            <Link
                                href={item.link}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Manage →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-serif font-light text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/models/new"
                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group"
                    >
                        <PlusIcon className="h-8 w-8 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="font-medium text-gray-900">Add New Model</p>
                            <p className="text-sm text-gray-600">Create a new model profile</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/categories/new"
                        className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-300 group"
                    >
                        <TagIcon className="h-8 w-8 text-green-600 mr-4 group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="font-medium text-gray-900">Add Category</p>
                            <p className="text-sm text-gray-600">Create model categories</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/site-texts/new"
                        className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group"
                    >
                        <DocumentTextIcon className="h-8 w-8 text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
                        <div>
                            <p className="font-medium text-gray-900">Add Site Text</p>
                            <p className="text-sm text-gray-600">Create editable content</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Latest Models */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-light text-gray-900">Latest Models</h2>
                    <Link
                        href="/admin/models"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        View all →
                    </Link>
                </div>
                <div className="space-y-4">
                    {latestModels.map((model) => (
                        <div key={model.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-shrink-0 h-12 w-12 bg-gray-300 rounded-full mr-4">
                                {model.images.length > 0 ? (
                                    <img
                                        src={model.images[0].url}
                                        alt={model.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                                        <UserGroupIcon className="h-6 w-6 text-gray-500" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{model.name}</p>
                                <p className="text-sm text-gray-500">
                                    {model.active ? 'Active' : 'Inactive'} • {model.featured ? 'Featured' : 'Regular'}
                                </p>
                            </div>
                            <Link
                                href={`/admin/models/${model.slug}`}
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Edit
                            </Link>
                        </div>
                    ))}
                    {latestModels.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <UserGroupIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p>No models yet. Create your first model profile.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
