import React from 'react';
import './RootFunction.scss';
import { useSchemeContext } from '../../Context/SchemeContext';
import WidgetFactory from '../WidgetFactory/WidgetFactory';

export default function RootFunction() {
  const { getArgumentByArgId, getAllTypes } = useSchemeContext();

  const argument = getArgumentByArgId('root');
  return <ul className="root-function">{argument ? <WidgetFactory argument={argument} acceptedDropTypes={getAllTypes()} /> : null}</ul>;
}
