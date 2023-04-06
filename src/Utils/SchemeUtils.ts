import { ConfigItem, FuncItem, FuncItemMetaSchemeArg } from '../Models/ConfigItem';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { v4 as uuidv4 } from 'uuid';

export interface SchemeUtils {
  addArgument: (argument: ConfigItem, parentId: string, scheme: Scheme) => Scheme;
  removeArgument: (deletedId: string, scheme: Scheme) => Scheme;
  updateArgumentValue(previous: SchemeItem, value: string, scheme: Scheme): Scheme;
  replaceArgument(argument: ConfigItem, replacedId: string, scheme: Scheme): Scheme;
  getArgumentByArgId(scheme: Scheme, argId: string): SchemeItem | undefined;
  addEmptyArgument(parentId: string, type: string, scheme: Scheme): Scheme;
  createArgument(argument: Partial<ConfigItem>, parentId: string): SchemeItem;
}

function getArgsIdsBasedOnParentId(parentId: string, scheme: Scheme): string[] {
  if (!parentId) {
    return [];
  }
  const ids: string[] = [];

  scheme.forEach((item) => {
    if (item.parentId === parentId) {
      ids.push(item.argId);
      if (item.source === 'Func') {
        ids.push(...getArgsIdsBasedOnParentId(item.argId, scheme));
      }
    }
  });

  return ids;
}

function getArgumentByArgId(scheme: Scheme, argId: string) {
  return scheme.find((argument) => argument.argId === argId);
}

function removeInvalidArguments(invalidIds: string[], scheme: Scheme) {
  return scheme.filter((item) => !invalidIds.includes(item.argId));
}

function removeArgument(deletedId: string, scheme: Scheme): Scheme {
  const invalidIds = [deletedId, ...getArgsIdsBasedOnParentId(deletedId, scheme)];
  return removeInvalidArguments(invalidIds, scheme);
}

function createArgumentBasedOnConfigItem(argument: ConfigItem, parentId: string): SchemeItem {
  return { itemId: argument.id, source: argument.source, type: argument.type, argId: uuidv4(), parentId };
}

function createValueArgument(parentId: string, type: string): SchemeItem {
  const uuid = uuidv4();
  return { itemId: uuid, argId: uuid, type, source: 'value', parentId };
}

function shouldCreateBasicScheme(argument: FuncItem) {
  return argument.source === 'func' && argument.meta?.scheme.hasStrictScheme;
}

function createArgumentBasedOnMeta(argument: FuncItemMetaSchemeArg, parentId: string) {
  return createArgumentBasedOnConfigItem({ ...argument, id: uuidv4() }, parentId);
}

function createArgumentsBasedOnMeta(argument: FuncItem, parentId: string) {
  return argument.meta?.scheme.arguments.map((arg) => createArgumentBasedOnMeta(arg, parentId)) ?? [];
}

function addArgument(argument: ConfigItem, parentId: string, scheme: Scheme): Scheme {
  const schemeItem = createArgumentBasedOnConfigItem(argument, parentId);
  const schemeItems = [schemeItem];
  if (shouldCreateBasicScheme(argument)) {
    schemeItems.push(...createArgumentsBasedOnMeta(argument, schemeItem.argId));
  }
  return [...scheme, ...schemeItems];
}

function addEmptyArgument(parentId: string, type: string, scheme: Scheme): Scheme {
  return [...scheme, createValueArgument(parentId, type)];
}

function updateValueItem(previousArg: SchemeItem, value: string): SchemeItem {
  return {
    ...previousArg,
    value,
  };
}

function updateArgumentValue(previous: SchemeItem, value: string, scheme: Scheme): Scheme {
  const validScheme = recalculateSchemeIfNecessary(scheme, previous);
  function updateItem(previousArg: SchemeItem): SchemeItem {
    return updateValueItem(previousArg, value);
  }
  return updateSchemeOnMatchingArgId(validScheme, previous.argId, updateItem);
}

function updateSelectItem(previousArg: SchemeItem, configItem: ConfigItem): SchemeItem {
  return {
    ...previousArg,
    itemId: configItem.id,
    source: configItem.source,
    value: configItem.value,
  };
}

function replaceArgument(argument: ConfigItem, replacedArgumentId: string, scheme: Scheme): Scheme {
  const replacedArgument = getArgumentByArgId(scheme, replacedArgumentId);

  if (!replacedArgument) {
    return scheme;
  }

  if (argument.id === replacedArgument.itemId) {
    return scheme;
  }

  const validScheme = recalculateSchemeIfNecessary(scheme, replacedArgument);

  function updateItem(previousArg: SchemeItem): SchemeItem {
    return updateSelectItem(previousArg, argument);
  }

  if (shouldCreateBasicScheme(argument)) {
    validScheme.push(...createArgumentsBasedOnMeta(argument, replacedArgument.argId));
  }

  return updateSchemeOnMatchingArgId(validScheme, replacedArgumentId, updateItem);
}

function recalculateSchemeByArgId(argumentId: string, scheme: Scheme): Scheme {
  const invalidIds = getArgsIdsBasedOnParentId(argumentId, scheme);
  return removeInvalidArguments(invalidIds, scheme);
}

function requireRecalculation(source: string): boolean {
  return source === 'func';
}

function copyScheme(scheme: Scheme): Scheme {
  return [...scheme];
}

function updateSchemeOnMatchingArgId(scheme: Scheme, matchingId: string, createItem: (previousArg: SchemeItem) => SchemeItem): Scheme {
  return scheme.map((arg) => {
    if (arg.argId === matchingId) {
      return createItem(arg);
    }
    return arg;
  });
}

function recalculateSchemeIfNecessary(scheme: Scheme, argument: SchemeItem) {
  return requireRecalculation(argument.source) ? recalculateSchemeByArgId(argument.argId, scheme) : copyScheme(scheme);
}

export const SchemeUtils: SchemeUtils = {
  addArgument,
  removeArgument,
  updateArgumentValue,
  replaceArgument,
  getArgumentByArgId,
  addEmptyArgument,
  createArgument: createArgumentBasedOnConfigItem,
};
