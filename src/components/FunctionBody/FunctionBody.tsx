import React from 'react';
import './FunctionBody.scss';
import { Scheme } from '../../Models/SchemeItem';
import ArgumentFactory from '../Argument/ArgumentFactory';

interface FunctionBodyProps {
  args: Scheme;
}

export default function FunctionBody({ args }: FunctionBodyProps) {

  const argsLength = args.length;

  return (
    <ul className='function-body'>
      {args.map((arg, index) => <ArgumentFactory key={arg.id} argumentIndex={index} argument={arg} argsLength={argsLength} />)}
    </ul>
  );
}
