import React from 'react';
import { NullableString } from '../../Models/BuiltIn';

interface VanillaInputProps {
  value: string;
  onChange: (value: NullableString) => void;
}

export default function VanillaInput({ value, onChange }: VanillaInputProps) {
  return <input type="number" value={value} onChange={(e) => onChange(e?.target.value)} />;
}
