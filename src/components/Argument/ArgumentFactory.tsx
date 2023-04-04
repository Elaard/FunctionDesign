
import React from 'react';
import { SchemeItem } from '../../Models/SchemeItem';
import ArgumentContainer from './ArgumentContainer';
import { WidgetProps } from '../../Models/WidgetProps';
import { useSchemeContext } from '../../Context/SchemeContext';
import { ConnectDropTarget } from 'react-dnd';
import WidgetFactory from '../Widgets/WidgetFactory';
import { ConfigItem } from '../../Models/ConfigItems';

interface ArgumentContainerProps {
  argument: SchemeItem;
  argsLength: number;
  argumentIndex: number;
}

export default function ArgumentFactory({ argument, argsLength, argumentIndex }: ArgumentContainerProps) {
  const requireSeparator = argumentIndex + 1 !== argsLength;

  const { getWidget, getItemsByType, updateArgument } = useSchemeContext();

  function setValue(updated: Partial<ConfigItem>) {
    updateArgument(updated, argument);
  }

  const getRenderWidgetFunction = () => {

    const Widget: React.FunctionComponent<WidgetProps> = getWidget(argument.source);

    const items = getItemsByType(argument.source, argument.type);

    const renderWidget = function (onChange: (updated: string | number | boolean) => void) {
      return <Widget onChange={onChange} items={items} value={argument} />;
    };

    return function renderWidgetFactory(dropRef: ConnectDropTarget) {
      return <WidgetFactory
        dropRef={dropRef}
        setValue={setValue}
        argument={argument}
        renderWidget={renderWidget}
      />;
    };
  };

  return <ArgumentContainer render={getRenderWidgetFunction()} requireSeparator={requireSeparator} argument={argument} />;
}
