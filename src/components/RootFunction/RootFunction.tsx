import React from 'react';
import FunctionSchemeContainer from '../FunctionScheme/FunctionSchemeContainer';
import { useSchemeContext } from '../../Context/SchemeContext';

export default function RootFunction() {
  return <div className="root-function">
    <FunctionSchemeContainer functionId={'root'} />
  </div>;
}
