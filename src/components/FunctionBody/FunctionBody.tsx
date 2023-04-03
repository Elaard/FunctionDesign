import React from 'react';
import './FunctionBody.scss';
import { SchemaItem, Schema } from '../../Models/SchemaItem';
import ArgumentFactory from '../Argument/ArgumentFactory';

interface FunctionBodyProps {
  args: Schema;
  schema: Schema;
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
