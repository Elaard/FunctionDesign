
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

    switch (argument.source) {
      case 'func':
        component = <FunctionSchemeContainer functionId={argument.argId} />;
        break;
      case 'field':
        return <span>{argument.value}</span>;
      default:
        component = <span>{argument.value}</span>;
    }
    return component;
  };

  return <ArgumentContainer renderedArgument={getComponent()} requireSeparator={requireSeparator} argument={argument} />;
}
