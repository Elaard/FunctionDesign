import React from 'react';

interface ArgumentProps {
  id: string;
  argument: React.ReactElement;
}

export default function Argument({ id, argument }: ArgumentProps) {
  return <li key={id + 'key'} style={{ 'display': 'inline-block' }}>
    {argument}
  </li>;
}
