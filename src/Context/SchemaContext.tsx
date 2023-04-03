import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { ToggleItem } from '../Models/SelectedArguments';
import { Schema, SchemaItem } from '../Models/SchemaItem';

const basicSchema: Schema = [
  {
    id: 'root',
    type: 'Func',
    name: 'sum',
    value: 'SUM',
    parentId: null,
    returnType: 'number'
  },
];

interface SchemaContext {
  schema: Schema,
  onChange: (value: SchemaItem) => void,
  deleteToggled(toggled: ToggleItem): void
}

const SchemaProvider = React.createContext<SchemaContext>({
  schema: [],
  onChange: () => null,
  deleteToggled: () => null,
});

SchemaProvider.displayName = 'SchemaContextProvider';

export function useSchemaContext() {
  return useContext(SchemaProvider);
}

interface SchemaContextProps {
  children: JSX.Element;
}

const SchemaContext = ({ children }: SchemaContextProps) => {
  const [schema, setSchema] = useState<Schema>([]);

  useEffect(() => {
    setSchema(basicSchema);
  }, []);

  const onChange = (value: SchemaItem) => {
    setSchema((prev) => [...prev, { ...value, id: Math.random().toString() }]);
  };

  function deleteToggled(toggled: ToggleItem): void {
    const cleared = schema.filter(({ id }) => !toggled[id]);
    setSchema(cleared);
  }

  return <SchemaProvider.Provider
    value={{
      schema,
      onChange,
      deleteToggled
    }}>
    {children}
  </SchemaProvider.Provider>;
};

export default SchemaContext;