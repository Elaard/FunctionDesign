import React, { useMemo } from 'react';
import DraggableListElement from '../ListElement/DraggableListElement';
import NestedDragList from '../NestedDragList/NestedDragList';
import { Config } from '../../Models/Config';

interface DragPanelProps {
  config: Config;
}

export default function DragPanel({ config }: DragPanelProps) {

  const items = useMemo(() => {
    const configParts = config.parts;

    const lists: JSX.Element[] = [];

    for (const source in configParts) {
      lists.push(
        <NestedDragList title={config.settings.sources[source].label} key={source}>
          {
            configParts[source].map((item) => <DraggableListElement key={item.id} item={item} />)
          }
        </NestedDragList>
      );
    }

    return lists;

  }, [config.parts, config.settings.sources]);

  return (
    <div className="drag-panel" >
      <h2>Drag Panel List</h2>
      <ul>
        {items}
      </ul>
    </div>
  );
}
