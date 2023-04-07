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

function WidgetFactoryContainer({ argument, ...rest }: WidgetFactoryContainerProps) {
  const { clearToggled, toggleElement, isToggled } = useToggleContext();
  const { configUtils, schemeUtils } = useSchemeContext();

  const parentIsStrict = configUtils.isParentStrict(argument.parentId);

  return (
    <WidgetFactory
      {...rest}
      argument={argument}
      getWidget={configUtils.getWidget}
      isToggled={isToggled}
      canBeDeleted={!parentIsStrict}
      clearToggled={clearToggled}
      toggleElement={toggleElement}
      removeArgument={schemeUtils.removeArgument}
      replaceArgument={schemeUtils.replaceArgument}
      updateArgumentValue={schemeUtils.updateArgumentValue}
      getConfigItem={configUtils.getConfigItem}
      getItemsBySourceAndType={configUtils.getItemsBySourceAndType}
    />
  );
}

export default memo(WidgetFactoryContainer);
