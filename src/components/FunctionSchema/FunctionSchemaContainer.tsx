import React from 'react';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import FunctionSchema from './FunctionSchema';

interface FunctionSchemaContainerProps {
  schema: SchemaItems;
  functionId: string;
  onChange: (value: SchemaItem) => void
}


export default function FunctionSchemaContainer({ schema, functionId, onChange }: FunctionSchemaContainerProps) {

  const func = schema.find((arg) => arg.type === 'Func' && arg?.id === functionId);
  const args = schema.filter((arg) => arg?.parentId === functionId);

  return func ? <FunctionSchema schema={schema} func={func} args={args} onChange={onChange} /> : null;
}
