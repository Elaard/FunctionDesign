import React from 'react';
import './ArgumentContainer.scss';
import { useToggleContext } from '../../Context/ToggleContext';
import Separator from '../Separator/Separator';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { SchemeItem } from '../../Models/SchemeItem';
import { DragItem } from '../../Models/DragItem';
import { CollectedProps } from '../../Models/CollectedProps';
import { DragActionType } from '../../Models/DragActionType';
import { useSchemeContext } from '../../Context/SchemeContext';

interface ArgumentProps {
  render: (dropRef: ConnectDropTarget) => JSX.Element | null;
  argument: SchemeItem;
  requireSeparator: boolean;
}

export default function ArgumentContainer({ requireSeparator, argument, render }: ArgumentProps) {

  const { replaceArgument } = useSchemeContext();
  const { toggleElement, isToggled } = useToggleContext();


  const [{ isOverCurrent }, drop] = useDrop<DragItem, void, CollectedProps>(() => ({
    accept: ['number'],

    drop(item, monitor) {
      //to prevent event bubbling
      if (monitor.isOver()) {
        if (item.actionType === DragActionType.Add) {
          replaceArgument(item.item, argument.argId);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  function toggle(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    toggleElement(argument.argId);
  }

  return <>
    <li
      key={argument.argId + '_argument'}
      className={
        `argument-container--${isOverCurrent ? 'border-underline-visible' : 'border-underline-not-visible'}
         argument-container argument-container--${isToggled(argument.argId) ? 'border-visible' : 'border-not-visible'}`
      }
      onClick={toggle} tabIndex={0} >
      {render(drop)}
    </li>
    {requireSeparator ? <Separator separator={','} /> : null}
  </>;
}
