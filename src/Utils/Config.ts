import { Config } from '../Models/Config';
import VanillaInput from '../components/Vanilla/VanillaInput';
import VanillaSelect from '../components/Vanilla/VanillaSelect';

const formatDisplayedValue = (value: any) => value.name;

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
      number: {
        factory: VanillaSelect,
        formatDisplayedValue,
      },
    },
    field: {
      number: {
        factory: VanillaSelect,
        formatDisplayedValue,
      },
    },
    value: {
      number: {
        factory: VanillaInput,
        formatDisplayedValue: (value) => value.value,
      },
    },
  },
};
