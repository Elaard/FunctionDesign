import React, { memo } from 'react';
import './FunctionScheme.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import Bracket from '../Bracket/Bracket';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { SchemeItem } from '../../Models/SchemeItem';
import AddArgument from './AddArgument';
import { DragItem } from '../../Models/DragItem';
import FunctionBody from './FunctionBody';

interface FunctionSchemaProps {
  argument: SchemeItem;
}

function FunctionScheme({ argument }: FunctionSchemaProps) {
  const { schemeUtils, configUtils } = useSchemeContext();
  const args = schemeUtils.getArgumentsByParentId(argument.argId);

  const isStrict = configUtils.isStrict(argument.itemId);

  const onDrop = (dropped: DragItem) => {
    schemeUtils.addArgument(dropped.item, argument.argId);
  };

  const [, dropRef] = useShallowDrop([argument.type], onDrop);

  const createArgument = () => {
    schemeUtils.addEmptyArgument(argument.argId, argument.type);
  };

  return (
    <ul className="function-scheme">
      <Bracket highlight={false} bracket="(" />
      <FunctionBody args={args} />
      {!isStrict ? <AddArgument dropRef={dropRef} onClick={createArgument} /> : null}
      <Bracket highlight={false} bracket=")" />
    </ul>
  );
}

export default memo(FunctionScheme);
