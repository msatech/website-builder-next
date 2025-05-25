'use client';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function DraggableWidget({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) {
  // This hook makes the element draggable and attaches `data.widget = type` to the drag
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `widget-${type}-${Date.now()}`,
    data: { widget: type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab select-none"
    >
      {children}
    </div>
  );
}
