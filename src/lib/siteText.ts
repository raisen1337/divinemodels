import prisma from './prisma';

// Enhanced cache for site texts with better performance
let siteTextCache: Record<string, string> = {};
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes (increased from 5)
let cachePromise: Promise<Record<string, string>> | null = null;

export async function getAllSiteTexts(): Promise<Record<string, string>> {
    const now = Date.now();

    // Return cached data if still valid
    if (cacheTime > 0 && now - cacheTime < CACHE_TTL && Object.keys(siteTextCache).length > 0) {
        return siteTextCache;
    }

    // If cache is being refreshed, return the promise to avoid duplicate requests
    if (cachePromise) {
        return cachePromise;
    }

    // Create a new cache promise
    cachePromise = (async () => {
        try {
            const texts = await prisma.siteText.findMany({
                select: {
                    key: true,
                    value: true,
                },
            });

            const newCache: Record<string, string> = {};
            texts.forEach((text) => {
                newCache[text.key] = text.value;
            });

            siteTextCache = newCache;
            cacheTime = now;
            cachePromise = null;

            return siteTextCache;
        } catch (error) {
            console.error('Error fetching site texts:', error);
            cachePromise = null;
            return siteTextCache; // Return old cache on error
        }
    })();

    return cachePromise;
}

export async function getSiteText(key: string, defaultValue: string = ''): Promise<string> {
    try {
        const texts = await getAllSiteTexts();
        return texts[key] || defaultValue;
    } catch (error) {
        console.error('Error getting site text:', error);
        return defaultValue;
    }
}

// Helper function to preload site texts (can be called during app initialization)
export async function preloadSiteTexts() {
    try {
        await getAllSiteTexts();
        console.log('Site texts preloaded successfully');
    } catch (error) {
        console.error('Error preloading site texts:', error);
    }
}

export async function getSiteTexts(prefix: string) {
    const texts = await getAllSiteTexts();
    const filtered: Record<string, string> = {};

    Object.keys(texts).forEach(key => {
        if (key.startsWith(prefix)) {
            const shortKey = key.replace(prefix + '.', '');
            filtered[shortKey] = texts[key];
        }
    });

    return filtered;
}
