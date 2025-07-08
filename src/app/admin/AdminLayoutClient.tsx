'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutClientProps {
    children: ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
            // Auto-close sidebar on mobile when resizing to mobile
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Backdrop for mobile */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isMobile={isMobile}
            />

            <div className={`transition-all duration-300 ease-in-out ${!isMobile ? 'ml-64' : 'ml-0'}`}>
                <Header
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                    isMobile={isMobile}
                />

                <main className="min-h-screen">
                    {/* Hero section with elegant styling */}
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
                            <div className="relative px-4 py-8 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                    <div className="text-center">
                                        <h1 className="text-4xl font-serif font-light text-white mb-4 tracking-wide">
                                            Administration
                                        </h1>
                                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="px-4 py-8 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
