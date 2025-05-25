'use client';
import React from 'react';
import { Input } from '@/components/ui/input';

interface GalleryProps {
  urls: string[];
  columns?: number;
  readOnly?: boolean;
  onChange?: (urls: string[], columns: number) => void;
}

export default function GalleryBlock({
  urls = [],
  columns = 3,
  readOnly = false,
  onChange,
}: GalleryProps) {
  if (readOnly) {
    return (
      <div className={`grid grid-cols-${columns} gap-2 mb-4`}>
        {urls.map((u, i) => (
          <img key={i} src={u} className="w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          className="w-20"
          value={columns}
          onChange={e => onChange?.(urls, Number(e.target.value))}
        />
        <span>columns</span>
      </div>
      <textarea
        className="w-full border p-2"
        rows={3}
        value={urls.join('\n')}
        onChange={e => onChange?.(e.target.value.split('\n'), columns)}
        placeholder="One URL per line"
      />
      <div className={`grid grid-cols-${columns} gap-2`}>
        {urls.map((u, i) => (
          <img key={i} src={u} className="w-full" />
        ))}
      </div>
    </div>
  );
}
