'use client';
import React from 'react';
import { Input } from '@/components/ui/input';

interface ImageProps {
  src: string;
  alt?: string;
  readOnly?: boolean;
  onChangeSrc?: (src: string) => void;
  onChangeAlt?: (alt: string) => void;
}

export default function ImageBlock({
  src = '',
  alt = '',
  readOnly = false,
  onChangeSrc,
  onChangeAlt,
}: ImageProps) {
  if (readOnly) {
    return <img src={src} alt={alt} className="w-full rounded mb-4" />;
  }
  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="Image URL"
        value={src}
        onChange={e => onChangeSrc?.(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Alt text"
        value={alt}
        onChange={e => onChangeAlt?.(e.target.value)}
      />
      {src && <img src={src} alt={alt} className="w-full rounded" />}
    </div>
  );
}
