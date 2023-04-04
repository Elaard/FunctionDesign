import React from 'react';
import { WidgetProps } from '../../Models/WidgetProps';
import Select from '../VanillaJs/Select';

export default function FieldWidget({ value, items, onChange }: WidgetProps) {
  return <Select value={value.id} items={items} onChange={onChange} />;
}
