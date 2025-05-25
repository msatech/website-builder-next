'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function ListBlock({ items, onChange, readOnly }: { items: string[]; onChange?: (it:string[])=>void; readOnly:boolean }) {
  return readOnly ? <ul>{items.map((i,idx)=><li key={idx}>{i}</li>)}</ul> : (
    <Textarea value={items.join('\n')} onChange={e=>onChange?.(e.target.value.split('\n'))} placeholder="One item per line..." />
  );
}