import React from 'react';
import { Config } from '../Models/Config';
import Separator from '../components/Separator/Separator';
import SelectWidget from '../components/Widgets/SelectWidget';
import ValueFactoryWidget from '../components/Widgets/ValueFactoryWidget';
import AddArgumentPlaceholder from '../components/AddArgument/AddArgumentPlaceholder';
import { ConnectDropTarget } from 'react-dnd';
import FunctionFactory from '../components/Argument/FunctionFactory';
import { SchemeItem } from '../Models/SchemeItem';

const formatDisplayedValue = (item: SchemeItem) => item.name ?? item.value;

export const BasicConfig: Config = {
  parts: {
    func: [],
    field: [],
  },
  settings: {
    sources: {
      value: {
        label: 'Value',
      },
      func: {
        label: 'Function',
      },
      fields: {
        label: 'Field',
      },
    },
    renderSeparator: () => <Separator />,
    renderMoreArguments: (addArgument: () => void, dropRef: ConnectDropTarget) => <AddArgumentPlaceholder addArgument={addArgument} dropRef={dropRef} />
  },
  types: {
    func: {
      factory: FunctionFactory,
      formatDisplayedValue
    },
    field: {
      factory: SelectWidget,
      formatDisplayedValue
    },
    number: {
      factory: ValueFactoryWidget,
      formatDisplayedValue
    },
  },
};
