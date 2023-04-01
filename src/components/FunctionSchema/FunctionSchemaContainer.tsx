import React from 'react';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import FunctionSchema from './FunctionSchema';

interface FunctionSchemaContainerProps {
  value: SchemaItems;
  functionId: string;
  onChange: (value: SchemaItem) => void
}


export default function FunctionSchemaContainer({ value, functionId, onChange }: FunctionSchemaContainerProps) {

  const func = value.find((schema) => schema.type === 'Func' && schema?.id === functionId);
  const args = value.filter((schema) => schema?.parentId === functionId);

  return func ? <FunctionSchema value={value} func={func} args={args} onChange={onChange} /> : null;
}
