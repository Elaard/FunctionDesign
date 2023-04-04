import React from 'react';
import FunctionDesign from '../components/FunctionDesign/FunctionDesign';
import { Scheme } from '../Models/SchemeItem';
import { Config } from '../Models/Config';

const basic: Scheme = [
  {
    id: 'root',
    itemType: 'func',
    name: 'sum',
    value: 'SUM',
    parentId: null,
    argumentType: 'number',
    argId: 'root'
  },
];

const Demo = () => {
  const onChange = (scheme: Scheme) => {
    // console.log(scheme);
  };

  const config: Config = {
    parts: {
      funcs: [
        {
          id: 'sum',
          itemType: 'func',
          name: 'Sum',
          value: 'sum',
          argumentType: 'number',
          meta: {
            scheme: {
              arguments: [
                {
                  argumentType: 'number'
                }
              ],
              hasStrictScheme: false,
            }
          }
        },
        {
          id: 'divide',
          itemType: 'func',
          name: 'Divide',
          value: 'divide',
          argumentType: 'number',
          meta: {
            scheme: {
              arguments: [
                {
                  argumentType: 'number'
                }
              ],
              hasStrictScheme: false,
            }
          }
        },
        {
          id: 'substract',
          itemType: 'func',
          name: 'Substract',
          value: 'substract',
          argumentType: 'number',
          meta: {
            scheme: {
              arguments: [
                {
                  argumentType: 'number'
                }
              ],
              hasStrictScheme: false,
            }
          }
        },
      ],
      fields: [
        {
          id: 'Field1',
          itemType: 'field',
          name: 'Field1',
          value: 'Field1',
          argumentType: 'number'
        },
        {
          id: 'Field2',
          itemType: 'field',
          name: 'Field2',
          value: 'Field2',
          argumentType: 'number'
        },
        {
          id: 'Field3',
          itemType: 'field',
          name: 'Field3',
          value: 'Field3',
          argumentType: 'number'
        },
      ],
    },
    settings: {
      sources: {
        funcs: {
          label: 'Functions',
        },
        fields: {
          label: 'Fields'
        }
      }
    }
  };

  return <FunctionDesign scheme={basic} config={config} onChange={onChange} />;
};

export default Demo;