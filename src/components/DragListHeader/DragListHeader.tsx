import React from 'react';

interface DragListHeaderProps {
  title: string;
}

export default function DragListHeader({ title }: DragListHeaderProps) {
  return <h3>{title}</h3>;
}
