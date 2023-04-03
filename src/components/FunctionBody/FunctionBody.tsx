import React from 'react';
import './FunctionBody.scss';
import { SchemeItem, Scheme } from '../../Models/SchemeItem';
import ArgumentFactory from '../Argument/ArgumentFactory';

interface FunctionBodyProps {
  args: Scheme;
  scheme: Scheme;
}

export default function FunctionBody({ args, scheme }: FunctionBodyProps) {

  const argsLength = args.length;

  return (
    <ul className='function-body'>
      {args.map((arg, index) => <ArgumentFactory key={arg.id} scheme={scheme} argumentIndex={index} argument={arg} argsLength={argsLength} />)}
    </ul>
  );
}
