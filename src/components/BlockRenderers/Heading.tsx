'use client';
import React from 'react';
import { Input } from '@/components/ui/input';

interface HeadingProps {
  level: number;
  text: string;
  readOnly?: boolean;
  onChangeText?: (text: string) => void;
  onChangeLevel?: (level: number) => void;
}

export default function HeadingBlock({
  level = 2,
  text = '',
  readOnly = false,
  onChangeText,
  onChangeLevel,
}: HeadingProps) {
  const Tag = (`h${level}` as keyof JSX.IntrinsicElements);
  if (readOnly) {
    return <Tag>{text}</Tag>;
  }
  return (
    <div className="space-y-2">
      <select
        value={level}
        onChange={e => onChangeLevel?.(Number(e.target.value))}
        className="p-1 border rounded"
      >
        {[1, 2, 3, 4, 5, 6].map(n => (
          <option key={n} value={n}>
            H{n}
          </option>
        ))}
      </select>
      <Input
        value={text}
        onChange={e => onChangeText?.(e.target.value)}
        placeholder="Heading text..."
      />
    </div>
  );
}
