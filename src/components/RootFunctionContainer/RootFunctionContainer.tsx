import React, { useEffect, useState } from 'react';
import './RootFunctionContainer.scss';
import DragPanel from '../DragPanel/DragPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SchemaItem, SchemaItems } from '../../Models/SchemaItem';
import FunctionSchemaContainer from '../FunctionSchema/FunctionSchemaContainer';

const basicSchema: SchemaItems = [
  {
    id: 'root',
    type: 'Func',
    name: 'sum',
    value: 'SUM',
    parentId: null,
    returnType: 'number'
  },
  {
    id: '123123123123',
    type: 'value',
    name: 'VALUE',
    value: 5,
    parentId: 'root',
    returnType: 'number'
  },
  {
    id: '123123as3',
    type: 'value',
    name: 'VALUE',
    value: 'Field500',
    parentId: 'root',
    returnType: 'number'
  }
];

export default function RootFunctionContainer() {
  const [schema, setSchema] = useState<SchemaItems>([]);

  useEffect(() => {
    setSchema(basicSchema);
  }, []);

  const onChange = (value: SchemaItem) => {
    setSchema((prev) => [...prev, { ...value, id: Math.random().toString() }]);
  };

  return (
    <div className="root-function-container">
      <DndProvider backend={HTML5Backend}>
        <DragPanel />
        <div className="root-function">
          <FunctionSchemaContainer functionId={'root'} schema={schema} onChange={onChange} />
        </div>
      </DndProvider>
    </div>
  );
}
