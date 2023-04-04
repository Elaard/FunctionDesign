import { Scheme, SchemeItem } from '../Models/SchemeItem';
import { v4 as uuidv4 } from 'uuid';

export interface SchemeUtils {
  addArgument: (argument: SchemeItem, scheme: Scheme) => Scheme;
  removeArgument: (deletedId: string, scheme: Scheme) => Scheme;
  replaceArgument(argument: SchemeItem, scheme: Scheme, replacedId: string): Scheme;
  removeInvalidArguments(invalidIds: string[], scheme: Scheme): SchemeItem[];
  getArgumentByArgId(scheme: Scheme, argId: string): SchemeItem | undefined;
}

function getArgsIdsBasedOnParentId(parentId: string, scheme: Scheme): string[] {
  if (!parentId) {
    return [];
  }
  const ids: string[] = [];

  scheme.forEach((item) => {
    if (item.parentId === parentId) {
      ids.push(item.id);
      if (item.itemType === 'Func') {
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
  return scheme.filter((item) => !invalidIds.includes(item.argId as string));
}

function removeArgument(deletedId: string, scheme: Scheme): Scheme {
  const invalidIds = [deletedId, ...getArgsIdsBasedOnParentId(deletedId, scheme)];
  return removeInvalidArguments(invalidIds, scheme);
}

function addArgument(argument: SchemeItem, scheme: Scheme): Scheme {
  return [...scheme, { ...argument, argId: uuidv4() }];
}

function recalculateSchemeByArgId(argumentId: string, scheme: Scheme): Scheme {
  const invalidIds = getArgsIdsBasedOnParentId(argumentId, scheme);
  return removeInvalidArguments(invalidIds, scheme);
}

function replaceArgument(argument: SchemeItem, scheme: Scheme, replacedArgumentId: string): Scheme {
  let oldScheme = [...scheme];
  const replacedArgument = getArgumentByArgId(scheme, replacedArgumentId);
  if (replacedArgument) {
    if (replacedArgument.argumentType === 'func') {
      oldScheme = recalculateSchemeByArgId(replacedArgument.argId as string, scheme);
    }
  }
  return oldScheme.map((oldArg) => {
    if (oldArg.argId === replacedArgumentId) {
      return { ...argument, argId: oldArg.argId, parentId: oldArg.parentId };
    }
    return oldArg;
  });
}

export const SchemeUtils: SchemeUtils = {
  addArgument,
  removeArgument,
  replaceArgument,
  getArgumentByArgId,
  removeInvalidArguments,
};
