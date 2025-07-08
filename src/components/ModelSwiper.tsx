'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

type Image = {
    id: string;
    url: string;
    alt: string | null;
};

type ModelSwiperProps = {
    images: Image[];
    modelName: string;
    noImagesText: string;
};

declare global {
    interface Window {
        Swiper: any;
    }
}

export default function ModelSwiper({ images, modelName, noImagesText }: ModelSwiperProps) {
    const swiperRef = useRef<HTMLDivElement>(null);
    const swiperInstance = useRef<any>(null);

    useEffect(() => {
        const initSwiper = () => {
            if (typeof window !== 'undefined' && window.Swiper && swiperRef.current) {
                // Destroy existing instance if it exists
                if (swiperInstance.current) {
                    swiperInstance.current.destroy(true, true);
                }

                // Initialize new Swiper
                swiperInstance.current = new window.Swiper(swiperRef.current, {
                    loop: images.length > 1,
                    spaceBetween: 30,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    keyboard: {
                        enabled: true,
                    },
                    grabCursor: true,
                    centeredSlides: true,
                    autoplay: false,
                });
            }
        };

        // Check if Swiper is already loaded
        if (typeof window !== 'undefined' && window.Swiper) {
            initSwiper();
        } else {
            // Wait for Swiper to load
            const checkSwiper = setInterval(() => {
                if (typeof window !== 'undefined' && window.Swiper) {
                    clearInterval(checkSwiper);
                    initSwiper();
                }
            }, 100);

            // Cleanup interval after 10 seconds
            setTimeout(() => {
                clearInterval(checkSwiper);
            }, 10000);
        }

        // Cleanup on unmount
        return () => {
            if (swiperInstance.current) {
                swiperInstance.current.destroy(true, true);
            }
        };
    }, [images.length]);

    return (
        <div
            ref={swiperRef}
            className="swiper h-[600px] rounded-lg overflow-hidden shadow-xl model-detail-swiper"
        >
            <div className="swiper-wrapper">
                {images && images.length > 0 ? (
                    images.map((image) => (
                        <div key={image.id} className="swiper-slide">
                            <div className="relative w-full h-full">
                                <Image
                                    src={image.url}
                                    alt={image.alt || modelName}
                                    fill
                                    className="object-cover"
                                    priority={images.indexOf(image) === 0}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="swiper-slide">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">{noImagesText}</p>
                        </div>
                    </div>
                )}
            </div>

            {images && images.length > 1 && (
                <>
                    <div className="swiper-button-prev !text-white !bg-black/50 !rounded-full !w-12 !h-12 after:!text-lg"></div>
                    <div className="swiper-button-next !text-white !bg-black/50 !rounded-full !w-12 !h-12 after:!text-lg"></div>
                    <div className="swiper-pagination !bottom-4"></div>
                </>
            )}
        </div>
    );
}
