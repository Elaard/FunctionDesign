import React from 'react';
import FunctionScheme from './FunctionScheme';
import { useSchemeContext } from '../../Context/SchemeContext';

interface FunctionSchemeContainerProps {
  functionId: string;
}


export default function FunctionSchemeContainer({ functionId }: FunctionSchemeContainerProps) {

  const { scheme } = useSchemeContext();

  const func = scheme.find((arg) => arg?.id === functionId);
  const args = scheme.filter((arg) => arg?.parentId === functionId);

  return func ? <FunctionScheme func={func} args={args} /> : null;
}
