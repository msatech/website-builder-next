'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

// rows: array of CSV lines
export default function TableBlock({ rows, onChange, readOnly }: { rows:string[][]; onChange?: (r:string[][])=>void; readOnly:boolean }) {
  return readOnly ? (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <tbody>
        {rows.map((r,ri)=><tr key={ri}>{r.map((c,ci)=><td key={ci} className="border p-1">{c}</td>)}</tr>)}
      </tbody>
    </table>
  ) : (
    <Textarea value={rows.map(r=>r.join(',')).join('\n')} onChange={e=>onChange?.(e.target.value.split('\n').map(l=>l.split(',')))} placeholder="CSV rows..." />
  );
}