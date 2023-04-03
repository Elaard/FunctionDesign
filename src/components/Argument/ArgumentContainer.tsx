import React, { DetailedHTMLProps, LiHTMLAttributes, useEffect } from 'react';
import './ArgumentContainer.scss';
import { useToggleContext } from '../../Context/ToggleContext';
import { useToggle } from '../../Hooks/useToggle';

interface ArgumentProps {
  id: string;
  children: React.ReactElement;
}

export default function ArgumentContainer({ id, children }: ArgumentProps) {

  const [toggle, setToggle] = useToggle();

  const { toggleRef } = useToggleContext();

  useEffect(() => {
    toggleRef.current[id] = toggle;
  }, [id, toggleRef, toggle]);

  function toggleOnCurrentElement(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    setToggle();
  }

  function onCatchKey(event: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
    if (event.key === 'Delete') {
      console.log('usun suke');
    }
  }



  return <li
    key={id + '_argument'}
    className={`argument-container argument-container--${toggle ? 'border-visible' : 'border-not-visible'}`}
    onClick={toggleOnCurrentElement} onKeyDown={onCatchKey} tabIndex={0} >
    {children}
  </li>;
}
