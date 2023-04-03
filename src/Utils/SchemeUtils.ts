import { Scheme } from '../Models/SchemeItem';

export interface SchemeUtils {
  removeItem: (deletedId: string, scheme: Scheme) => Scheme;
}

function getItemsIdsByParentId(parentId: string, scheme: Scheme): string[] {
  const ids: string[] = [];

  scheme.forEach((item) => {
    if (item.parentId === parentId) {
      ids.push(item.id);
      if (item.type === 'Func') {
        ids.push(...getItemsIdsByParentId(item.id, scheme));
      }
    }
  });

  return ids;
}

function removeItem(deletedId: string, scheme: Scheme): Scheme {
  const itemsToRemove = [deletedId, ...getItemsIdsByParentId(deletedId, scheme)];
  return scheme.filter((item) => !itemsToRemove.includes(item.id));
}

export const SchemeUtils: SchemeUtils = {
  removeItem,
};
