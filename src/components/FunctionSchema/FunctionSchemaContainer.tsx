import React from 'react';
import { SchemaItem, Schema } from '../../Models/SchemaItem';
import FunctionSchema from './FunctionSchema';

interface FunctionSchemaContainerProps {
  schema: Schema;
  functionId: string;
  onChange: (value: SchemaItem) => void
}


export default function FunctionSchemaContainer({ schema, functionId, onChange }: FunctionSchemaContainerProps) {

  const func = schema.find((arg) => arg?.id === functionId);
  const args = schema.filter((arg) => arg?.parentId === functionId);

  return func ? <FunctionSchema schema={schema} func={func} args={args} onChange={onChange} /> : null;
}
