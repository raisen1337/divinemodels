'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
    useEffect(() => {
        // Only run in development
        if (process.env.NODE_ENV !== 'development') return;

        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure') {
                    console.log(`🔍 Performance: ${entry.name} - ${Math.round(entry.duration)}ms`);
                }
            }
        });

        observer.observe({ entryTypes: ['measure'] });

        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📊 Page load time: ${loadTime}ms`);
        });

        // Monitor First Contentful Paint
        if ('getEntriesByType' in performance) {
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach((entry) => {
                console.log(`🎨 ${entry.name}: ${Math.round(entry.startTime)}ms`);
            });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return null;
}
