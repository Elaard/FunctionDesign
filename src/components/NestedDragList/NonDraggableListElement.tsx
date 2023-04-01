import React, { ReactElement } from 'react';

interface NonDraggableListElementProps {
  children: Array<ReactElement<'li'>> | ReactElement<'li'> | ReactElement<'ul'>;
}

export default function NonDraggableListElement({ children }: NonDraggableListElementProps) {
  return <li className='list-element list-element--non-draggable' >{children}</li>;
}
