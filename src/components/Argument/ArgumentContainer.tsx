import React from 'react';
import './ArgumentContainer.scss';
import { useToggleContext } from '../../Context/ToggleContext';
import Separator from '../Separator/Separator';
import { useDrag, useDrop } from 'react-dnd';

interface ArgumentProps {
  id: string;
  argument: React.ReactElement;
  requireSeparator: boolean;
}

export default function ArgumentContainer({ id, requireSeparator, argument }: ArgumentProps) {

  const { toggleElement, isToggled } = useToggleContext();

  const [, dragRef] = useDrag(
    () => ({
      type: 'test',
      item: {
        isNew: false,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  );

  const [{ isOverCurrent }, drop] = useDrop(() => ({
    accept: ['test'],

    drop(item, monitor) {
      //to prevent event bubbling
      if (monitor.isOver()) {
        // addArgument({ ...item as any });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  function toggle(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    toggleElement(id);
  }

  return <>
    <li
      key={id + '_argument'}
      ref={dragRef}
      className={`argument-container argument-container--${isToggled(id) ? 'border-visible' : 'border-not-visible'}`}
      onClick={toggle} tabIndex={0} >
      {argument}
    </li>
    {requireSeparator ? <Separator separator={','} /> : null}
  </>;
}
