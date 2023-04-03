import React from 'react';
import './FunctionBody.scss';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import ArgumentContainer from '../Argument/ArgumentContainer';

interface FunctionBodyProps {
  args: SchemaItems;
  value: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function FunctionBody({ args, value, onChange }: FunctionBodyProps) {

  const argsLength = args.length;

  return (
    <ul className='function-body'>
      {args.map((arg, index) => <ArgumentContainer key={arg.id} value={value} onChange={onChange} argumentIndex={index} argument={arg} argsLength={argsLength} />)}
    </ul>
  );
}
