import React from 'react';
import FunctionDesign from '../components/FunctionDesign/FunctionDesign';
import { Scheme } from '../Models/SchemeItem';
import { Config } from '../Models/Config';
import { BasicConfig } from '../Utils/Config';

const basic: Scheme = [
  {
    id: 'root',
    source: 'func',
    name: 'sum',
    value: 'SUM',
    type: 'number',
    argId: 'root',
    parentId: '',
  },
];

const Demo = () => {
  const onChange = (scheme: Scheme) => {
    // console.log(scheme);
  };

  const config: Config = {
    ...BasicConfig,
    parts: {
      func: [
        {
          id: 'sum',
          source: 'func',
          name: 'Sum',
          value: 'sum',
          type: 'number',
          meta: {
            scheme: {
              arguments: [
                {
                  type: 'number',
                },
              ],
              hasStrictScheme: false,
            },
          },
        },
        {
          id: 'divide',
          source: 'func',
          name: 'Divide',
          value: 'divide',
          type: 'number',
          meta: {
            scheme: {
              arguments: [
                {
                  type: 'number',
                },
                {
                  type: 'number',
                },
              ],
              hasStrictScheme: true,
            },
          },
        },
        {
          id: 'substract',
          source: 'func',
          name: 'Substract',
          value: 'substract',
          type: 'number',
          meta: {
            scheme: {
              arguments: [
                {
                  type: 'number',
                },
                {
                  type: 'number',
                },
              ],
              hasStrictScheme: true,
            },
          },
        },
      ],
      field: [
        {
          id: 'Field1',
          source: 'field',
          name: 'Field1',
          value: 'Field1',
          type: 'number',
        },
        {
          id: 'Field2',
          source: 'field',
          name: 'Field2',
          value: 'Field2',
          type: 'number',
        },
        {
          id: 'Field3',
          source: 'field',
          name: 'Field3',
          value: 'Field3',
          type: 'number',
        },
      ],
    },
    settings: {
      sources: {
        func: {
          label: 'Functions',
        },
        field: {
          label: 'Fields',
        },
      },
    },
  };

  return <FunctionDesign scheme={basic} config={config} onChange={onChange} />;
};

export default Demo;
