import { NamedAPIResource } from "pokenode-ts";

export const getIdOfNamedRes: (res: NamedAPIResource) => number = (res) => {
  const arr = res.url.split("/");

  return parseInt(arr[arr.length - 2], 10);
};

// impure!
export const shuffle = (a: any[]): any[] => {
  let j;
  let x;
  // eslint-disable-next-line no-plusplus
  for (let i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    // eslint-disable-next-line no-param-reassign
    a[i] = a[j];
    // eslint-disable-next-line no-param-reassign
    a[j] = x;
  }

  return a;
};