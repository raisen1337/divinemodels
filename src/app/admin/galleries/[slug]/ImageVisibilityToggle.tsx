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
    const [visible, setVisible] = useState(initialVisible);
    const [loading, setLoading] = useState(false);

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setLoading(true);
        try {
            await axios.patch(`/api/models/${modelSlug}/images/${imageId}`, {
                visible: !visible,
            });
            setVisible(!visible);
            if (onToggle) {
                onToggle();
            }
        } catch (error) {
            console.error('Failed to toggle visibility:', error);
            alert('Failed to toggle image visibility');
        } finally {
            setLoading(false);
        }
    };

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

