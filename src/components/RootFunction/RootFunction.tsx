import React from 'react';
import './RootFunction.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import WidgetFactory from '../WidgetFactory/WidgetFactory';
import { DragItem } from '../../Models/DragItem';

export default function RootFunction() {
  const { getArgumentByArgId, getAllTypes } = useSchemeContext();

  const canDrop = (draggItem: DragItem) => {
    return draggItem.item.source === 'func';
  };

  const argument = getArgumentByArgId('root');
  return (
    <ul className="root-function">{argument ? <WidgetFactory argument={argument} canDrop={canDrop} acceptedDropTypes={getAllTypes()} /> : null}</ul>
  );
}
