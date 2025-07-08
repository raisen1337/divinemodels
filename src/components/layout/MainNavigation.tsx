'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function MainNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <>
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 nav-glass z-50 ${scrolled ? 'py-3' : 'py-5'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <svg className="w-9 h-9 text-gold" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"
                                viewBox="0 0 1024 1024" version="1.1">
                                <path
                                    d="M 171 232.871 L 171 237.742 179.248 238.461 C 188.223 239.244, 193.157 240.880, 196.856 244.298 C 200.230 247.416, 203.854 253.366, 206.353 259.894 L 208.500 265.500 208.793 397 C 208.988 484.849, 208.737 531.145, 208.035 536.469 C 206.186 550.491, 199.053 561.922, 189.589 566.029 C 187.340 567.006, 182.238 568.119, 178.250 568.504 L 171 569.203 171 574.157 L 171 579.111 257.250 578.745 C 339.226 578.396, 344.145 578.273, 356.522 576.268 C 378.928 572.639, 394.251 567.935, 410.778 559.612 C 426.995 551.445, 437.501 543.672, 452.044 529.082 C 467.595 513.480, 479.532 495.346, 487.765 474.818 C 491.347 465.886, 496.540 447.648, 497.491 440.660 C 497.853 437.997, 498.338 434.847, 498.569 433.660 C 501.207 420.068, 501.408 392.427, 498.992 375.500 C 493.754 338.805, 477.418 304.446, 452.962 278.685 C 425.923 250.204, 397.019 235.269, 357.872 229.552 C 348.896 228.241, 333.537 228, 259.122 228 L 171 228 171 232.871 M 483.197 233.160 C 483.485 238.087, 483.647 238.358, 486.500 238.707 C 491.216 239.283, 499.107 242.001, 503.726 244.641 C 507.169 246.608, 508.588 248.395, 511.384 254.278 C 513.271 258.250, 515.334 263.975, 515.967 267 C 516.812 271.035, 517.037 308.067, 516.809 406 L 516.500 539.500 514.053 545.744 C 510.911 553.761, 505.488 560.910, 500.431 563.703 C 498.237 564.915, 493.417 566.480, 489.721 567.181 L 483 568.456 483 573.728 L 483 579 532 579 L 581 579 581 573.580 L 581 568.159 574.250 567.503 C 562.113 566.324, 552.274 562.014, 548.317 556.142 C 544.949 551.145, 542.014 542.516, 540.983 534.583 C 540.050 527.409, 539.575 292.241, 540.495 293.161 C 541.087 293.753, 549.257 315.995, 568.009 368.059 C 575.647 389.267, 586.237 418.292, 591.543 432.559 C 596.849 446.827, 604.789 468.175, 609.189 480 C 613.588 491.825, 621.832 514.325, 627.509 530 C 633.185 545.675, 639.555 563.123, 641.665 568.774 L 645.500 579.049 653.397 578.774 L 661.293 578.500 664.096 570.500 C 665.638 566.100, 671.219 550.125, 676.500 535 C 681.780 519.875, 688.827 499.850, 692.159 490.500 C 698.252 473.400, 704.516 455.544, 718.993 414 C 723.306 401.625, 728.186 387.675, 729.838 383 C 731.490 378.325, 737.786 360.325, 743.829 343 C 755.584 309.297, 760.833 294.833, 761.581 294.086 C 761.837 293.830, 761.923 348.943, 761.773 416.560 L 761.500 539.500 759.286 546.005 C 754.719 559.419, 747.739 564.827, 731.799 567.300 L 723.500 568.588 723.500 573.544 L 723.500 578.500 787.250 578.757 L 851 579.015 851 573.650 L 851 568.285 844.750 567.638 C 831.166 566.232, 823.365 559.329, 818.740 544.622 L 816.500 537.500 816.500 406 C 816.500 309.386, 816.810 273.041, 817.670 269 C 821.696 250.077, 829.335 241.676, 845.196 238.726 L 851 237.647 851 232.823 L 851 228 804.475 228 L 757.950 228 756.865 230.750 C 756.268 232.262, 752.266 243.850, 747.972 256.500 C 743.679 269.150, 736.265 290.750, 731.498 304.500 C 720.295 336.813, 705.508 379.628, 694.025 413 C 668.233 487.961, 669.397 484.730, 668.511 483.844 C 668.033 483.366, 633.093 387.802, 626.522 369 C 624.696 363.775, 617.788 343.975, 611.170 325 C 598.757 289.406, 590.806 266.755, 582.210 242.500 L 577.248 228.500 530.072 228.240 L 482.895 227.980 483.197 233.160 M 268 403 L 268 561 279.750 560.986 C 297.581 560.964, 324.484 559.202, 333.964 557.434 C 359.120 552.742, 378.361 543.231, 395.336 527.095 C 409.694 513.448, 420.373 496.277, 427.884 474.763 C 441.708 435.167, 442.706 380.311, 430.353 339 C 423.692 316.723, 412.287 297.033, 397 281.416 C 370.293 254.132, 341.909 245.048, 283.250 245.010 L 268 245 268 403"
                                    stroke="none" fill="currentColor" fillRule="evenodd" />
                            </svg>
                            <span className="text-xl font-serif font-semibold text-black">Divine Models</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-12">
                            <Link
                                href="/"
                                className={`text-gray-700 hover:text-gold gold-line font-medium transition-colors ${isActive('/') ? 'text-gold' : ''
                                    }`}
                            >
                                Acasă
                            </Link>
                            <Link
                                href="/about"
                                className={`text-gray-700 hover:text-gold gold-line font-medium transition-colors ${isActive('/about') ? 'text-gold' : ''
                                    }`}
                            >
                                Despre noi
                            </Link>
                            <Link
                                href="/models"
                                className={`text-gray-700 hover:text-gold gold-line font-medium transition-colors ${isActive('/models') ? 'text-gold' : ''
                                    }`}
                            >
                                Modele
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-gray-700 hover:text-gold gold-line font-medium transition-colors ${isActive('/contact') ? 'text-gold' : ''
                                    }`}
                            >
                                Contact
                            </Link>
                            {session && (
                                <Link
                                    href="/admin"
                                    className="bg-black text-white hover:bg-gray-800 py-2 px-4 text-sm font-medium tracking-wider transition-colors rounded"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`lg:hidden hamburger flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none z-50 relative ${mobileMenuOpen ? 'hamburger-open' : ''
                                }`}
                            aria-label="Toggle mobile menu"
                        >
                            <span className="hamburger-line line1 block w-6 h-0.5 bg-black"></span>
                            <span className="hamburger-line line2 block w-6 h-0.5 bg-black"></span>
                            <span className="hamburger-line line3 block w-6 h-0.5 bg-black"></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                onClick={closeMobileMenu}
                className={`menu-overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${mobileMenuOpen ? 'open' : ''
                    }`}
            ></div>

            {/* Mobile Menu Sidebar */}
            <div
                className={`mobile-menu fixed top-0 left-0 h-full w-80 max-w-sm bg-white shadow-2xl z-50 lg:hidden ${mobileMenuOpen ? 'open' : ''
                    }`}
            >
                <div className="p-8">
                    {/* Logo in sidebar */}
                    <div className="flex items-center mb-12">
                        <svg className="w-8 h-8 text-gold mr-3" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"
                            viewBox="0 0 1024 1024" version="1.1">
                            <path
                                d="M 171 232.871 L 171 237.742 179.248 238.461 C 188.223 239.244, 193.157 240.880, 196.856 244.298 C 200.230 247.416, 203.854 253.366, 206.353 259.894 L 208.500 265.500 208.793 397 C 208.988 484.849, 208.737 531.145, 208.035 536.469 C 206.186 550.491, 199.053 561.922, 189.589 566.029 C 187.340 567.006, 182.238 568.119, 178.250 568.504 L 171 569.203 171 574.157 L 171 579.111 257.250 578.745 C 339.226 578.396, 344.145 578.273, 356.522 576.268 C 378.928 572.639, 394.251 567.935, 410.778 559.612 C 426.995 551.445, 437.501 543.672, 452.044 529.082 C 467.595 513.480, 479.532 495.346, 487.765 474.818 C 491.347 465.886, 496.540 447.648, 497.491 440.660 C 497.853 437.997, 498.338 434.847, 498.569 433.660 C 501.207 420.068, 501.408 392.427, 498.992 375.500 C 493.754 338.805, 477.418 304.446, 452.962 278.685 C 425.923 250.204, 397.019 235.269, 357.872 229.552 C 348.896 228.241, 333.537 228, 259.122 228 L 171 228 171 232.871 M 483.197 233.160 C 483.485 238.087, 483.647 238.358, 486.500 238.707 C 491.216 239.283, 499.107 242.001, 503.726 244.641 C 507.169 246.608, 508.588 248.395, 511.384 254.278 C 513.271 258.250, 515.334 263.975, 515.967 267 C 516.812 271.035, 517.037 308.067, 516.809 406 L 516.500 539.500 514.053 545.744 C 510.911 553.761, 505.488 560.910, 500.431 563.703 C 498.237 564.915, 493.417 566.480, 489.721 567.181 L 483 568.456 483 573.728 L 483 579 532 579 L 581 579 581 573.580 L 581 568.159 574.250 567.503 C 562.113 566.324, 552.274 562.014, 548.317 556.142 C 544.949 551.145, 542.014 542.516, 540.983 534.583 C 540.050 527.409, 539.575 292.241, 540.495 293.161 C 541.087 293.753, 549.257 315.995, 568.009 368.059 C 575.647 389.267, 586.237 418.292, 591.543 432.559 C 596.849 446.827, 604.789 468.175, 609.189 480 C 613.588 491.825, 621.832 514.325, 627.509 530 C 633.185 545.675, 639.555 563.123, 641.665 568.774 L 645.500 579.049 653.397 578.774 L 661.293 578.500 664.096 570.500 C 665.638 566.100, 671.219 550.125, 676.500 535 C 681.780 519.875, 688.827 499.850, 692.159 490.500 C 698.252 473.400, 704.516 455.544, 718.993 414 C 723.306 401.625, 728.186 387.675, 729.838 383 C 731.490 378.325, 737.786 360.325, 743.829 343 C 755.584 309.297, 760.833 294.833, 761.581 294.086 C 761.837 293.830, 761.923 348.943, 761.773 416.560 L 761.500 539.500 759.286 546.005 C 754.719 559.419, 747.739 564.827, 731.799 567.300 L 723.500 568.588 723.500 573.544 L 723.500 578.500 787.250 578.757 L 851 579.015 851 573.650 L 851 568.285 844.750 567.638 C 831.166 566.232, 823.365 559.329, 818.740 544.622 L 816.500 537.500 816.500 406 C 816.500 309.386, 816.810 273.041, 817.670 269 C 821.696 250.077, 829.335 241.676, 845.196 238.726 L 851 237.647 851 232.823 L 851 228 804.475 228 L 757.950 228 756.865 230.750 C 756.268 232.262, 752.266 243.850, 747.972 256.500 C 743.679 269.150, 736.265 290.750, 731.498 304.500 C 720.295 336.813, 705.508 379.628, 694.025 413 C 668.233 487.961, 669.397 484.730, 668.511 483.844 C 668.033 483.366, 633.093 387.802, 626.522 369 C 624.696 363.775, 617.788 343.975, 611.170 325 C 598.757 289.406, 590.806 266.755, 582.210 242.500 L 577.248 228.500 530.072 228.240 L 482.895 227.980 483.197 233.160 M 268 403 L 268 561 279.750 560.986 C 297.581 560.964, 324.484 559.202, 333.964 557.434 C 359.120 552.742, 378.361 543.231, 395.336 527.095 C 409.694 513.448, 420.373 496.277, 427.884 474.763 C 441.708 435.167, 442.706 380.311, 430.353 339 C 423.692 316.723, 412.287 297.033, 397 281.416 C 370.293 254.132, 341.909 245.048, 283.250 245.010 L 268 245 268 403"
                                stroke="none" fill="currentColor" fillRule="evenodd" />
                        </svg>
                        <h2 className="text-xl font-serif font-semibold text-black">Divine Models</h2>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-6">
                        <Link
                            className={`block text-gray-700 font-medium py-3 hover:text-gold transition-colors ${isActive('/') ? 'text-gold' : ''
                                }`}
                            href="/"
                            onClick={closeMobileMenu}
                        >
                            Acasă
                        </Link>
                        <Link
                            className={`block text-gray-700 font-medium py-3 hover:text-gold transition-colors ${isActive('/about') ? 'text-gold' : ''
                                }`}
                            href="/about"
                            onClick={closeMobileMenu}
                        >
                            Despre noi
                        </Link>
                        <Link
                            className={`block text-gray-700 font-medium py-3 hover:text-gold transition-colors ${isActive('/models') ? 'text-gold' : ''
                                }`}
                            href="/models"
                            onClick={closeMobileMenu}
                        >
                            Modele
                        </Link>
                        <Link
                            className={`block text-gray-700 font-medium py-3 hover:text-gold transition-colors ${isActive('/contact') ? 'text-gold' : ''
                                }`}
                            href="/contact"
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </Link>
                        {session && (
                            <Link
                                className="block text-gray-700 font-medium py-3 hover:text-gold transition-colors"
                                href="/admin"
                                onClick={closeMobileMenu}
                            >
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}
