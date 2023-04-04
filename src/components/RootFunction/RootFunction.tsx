import React from 'react';
import FunctionSchemeContainer from '../FunctionScheme/FunctionSchemeContainer';
import './RootFunction.scss';

export default function RootFunction() {
  return <div className="root-function">
    <FunctionSchemeContainer functionId={'root'} />
  </div>;
}
