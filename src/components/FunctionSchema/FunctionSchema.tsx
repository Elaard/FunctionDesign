import React from 'react';
import './FunctionSchema.scss';
import { useDrop } from 'react-dnd';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import Bracket from '../Bracket/Bracket';
import FunctionBody from '../FunctionBody/FunctionBody';

interface FunctionSchemaProps {
  func: SchemaItem;
  args: SchemaItems;
  value: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function FunctionSchema({ value, func, args, onChange }: FunctionSchemaProps) {

  const [collection, drop] = useDrop(() => ({
    accept: ['test'],

    drop(item, monitor) {
      //to prevent event bubbling
      if (monitor.isOver()) {
        onChange({ ...item as any, parentId: func.id });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  return <div className='function-schema' ref={drop}>
    <span>{func.name}</span>
    <Bracket highlight={collection.isOverCurrent} bracket={'('} />
    <FunctionBody args={args} value={value} onChange={onChange} />
    <Bracket highlight={collection.isOverCurrent} bracket={')'} />
  </div>;
}
