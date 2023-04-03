import React from 'react';
import './ArgumentContainer.scss';
import { useToggleContext } from '../../Context/ToggleContext';
import Separator from '../Separator/Separator';

interface ArgumentProps {
  id: string;
  argument: React.ReactElement;
  requireSeparator: boolean;
}

export default function ArgumentContainer({ id, requireSeparator, argument }: ArgumentProps) {

  const { toggleElement, isToggled } = useToggleContext();

  function toggle(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    toggleElement(id);
  }

  return <>
    <li
      key={id + '_argument'}
      className={`argument-container argument-container--${isToggled(id) ? 'border-visible' : 'border-not-visible'}`}
      onClick={toggle} tabIndex={0} >
      {argument}
    </li>
    {requireSeparator ? <Separator separator={','} /> : null}
  </>;
}
