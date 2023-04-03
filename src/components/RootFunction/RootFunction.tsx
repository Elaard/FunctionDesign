import React from 'react';
import FunctionSchemeContainer from '../FunctionScheme/FunctionSchemeContainer';
import { useSchemeContext } from '../../Context/SchemeContext';

export default function RootFunction() {
  const { scheme } = useSchemeContext();
  return <div className="root-function">
    <FunctionSchemeContainer functionId={'root'} scheme={scheme} />
  </div>;
}
