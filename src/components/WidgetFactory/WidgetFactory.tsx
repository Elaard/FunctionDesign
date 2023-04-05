import React, { useRef } from 'react';
import { WidgetPropsWithDrop } from '../../Models/WidgetProps';
import { useSchemeContext } from '../../Context/SchemeContext';
import SelectWidgetContainer from './SelectWidgetContainer';
import { ConfigItem } from '../../Models/ConfigItems';
import { useToggleContext } from '../../Context/ToggleContext';
import { useOutsideClick } from '../../Hooks/useOutsideClick';
import FunctionSchema from '../FunctionSchema/FunctionSchema';
import './WidgetFactory.scss';
import { useShallowDrop } from '../../Hooks/useShallowDrop';
import { DragItem } from '../../Models/DragItem';

export default function WidgetFactory({ argument, acceptedDropTypes, canDrop }: WidgetPropsWithDrop) {
  const { clearToggled, toggleElement, isToggled } = useToggleContext();
  const { updateArgument, updateArgumentValue, getWidget, getItemsByType } = useSchemeContext();

  const { factory: Widget, formatDisplayedValue } = getWidget(argument.source);

  const clickRef = useRef<HTMLDivElement>();

  const showWidget = isToggled(argument.argId);

  const onOutsideClick = () => {
    if (showWidget) {
      clearToggled();
    }
  };

  useOutsideClick(clickRef, onOutsideClick);

  const onDrop = (item: DragItem) => {};

  const [, dropRef] = useShallowDrop(acceptedDropTypes, onDrop, canDrop);

  const getRenderedWiget = () => {
    switch (argument.source) {
      case 'value':
        return (
          <Widget
            value={argument.value}
            onChange={(value: string) => {
              updateArgumentValue(value, argument);
              clearToggled();
            }}
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
      return getRenderedWiget();
    }
  };

  const renderHeader = () => {
    if (!showWidget) {
      const displayedValue = formatDisplayedValue ? formatDisplayedValue(argument) : argument?.value;
      return (
        <span ref={dropRef} onClick={() => toggleElement(argument.argId)} hidden={showWidget}>
          {displayedValue}
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
    <li ref={clickRef} className="widget-factory">
      {renderHeader()}
      {renderWidget()}
      {renderSchema()}
    </li>
  );
}
