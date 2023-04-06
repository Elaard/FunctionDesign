import React from 'react';
import { SelectWidgetProps } from '../../Models/WidgetProps';

export default function SelectWidgetContainer({ items, oldValue, onChange, onUseAction, renderWidget }: SelectWidgetProps) {
  function onSelect(selectedId: string) {
    const selected = items.find((item) => item?.id === selectedId);
    if (selected) {
      onChange(selected);
      onUseAction();
    }
  }

  return renderWidget(onSelect, oldValue, items);
}
