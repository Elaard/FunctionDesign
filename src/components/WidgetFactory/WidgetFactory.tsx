import { memo, useCallback } from 'react';
import { useKeyPress } from '../../Hooks/useKeyPress';
import { useOutsideClick } from '../../Hooks/useOutsideClick';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { ConfigItem } from '../../Models/ConfigItem';
import { DragItem } from '../../Models/DragItem';
import { SchemeItem } from '../../Models/SchemeItem';
import { Widget } from '../../Models/Widget';
import FunctionScheme from '../FunctionSchema/FunctionScheme';
import SelectWidgetContainer from './SelectWidgetContainer';
import ValueWidgetContainer from './ValueWidgetContainer';
import './WidgetFactory.scss';

interface WidgetFactoryProps {
  argument: SchemeItem;
  canDrop?: (draggItem: DragItem) => boolean;
  isToggled: (argumentId: string) => boolean;
  canBeDeleted: boolean;
  toggleElement: (id: string) => void;
  clearToggled: () => void;
  acceptedDropTypes: string[];
  getWidget(source: string, type: string): Widget;
  removeArgument(argumentId: string): void;
  replaceArgument(argument: ConfigItem, replacedId: string): void;
  updateArgumentValue(value: string, argument: SchemeItem): void;
  getConfigItem(itemId: string, source: string): ConfigItem | undefined;
  getItemsBySourceAndType(source: string, type: string): ConfigItem[];
}

function WidgetFactory({
  argument,
  acceptedDropTypes,
  canBeDeleted,
  canDrop,
  isToggled,
  getWidget,
  clearToggled,
  toggleElement,
  getConfigItem,
  removeArgument,
  replaceArgument,
  updateArgumentValue,
  getItemsBySourceAndType,
}: WidgetFactoryProps) {
  const { factory: Widget, formatDisplayedValue } = getWidget(argument.source, argument.type);

  const showWidget = isToggled(argument.argId);

  const onOutsideClick = () => {
    if (showWidget) {
      clearToggled();
    }
  };

  const removeToggled = () => {
    if (showWidget && canBeDeleted) {
      removeArgument(argument.argId);
      clearToggled();
    }
  };

  useKeyPress('Delete', removeToggled);

  const ref = useOutsideClick(onOutsideClick);

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
    (onChange: (val: string) => void, value?: string, items?: ConfigItem[]) => <Widget onChange={onChange} value={value} items={items} />,
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
    if (argument.source === 'func') {
      return <FunctionScheme argument={argument} />;
    }
  };

  return (
    //TODO: fix type
    <li key={argument.argId} ref={ref as any} className="widget-factory">
      {renderHeader()}
      {renderWidget()}
      {renderSchema()}
    </li>
  );
}

export default memo(WidgetFactory);
