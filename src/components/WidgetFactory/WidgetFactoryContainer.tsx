import React, { memo } from 'react';
import { DragItem } from '../../Models/DragItem';
import { SchemeItem } from '../../Models/SchemeItem';
import { useSchemeContext } from '../../Context/SchemeContext';
import { useToggleContext } from '../../Context/ToggleContext';
import WidgetFactory from './WidgetFactory';

interface WidgetFactoryContainerProps {
  argument: SchemeItem;
  acceptedDropTypes: string[];
  canDrop?: (draggItem: DragItem) => boolean;
}

function WidgetFactoryContainer(props: WidgetFactoryContainerProps) {
  const { clearToggled, toggleElement, isToggled } = useToggleContext();
  const { configUtils, schemeUtils } = useSchemeContext();

  return (
    <WidgetFactory
      {...props}
      isToggled={isToggled}
      clearToggled={clearToggled}
      toggleElement={toggleElement}
      getWidget={configUtils.getWidget}
      replaceArgument={schemeUtils.replaceArgument}
      updateArgumentValue={schemeUtils.updateArgumentValue}
      getConfigItem={configUtils.getConfigItem}
      getItemsBySourceAndType={configUtils.getItemsBySourceAndType}
    />
  );
}

export default memo(WidgetFactoryContainer);
