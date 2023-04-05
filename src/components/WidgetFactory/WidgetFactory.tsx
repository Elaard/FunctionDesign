import React, { useRef } from 'react';
import './WidgetFactory.scss';
import { WidgetPropsWithDrop } from '../../Models/WidgetProps';
import { useSchemeContext } from '../../Context/SchemeContext';
import SelectWidgetContainer from './SelectWidgetContainer';
import { ConfigItem } from '../../Models/ConfigItems';
import { useToggleContext } from '../../Context/ToggleContext';
import { useOutsideClick } from '../../Hooks/useOutsideClick';
import FunctionSchema from '../FunctionSchema/FunctionSchema';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { DragItem } from '../../Models/DragItem';
import ValueWidgetContainer from './ValueWidgetContainer';

export default function WidgetFactory({ argument, acceptedDropTypes, canDrop }: WidgetPropsWithDrop) {
  const { clearToggled, toggleElement, isToggled } = useToggleContext();
  const { updateArgument, updateArgumentValue, getWidget, getItemsByType, replaceArgument } = useSchemeContext();

  const { factory: Widget, formatDisplayedValue } = getWidget(argument.source);

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

  const getRenderedWidget = () => {
    switch (argument.source) {
      case 'value':
        return (
          <ValueWidgetContainer
            value={argument.value}
            onChange={(value: string) => {
              updateArgumentValue(value, argument);
              clearToggled();
            }}
            renderWidget={(onChange, value) => <Widget onChange={onChange} value={value} />}
          />
        );
      default:
        return (
          <SelectWidgetContainer
            items={getItemsByType(argument.source, argument.type)}
            Widget={Widget}
            argument={argument}
            onChange={(selected: ConfigItem) => {
              updateArgument(selected, argument);
              clearToggled();
            }}
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
      const displayedValue = formatDisplayedValue ? formatDisplayedValue(argument) : argument?.value;
      return (
        <span ref={dropRef} onClick={() => toggleElement(argument.argId)} hidden={showWidget} className="widget-factory__header">
          {displayedValue !== '' ? displayedValue : '__'}
        </span>
      );
    }
  };

  const renderSchema = () => {
    if (argument.source === 'func') {
      return <FunctionSchema argument={argument} />;
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
