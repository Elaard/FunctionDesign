
import React from 'react';
import { SchemeItem } from '../../Models/SchemeItem';
import FunctionSchemeContainer from '../FunctionScheme/FunctionSchemeContainer';
import ArgumentContainer from './ArgumentContainer';

interface ArgumentContainerProps {
  argument: SchemeItem;
  argsLength: number;
  argumentIndex: number;
}

export default function ArgumentFactory({ argument, argsLength, argumentIndex }: ArgumentContainerProps) {
  const requireSeparator = argumentIndex + 1 !== argsLength;

  const getComponent = () => {
    let component = null;

    switch (argument.type) {
      case 'Func':
        component = <FunctionSchemeContainer functionId={argument.id} />;
        break;
      case 'Field':
        return <span>{argument.value}</span>;
      default:
        component = <span>{argument.value}</span>;
    }
    return component;
  };

  return <ArgumentContainer id={argument.id} requireSeparator={requireSeparator} argument={getComponent()} />;
}
