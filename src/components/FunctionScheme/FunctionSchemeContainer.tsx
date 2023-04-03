import React from 'react';
import { Scheme } from '../../Models/SchemeItem';
import FunctionScheme from './FunctionScheme';

interface FunctionSchemeContainerProps {
  scheme: Scheme;
  functionId: string;
}


export default function FunctionSchemeContainer({ scheme, functionId }: FunctionSchemeContainerProps) {

  const func = scheme.find((arg) => arg?.id === functionId);
  const args = scheme.filter((arg) => arg?.parentId === functionId);

  return func ? <FunctionScheme scheme={scheme} func={func} args={args} /> : null;
}
