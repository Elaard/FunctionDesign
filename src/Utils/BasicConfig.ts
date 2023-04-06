import React from 'react';
import { Config } from '../Models/Config';
import { SchemeItem } from '../Models/SchemeItem';
import VanillaInput from '../components/Vanilla/VanillaInput';
import VanillaSelect from '../components/Vanilla/VanillaSelect';
import { ConfigItem } from '../Models/ConfigItem';

const formatDisplayedValue = (item: SchemeItem, configItem?: ConfigItem) => {
  return (item.source === 'value' ? item.value : configItem?.name) ?? '';
};

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
        formatDisplayedValue,
      },
    },
  },
};
