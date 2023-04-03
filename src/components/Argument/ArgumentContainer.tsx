import React from 'react';
import './ArgumentContainer.scss';
import ArgumentActions from '../ArgumentActions/ArgumentActions';
import { useToggle } from '../../Hooks/useToggle';

interface ArgumentProps {
  id: string;
  children: React.ReactElement;
}

export default function ArgumentContainer({ id, children }: ArgumentProps) {

  const [toggle, setToggle] = useToggle();

  function toggleOnCurrentElement(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    setToggle();
  }

  return <>
    <li key={id + '_argument'} className='argument-container' onClick={toggleOnCurrentElement} >
      {children}
      <div className={`argument-container__actions argument-container__actions--${toggle ? 'visible' : 'hidden'}`} >
        <ArgumentActions />
      </div>
    </li>
  </>;
}
