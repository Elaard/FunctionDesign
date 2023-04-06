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
import { NullableString } from '../../Models/BuiltIn';

export default function WidgetFactory({ argument, acceptedDropTypes, canDrop }: WidgetPropsWithDrop) {
  const { clearToggled, toggleElement, isToggled } = useToggleContext();
  const { updateArgument, updateArgumentValue, getWidget, getItemsByType, replaceArgument } = useSchemeContext();

  const { factory: Widget, formatDisplayedValue } = getWidget(argument.source, argument.type);

  const clickRef = useRef<HTMLDivElement>();

  const showWidget = isToggled(argument.argId);

  const onOutsideClick = () => {
    if (showWidget) {
      clearToggled();
    }
  };

  useOutsideClick(clickRef, onOutsideClick);

  const onDrop = (item: DragItem) => {
    replaceArgument(item.item, argument.argId);
  };

  const [, dropRef] = useShallowDrop(acceptedDropTypes, onDrop, canDrop);

  const updateArgumentPureValue = (value: NullableString) => updateArgumentValue(value, argument);

  const updateArgumentItem = (selected: ConfigItem) => updateArgument(selected, argument);

  const renderWidgett = (onChange: any, value: NullableString, items?: ConfigItem[]) => <Widget onChange={onChange} value={value} items={items} />;

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
            oldValue={argument?.id}
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
    if (!showWidget) {
      const displayedValue = formatDisplayedValue ? formatDisplayedValue(argument) : argument.source === 'value' ? argument.value : argument.name;
      return (
        <span ref={dropRef} onClick={() => toggleElement(argument.argId)} hidden={showWidget} className="widget-factory__header">
          {displayedValue !== '' ? displayedValue : '__'}
        </span>
      );
    }
  };

  const renderSchema = () => {
    if (argument.source === 'func') {
      return <FunctionSchemeContainer argument={argument} />;
    }
  };

  return (
    <li key={argument.argId + '_wf'} ref={clickRef} className="widget-factory">
      {renderHeader()}
      {renderWidget()}
      {renderSchema()}
    </li>
  );
}
