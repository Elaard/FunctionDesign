import React from 'react';
import './FunctionSchema.scss';
import { useDrop } from 'react-dnd';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import LeftBracket from '../Bracket/LeftBracket';
import RightBracket from '../Bracket/RightBracket';
import FunctionBody from '../FunctionBody/FunctionBody';

interface FunctionSchemaProps {
  func: SchemaItem;
  args: SchemaItems;
  value: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function FunctionSchema({ value, func, args, onChange }: FunctionSchemaProps) {
  const [, drop] = useDrop(() => ({
    accept: ['test'],

    drop(item) {
      onChange({ ...item as any, parentId: func.id });
    },
  }));

  return <div className='function-schema' ref={drop}>
    <span>{func.name}</span>
    <LeftBracket />
    <FunctionBody args={args} value={value} onChange={onChange} />
    <RightBracket />
  </div>;
}
