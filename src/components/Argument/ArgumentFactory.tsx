
import React from 'react';
import { SchemaItem, Schema } from '../../Models/SchemaItem';
import FunctionSchemaContainer from '../FunctionSchema/FunctionSchemaContainer';
import Separator from '../Separator/Separator';
import ArgumentContainer from './ArgumentContainer';

interface ArgumentContainerProps {
  argument: SchemaItem;
  argsLength: number;
  argumentIndex: number;
  schema: Schema;
  onChange: (schema: SchemaItem) => void
}

export default function ArgumentFactory({ argument, schema, onChange, argsLength, argumentIndex }: ArgumentContainerProps) {
  const requireSeparator = argumentIndex + 1 !== argsLength;

  const getComponent = () => {
    let component = null;

    switch (argument.type) {
      case 'Func':
        component = <FunctionSchemaContainer functionId={argument.id} schema={schema} onChange={onChange} />;
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
