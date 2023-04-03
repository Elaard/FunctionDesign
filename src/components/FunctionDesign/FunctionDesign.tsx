import React from 'react';
import './FunctionDesign.scss';
import DragPanel from '../DragPanel/DragPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToggleContext from '../../Context/ToggleContext';
import SchemaContext from '../../Context/SchemaContext';
import RootFunction from '../RootFunction/RootFunction';
import { Schema } from '../../Models/SchemaItem';

interface FunctionDesignProps {
  schema: Schema;
  onChange: (schema: Schema) => void;
}

export default function FunctionDesign({ schema, onChange }: FunctionDesignProps) {
  return (
    <SchemaContext providedSchema={schema} onChange={onChange}>
      <ToggleContext>
        <div className="root-function-container">
          <DndProvider backend={HTML5Backend}>
            <DragPanel />
            <RootFunction />
          </DndProvider>
        </div>
      </ToggleContext>
    </SchemaContext>
  );
}
