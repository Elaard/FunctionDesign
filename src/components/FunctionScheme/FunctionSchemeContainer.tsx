import React from 'react';
import FunctionScheme from './FunctionScheme';
import { useSchemeContext } from '../../Context/SchemeContext';

interface FunctionSchemeContainerProps {
  functionId: string;
}


export default function FunctionSchemeContainer({ functionId }: FunctionSchemeContainerProps) {

  const { scheme, config } = useSchemeContext();

  const func = scheme.find((arg) => arg?.argId === functionId);

  const args = scheme.filter((arg) => arg?.parentId === functionId);

  return func ? <>
    <span>{func.name}</span>
    <FunctionScheme func={func} args={args} />
  </> : null;
}
