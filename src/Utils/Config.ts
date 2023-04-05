import { Config } from '../Models/Config';
import Select from '../components/Widgets/Select';

const format = (value: any) => value.name;

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
    func: {
      factory: Select,
      formatDisplayedValue: format,
    },
    field: {
      factory: Select,
      formatDisplayedValue: format,
    },
    number: {
      factory: null as any,
      formatDisplayedValue: format,
    },
  },
};
