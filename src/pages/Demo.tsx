import React from 'react';
import FunctionDesign from '../components/FunctionDesign/FunctionDesign';
import { Scheme } from '../Models/SchemeItem';
import { Config } from '../Models/Config';

const basic: Scheme = [
  {
    id: 'root',
    type: 'func',
    name: 'sum',
    value: 'SUM',
    parentId: null,
    returnType: 'number'
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
          type: 'func',
          name: 'Sum',
          value: 'sum',
          returnType: 'number'
        },
        {
          id: 'divide',
          type: 'func',
          name: 'Divide',
          value: 'divide',
          returnType: 'number'
        },
        {
          id: 'substract',
          type: 'func',
          name: 'Substract',
          value: 'substract',
          returnType: 'number'
        },
      ],
      fields: [
        {
          id: 'Field1',
          type: 'field',
          name: 'Field1',
          value: 'Field1',
          returnType: 'number'
        },
        {
          id: 'Field2',
          type: 'field',
          name: 'Field2',
          value: 'Field2',
          returnType: 'number'
        },
        {
          id: 'Field3',
          type: 'field',
          name: 'Field3',
          value: 'Field3',
          returnType: 'number'
        },
      ],
    },
    sources: {
      funcs: {
        label: 'Functions',
      },
      fields: {
        label: 'Fields'
      }
    }
  };

  return <FunctionDesign scheme={basic} config={config} onChange={onChange} />;
};

export default Demo;