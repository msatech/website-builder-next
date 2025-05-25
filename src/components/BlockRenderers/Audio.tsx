'use client';
import React from 'react';
import { Input } from '@/components/ui/input';

export default function AudioBlock({ src, onChange, readOnly }: { src:string; onChange?: (s:string)=>void; readOnly:boolean }) {
  return readOnly ? <audio src={src} controls /> : (
    <Input value={src} onChange={e=>onChange?.(e.target.value)} placeholder="Audio URL..." />
  );
}