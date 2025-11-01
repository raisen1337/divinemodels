'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import Header from './Header';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface AdminLayoutClientProps {
    children: ReactNode;
}

// Breadcrumb mapping for better navigation
const getBreadcrumbs = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Dashboard', href: '/admin' }];

    if (segments.length > 1) {
        segments.slice(1).forEach((segment, index) => {
            const href = '/' + segments.slice(0, index + 2).join('/');
            const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            breadcrumbs.push({ name, href });
        });
    }

    return breadcrumbs;
};

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const breadcrumbs = getBreadcrumbs(pathname);

    useEffect(() => {
        const checkScreenSize = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);
            // Auto-close sidebar on mobile when resizing
            if (isMobileView) {
                setSidebarOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    }, [pathname, isMobile]);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        if (sidebarOpen && isMobile) {
            const handleOutsideClick = (e: MouseEvent) => {
                const sidebar = document.getElementById('admin-sidebar');
                const menuButton = document.getElementById('mobile-menu-button');

                if (sidebar && !sidebar.contains(e.target as Node) &&
                    menuButton && !menuButton.contains(e.target as Node)) {
                    setSidebarOpen(false);
                }
            };

            document.addEventListener('mousedown', handleOutsideClick);
            return () => document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [sidebarOpen, isMobile]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Backdrop for mobile */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isMobile={isMobile}
            />

            <div className={`transition-all duration-300 ease-in-out ${!isMobile ? 'lg:ml-64' : 'ml-0'}`}>
                <Header
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                    isMobile={isMobile}
                />

                <main className="min-h-screen">
                    {/* Breadcrumb Navigation */}
                    {pathname !== '/admin' && (
                        <div className="bg-white border-b border-gray-200">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="flex items-center space-x-2">
                                        <li>
                                            <Link
                                                href="/admin"
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <HomeIcon className="h-5 w-5" />
                                            </Link>
                                        </li>
                                        {breadcrumbs.slice(1).map((crumb, index) => (
                                            <li key={crumb.href} className="flex items-center">
                                                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
                                                {index === breadcrumbs.length - 2 ? (
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {crumb.name}
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={crumb.href}
                                                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                                    >
                                                        {crumb.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    )}

                    {/* Main content area */}
                    <div className="px-4 py-6 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <p className="text-sm text-gray-500">
                                © {new Date().getFullYear()} Divine Models. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-6">
                                <Link href="/" target="_blank" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                    View Site
                                </Link>
                                <Link href="/admin/settings" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                    Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
