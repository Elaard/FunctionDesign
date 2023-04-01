import React, { ReactElement } from 'react';
import DragListHeader from '../DragListHeader/DragListHeader';
import './DragList.scss';

interface DragListProps {
  title: string;
  children: Array<ReactElement<'li'>> | ReactElement<'li'> | ReactElement<'ul'>
}

export default function DragList({ children, title }: DragListProps) {
  return (
    <>
      <DragListHeader title={title} />
      <ul className='drag-list'>
        {children}
      </ul>
    </>
  );
}
