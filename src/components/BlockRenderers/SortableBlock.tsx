// src/components/BlockRenderers/SortableBlock.tsx
'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Block } from '@/components/BlockEditor';

import GridBlock from './Grid';
import HeadingBlock from './Heading';
import ParagraphBlock from './Paragraph';
import ImageBlock from './Image';
import ListBlock from './List';
import QuoteBlock from './Quote';
import CodeBlock from './Code';
import TableBlock from './Table';
import GalleryBlock from './Gallery';
import AudioBlock from './Audio';
import VideoBlock from './Video';

interface SortableBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (b: Block) => void;
  onDelete: () => void;
}

export default function SortableBlock({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  // Compute inline style
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: block.style?.margin,
    padding: block.style?.padding,
    backgroundColor: block.style?.bgColor,
    color: block.style?.textColor,
    fontSize:
      block.style?.fontSize != null
        ? `${block.style.fontSize}${block.style.fontSizeUnit || 'px'}`
        : undefined,
    borderRadius:
      block.style?.borderRadius != null
        ? `${block.style.borderRadius}${block.style.borderRadiusUnit || 'px'}`
        : undefined,
    objectFit: block.style?.objectFit as any,
    overflow: 'hidden',
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative mb-4 border rounded-lg bg-whitep p-2 ${
        isSelected ? 'ring-2 ring-indigo-400' : ''
      }`}
      onClick={e => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Drag handle */}
      <GripVertical
        {...attributes}
        {...listeners}
        className="absolute top-2 right-10 cursor-move text-gray-400"
        onClick={stop}
      />

      {/* Delete button */}
      <Trash2
        className="absolute top-2 right-2 cursor-pointer text-red-500"
        onClick={e => {
          stop(e);
          onDelete();
        }}
      />

      {/* Render block by type */}
      {block.type === 'grid' && (
        <GridBlock
          block={block as any}
          children={block.children || []}
          isSelected={isSelected}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}

      {block.type === 'heading' && (
        <HeadingBlock
          level={block.props.level}
          text={block.props.text}
          readOnly={!isSelected}
          onChangeText={txt => onUpdate({ ...block, props: { ...block.props, text: txt } })}
          onChangeLevel={lvl => onUpdate({ ...block, props: { ...block.props, level: lvl } })}
        />
      )}

      {block.type === 'paragraph' && (
        <ParagraphBlock
          text={block.props.text}
          readOnly={!isSelected}
          onChange={txt => onUpdate({ ...block, props: { ...block.props, text: txt } })}
        />
      )}

      {block.type === 'image' && (
        <ImageBlock
          src={block.props.src}
          alt={block.props.alt}
          readOnly={!isSelected}
          onChangeSrc={src => onUpdate({ ...block, props: { ...block.props, src } })}
          onChangeAlt={alt => onUpdate({ ...block, props: { ...block.props, alt } })}
        />
      )}

      {block.type === 'list' && (
        <ListBlock
          items={block.props.items}
          ordered={block.props.ordered}
          readOnly={!isSelected}
          onChange={(items, ordered) =>
            onUpdate({ ...block, props: { ...block.props, items, ordered } })
          }
        />
      )}

      {block.type === 'quote' && (
        <QuoteBlock
          text={block.props.text}
          caption={block.props.caption}
          readOnly={!isSelected}
          onChange={(text, caption) =>
            onUpdate({ ...block, props: { text, caption } })
          }
        />
      )}

      {block.type === 'code' && (
        <CodeBlock
          code={block.props.code}
          language={block.props.language}
          readOnly={!isSelected}
          onChange={(code, language) =>
            onUpdate({ ...block, props: { code, language } })
          }
        />
      )}

      {block.type === 'table' && (
        <TableBlock
          rows={block.props.rows}
          readOnly={!isSelected}
          onChange={rows => onUpdate({ ...block, props: { rows } })}
        />
      )}

      {block.type === 'gallery' && (
        <GalleryBlock
          urls={block.props.urls}
          columns={block.props.columns}
          readOnly={!isSelected}
          onChange={(urls, columns) =>
            onUpdate({ ...block, props: { urls, columns } })
          }
        />
      )}

      {block.type === 'audio' && (
        <AudioBlock
          src={block.props.src}
          readOnly={!isSelected}
          onChange={src => onUpdate({ ...block, props: { src } })}
        />
      )}

      {block.type === 'video' && (
        <VideoBlock
          src={block.props.src}
          readOnly={!isSelected}
          onChange={src => onUpdate({ ...block, props: { src } })}
        />
      )}
    </div>
  );
}
