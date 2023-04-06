import { FuncItem } from '../Models/FuncItem';
import { SchemeItem } from '../Models/SchemeItem';

interface ArgumentUtils {
  whetherSourceIsFunction(argument: SchemeItem | FuncItem): boolean;
}

function whetherSourceIsFunction(argument: SchemeItem | FuncItem) {
  return argument.source === 'func';
}

export const argumentUtils: ArgumentUtils = {
  whetherSourceIsFunction,
};
