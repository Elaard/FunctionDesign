import React from 'react';
import './RootFunction.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import { DragItem } from '../../Models/DragItem';
import { argumentUtils } from '../../Utils/ArgumentUtils';
import WidgetFactoryContainer from '../WidgetFactory/WidgetFactoryContainer';

export default function RootFunction() {
  const { schemeUtils, configUtils } = useSchemeContext();

  const canDrop = (draggItem: DragItem) => {
    return argumentUtils.whetherSourceIsFunction(draggItem.item);
  };

  const argument = schemeUtils.getArgumentByArgId('root');
  return (
    <ul className="root-function">
      {argument ? <WidgetFactoryContainer argument={argument} canDrop={canDrop} acceptedDropTypes={configUtils.getTypesBySource('func')} /> : null}
    </ul>
  );
}
