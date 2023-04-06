import React from 'react';
import './ValueWidgetIcon.scss';

interface ValueWidgetIconProps {
  src: string;
  onClick: () => void;
}

export default function ValueWidgetIcon({ src, onClick }: ValueWidgetIconProps) {
  return <img className="value-widget-icon" src={src} onClick={onClick} alt="" />;
}
