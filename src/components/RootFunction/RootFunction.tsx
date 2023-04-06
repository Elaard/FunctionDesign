import React from 'react';
import './RootFunction.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import WidgetFactory from '../WidgetFactory/WidgetFactory';
import { DragItem } from '../../Models/DragItem';
import { argumentUtils } from '../../Utils/ArgumentUtils';

export default function RootFunction() {
  const { schemeUtils, configUtils } = useSchemeContext();

  const canDrop = (draggItem: DragItem) => {
    return argumentUtils.whetherSourceIsFunction(draggItem.item);
  };

  const argument = schemeUtils.getArgumentByArgId('root');
  return (
    <ul className="root-function">
      {argument ? <WidgetFactory argument={argument} canDrop={canDrop} acceptedDropTypes={configUtils.getTypesBySource('func')} /> : null}
    </ul>
  );
}
