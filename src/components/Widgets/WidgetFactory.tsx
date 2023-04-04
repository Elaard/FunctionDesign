import React from 'react';
import { WidgetPropsWithDrop } from '../../Models/WidgetProps';
import { useDoubleClick } from '../../Hooks/useDoubleClick';
import { useToggle } from '../../Hooks/useToggle';

export default function WidgetFactory({ argument, dropRef, setValue, renderWidget }: WidgetPropsWithDrop) {

  const [toggleState, toggle] = useToggle();

  const actionOnDoubleClick = () => {
    toggle();
  };

  const onDoubleClick = useDoubleClick(actionOnDoubleClick);

  const onChange = (value: string | number | boolean) => {

  };

  return <>
    <span ref={dropRef} onClick={onDoubleClick} hidden={toggleState}>{argument.name}</span>
    <div hidden={!toggleState}>
      {renderWidget(onChange)}
    </div>
  </>;
}
