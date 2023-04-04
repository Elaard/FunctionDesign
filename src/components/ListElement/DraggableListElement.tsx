import React from 'react';
import { useDrag } from 'react-dnd';
import { DragActionType } from '../../Models/DragActionType';
import { DragItem } from '../../Models/DragItem';
import { CollectedProps } from '../../Models/CollectedProps';
import { SimpleItem } from '../../Models/SimpleItem';

interface DraggableListElementProps {
  item: SimpleItem;
}

export default function DraggableListElement({ item }: DraggableListElementProps) {

  const [, dragRef] = useDrag<DragItem, void, CollectedProps>(
    () => ({
      type: item.argumentType,
      item: {
        item,
        actionType: DragActionType.Add
      },
    }),
    [item]
  );

  return <li ref={dragRef} className='list-element list-element--draggable'>{item.name}</li>;
}
