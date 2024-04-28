'use client'
import { Share, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ShareLink() {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            // Reset the copied state after a short delay
            setTimeout(() => setCopied(false), 2000);
        }).catch((error) => {
            console.error('Failed to copy:', error);
        });
    };

    return (
        <Button size="sm" variant="outline"
            className={cn("flex items-center gap-2 border-black border-dashed w-28",
                copied && 'bg-green-500 text-white border-none hover:border-black'
            )}
            onClick={handleClick} >
            {
                copied ? <>
                    Copied!
                    <Check className="w-3 h-3" />
                </>
                    :
                    <>
                        Copy Link
                        <Share className="w-3 h-3" />
                    </>
            }
        </Button >
    )
}
