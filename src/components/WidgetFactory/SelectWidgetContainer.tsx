import React from 'react';
import { SelectWidgetProps } from '../../Models/WidgetProps';

export default function SelectWidgetContainer({ items, argument, onChange, Widget }: SelectWidgetProps) {
  function onSelect(selectedId: string) {
    const selected = items.find((item) => item?.id === selectedId);
    if (selected) {
      onChange(selected);
    }
  }

  return <Widget value={argument?.id} items={items} onChange={onSelect} />;
}
