import React from 'react';
import { WidgetProps } from '../../Models/WidgetProps';

export default function VanillaInput({ value, onChange }: WidgetProps) {
  return <input value={value} onChange={(e) => onChange(e?.target.value)} />;
}
