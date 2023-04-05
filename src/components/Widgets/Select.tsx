import React, { ChangeEvent } from 'react';
import { WidgetProps } from '../../Models/WidgetProps';
import './Select.scss';


export default function Select({ items, value, onChange }: WidgetProps) {

  function onSelect(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return <select value={value} onChange={onSelect} className='select-widget'>
    {
      items && items.map((item) => {
        return <option key={item.id} value={item.id} >{item.name}</option>;
      })
    }
  </select>;
}
