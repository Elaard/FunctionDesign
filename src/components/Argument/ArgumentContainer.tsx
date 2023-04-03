
import React from 'react';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import FunctionSchemaContainer from '../FunctionSchema/FunctionSchemaContainer';
import Separator from '../Separator/Separator';

interface ArgumentContainerProps {
  argument: SchemaItem;
  argsLength: number;
  argumentIndex: number;
  value: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function ArgumentContainer({ argument, value, onChange, argsLength, argumentIndex }: ArgumentContainerProps) {
  const requireSeparator = argumentIndex + 1 !== argsLength;

  const getComponent = () => {
    let component = null;

    switch (argument.type) {
      case 'Func':
        component = <FunctionSchemaContainer functionId={argument.id} value={value} onChange={onChange} />;
        break;
      default:
        component = <span>{argument.value}</span>;
    }
    return <span>{component}</span>;
  };

  return <>
    {getComponent()}
    {requireSeparator ? <Separator separator={','} /> : null}
  </>;
}
