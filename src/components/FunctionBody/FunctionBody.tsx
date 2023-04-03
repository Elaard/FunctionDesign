import React from 'react';
import './FunctionBody.scss';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import ArgumentFactory from '../Argument/ArgumentFactory';

interface FunctionBodyProps {
  args: SchemaItems;
  schema: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function FunctionBody({ args, schema, onChange }: FunctionBodyProps) {

  const argsLength = args.length;

  return (
    <ul className='function-body'>
      {args.map((arg, index) => <ArgumentFactory key={arg.id} schema={schema} onChange={onChange} argumentIndex={index} argument={arg} argsLength={argsLength} />)}
    </ul>
  );
}
