import React from 'react';
import DragList from '../DragList/DragList';
import NonDraggableListElement from './NonDraggableListElement';

interface NestedDragListProps {
  children: any;
  title: string;
}

export default function NestedDragList({ children, title }: NestedDragListProps) {
  return (
    <NonDraggableListElement>
      <DragList title={title}>
        {children}
      </DragList>
    </NonDraggableListElement>
  );
}
