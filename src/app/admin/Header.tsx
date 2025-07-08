'use client';

import { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    BellIcon,
    UserCircleIcon,
    Bars3Icon
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

interface HeaderProps {
    onMenuClick: () => void;
    sidebarOpen: boolean;
    isMobile: boolean;
}

export default function Header({ onMenuClick, sidebarOpen, isMobile }: HeaderProps) {
    const { data: session } = useSession();
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            }));
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 z-20 relative">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        {isMobile && (
                            <button
                                id="mobile-menu-button"
                                onClick={onMenuClick}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                                aria-label="Toggle sidebar"
                            >
                                <Bars3Icon className="h-6 w-6" />
                            </button>
                        )}

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block">
                                <h2 className="text-xl font-serif font-light text-gray-900">
                                    Administration Panel
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Time Display */}
                        <div className="hidden sm:block text-sm text-gray-500 font-medium">
                            {currentTime}
                        </div>

                        {/* Notifications */}
                        <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                            <BellIcon className="h-5 w-5" />
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {session?.user?.name || 'Administrator'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {session?.user?.email}
                                </p>
                            </div>
                            <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                                <UserCircleIcon className="h-8 w-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
