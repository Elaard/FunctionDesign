import React from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { SchemeItem } from '../../Models/SchemeItem';
import WidgetFactory from '../WidgetFactory/WidgetFactory';
import Separator from '../Separator/Separator';

interface FunctionSchemaProps {
  args: SchemeItem[];
}

export default function FunctionBody({ args }: FunctionSchemaProps) {
  const renderSeparator = (argIndex: number) => {
    if (argIndex !== args.length - 1) {
      return <Separator separator="," />;
    }
  };

  return (
    <>
      {args.map((arg, index) => (
        <>
          <WidgetFactory key={arg.argId + '_arg'} argument={arg} acceptedDropTypes={[arg.type]} />
          {renderSeparator(index)}
        </>
      ))}
    </>
  );
}
