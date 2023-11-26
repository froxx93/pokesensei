import type { Name, NamedAPIResource } from "pokenode-ts";
import SuperJSON from "superjson";

export type ValueOf<T> = T[keyof T];

type Key = string | number | symbol;
type UnionMap<T extends Key> = {
  [K in T]: K;
};
export type Include<
  T extends Key,
  U extends UnionMap<T>[keyof UnionMap<T>],
> = T extends U ? T : never;

export const getIdOfNamedRes: (res: NamedAPIResource) => number = (res) => {
  const arr = res.url.split("/");

  return parseInt(arr[arr.length - 2]!);
};

// impure!
export const shuffle = <T>(a: T[]): T[] => {
  let j;
  let x;
  for (let i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i]!;
    a[i] = a[j]!;
    a[j] = x;
  }

  return a;
};

export const sleep = async (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// pass any resource having names and name
export const getLocalizedName = (
  {
    names,
    name,
  }: {
    names: Name[];
    name: string;
  },
  lang: string,
) => {
  // TODO: use selected locale instead
  return names.find((n) => n.language.name === lang)?.name ?? name;
};

export const fillArrayWithNumbers = (number: number): number[] => {
  return [...Array<void>(number)].map((_, i) => i + 1);
};

export const formatData = (data: unknown) => {
  return JSON.stringify(
    SuperJSON.parse(SuperJSON.stringify(data)),
    undefined,
    2,
  );
};
