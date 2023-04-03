import React from 'react';
import FunctionDesign from '../components/FunctionDesign/FunctionDesign';
import { Schema } from '../Models/SchemaItem';

const basic: Schema = [
  {
    id: 'root',
    type: 'Func',
    name: 'sum',
    value: 'SUM',
    parentId: null,
    returnType: 'number'
  },
];

const Demo = () => {
  const onChange = (schema: Schema) => {
    console.log(schema);
  };
  return <FunctionDesign schema={basic} onChange={onChange} />;
};

export default Demo;