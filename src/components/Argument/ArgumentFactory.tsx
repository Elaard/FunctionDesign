
import React from 'react';
import { SchemeItem, Scheme } from '../../Models/SchemeItem';
import FunctionSchemeContainer from '../FunctionScheme/FunctionSchemeContainer';
import Separator from '../Separator/Separator';
import ArgumentContainer from './ArgumentContainer';

interface ArgumentContainerProps {
  argument: SchemeItem;
  argsLength: number;
  argumentIndex: number;
  scheme: Scheme;
}

export default function ArgumentFactory({ argument, scheme, argsLength, argumentIndex }: ArgumentContainerProps) {
  const requireSeparator = argumentIndex + 1 !== argsLength;

  const getComponent = () => {
    let component = null;

    switch (argument.type) {
      case 'Func':
        component = <FunctionSchemeContainer functionId={argument.id} scheme={scheme} />;
        break;
      case 'Field':
        return <span>{argument.value}</span>;
      default:
        component = <span>{argument.value}</span>;
    }
    return component;
  };

  return <ArgumentContainer id={argument.id}>
    <>
      {getComponent()}
      {requireSeparator ? <Separator separator={','} /> : null}
    </>
  </ArgumentContainer>;
}
