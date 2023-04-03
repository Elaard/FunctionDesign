import React from 'react';
import FunctionSchemaContainer from '../FunctionSchema/FunctionSchemaContainer';
import { useSchemaContext } from '../../Context/SchemaContext';

export default function RootFunction() {
  const { schema, onChange } = useSchemaContext();
  return <div className="root-function">
    <FunctionSchemaContainer functionId={'root'} schema={schema} onChange={onChange} />
  </div>;
}
