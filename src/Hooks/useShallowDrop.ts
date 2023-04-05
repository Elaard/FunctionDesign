import { ConnectDropTarget, useDrop } from 'react-dnd';
import { DragItem } from '../Models/DragItem';
import { CollectedProps } from '../Models/CollectedProps';

export function useShallowDrop(
  acceptTypes: string[],
  action: (item: DragItem) => void,
  canDrop?: (item: DragItem) => boolean,
): [CollectedProps, ConnectDropTarget] {
  const [collection, drop] = useDrop<DragItem, void, CollectedProps>(() => ({
    accept: acceptTypes,

    drop(item, monitor) {
      //to prevent event bubbling
      if (monitor.isOver()) {
        action(item);
      }
    },
    canDrop: canDrop,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));
  return [collection, drop];
}
