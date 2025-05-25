'use client';
import React from 'react';

export interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image';
  props: any;         // { text } or { src, alt }
  style?: {           // optional design props
    margin?: number;
    padding?: number;
    bgColor?: string;
    textColor?: string;
    fontSize?: number;
    borderRadius?: number;
  };
}

interface PreviewProps {
  block: Block;
  onSelect: (id: string) => void;
}

export default function BlockPreview({ block, onSelect }: PreviewProps) {
  const s = block.style || {};
  return (
    <div
      onClick={() => onSelect(block.id)}
      className="cursor-pointer"
      style={{
        margin: s.margin,
        padding: s.padding,
        backgroundColor: s.bgColor,
        color: s.textColor,
        fontSize: s.fontSize,
        borderRadius: s.borderRadius,
      }}
    >
      {block.type === 'heading' && <h2>{block.props.text}</h2>}
      {block.type === 'paragraph' && <p>{block.props.text}</p>}
      {block.type === 'image' && (
        <img src={block.props.src} alt={block.props.alt} style={{ width: '100%' }} />
      )}
    </div>
  );
}