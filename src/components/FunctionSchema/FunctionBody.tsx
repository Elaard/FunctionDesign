import React from 'react';
import { SchemeItem } from '../../Models/SchemeItem';
import Separator from '../Separator/Separator';
import WidgetFactoryContainer from '../WidgetFactory/WidgetFactoryContainer';

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
          <WidgetFactoryContainer key={arg.argId + '_arg'} argument={arg} acceptedDropTypes={[arg.type]} />
          {renderSeparator(index)}
        </>
      ))}
    </>
  );
}

export default FunctionBody;
