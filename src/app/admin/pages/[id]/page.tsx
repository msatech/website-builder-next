'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import WidgetPalette from '@/components/WidgetPalette';
import SortableBlock from '@/components/BlockRenderers/SortableBlock';
import SettingsPanel from '@/components/SettingsPanel';
import DroppableCanvas from '@/components/DroppableCanvas';
import type { Block, BlockType } from '@/components/BlockEditor';

export default function AdminPageForm() {
  const router = useRouter();
  const { id } = useParams();
  const isNew = id === 'new';

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeWidget, setActiveWidget] = useState<BlockType | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/pages/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setTitle(data.title);
          setSlug(data.slug);
          try {
            setBlocks(JSON.parse(data.blocks));
          } catch {
            setBlocks([]);
          }
        });
    }
  }, [id, isNew]);

  function createBlock(type: BlockType, colIndex?: number): Block {
    const b: Block = {
      id: String(Date.now()),
      type,
      props: {},
      style: {},
      children: [],
    };
    if (colIndex !== undefined) b.props._col = colIndex;

    switch (type) {
      case 'heading': b.props = { level: 2, text: 'Heading' }; break;
      case 'paragraph': b.props = { text: 'Paragraph...' }; break;
      case 'image': b.props = { src: '', alt: '' }; break;
      case 'list': b.props = { items: ['Item 1'], ordered: false }; break;
      case 'quote': b.props = { text: 'Quote...', caption: '' }; break;
      case 'code': b.props = { code: '', language: 'javascript' }; break;
      case 'table': b.props = { rows: [['A', 'B']] }; break;
      case 'gallery': b.props = { urls: [], columns: 3 }; break;
      case 'audio': b.props = { src: '' }; break;
      case 'video': b.props = { src: '' }; break;
      case 'grid': b.props = { columns: 2, gap: 16 }; break;
    }
    return b;
  }

  function handleDragStart(e: DragStartEvent) {
    const w = e.active.data.current?.widget as BlockType | undefined;
    setActiveWidget(w || null);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (blocks.some(b => b.id === active.id)) {
      if (
        over?.id &&
        typeof over.id === 'string' &&
        blocks.some(b => b.id === over.id) &&
        active.id !== over.id
      ) {
        setBlocks(bs =>
          arrayMove(
            bs,
            bs.findIndex(b => b.id === active.id),
            bs.findIndex(b => b.id === over.id)
          )
        );
      }
      setActiveWidget(null);
      return;
    }

    const widget = activeWidget;
    if (!widget) {
      setActiveWidget(null);
      return;
    }

    if (over?.id?.startsWith('grid-')) {
      const [, gridId, , colStr] = over.id.split('-');
      const ci = Number(colStr);
      setBlocks(bs =>
        bs.map(b =>
          b.id === gridId && b.type === 'grid'
            ? { ...b, children: [...(b.children || []), createBlock(widget, ci)] }
            : b
        )
      );
    } else {
      setBlocks(bs => [...bs, createBlock(widget)]);
    }

    setActiveWidget(null);
  }

  async function save(status: 'draft' | 'published') {
    await fetch(isNew ? '/api/pages' : `/api/pages/${id}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        status,
        blocks: JSON.stringify(blocks),
        meta: '{}',
      }),
    });
    router.push('/admin/pages');
  }

  const selectedBlock = blocks.find(b => b.id === selectedId) || null;

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          <ArrowRight onClick={() => router.forward()} className="cursor-pointer" />
          <div className="flex flex-col">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" />
            <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="page-slug" className="text-sm mt-1" />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm"><Share2 size={16} /></Button>
          <Button variant="outline" size="sm" onClick={() => save('draft')}>Save Draft</Button>
          <Button size="sm" onClick={() => save('published')}>Publish</Button>
        </div>
      </header>

      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DragOverlay>
          {activeWidget && <div className="p-2 bg-white border shadow">{activeWidget}</div>}
        </DragOverlay>

        <div className="flex flex-1 overflow-hidden">
          <WidgetPalette />

          <DroppableCanvas onClickEmpty={() => setSelectedId(null)}>
            <SortableContext
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map(block => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  isSelected={block.id === selectedId}
                  onSelect={() => setSelectedId(block.id)}
                  onUpdate={u => {
                    setBlocks(bs => {
                      const idx = bs.findIndex(x => x.id === u.id);
                      if (idx === -1) return bs;
                      if (JSON.stringify(bs[idx]) === JSON.stringify(u)) return bs;
                      const copy = [...bs];
                      copy[idx] = u;
                      return copy;
                    });
                  }}
                  onDelete={() =>
                    setBlocks(bs => bs.filter(x => x.id !== block.id))
                  }
                />
              ))}
            </SortableContext>
          </DroppableCanvas>

          <aside className="w-72 border-l bg-white overflow-auto p-6">
            <SettingsPanel
              selectedBlock={selectedBlock}
              onUpdate={u => {
                setBlocks(bs => {
                  const idx = bs.findIndex(x => x.id === u.id);
                  if (idx === -1) return bs;
                  if (JSON.stringify(bs[idx]) === JSON.stringify(u)) return bs;
                  const copy = [...bs];
                  copy[idx] = u;
                  return copy;
                });
              }}
            />
          </aside>
        </div>
      </DndContext>
    </div>
  );
}
