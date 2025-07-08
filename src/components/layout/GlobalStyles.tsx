'use client';

import React from 'react';

export default function GlobalStyles() {
    return (
        <style jsx global>{`
      * {
        font-family: var(--font-inter), sans-serif;
      }

      .font-serif {
        font-family: var(--font-cormorant), serif;
      }

      /* Gold color custom */
      .text-gold {
        color: #d4af37;
      }

      .bg-gold {
        background-color: #d4af37;
      }

      .border-gold {
        border-color: #d4af37;
      }
      
      /* Improved text readability */
      .text-gray-400 {
        color: rgba(156, 163, 175, 0.9) !important; /* Increased opacity for better contrast */
      }
      
      .text-gray-500 {
        color: rgba(107, 114, 128, 0.9) !important; /* Increased opacity for better contrast */
      }
      
      .text-gray-600 {
        color: rgba(75, 85, 99, 1) !important; /* Darkened for better contrast */
      }
      
      .text-white\/80 {
        color: rgba(255, 255, 255, 0.9) !important; /* Increased opacity for better contrast */
      }

      /* Navigation styling */
      .nav-glass {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 30px rgba(0, 0, 0, 0.1);
      }

      /* Mobile menu animation */
      .mobile-menu {
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .mobile-menu.open {
        transform: translateX(0);
      }

      /* Overlay */
      .menu-overlay {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
      }

      .menu-overlay.open {
        opacity: 1;
        visibility: visible;
      }

      /* Hamburger animation */
      .hamburger-line {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .hamburger-open .line1 {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .hamburger-open .line2 {
        opacity: 0;
      }

      .hamburger-open .line3 {
        transform: rotate(-45deg) translate(7px, -6px);
      }

      /* Enhanced button styles */
      .btn-primary {
        background: linear-gradient(135deg, #000 0%, #333 100%);
        border: none;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #333 0%, #000 100%);
        transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
      }

      .btn-primary:hover::before {
        left: 0;
      }

      .btn-secondary {
        position: relative;
        overflow: hidden;
        background: transparent;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .btn-secondary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #d4af37;
        transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
      }

      .btn-secondary:hover::before {
        left: 0;
      }

      /* Enhanced card styles */
      .model-card {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      }

      .model-card:hover {
        transform: translateY(-15px);
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
      }

      .model-card-overlay {
        background: linear-gradient(180deg,
            transparent 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.8) 100%);
        opacity: 0;
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .model-card:hover .model-card-overlay {
        opacity: 1;
      }

      /* Gold line animation */
      .gold-line {
        position: relative;
      }

      .gold-line::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #d4af37, transparent);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(-50%);
      }

      .gold-line:hover::after {
        width: 100%;
      }

      /* Section styling */
      .section-divider {
        background: linear-gradient(90deg, transparent, #d4af37, transparent);
        height: 1px;
        width: 120px;
        margin: 0 auto;
      }

      /* Hero section enhancements */
      .hero-bg {
        background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
        position: relative;
      }

      .hero-bg::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23d4af37" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        pointer-events: none;
      }

      /* Professional spacing */
      .section-padding {
        padding: 6rem 0;
      }

      @media (max-width: 768px) {
        .section-padding {
          padding: 4rem 0;
        }
      }

      /* Contact section styling */
      .contact-bg {
        background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
        position: relative;
      }

      .contact-bg::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23d4af37" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
        pointer-events: none;
      }

      /* Enhanced typography */
      .heading-primary {
        background: linear-gradient(135deg, #000 0%, #333 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -0.02em;
        line-height: 0.9;
      }

      /* Swiper enhancements */
      .swiper-button-prev,
      .swiper-button-next {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        width: 44px !important;
        height: 44px !important;
        margin-top: -22px !important;
        backdrop-filter: blur(10px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        background: rgba(212, 175, 55, 0.9);
        transform: scale(1.1);
      }

      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 16px !important;
        font-weight: bold;
        color: #333;
      }

      /* Enhanced animations */
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      .float-animation {
        animation: float 6s ease-in-out infinite;
      }

      /* Footer styling */
      .footer-bg {
        background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
      }

      /* Category navigation */
      .category-nav {
        background: rgba(249, 250, 251, 0.8);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      }

      /* Event slider styling */
      .event-slider {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      }

      /* Responsive improvements */
      @media (max-width: 640px) {
        .heading-primary {
          font-size: 3rem !important;
        }

        .btn-primary,
        .btn-secondary {
          padding: 1rem 1.5rem;
          font-size: 0.9rem;
        }
      }
    `}</style>
    );
}
