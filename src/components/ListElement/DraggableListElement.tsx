import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableListElementProps {
  title: string;
  type: string;
  value: string;
  name: string;
}

export default function DraggableListElement({ title, type, value, name }: DraggableListElementProps) {

  const [, dragRef] = useDrag(
    () => ({
      type: 'test',
      item: {
        type,
        value,
        name
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  );

  return <li ref={dragRef} className='list-element list-element--draggable'>{title}</li>;
}
