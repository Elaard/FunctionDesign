import React from 'react';
import './FunctionScheme.scss';
import { useDrop } from 'react-dnd';
import { SchemeItem, Scheme } from '../../Models/SchemeItem';
import Bracket from '../Bracket/Bracket';
import FunctionBody from '../FunctionBody/FunctionBody';
import { useSchemeContext } from '../../Context/SchemeContext';
import { DragItem } from '../../Models/DragItem';
import { CollectedProps } from '../../Models/CollectedProps';
import { DragActionType } from '../../Models/DragActionType';

interface FunctionSchemaProps {
  func: SchemeItem;
  args: Scheme;
}

export default function FunctionScheme({ func, args }: FunctionSchemaProps) {

  const { addArgument } = useSchemeContext();

  const [{ isOverCurrent }, drop] = useDrop<DragItem, void, CollectedProps>(() => ({
    accept: [func.type],

    drop(item, monitor) {
      //to prevent event bubbling
      if (monitor.isOver()) {
        if (item.actionType === DragActionType.Add) {
          addArgument({ ...item.item }, func.argId);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  return <div className='function-scheme'>
    <div className={`function-scheme__body function-scheme__body--${isOverCurrent ? 'drop-cursor' : 'standard-cursor'}`}>
      <Bracket highlight={isOverCurrent} bracket={'('} />
      <FunctionBody args={args} />
      <span ref={drop}>...</span>
      <Bracket highlight={isOverCurrent} bracket={')'} />
    </div>
  </div>;
}
