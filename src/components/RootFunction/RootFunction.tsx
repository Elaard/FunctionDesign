import React from 'react';
import './RootFunction.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import { DragItem } from '../../Models/DragItem';
import WidgetFactoryContainer from '../WidgetFactory/WidgetFactoryContainer';
import AddArgument from '../FunctionSchema/AddArgument';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { FuncItem } from '../../Models/ConfigItem';

export default function RootFunction() {
  const { schemeUtils, configUtils } = useSchemeContext();

  const canDrop = (draggItem: DragItem) => {
    return draggItem.item.source === 'func';
  };

  const acceptedDropTypes = configUtils.getTypesBySource('func');

  const onAddRoot = () => {};

  const onDrop = (droppedItem: DragItem) => {
    schemeUtils.addRoot(droppedItem.item as FuncItem);
  };

  const [, dropRef] = useShallowDrop(acceptedDropTypes, onDrop, canDrop);

  const argument = schemeUtils.getArgumentByArgId('root');
  return (
    <ul className="root-function">
      {argument ? (
        <WidgetFactoryContainer argument={argument} canDrop={canDrop} acceptedDropTypes={acceptedDropTypes} />
      ) : (
        <AddArgument dropRef={dropRef} onClick={onAddRoot} />
      )}
    </ul>
  );
}
