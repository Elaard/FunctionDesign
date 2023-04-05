import React from 'react';
import { ConnectDropTarget } from 'react-dnd';
import './AddArgument.scss';

interface AddArgumentProps {
  dropRef: ConnectDropTarget;
  onClick: () => void;
}

export default function AddArgument({ dropRef, onClick }: AddArgumentProps) {
  return (
    <span ref={dropRef} onClick={onClick} className="add-argument">
      ...
    </span>
  );
}
