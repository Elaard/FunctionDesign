import React from 'react';
import './Separator.scss';

interface SeparatorProps {
  separator: string;
}

export default function Separator({ separator }: SeparatorProps) {
  return <span className='separator separator--coma'>{separator}</span>;
}
