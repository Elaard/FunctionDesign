import React from 'react';
import { ConnectDropTarget } from 'react-dnd';

interface AddArgumentProps {
  dropRef: ConnectDropTarget;
}

export default function AddArgument({ dropRef }: AddArgumentProps) {
  return <span ref={dropRef}>...</span>;
}
