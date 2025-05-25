// src/components/WidgetPalette.tsx
'use client';

import React, { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import DraggableWidget from './DraggableWidget';
import type { BlockType } from './BlockEditor';

import {
  Type as HeadingIcon,
  AlignLeft as ParagraphIcon,
  Image as ImageIcon,
  List as ListIcon,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Table as TableIcon,
  GalleryHorizontal as GalleryIcon,
  Music as AudioIcon,
  Video as VideoIcon,
  LayoutGrid as GridIcon,     // ⬅️ fix here
} from 'lucide-react';

const WIDGET_CATEGORIES: Record<string, BlockType[]> = {
  Text: ['heading', 'paragraph', 'list', 'quote', 'code', 'table'],
  Media: ['image', 'gallery', 'audio', 'video'],
  Layout: ['grid'],
};

const ICON_MAP: Record<BlockType, React.ReactNode> = {
  heading: <HeadingIcon size={20} />,
  paragraph: <ParagraphIcon size={20} />,
  image: <ImageIcon size={20} />,
  list: <ListIcon size={20} />,
  quote: <QuoteIcon size={20} />,
  code: <CodeIcon size={20} />,
  table: <TableIcon size={20} />,
  gallery: <GalleryIcon size={20} />,
  audio: <AudioIcon size={20} />,
  video: <VideoIcon size={20} />,
  grid: <GridIcon size={20} />,  // now valid
};

export default function WidgetPalette() {
  const [search, setSearch] = useState('');

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="p-4">
        <Input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Tabs: Blocks / Patterns */}
      <Tabs defaultValue="blocks" className="flex-1 overflow-auto">
        <TabsList>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        {/* Blocks Tab */}
        <TabsContent value="blocks" className="p-2 space-y-4">
          {Object.entries(WIDGET_CATEGORIES).map(([category, types]) => (
            <Accordion
              key={category}
              type="single"
              collapsible
              defaultValue={category}
            >
              <AccordionItem value={category}>
                <AccordionTrigger>{category}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2">
                    {types
                      .filter((t) => t.includes(search.toLowerCase()))
                      .map((type) => (
                        <DraggableWidget key={type} type={type}>
                          <Card className="p-3 hover:bg-gray-50 flex items-center space-x-2">
                            {ICON_MAP[type]}
                            <span className="capitalize">{type}</span>
                          </Card>
                        </DraggableWidget>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </TabsContent>

        {/* Patterns Tab */}
        <TabsContent value="patterns" className="p-4 text-sm text-gray-500">
          No patterns defined yet.
        </TabsContent>
      </Tabs>
    </div>
  );
}
