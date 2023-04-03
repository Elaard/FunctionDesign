import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Schema, SchemaItem } from '../Models/SchemaItem';

interface SchemaContext {
  schema: Schema,
  addArgument: (value: SchemaItem) => void,
  deleteToggled(toggledId: string): void
}

const SchemaProvider = React.createContext<SchemaContext>({
  schema: [],
  addArgument: () => null,
  deleteToggled: () => null,
});

SchemaProvider.displayName = 'SchemaContextProvider';

export function useSchemaContext() {
  return useContext(SchemaProvider);
}

interface SchemaContextProps {
  onChange: (schema: Schema) => void;
  children: JSX.Element;
  providedSchema: Schema;
}

const SchemaContext = ({ children, providedSchema, onChange }: SchemaContextProps) => {
  const [schema, setSchema] = useState<Schema>([]);

  useEffect(() => {
    onChange(schema);
  }, [onChange, schema]);

  useEffect(() => {
    setSchema(providedSchema);
  }, [providedSchema]);

  const addArgument = (value: SchemaItem) => {
    setSchema((prev) => [...prev, { ...value, id: Math.random().toString() }]);
  };

  function deleteToggled(toggledId: string): void {
    const cleared = schema.filter(({ id }) => id !== toggledId);
    setSchema(cleared);
  }

  return <SchemaProvider.Provider
    value={{
      schema,
      addArgument,
      deleteToggled
    }}>
    {children}
  </SchemaProvider.Provider>;
};

export default SchemaContext;