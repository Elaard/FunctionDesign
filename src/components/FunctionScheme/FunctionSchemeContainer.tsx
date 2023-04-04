import React from 'react';
import FunctionScheme from './FunctionScheme';
import { useSchemeContext } from '../../Context/SchemeContext';

interface FunctionSchemeContainerProps {
  functionId: string;
}


export default function FunctionSchemeContainer({ functionId }: FunctionSchemeContainerProps) {

  const { getFunctionArguments, getArgumentByArgId } = useSchemeContext();

  const func = getArgumentByArgId(functionId);

  const args = getFunctionArguments(functionId);

  return func ? <>
    <span>{func.name}</span>
    <FunctionScheme func={func} args={args} />
  </> : null;
}
