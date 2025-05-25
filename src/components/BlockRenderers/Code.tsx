'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CodeBlock({ code, language, onChange, readOnly }: { code:string; language:string; onChange?: (c:string,lang:string)=>void; readOnly:boolean }) {
  return readOnly ? <pre><code className={language}>{code}</code></pre> : (
    <div>
      <Input value={language} onChange={e=>onChange?.(code,e.target.value)} placeholder="Language" />
      <Textarea value={code} onChange={e=>onChange?.(e.target.value,language)} placeholder="Code..." />
    </div>
  );
}