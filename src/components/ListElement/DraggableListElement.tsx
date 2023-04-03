import React from 'react';
import { useDrag } from 'react-dnd';
import { DragActionType } from '../../Models/DragActionType';
import { ConfigItem } from '../../Models/ConfigItem';
import { DragItem } from '../../Models/DragItem';
import { CollectedProps } from '../../Models/CollectedProps';

interface DraggableListElementProps {
  item: ConfigItem;
}

export default function DraggableListElement({ item }: DraggableListElementProps) {

  const [, dragRef] = useDrag<DragItem, void, CollectedProps>(
    () => ({
      type: item.returnType,
      item: {
        item,
        actionType: DragActionType.Add
      },
    }),
    [item]
  );

  return <li ref={dragRef} className='list-element list-element--draggable'>{item.name}</li>;
}
