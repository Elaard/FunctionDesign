import { ConfigItem } from '../Models/ConfigItems';
import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { v4 as uuidv4 } from 'uuid';

export interface SchemeUtils {
  addArgument: (argument: ConfigItem, parentId: string, scheme: Scheme) => Scheme;
  removeArgument: (deletedId: string, scheme: Scheme) => Scheme;
  updateArgument(argument: SchemeItem, updated: Partial<ConfigItem>, scheme: Scheme): Scheme;
  replaceArgument(argument: ConfigItem, scheme: Scheme, replacedId: string): Scheme;
  getArgumentByArgId(scheme: Scheme, argId: string): SchemeItem | undefined;
  addEmptyArgument(parentId: string, type: string, scheme: Scheme): Scheme;
}

function getArgsIdsBasedOnParentId(parentId: string, scheme: Scheme): string[] {
  if (!parentId) {
    return [];
  }
  const ids: string[] = [];

  scheme.forEach((item) => {
    if (item.parentId === parentId) {
      ids.push(item.id);
      if (item.source === 'Func') {
        ids.push(...getArgsIdsBasedOnParentId(item.id, scheme));
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

function addArgument(argument: ConfigItem, parentId: string, scheme: Scheme): Scheme {
  return [...scheme, { ...argument, argId: uuidv4(), parentId }];
}

function recalculateSchemeByArgId(argumentId: string, scheme: Scheme): Scheme {
  const invalidIds = getArgsIdsBasedOnParentId(argumentId, scheme);
  return removeInvalidArguments(invalidIds, scheme);
}

function requireRecalculation(argument: ConfigItem): boolean {
  return argument?.source === 'func';
}

function copyScheme(scheme: Scheme): Scheme {
  return [...scheme];
}

function updateSchemeOnMatchingArgId(scheme: Scheme, item: Partial<SchemeItem>, matchingId: string) {
  return scheme.map((arg) => {
    if (arg.argId === matchingId) {
      return { ...arg, ...item };
    }
    return arg;
  });
}

function recalculateSchemeIfNecessary(scheme: Scheme, argument: SchemeItem) {
  return requireRecalculation(argument) ? recalculateSchemeByArgId(argument.argId, scheme) : copyScheme(scheme);
}

function updateArgument(previous: SchemeItem, updated: Partial<ConfigItem>, scheme: Scheme): Scheme {
  const validScheme = recalculateSchemeIfNecessary(scheme, previous);
  return updateSchemeOnMatchingArgId(validScheme, updated, previous.argId);
}

function replaceArgument(argument: ConfigItem, scheme: Scheme, replacedArgumentId: string): Scheme {
  const oldArgument = getArgumentByArgId(scheme, replacedArgumentId);

  if (!oldArgument) {
    return scheme;
  }

  if (argument.id === oldArgument.id) {
    return scheme;
  }

  const validScheme = recalculateSchemeIfNecessary(scheme, oldArgument);
  return updateSchemeOnMatchingArgId(validScheme, argument, replacedArgumentId);
}

function addEmptyArgument(parentId: string, type: string, scheme: Scheme): Scheme {
  return [...scheme, { parentId, source: 'value', type, argId: uuidv4(), id: '', name: '', value: '' }];
}

export const SchemeUtils: SchemeUtils = {
  addArgument,
  removeArgument,
  updateArgument,
  replaceArgument,
  getArgumentByArgId,
  addEmptyArgument,
};
