import React from 'react';
import './FunctionSchemeContainer.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import WidgetFactory from '../WidgetFactory/WidgetFactory';
import Bracket from '../Bracket/Bracket';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { SchemeItem } from '../../Models/SchemeItem';
import AddArgument from './AddArgument';
import { DragItem } from '../../Models/DragItem';
import FunctionBody from './FunctionBody';
import { SchemeUtils } from '../../Utils/SchemeUtils';

interface FunctionSchemaProps {
  argument: SchemeItem;
}

export default function FunctionSchemeContainer({ argument }: FunctionSchemaProps) {
  const { getFunctionArguments, addArgument, addEmptyArgument } = useSchemeContext();
  const args = getFunctionArguments(argument.argId);

  const onDrop = (dropped: DragItem) => {
    addArgument(dropped.item, argument.argId);
  };

  const [, dropRef] = useShallowDrop([argument.type], onDrop);

  const createArgument = () => {
    addEmptyArgument(argument.argId, argument.type);
  };

  return (
    <ul className="function-schema">
      <Bracket highlight={false} bracket="(" />
      <FunctionBody args={args} />
      <AddArgument dropRef={dropRef} onClick={createArgument} />
      <Bracket highlight={false} bracket=")" />
    </ul>
  );
}