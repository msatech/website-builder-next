// src/components/SettingsPanel.tsx
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import type { Block } from '@/components/BlockEditor';
import { Label } from '@radix-ui/react-select';

interface SettingsPanelProps {
  selectedBlock: Block | null;
  onUpdate: (block: Block) => void;
}

export default function SettingsPanel({ selectedBlock, onUpdate }: SettingsPanelProps) {
  if (!selectedBlock) {
    return <p className="text-gray-500">Select a block to configure its settings.</p>;
  }

  const { type, props, style = {} } = selectedBlock;

  const applyStyle = (updates: Partial<Block['style']>) => {
    onUpdate({ ...selectedBlock, style: { ...style, ...updates } });
  };

  const applyProps = (updates: Partial<Block['props']>) => {
    onUpdate({ ...selectedBlock, props: { ...props, ...updates } });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Block Settings</h3>

      {/* Margin */}
      <div>
        <label className="block font-medium mb-1">Margin (px)</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input
            type="number"
            placeholder="Top"
            value={String(style.marginTop ?? 0)}
            onChange={e => applyStyle({ marginTop: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Right"
            value={String(style.marginRight ?? 0)}
            onChange={e => applyStyle({ marginRight: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Bottom"
            value={String(style.marginBottom ?? 0)}
            onChange={e => applyStyle({ marginBottom: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Left"
            value={String(style.marginLeft ?? 0)}
            onChange={e => applyStyle({ marginLeft: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block font-medium mb-1">Padding (px)</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input
            type="number"
            placeholder="Top"
            value={String(style.paddingTop ?? 0)}
            onChange={e => applyStyle({ paddingTop: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Right"
            value={String(style.paddingRight ?? 0)}
            onChange={e => applyStyle({ paddingRight: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Bottom"
            value={String(style.paddingBottom ?? 0)}
            onChange={e => applyStyle({ paddingBottom: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Left"
            value={String(style.paddingLeft ?? 0)}
            onChange={e => applyStyle({ paddingLeft: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block font-medium mb-1">Background Color</label>
        <Input
          type="color"
          value={style.bgColor ?? '#ffffff'}
          onChange={e => applyStyle({ bgColor: e.target.value })}
        />
      </div>

      {/* Typography or Image options */}
      {type === 'heading' || type === 'paragraph' ? (
        <>
          <div>
            <label className="block font-medium mb-1">Font Size</label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                type="number"
                value={style.fontSize ?? ''}
                onChange={e => applyStyle({ fontSize: Number(e.target.value) })}
                className="w-16"
              />
              <select
                value={style.fontSizeUnit || 'px'}
                onChange={e => applyStyle({ fontSizeUnit: e.target.value })}
                className="p-1 border rounded"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Text Color</label>
            <Input
              type="color"
              value={style.textColor ?? '#000000'}
              onChange={e => applyStyle({ textColor: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Font Weight</label>
            <select
              value={style.fontWeight ?? 'normal'}
              onChange={e => applyStyle({ fontWeight: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Light</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block font-medium mb-1">Border Radius</label>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                type="number"
                value={style.borderRadius ?? ''}
                onChange={e => applyStyle({ borderRadius: Number(e.target.value) })}
                className="w-16"
              />
              <select
                value={style.borderRadiusUnit || 'px'}
                onChange={e => applyStyle({ borderRadiusUnit: e.target.value })}
                className="p-1 border rounded"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Object Fit</label>
            <select
              value={style.objectFit ?? 'cover'}
              onChange={e => applyStyle({ objectFit: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
            </select>
          </div>
        </>
      )}
      {/* Grid-specific settings */}
      {type === 'grid' && (
        <>
          <div>
            <Label>Columns</Label>
            <Input
              type="number"
              value={String(props.columns)}
              onChange={e => applyProps({ columns: Number(e.target.value) })}
              className="mt-1 w-20"
            />
          </div>
          <div>
            <Label>Horizontal Gap (px)</Label>
            <Input
              type="number"
              value={String(style.gapX ?? 0)}
              onChange={e => applyStyle({ gapX: Number(e.target.value) })}
              className="mt-1 w-20"
            />
          </div>
          <div>
            <Label>Vertical Gap (px)</Label>
            <Input
              type="number"
              value={String(style.gapY ?? 0)}
              onChange={e => applyStyle({ gapY: Number(e.target.value) })}
              className="mt-1 w-20"
            />
          </div>
        </>
      )}
      
    </div>
  );
}