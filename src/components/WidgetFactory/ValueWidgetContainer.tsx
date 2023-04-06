import React, { useState, useEffect } from 'react';
import './ValueWidgetContainer.scss';
import ValueWidgetIcon from '../Icon/ValueWidgetIcon';
import { NullableString } from '../../Models/BuiltIn';
import Actions from '../Actions/Actions';

interface ValueWidgetContainerProps {
  oldValue: NullableString;
  onChange: (value: NullableString) => void;
  onUseAction: () => void;
  renderWidget: (onChange: (value: NullableString) => void, value: NullableString) => JSX.Element;
}

export default function ValueWidgetContainer({ renderWidget, oldValue, onUseAction, onChange }: ValueWidgetContainerProps) {
  const [value, setValue] = useState<NullableString>('');

  useEffect(() => {
    setValue(oldValue);
  }, [oldValue]);

  const actionsShouldBeVisible = value !== oldValue;

  const acceptChange = () => {
    onChange(value);
    onUseAction();
  };

  const rejectChange = () => {
    onUseAction();
  };

  return (
    <>
      {renderWidget(setValue, value)}
      <Actions visible={actionsShouldBeVisible}>
        <ValueWidgetIcon src="./reject-icon.png" onClick={rejectChange} />
        <ValueWidgetIcon src="./accept-icon.png" onClick={acceptChange} />
      </Actions>
    </>
  );
}
