import React, { useState, useEffect } from 'react';
import './ValueWidgetContainer.scss';
import { useKeyPress } from '../../Hooks/useKeyPress';

interface ValueWidgetContainerProps {
  oldValue?: string;
  onChange: (value: string) => void;
  onUseAction: () => void;
  renderWidget: (onChange: (value: string) => void, value: string) => JSX.Element;
}

export default function ValueWidgetContainer({ renderWidget, oldValue = '', onUseAction, onChange }: ValueWidgetContainerProps) {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(oldValue);
  }, [oldValue]);

  const acceptChange = () => {
    onChange(value);
    onUseAction();
  };

  const rejectChange = onUseAction;

  useKeyPress('Enter', acceptChange);

  useKeyPress('Escape', rejectChange);

  return renderWidget(setValue, value);
}
