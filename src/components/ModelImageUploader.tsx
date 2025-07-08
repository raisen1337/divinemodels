'use client';

import { useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { ClientUploadedFileData } from 'uploadthing/types';

interface UploadedFile {
    url: string;
    key: string;
    name: string;
    size: number;
}

interface ModelImageUploaderProps {
    onUploadComplete?: (files: UploadedFile[]) => void;
    onUploadError?: (error: Error) => void;
    maxFiles?: number;
}

export default function ModelImageUploader({
    onUploadComplete,
    onUploadError,
    maxFiles = 10,
}: ModelImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    return (
        <div className="w-full">
            <UploadDropzone
                endpoint="modelImageUploader"
                onClientUploadComplete={(res: ClientUploadedFileData<any>[]) => {
                    try {
                        console.log('Upload complete - Raw response:', res);
                        setIsUploading(false);
                        setUploadProgress(0);

                        if (!res || !Array.isArray(res)) {
                            throw new Error('Invalid response format from upload');
                        }

                        const uploadedFiles: UploadedFile[] = res.map((file) => {
                            if (!file.url || !file.key || !file.name) {
                                throw new Error('Missing required file properties');
                            }

                            return {
                                url: file.url,
                                key: file.key,
                                name: file.name,
                                size: file.size || 0,
                            };
                        });

                        console.log('Processed uploaded files:', uploadedFiles);
                        onUploadComplete?.(uploadedFiles);
                    } catch (error) {
                        console.error('Error processing upload completion:', error);
                        setIsUploading(false);
                        setUploadProgress(0);
                        onUploadError?.(error instanceof Error ? error : new Error('Failed to process uploaded files'));
                    }
                }}
                onUploadError={(error: Error) => {
                    console.error('Upload error:', error);
                    setIsUploading(false);
                    setUploadProgress(0);
                    onUploadError?.(error);
                }}
                onUploadBegin={(name: string) => {
                    console.log('Upload begin for:', name);
                    setIsUploading(true);
                    setUploadProgress(0);
                }}
                onUploadProgress={(progress: number) => {
                    console.log('Upload progress:', progress);
                    setUploadProgress(progress);
                }}
                config={{
                    mode: 'auto',
                }}
                appearance={{
                    container: "border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gold-400 transition-colors",
                    uploadIcon: "text-gold-600",
                    label: "text-gray-700 font-medium",
                    allowedContent: "text-gray-500 text-sm",
                    button: "bg-gradient-to-r from-gold-600 to-gold-700 text-white hover:from-gold-700 hover:to-gold-800 ut-ready:bg-gradient-to-r ut-ready:from-gold-600 ut-ready:to-gold-700 ut-uploading:bg-gradient-to-r ut-uploading:from-gold-600 ut-uploading:to-gold-700"
                }}
            />

            {isUploading && (
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center text-gold-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold-600 mr-2"></div>
                        Uploading images...
                    </div>
                    {uploadProgress > 0 && (
                        <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gold-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-500 mt-1">{uploadProgress}%</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
