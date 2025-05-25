'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function ParagraphBlock({ text, onChange, readOnly }: { text: string; onChange?: (t:string)=>void; readOnly:boolean }) {
  return readOnly ? <p>{text}</p> : <Textarea value={text} onChange={e=>onChange?.(e.target.value)} placeholder="Paragraph..." />;
}