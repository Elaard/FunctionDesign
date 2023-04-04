import SchemeContext, { useSchemeContext } from '../Context/SchemeContext';
import ToggleContext, { useToggleContext } from '../Context/ToggleContext';
import { SchemeUtils } from './SchemeUtils';

export interface Contexts {
  useSchemeContext: () => SchemeContext;
  useToggleContext: () => ToggleContext;
}

export interface FunctionDesignUtils {
  contexts: Contexts;
  schemeUtils: SchemeUtils;
}

export const FunctionDesignUtils: FunctionDesignUtils = {
  contexts: {
    useSchemeContext,
    useToggleContext,
  },
  schemeUtils: SchemeUtils,
};
