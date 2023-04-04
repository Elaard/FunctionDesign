import React, { ChangeEvent } from 'react';
import { ConfigItem } from '../../Models/ConfigItems';
import './Select.scss';

interface SelectProps {
  value: string;
  items: ConfigItem[];
  onChange: (selected: string) => void;
}

export default function Select({ items, value, onChange }: SelectProps) {

  function onSelect(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return <select value={value} onChange={onSelect} className='select-widget'>
    {
      items.map((item) => {
        return <option key={item.id} value={item.id} >{item.name}</option>;
      })
    }
  </select>;
}
