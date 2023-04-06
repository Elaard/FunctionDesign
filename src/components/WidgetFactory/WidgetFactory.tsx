import React, { memo, useCallback, useRef } from 'react';
import './WidgetFactory.scss';
import SelectWidgetContainer from './SelectWidgetContainer';
import { ConfigItem } from '../../Models/ConfigItems';
import { useOutsideClick } from '../../Hooks/useOutsideClick';
import FunctionSchemeContainer from '../FunctionSchema/FunctionSchemeContainer';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { DragItem } from '../../Models/DragItem';
import ValueWidgetContainer from './ValueWidgetContainer';
import { argumentUtils } from '../../Utils/ArgumentUtils';
import { SchemeItem } from '../../Models/SchemeItem';
import { Widget } from '../../Models/Config';

interface WidgetFactoryProps {
  argument: SchemeItem;
  canDrop?: (draggItem: DragItem) => boolean;
  isToggled: (argumentId: string) => boolean;
  toggleElement: (id: string) => void;
  clearToggled: () => void;
  acceptedDropTypes: string[];
  getWidget(source: string, type: string): Widget;
  replaceArgument(argument: ConfigItem, replacedId: string): void;
  updateArgumentValue(value: string, argument: SchemeItem): void;
  getConfigItem(itemId: string, source: string): ConfigItem | undefined;
  getItemsBySourceAndType(source: string, type: string): ConfigItem[];
}

function WidgetFactory({
  argument,
  acceptedDropTypes,
  canDrop,
  isToggled,
  getWidget,
  clearToggled,
  toggleElement,
  getConfigItem,
  replaceArgument,
  updateArgumentValue,
  getItemsBySourceAndType,
}: WidgetFactoryProps) {
  const { factory: Widget, formatDisplayedValue } = getWidget(argument.source, argument.type);

  const widgetLiRef = useRef<HTMLLIElement>();

  const showWidget = isToggled(argument.argId);

  const onOutsideClick = () => {
    if (showWidget) {
      clearToggled();
    }
  };

  useOutsideClick(widgetLiRef, onOutsideClick);

  const onDrop = useCallback(
    (item: DragItem) => {
      replaceArgument(item.item, argument.argId);
    },
    [replaceArgument, argument?.argId],
  );

  const [, dropRef] = useShallowDrop(acceptedDropTypes, onDrop, canDrop);

  const updateArgumentPureValue = useCallback((value: string) => updateArgumentValue(value, argument), [updateArgumentValue, argument]);

  const updateArgumentItem = useCallback((selected: ConfigItem) => replaceArgument(selected, argument.argId), [replaceArgument, argument?.argId]);

  const renderFactoryWidget = useCallback(
    (onChange: any, value?: string, items?: ConfigItem[]) => <Widget onChange={onChange} value={value} items={items} />,
    [Widget],
  );

  const getRenderedWidget = () => {
    switch (argument.source) {
      case 'value':
        return (
          <ValueWidgetContainer
            oldValue={argument.value}
            onChange={updateArgumentPureValue}
            renderWidget={renderFactoryWidget}
            onUseAction={clearToggled}
          />
        );
      default:
        return (
          <SelectWidgetContainer
            oldValue={argument?.itemId}
            onChange={updateArgumentItem}
            renderWidget={renderFactoryWidget}
            onUseAction={clearToggled}
            items={getItemsBySourceAndType(argument.source, argument.type)}
          />
        );
    }
  };

  const renderWidget = () => {
    if (showWidget) {
      return getRenderedWidget();
    }
  };

  const renderHeader = () => {
    function getDisplayedValue() {
      if (formatDisplayedValue) {
        return formatDisplayedValue(argument, getConfigItem(argument.itemId, argument.source));
      }
      if (argument.value === 'value') {
        return argument.value;
      }
    }
    function onClick() {
      toggleElement(argument.argId);
    }
    if (!showWidget) {
      const displayedValue = getDisplayedValue();
      return (
        <span ref={dropRef} onClick={onClick} hidden={showWidget} className="widget-factory__header">
          {displayedValue ? displayedValue : '__'}
        </span>
      );
    }
  };

  const renderSchema = () => {
    if (argumentUtils.whetherSourceIsFunction(argument)) {
      return <FunctionSchemeContainer argument={argument} />;
    }
  };

  return (
    //TODO: fix type
    <li key={argument.argId + '_wf'} ref={widgetLiRef as any} className="widget-factory">
      {renderHeader()}
      {renderWidget()}
      {renderSchema()}
    </li>
  );
}

export default WidgetFactory;
