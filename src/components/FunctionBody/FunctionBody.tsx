import React from 'react';
import './FunctionBody.scss';
import { SchemaItem, Schema } from '../../Models/SchemaItem';
import ArgumentFactory from '../Argument/ArgumentFactory';

interface FunctionBodyProps {
  args: Schema;
  schema: Schema;
}

export default function FunctionBody({ args, schema }: FunctionBodyProps) {

  const argsLength = args.length;

  return (
    <ul className='function-body'>
      {args.map((arg, index) => <ArgumentFactory key={arg.id} schema={schema} argumentIndex={index} argument={arg} argsLength={argsLength} />)}
    </ul>
  );
}
