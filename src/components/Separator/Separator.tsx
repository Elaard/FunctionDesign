import React from 'react';
import './Separator.scss';

interface SeparatorProps {
  argsLength: number;
  argumentIndex: number;
}

export default function Separator({ argsLength, argumentIndex }: SeparatorProps) {
  const requireSeparator = argumentIndex + 1 !== argsLength;
  return requireSeparator ? <span className='separator separator--coma'>,</span> : null;
}
