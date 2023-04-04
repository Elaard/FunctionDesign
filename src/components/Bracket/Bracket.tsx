import React from 'react';

interface LeftBracketProps {
  bracket: string;
  highlight: boolean;
}

export default function Bracket({ highlight, bracket }: LeftBracketProps) {
  return <span style={highlight ? { 'color': 'green' } : {}} >{bracket}</span>;
}
