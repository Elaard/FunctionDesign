import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ToggleItem } from '../Models/SelectedArguments';
import { Schema, SchemaItem } from '../Models/SchemaItem';

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
  providedSchema: Schema;
}

const SchemaContext = ({ children, providedSchema }: SchemaContextProps) => {
  const [schema, setSchema] = useState<Schema>([]);

  useEffect(() => {
    setSchema(providedSchema);
  }, [providedSchema]);

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