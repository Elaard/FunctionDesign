import React from 'react';
import { NullableString } from '../../Models/BuiltIn';
import { ConfigItem } from '../../Models/ConfigItems';
import { SchemeItem } from '../../Models/SchemeItem';

export interface SelectWidgetProps {
  items: ConfigItem[];
  oldValue: string;
  onChange: (selected: ConfigItem) => void;
  renderWidget: (onChange: (value: NullableString) => void, value: NullableString, items?: ConfigItem[]) => JSX.Element;
  onUseAction: () => void;
}

export default function SelectWidgetContainer({ items, oldValue, onChange, onUseAction, renderWidget }: SelectWidgetProps) {
  function onSelect(selectedId: NullableString) {
    const selected = items.find((item) => item?.id === selectedId);
    if (selected) {
      onChange(selected);
      onUseAction();
    }
  }

  return renderWidget(onSelect, oldValue, items);
}
