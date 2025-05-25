'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table';

interface PageRecord {
  id: string;
  title: string;
  slug: string;
  status: string;
}

export default function PageList() {
  const [pages, setPages] = useState<PageRecord[]>([]);

  useEffect(() => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(setPages)
      .catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link href="/admin/pages/new"><Button>Create New Page</Button></Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.slug}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell className="space-x-2">
                <Link href={`/admin/pages/${p.id}`}><Button size="sm">Edit</Button></Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={async () => {
                    await fetch(`/api/pages/${p.id}`, { method: 'DELETE' });
                    setPages(prev => prev.filter(x => x.id !== p.id));
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}