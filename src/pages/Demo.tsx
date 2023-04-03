import React from 'react';
import FunctionDesign from '../components/FunctionDesign/FunctionDesign';
import { Scheme } from '../Models/SchemeItem';

const basic: Scheme = [
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
  const onChange = (scheme: Scheme) => {
    console.log(scheme);
  };
  return <FunctionDesign scheme={basic} onChange={onChange} />;
};

export default Demo;