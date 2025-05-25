// src/components/BlockRenderers/Grid.tsx
'use client';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import SortableBlock from './SortableBlock';
import type { Block } from '@/components/BlockEditor';

interface GridProps{block:Block&{props:{columns:number;gap:number};children?:Block[]};isSelected:boolean;onSelect:()=>void;onUpdate:(b:Block)=>void;onDelete:()=>void;}
export default function GridBlock({block,children=[],isSelected,onSelect,onUpdate,onDelete}:GridProps){
  const{columns,gap}=block.props;
  return(
    <div style={{display:'grid',gridTemplateColumns:`repeat(${columns},1fr)`,gap:`${gap}px`,padding:'8px',border:isSelected?'2px solid #6366F1':'1px solid #ddd'}} onClick={e=>{e.stopPropagation();onSelect();}}>
      {Array.from({length:columns}).map((_,i)=>{
        const id=`grid-${block.id}-col-${i}`;
        const{setNodeRef,isOver}=useDroppable({id});
        return(
          <div key={i} ref={setNodeRef} style={{minHeight:'80px',padding:'4px',border:isOver?'2px dashed #6366F1':'1px dashed #ccc'}} onClick={e=>e.stopPropagation()}>
            {children.filter(c=>c.props._col===i).map(c=>(
              <SortableBlock key={c.id} block={c} isSelected={false} onSelect={()=>{}} onUpdate={updated=>onUpdate(updated)} onDelete={()=>onDelete()}/>
            ))}
          </div>
        );
      })}
    </div>
  );
}
