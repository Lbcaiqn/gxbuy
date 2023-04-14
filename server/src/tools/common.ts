import { Category } from '@//types/index';

export function toThree(
  categories: Category[],
  minLevel: number,
  maxLevel: number,
  pid: number | null = null
): Category[] | null {
  if (minLevel > maxLevel) return null;

  let res: Category[] = [];
  if (!pid) res = categories.filter((i: Category) => i.cat_level == minLevel);
  else res = categories.filter((i: Category) => i.cat_level == minLevel && i.cat_pid == pid);

  res.forEach((i: Category) => {
    i.children = toThree(categories, minLevel + 1, maxLevel, i._id);
  });

  return res;
}
