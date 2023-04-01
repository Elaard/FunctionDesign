import React from 'react';
import DraggableListElement from '../ListElement/DraggableListElement';
import NestedDragList from '../NestedDragList/NestedDragList';

export default function DragPanel() {
  return (
    <div className="drag-panel" >
      <h2>Drag Panel List</h2>
      <ul>
        <NestedDragList title={'Fields'} key={'Fields'} >
          <DraggableListElement title={'Field1'} type={'Field'} value={'Field1'} name={'Field1'} />
          <DraggableListElement title={'Field2'} type={'Field'} value={'Field2'} name={'Field2'} />
          <NestedDragList title={'Lista'} key={'Lista'} >
            <DraggableListElement title={'Col1'} key={'Col1'} type={'Field'} value={'Col1'} name={'Col1'} />
            <DraggableListElement title={'Col2'} key={'Col2'} type={'Field'} value={'Col2'} name={'Col2'} />
          </NestedDragList>
        </NestedDragList>
        <NestedDragList title={'Functions'} key={'Functions'} >
          <DraggableListElement title={'SUM'} type={'Func'} value={'SUM'} name={'sum'} />
          <DraggableListElement title={'DIVIDE'} type={'Func'} value={'DIVIDE'} name={'divide'} />
        </NestedDragList>
      </ul>
    </div>
  );
}
