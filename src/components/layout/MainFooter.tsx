'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type FooterProps = {
    siteName?: string;
    contactEmail?: string;
    phoneNumber?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
};

export default function MainFooter({
    siteName = 'Divine Models',
    contactEmail = 'contact@divinemodels.ro',
    phoneNumber = '+40 748 037 587',
    facebookUrl = 'https://facebook.com',
    instagramUrl = 'https://instagram.com',
    twitterUrl = 'https://twitter.com'
}: FooterProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-bg text-white">
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo & Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <svg className="w-8 h-8 text-gold" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"
                                viewBox="0 0 1024 1024" version="1.1">
                                <path
                                    d="M 171 232.871 L 171 237.742 179.248 238.461 C 188.223 239.244, 193.157 240.880, 196.856 244.298 C 200.230 247.416, 203.854 253.366, 206.353 259.894 L 208.500 265.500 208.793 397 C 208.988 484.849, 208.737 531.145, 208.035 536.469 C 206.186 550.491, 199.053 561.922, 189.589 566.029 C 187.340 567.006, 182.238 568.119, 178.250 568.504 L 171 569.203 171 574.157 L 171 579.111 257.250 578.745 C 339.226 578.396, 344.145 578.273, 356.522 576.268 C 378.928 572.639, 394.251 567.935, 410.778 559.612 C 426.995 551.445, 437.501 543.672, 452.044 529.082 C 467.595 513.480, 479.532 495.346, 487.765 474.818 C 491.347 465.886, 496.540 447.648, 497.491 440.660 C 497.853 437.997, 498.338 434.847, 498.569 433.660 C 501.207 420.068, 501.408 392.427, 498.992 375.500 C 493.754 338.805, 477.418 304.446, 452.962 278.685 C 425.923 250.204, 397.019 235.269, 357.872 229.552 C 348.896 228.241, 333.537 228, 259.122 228 L 171 228 171 232.871 M 483.197 233.160 C 483.485 238.087, 483.647 238.358, 486.500 238.707 C 491.216 239.283, 499.107 242.001, 503.726 244.641 C 507.169 246.608, 508.588 248.395, 511.384 254.278 C 513.271 258.250, 515.334 263.975, 515.967 267 C 516.812 271.035, 517.037 308.067, 516.809 406 L 516.500 539.500 514.053 545.744 C 510.911 553.761, 505.488 560.910, 500.431 563.703 C 498.237 564.915, 493.417 566.480, 489.721 567.181 L 483 568.456 483 573.728 L 483 579 532 579 L 581 579 581 573.580 L 581 568.159 574.250 567.503 C 562.113 566.324, 552.274 562.014, 548.317 556.142 C 544.949 551.145, 542.014 542.516, 540.983 534.583 C 540.050 527.409, 539.575 292.241, 540.495 293.161 C 541.087 293.753, 549.257 315.995, 568.009 368.059 C 575.647 389.267, 586.237 418.292, 591.543 432.559 C 596.849 446.827, 604.789 468.175, 609.189 480 C 613.588 491.825, 621.832 514.325, 627.509 530 C 633.185 545.675, 639.555 563.123, 641.665 568.774 L 645.500 579.049 653.397 578.774 L 661.293 578.500 664.096 570.500 C 665.638 566.100, 671.219 550.125, 676.500 535 C 681.780 519.875, 688.827 499.850, 692.159 490.500 C 698.252 473.400, 704.516 455.544, 718.993 414 C 723.306 401.625, 728.186 387.675, 729.838 383 C 731.490 378.325, 737.786 360.325, 743.829 343 C 755.584 309.297, 760.833 294.833, 761.581 294.086 C 761.837 293.830, 761.923 348.943, 761.773 416.560 L 761.500 539.500 759.286 546.005 C 754.719 559.419, 747.739 564.827, 731.799 567.300 L 723.500 568.588 723.500 573.544 L 723.500 578.500 787.250 578.757 L 851 579.015 851 573.650 L 851 568.285 844.750 567.638 C 831.166 566.232, 823.365 559.329, 818.740 544.622 L 816.500 537.500 816.500 406 C 816.500 309.386, 816.810 273.041, 817.670 269 C 821.696 250.077, 829.335 241.676, 845.196 238.726 L 851 237.647 851 232.823 L 851 228 804.475 228 L 757.950 228 756.865 230.750 C 756.268 232.262, 752.266 243.850, 747.972 256.500 C 743.679 269.150, 736.265 290.750, 731.498 304.500 C 720.295 336.813, 705.508 379.628, 694.025 413 C 668.233 487.961, 669.397 484.730, 668.511 483.844 C 668.033 483.366, 633.093 387.802, 626.522 369 C 624.696 363.775, 617.788 343.975, 611.170 325 C 598.757 289.406, 590.806 266.755, 582.210 242.500 L 577.248 228.500 530.072 228.240 L 482.895 227.980 483.197 233.160 M 268 403 L 268 561 279.750 560.986 C 297.581 560.964, 324.484 559.202, 333.964 557.434 C 359.120 552.742, 378.361 543.231, 395.336 527.095 C 409.694 513.448, 420.373 496.277, 427.884 474.763 C 441.708 435.167, 442.706 380.311, 430.353 339 C 423.692 316.723, 412.287 297.033, 397 281.416 C 370.293 254.132, 341.909 245.048, 283.250 245.010 L 268 245 268 403"
                                    stroke="none" fill="currentColor" fillRule="evenodd" />
                            </svg>
                            <span className="text-xl font-serif font-semibold">{siteName}</span>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">
                            Agenție de modelling premium, specializată în descoperirea și dezvoltarea celor mai talentate modele pentru industria modei, publicității și evenimentelor.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gold transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gold transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                                </svg>
                            </a>
                            <a
                                href={twitterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gold transition-colors"
                                aria-label="Twitter"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-serif mb-6">Link-uri Rapide</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className={`text-gray-400 hover:text-gold transition-colors ${isActive('/') ? 'text-gold' : ''
                                        }`}
                                >
                                    Acasă
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={`text-gray-400 hover:text-gold transition-colors ${isActive('/about') ? 'text-gold' : ''
                                        }`}
                                >
                                    Despre noi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/models"
                                    className={`text-gray-400 hover:text-gold transition-colors ${isActive('/models') ? 'text-gold' : ''
                                        }`}
                                >
                                    Modele
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className={`text-gray-400 hover:text-gold transition-colors ${isActive('/contact') ? 'text-gold' : ''
                                        }`}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-serif mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-gold mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <a href={contactEmail ? `mailto:${contactEmail}` : '#'} className="text-gray-400 hover:text-gold transition-colors">
                                    {contactEmail || 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-gold mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <a href={`tel:${phoneNumber ? phoneNumber.replace(/\s+/g, '') : ''}`} className="text-gray-400 hover:text-gold transition-colors">
                                    {phoneNumber || 'N/A'}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-xl font-serif mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4 text-sm">
                            Abonează-te pentru a primi ultimele știri și actualizări.
                        </p>
                        <form className="space-y-3">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email-ul tău"
                                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-gold"
                                />
                                <button
                                    type="submit"
                                    className="bg-gold text-black px-4 py-2 rounded-r hover:bg-gold/90 transition-colors"
                                >
                                    Trimite
                                </button>
                            </div>
                            <p className="text-gray-500 text-xs">
                                Nu trimitem spam. Poți anula abonamentul oricând.
                            </p>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} {siteName}. Toate drepturile rezervate.
                    </p>
                    <div className="mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 hover:text-gold text-sm mr-6 transition-colors">
                            Politica de confidențialitate
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-gold text-sm transition-colors">
                            Termeni și condiții
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
