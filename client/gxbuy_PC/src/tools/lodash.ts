export function debunce(fn: Function, delay: number = 1000) {
  let t: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    if (t != null) clearTimeout(t);
    t = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function throttle(fn: Function, delay: number = 1000) {
  let flag: boolean = true;
  return function (...args: any[]) {
    if (flag) {
      setTimeout(() => {
        fn(...args);
        flag = true;
      }, delay);
      flag = false;
    }
  };
}
