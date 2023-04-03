import React from 'react';
import './ArgumentContainer.scss';
import { useToggleContext } from '../../Context/ToggleContext';

interface ArgumentProps {
  id: string;
  children: React.ReactElement;
}

export default function ArgumentContainer({ id, children }: ArgumentProps) {

  const { toggleElement, isToggled } = useToggleContext();

  function toggle(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    toggleElement(id);
  }

  return <li
    key={id + '_argument'}
    className={`argument-container argument-container--${isToggled(id) ? 'border-visible' : 'border-not-visible'}`}
    onClick={toggle} tabIndex={0} >
    {children}
  </li>;
}
