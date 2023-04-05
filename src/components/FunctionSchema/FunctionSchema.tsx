import React from 'react';
import './FunctionSchema.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import WidgetFactory from '../WidgetFactory/WidgetFactory';
import Bracket from '../Bracket/Bracket';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { SchemeItem } from '../../Models/SchemeItem';
import AddArgument from './AddArgument';
import { DragItem } from '../../Models/DragItem';
import FunctionBody from './FunctionBody';

interface FunctionSchemaProps {
  argument: SchemeItem;
}

export default function FunctionSchema({ argument }: FunctionSchemaProps) {
  const { getFunctionArguments, addArgument } = useSchemeContext();
  const args = getFunctionArguments(argument.argId);

  const onDrop = (dropped: DragItem) => {
    addArgument(dropped.item, argument.argId);
  };

  const [, dropRef] = useShallowDrop([argument.type], onDrop);

  return (
    <ul className="function-schema">
      <Bracket highlight={false} bracket="(" />
      <FunctionBody args={args} />
      <AddArgument dropRef={dropRef} />
      <Bracket highlight={false} bracket=")" />
    </ul>
  );
}
