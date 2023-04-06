import React, { useRef } from 'react';
import './WidgetFactory.scss';
import { WidgetPropsWithDrop } from '../../Models/WidgetProps';
import { useSchemeContext } from '../../Context/SchemeContext';
import SelectWidgetContainer from './SelectWidgetContainer';
import { ConfigItem } from '../../Models/ConfigItems';
import { useToggleContext } from '../../Context/ToggleContext';
import { useOutsideClick } from '../../Hooks/useOutsideClick';
import FunctionSchemeContainer from '../FunctionSchema/FunctionSchemeContainer';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { DragItem } from '../../Models/DragItem';
import ValueWidgetContainer from './ValueWidgetContainer';
import { argumentUtils } from '../../Utils/ArgumentUtils';

export default function WidgetFactory({ argument, acceptedDropTypes, canDrop }: WidgetPropsWithDrop) {
  const { clearToggled, toggleElement, isToggled } = useToggleContext();
  const { replaceArgument, updateArgumentValue, getWidget, getItemsByType, getConfigItem } = useSchemeContext();

  const { factory: Widget, formatDisplayedValue } = getWidget(argument.source, argument.type);

  const widgetLiRef = useRef<HTMLDivElement>();

  const showWidget = isToggled(argument.argId);

  const onOutsideClick = () => {
    if (showWidget) {
      clearToggled();
    }
  };

  useOutsideClick(widgetLiRef, onOutsideClick);

  const onDrop = (item: DragItem) => {
    replaceArgument(item.item, argument.argId);
  };

  const [, dropRef] = useShallowDrop(acceptedDropTypes, onDrop, canDrop);

  const updateArgumentPureValue = (value: string) => updateArgumentValue(value, argument);

  const updateArgumentItem = (selected: ConfigItem) => replaceArgument(selected, argument.argId);

  const renderWidgett = (onChange: any, value?: string, items?: ConfigItem[]) => <Widget onChange={onChange} value={value} items={items} />;

  const getRenderedWidget = () => {
    switch (argument.source) {
      case 'value':
        return (
          <ValueWidgetContainer
            oldValue={argument.value}
            onChange={updateArgumentPureValue}
            renderWidget={renderWidgett}
            onUseAction={clearToggled}
          />
        );
      default:
        return (
          <SelectWidgetContainer
            oldValue={argument?.itemId}
            onChange={updateArgumentItem}
            renderWidget={renderWidgett}
            onUseAction={clearToggled}
            items={getItemsByType(argument.source, argument.type)}
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
