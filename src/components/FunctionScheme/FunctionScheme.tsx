import React from 'react';
import './FunctionScheme.scss';
import { useDrop } from 'react-dnd';
import { SchemeItem, Scheme } from '../../Models/SchemeItem';
import Bracket from '../Bracket/Bracket';
import FunctionBody from '../FunctionBody/FunctionBody';
import { useSchemeContext } from '../../Context/SchemeContext';

interface FunctionSchemaProps {
  func: SchemeItem;
  args: Scheme;
}

export default function FunctionScheme({ func, args }: FunctionSchemaProps) {

  const { addArgument } = useSchemeContext();

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

  return <div className='function-scheme'>
    <span>{func.name}</span>
    <div ref={drop} className='function-scheme__body'>
      <Bracket highlight={isOverCurrent} bracket={'('} />
      <FunctionBody args={args} />
      <Bracket highlight={isOverCurrent} bracket={')'} />
    </div>
  </div>;
}
