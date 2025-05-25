'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function QuoteBlock({ text, caption, onChange, readOnly }: { text:string; caption:string; onChange?: (t:string,c:string)=>void; readOnly:boolean }) {
  return readOnly ? <blockquote>{text}<cite>{caption}</cite></blockquote> : (
    <div>
      <Textarea value={text} onChange={e=>onChange?.(e.target.value,caption)} placeholder="Quote..." />
      <Input value={caption} onChange={e=>onChange?.(text,e.target.value)} placeholder="Caption..." />
    </div>
  );
}