import React from 'react';
import './FunctionDesign.scss';
import DragPanel from '../DragPanel/DragPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToggleContext from '../../Context/ToggleContext';
import SchemeContext from '../../Context/SchemeContext';
import RootFunction from '../RootFunction/RootFunction';
import { Scheme } from '../../Models/SchemeItem';

interface FunctionDesignProps {
  scheme: Scheme;
  onChange: (scheme: Scheme) => void;
}

export default function FunctionDesign({ scheme, onChange }: FunctionDesignProps) {
  return (
    <SchemeContext providedSchema={scheme} onChange={onChange}>
      <ToggleContext>
        <div className="root-function-container">
          <DndProvider backend={HTML5Backend}>
            <DragPanel />
            <RootFunction />
          </DndProvider>
        </div>
      </ToggleContext>
    </SchemeContext>
  );
}
