import React from 'react';
import FunctionDesign from '../components/FunctionDesign/FunctionDesign';
import { Schema } from '../Models/SchemaItem';

const basicSchema: Schema = [
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
  return <FunctionDesign schema={basicSchema} />;
};

export default Demo;