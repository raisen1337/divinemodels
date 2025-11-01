'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

type Props = {
    modelSlug: string;
    imageId: string;
    initialVisible: boolean;
    onToggle?: () => void;
};

export default function ImageVisibilityToggle({ modelSlug, imageId, initialVisible, onToggle }: Props) {
    const [visible, setVisible] = useState(initialVisible ?? true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setLoading(true);
        setError(false);
        try {
            const response = await axios.patch(`/api/models/${modelSlug}/images/${imageId}`, {
                visible: !visible,
            });
            
            if (response.data.success) {
                setVisible(!visible);
                if (onToggle) {
                    onToggle();
                }
            }
        } catch (error: any) {
            console.error('Failed to toggle visibility:', error);
            setError(true);
            // If column doesn't exist yet, silently fail (migration not run yet)
            if (error.response?.status === 500 && error.response?.data?.error?.includes('column')) {
                console.warn('Visibility column not available yet - migration may not be run');
                setError(false);
            } else {
                alert('Failed to toggle image visibility. The database migration may not be complete yet.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Don't render if there was an error suggesting column doesn't exist
    if (error) {
        return null;
    }

    // Don't render if column doesn't exist yet (before migration)
    if (initialVisible === undefined || initialVisible === null) {
        return null;
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-md transition-all ${
                visible 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-500 text-white hover:bg-gray-600'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={visible ? 'Click to hide' : 'Click to show'}
        >
            {visible ? (
                <>
                    <EyeIcon className="h-3 w-3 mr-1" />
                    Visible
                </>
            ) : (
                <>
                    <EyeSlashIcon className="h-3 w-3 mr-1" />
                    Hidden
                </>
            )}
        </button>
    );
}

