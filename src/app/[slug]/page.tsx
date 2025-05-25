import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function PublicPage({ params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({ where: { slug: params.slug } });
  if (!page || page.status !== 'published') notFound();

  // Include style when parsing
  interface Block { type: string; props: any; style?: Record<string, any>; }
  let blocks: Block[] = [];
  try {
    blocks = page.blocks ? JSON.parse(page.blocks) : [];
  } catch {
    blocks = [];
  }

  return (
    <article className="mx-auto p-8">
      <h1 className="mb-4 text-3xl font-bold">{page.title}</h1>
      {blocks.map((blk, i) => {
        const s: React.CSSProperties = {
          marginTop: blk.style?.marginTop != null ? `${blk.style.marginTop}px` : undefined,
          marginRight: blk.style?.marginRight != null ? `${blk.style.marginRight}px` : undefined,
          marginBottom: blk.style?.marginBottom != null ? `${blk.style.marginBottom}px` : undefined,
          marginLeft: blk.style?.marginLeft != null ? `${blk.style.marginLeft}px` : undefined,
          paddingTop: blk.style?.paddingTop != null ? `${blk.style.paddingTop}px` : undefined,
          paddingRight: blk.style?.paddingRight != null ? `${blk.style.paddingRight}px` : undefined,
          paddingBottom: blk.style?.paddingBottom != null ? `${blk.style.paddingBottom}px` : undefined,
          paddingLeft: blk.style?.paddingLeft != null ? `${blk.style.paddingLeft}px` : undefined,
          backgroundColor: blk.style?.bgColor,
          color: blk.style?.textColor,
          fontSize:
            blk.style?.fontSize != null
              ? `${blk.style.fontSize}${blk.style.fontSizeUnit || 'px'}`
              : undefined,
          fontWeight: blk.style?.fontWeight,
          borderRadius:
            blk.style?.borderRadius != null
              ? `${blk.style.borderRadius}${blk.style.borderRadiusUnit || 'px'}`
              : undefined,
          objectFit: blk.style?.objectFit as any,
        };

        switch (blk.type) {
          case 'heading':
            return (
              <h2 key={i} style={s}>
                {blk.props.text}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={i} style={s}>
                {blk.props.text}
              </p>
            );
          case 'image':
            return (
              <img
                key={i}
                src={blk.props.src}
                alt={blk.props.alt || ''}
                style={s}
                className="max-w-full"
              />
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
