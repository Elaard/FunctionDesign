import React, { useState, useEffect } from 'react';

interface ValueWidgetContainerProps {
  value: string;
  onChange: (value: string) => void;
  renderWidget: (onChange: (value: string) => void, value: string) => JSX.Element;
}

export default function ValueWidgetContainer({ renderWidget, onChange }: ValueWidgetContainerProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
      {/* {renderWidget(onChange)} */}
      <span>accept</span>
    </>
  );
}
