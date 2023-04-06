import React from 'react';

interface ActionsProps {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
}

export default function Actions({ visible, children }: ActionsProps) {
  return visible ? <span>{children}</span> : null;
}
