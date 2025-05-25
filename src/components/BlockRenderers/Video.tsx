'use client';
import React from 'react';
import { Input } from '@/components/ui/input';

export default function VideoBlock({ src, onChange, readOnly }: { src:string; onChange?: (s:string)=>void; readOnly:boolean }) {
  return readOnly ? <video src={src} controls className="w-full" /> : (
    <Input value={src} onChange={e=>onChange?.(e.target.value)} placeholder="Video URL..." />
  );
}