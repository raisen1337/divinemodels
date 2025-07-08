'use client';

import Script from 'next/script';

export default function ClientScripts() {
    return (
        <>
            <Script id="aos-init">
                {`
          document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
              duration: 800,
              easing: 'ease-in-out',
              once: true,
              mirror: false
            });
          });
        `}
            </Script>
            <Script id="swiper-init">
                {`
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize nested Swipers for model cards
            const nestedSwipers = document.querySelectorAll('.nested-swiper');
            nestedSwipers.forEach(swiperEl => {
              new Swiper(swiperEl, {
                loop: true,
                navigation: {
                  nextEl: swiperEl.querySelector('.swiper-button-next'),
                  prevEl: swiperEl.querySelector('.swiper-button-prev'),
                },
              });
            });
          });
        `}
            </Script>
        </>
    );
}
