import { Config } from '../Models/Config';
import FieldWidget from '../components/Widgets/FieldWidget';
import FuncWidget from '../components/Widgets/FuncWidget';
import ValueFactoryWidget from '../components/Widgets/ValueFactoryWidget';

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
  },
  types: {
    func: FuncWidget,
    field: FieldWidget,
    number: ValueFactoryWidget,
  },
};
