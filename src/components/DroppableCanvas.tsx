// src/components/DroppableCanvas.tsx
'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableCanvasProps {
  children: React.ReactNode;
  onClickEmpty: () => void;
}

export default function DroppableCanvas({ children, onClickEmpty }: DroppableCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-zone' });
  return (
    <main
      ref={setNodeRef}
      id="canvas-zone"
      className={`flex-1 overflow-auto p-6 bg-gray-50 ${isOver ? 'bg-gray-100' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClickEmpty();
      }}
    >
      {children}
    </main>
  );
}
