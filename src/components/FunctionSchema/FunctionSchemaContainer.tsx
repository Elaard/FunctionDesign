import React from 'react';
import { Schema } from '../../Models/SchemaItem';
import FunctionSchema from './FunctionSchema';

interface FunctionSchemaContainerProps {
  schema: Schema;
  functionId: string;
}


export default function FunctionSchemaContainer({ schema, functionId }: FunctionSchemaContainerProps) {

  const func = schema.find((arg) => arg?.id === functionId);
  const args = schema.filter((arg) => arg?.parentId === functionId);

  return func ? <FunctionSchema schema={schema} func={func} args={args} /> : null;
}
