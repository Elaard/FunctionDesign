import React from 'react';
import './FunctionSchema.scss';
import { useDrop } from 'react-dnd';
import { SchemaItem, Schema } from '../../Models/SchemaItem';
import Bracket from '../Bracket/Bracket';
import FunctionBody from '../FunctionBody/FunctionBody';
import { useSchemaContext } from '../../Context/SchemaContext';

interface FunctionSchemaProps {
  func: SchemaItem;
  args: Schema;
  schema: Schema;
}

export default function FunctionSchema({ schema, func, args }: FunctionSchemaProps) {

  const { addArgument } = useSchemaContext();

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: ['test'],

    drop(item, monitor) {
      //to prevent event bubbling
      if (monitor.isOver()) {
        addArgument({ ...item as any, parentId: func.id });
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
      <FunctionBody args={args} schema={schema} />
      <Bracket highlight={isOverCurrent} bracket={')'} />
    </div>
  </div>;
}
