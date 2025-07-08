// This is a service layer that provides the same interface as localFileStorage
// but uses UploadThing as the backend

// For server-side operations, we'll use UploadThing's API directly
// This is mainly for consistency with the existing codebase

export interface UploadResult {
    url: string;
    publicId: string;
}

export const uploadImage = async (file: File): Promise<UploadResult> => {
    // This function is primarily for client-side use
    // Server-side uploads should use the UploadThing components directly
    throw new Error('Use UploadThing components for client-side uploads');
};

export const deleteImage = async (publicId: string): Promise<void> => {
    try {
        // UploadThing delete functionality
        // We'll need to implement this using UploadThing's API
        const response = await fetch('/api/uploadthing/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: publicId }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete image');
        }
    } catch (error) {
        console.error('Error deleting UploadThing image:', error);
        throw new Error('Failed to delete image');
    }
};

// Helper function to extract key from UploadThing URL
export const getKeyFromUrl = (url: string): string => {
    // UploadThing URLs are in format: https://utfs.io/f/{key}
    const match = url.match(/\/f\/([^/?]+)/);
    return match ? match[1] : url;
};

// Helper function to validate UploadThing URL
export const isUploadThingUrl = (url: string): boolean => {
    return url.includes('utfs.io') || url.includes('uploadthing');
};
