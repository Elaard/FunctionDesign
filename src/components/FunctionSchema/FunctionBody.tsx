import React from 'react';
import { SchemeItem } from '../../Models/SchemeItem';
import WidgetFactory from '../WidgetFactory/WidgetFactory';
import Separator from '../Separator/Separator';

interface FunctionSchemaProps {
  args: SchemeItem[];
}

function FunctionBody({ args }: FunctionSchemaProps) {
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

export default FunctionBody;
