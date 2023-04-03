import React from 'react';
import './FunctionDesign.scss';
import DragPanel from '../DragPanel/DragPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToggleContext from '../../Context/ToggleContext';
import SchemaContext from '../../Context/SchemaContext';
import RootFunction from '../RootFunction/RootFunction';

export default function FunctionDesign() {
  return (
    <SchemaContext>
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
