import React from 'react';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import Separator from '../Separator/Separator';
import FunctionSchemaContainer from '../FunctionSchema/FunctionSchemaContainer';

interface ArgumentProps {
  argument: SchemaItem;
  argsLength: number;
  argumentIndex: number;
  value: SchemaItems;
  onChange: (value: SchemaItem) => void
}

export default function Argument({ argument, value, onChange, ...rest }: ArgumentProps) {

  const get = () => {
    let component = null;
    switch (argument.type) {
      case 'Func':
        component = <FunctionSchemaContainer functionId={argument.id} value={value} onChange={onChange} />;
        break;
      default:
        component = <span>{argument.value}</span>;
    }
    return <li key={argument.id + 'key'} style={{ 'display': 'inline-block' }}>
      <span>{component}</span>
      <Separator {...rest} />
    </li>;
  };

  return get();
}
