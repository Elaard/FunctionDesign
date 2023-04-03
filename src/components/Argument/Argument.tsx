import React from 'react';

interface ArgumentProps {
  id: string;
  children: React.ReactElement;
}

export default function Argument({ id, children }: ArgumentProps) {
  return <li key={id + 'key'} style={{ 'display': 'inline-block' }}>
    {children}
  </li>;
}
