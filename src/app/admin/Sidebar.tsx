'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Transition } from '@headlessui/react';
import {
    HomeIcon,
    UserGroupIcon,
    TagIcon,
    Cog6ToothIcon,
    PhotoIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ArrowLeftOnRectangleIcon,
    XMarkIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Models', href: '/admin/models', icon: UserGroupIcon },
    { name: 'Categories', href: '/admin/categories', icon: TagIcon },
    { name: 'Features', href: '/admin/features', icon: TagIcon },
    { name: 'Galleries', href: '/admin/galleries', icon: PhotoIcon },
    { name: 'Site Texts', href: '/admin/site-texts', icon: DocumentTextIcon },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isMobile: boolean;
}

export default function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div
            id="admin-sidebar"
            className={`${isMobile
                ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`
                : 'fixed inset-y-0 left-0 w-64'
                } flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-r border-gold/20`}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gold/20">
                <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-gold" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
                        <path fill="currentColor" d="M512 256c-123.712 0-224 100.288-224 224s100.288 224 224 224 224-100.288 224-224-100.288-224-224-224zm0 384c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160 160-71.776 160-160 160z" />
                        <path fill="currentColor" d="M870.4 614.4c-3.2-6.4-9.6-9.6-16-9.6-3.2 0-6.4 0-9.6 3.2L768 672l-76.8-64c-6.4-3.2-12.8-3.2-19.2 0L595.2 672l-76.8-64c-6.4-3.2-12.8-3.2-19.2 0L422.4 672l-76.8-64c-6.4-3.2-12.8-3.2-19.2 0L249.6 672l-76.8-64c-6.4-3.2-12.8-3.2-19.2 0-6.4 3.2-9.6 9.6-9.6 16v256c0 12.8 9.6 22.4 22.4 22.4s22.4-9.6 22.4-22.4V694.4l54.4 44.8c6.4 6.4 16 6.4 22.4 0l76.8-64 76.8 64c6.4 6.4 16 6.4 22.4 0l76.8-64 76.8 64c6.4 6.4 16 6.4 22.4 0l76.8-64 76.8 64c6.4 6.4 16 6.4 22.4 0l54.4-44.8V880c0 12.8 9.6 22.4 22.4 22.4s22.4-9.6 22.4-22.4V624c0-3.2-3.2-6.4-3.2-9.6z" />
                    </svg>
                    <h1 className="text-lg font-serif font-light text-white tracking-wide">
                        Divine Models
                    </h1>
                </div>
                {isMobile && (
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gold/60 hover:text-gold hover:bg-white/5 transition-all duration-200"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-grow overflow-y-auto py-6">
                <nav className="px-3 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        if (item.name === 'Models') {
                            return (
                                <Disclosure as="div" key={item.name} defaultOpen={pathname.includes('/admin/models')}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                className={`${pathname.includes('/admin/models')
                                                    ? 'bg-gradient-to-r from-gold/20 to-gold/10 text-gold border-l-4 border-gold'
                                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                    } group flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200`}
                                            >
                                                <item.icon
                                                    className="mr-3 h-5 w-5 flex-shrink-0"
                                                    aria-hidden="true"
                                                />
                                                <span className="flex-1 text-left">{item.name}</span>
                                                {open ? (
                                                    <ChevronDownIcon className="h-4 w-4 text-gold/60 transition-transform duration-200" />
                                                ) : (
                                                    <ChevronRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-200" />
                                                )}
                                            </Disclosure.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95 -translate-y-2"
                                                enterTo="transform opacity-100 scale-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                                leaveTo="transform opacity-0 scale-95 -translate-y-2"
                                            >
                                                <Disclosure.Panel className="ml-6 mt-2 space-y-1 border-l border-gold/20 pl-4">
                                                    <Link
                                                        href="/admin/models"
                                                        onClick={isMobile ? onClose : undefined}
                                                        className={`${pathname === '/admin/models'
                                                            ? 'text-gold bg-gold/10'
                                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                            } group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200`}
                                                    >
                                                        All Models
                                                    </Link>
                                                    <Link
                                                        href="/admin/models/new"
                                                        onClick={isMobile ? onClose : undefined}
                                                        className={`${pathname === '/admin/models/new'
                                                            ? 'text-gold bg-gold/10'
                                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                            } group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200`}
                                                    >
                                                        Add New Model
                                                    </Link>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={isMobile ? onClose : undefined}
                                className={`${isActive
                                    ? 'bg-gradient-to-r from-gold/20 to-gold/10 text-gold border-l-4 border-gold'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    } group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200`}
                            >
                                <item.icon
                                    className="mr-3 h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Sign Out Button */}
            <div className="p-4 border-t border-gold/20 bg-gradient-to-r from-gray-900 to-gray-800">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-red-500/20 border border-transparent hover:border-red-500/30 transition-all duration-200"
                >
                    <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
