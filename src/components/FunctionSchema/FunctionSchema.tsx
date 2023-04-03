import React from 'react';
import './FunctionSchema.scss';
import { useDrop } from 'react-dnd';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import Bracket from '../Bracket/Bracket';
import FunctionBody from '../FunctionBody/FunctionBody';

interface FunctionSchemaProps {
  func: SchemaItem;
  args: SchemaItems;
  schema: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function FunctionSchema({ schema, func, args, onChange }: FunctionSchemaProps) {

  const [{ isOverCurrent }, drop] = useDrop(() => ({
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

  return <div className='function-schema'>
    <span>{func.name}</span>
    <div ref={drop} className='function-schema__body'>
      <Bracket highlight={isOverCurrent} bracket={'('} />
      <FunctionBody args={args} schema={schema} onChange={onChange} />
      <Bracket highlight={isOverCurrent} bracket={')'} />
    </div>
  </div>;
}
