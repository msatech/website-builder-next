// src/components/BlockEditor.tsx
'use client';

import React, { useState } from 'react';
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableBlock from './BlockRenderers/SortableBlock';
import WidgetPalette from './WidgetPalette';

// Block type
export interface Block {
  id: string;
  type:
    | 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code' | 'table'
    | 'gallery' | 'audio' | 'video' | 'grid';
  props: any;
  style?: Record<string, any>;
  children?: Block[];
}
export type BlockType = Block['type'];

interface BlockEditorProps {
  value: Block[];
  onChange: (blocks: Block[]) => void;
  selectedId: string | null;
  onSelectBlock: (id: string | null) => void;
}

// Helper to create default block
function createBlock(type: BlockType, colIndex?: number): Block {
  const b: Block = { id: String(Date.now()), type, props: {}, style: {}, children: [] };
  switch (type) {
    case 'heading': b.props = { level: 2, text: 'New Heading' }; break;
    case 'paragraph': b.props = { text: 'New paragraph...' }; break;
    case 'image': b.props = { src: '', alt: '' }; break;
    case 'list': b.props = { items: ['Item 1'], ordered: false }; break;
    case 'quote': b.props = { text: 'Quote...', caption: '' }; break;
    case 'code': b.props = { code: '', language: 'javascript' }; break;
    case 'table': b.props = { rows: [['A','B']] }; break;
    case 'gallery': b.props = { urls: [], columns: 3 }; break;
    case 'audio': b.props = { src: '' }; break;
    case 'video': b.props = { src: '' }; break;
    case 'grid': b.props = { columns: 2, gap: 16 }; break;
  }
  if (colIndex !== undefined) b.props._col = colIndex;
  return b;
}

export default function BlockEditor({ value, onChange, selectedId, onSelectBlock }: BlockEditorProps) {
  const [activeWidget, setActiveWidget] = useState<BlockType | null>(null);

  function handleDragStart(e: DragStartEvent) {
    const w = e.active.data.current?.widget as BlockType | undefined;
    if (w) setActiveWidget(w);
  }
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    const w = active.data.current?.widget as BlockType | undefined;
    // drop into grid
    if (w && over?.id && (over.id as string).startsWith('grid-')) {
      const [, gridId,,colStr] = (over.id as string).split('-');
      const ci = Number(colStr);
      onChange(value.map(b => b.id===gridId && b.type==='grid'
        ? { ...b, children: [...(b.children||[]), createBlock(w,ci)] }
        : b));
    }
    // drop into canvas
    else if (w) {
      onChange([...value, createBlock(w)]);
    }
    // reorder
    const { over: ro, active: ra } = e;
    if (ro && typeof ro.id==='string' && value.some(b=>b.id===ro.id) && ra.id!==ro.id) {
      const oldI = value.findIndex(b=>b.id===ra.id);
      const newI = value.findIndex(b=>b.id===ro.id);
      onChange(arrayMove(value, oldI, newI));
    }
    setActiveWidget(null);
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay>
        {activeWidget && <div className="p-2 bg-white border shadow">{activeWidget}</div>}
      </DragOverlay>

      <div className="flex h-full">
        <aside className="w-64 border-r overflow-auto">
          <WidgetPalette />
        </aside>
        <main className="flex-1 overflow-auto p-4 bg-gray-50" onClick={()=>onSelectBlock(null)}>
          <SortableContext items={value.map(b=>b.id)} strategy={verticalListSortingStrategy}>
            {value.map(block=>(
              <SortableBlock
                key={block.id}
                block={block}
                isSelected={block.id===selectedId}
                onSelect={()=>onSelectBlock(block.id)}
                onUpdate={u=>onChange(value.map(x=>x.id===u.id?u:x))}
                onDelete={()=>onChange(value.filter(x=>x.id!==block.id))}
              />
            ))}
          </SortableContext>
        </main>
      </div>
    </DndContext>
  );
}