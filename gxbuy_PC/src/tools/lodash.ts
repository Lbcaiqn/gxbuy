export function debunce(fn: Function, delay: number = 1000) {
  let t: NodeJS.Timeout | null = null;
  return function () {
    if (t != null) clearTimeout(t)
    t = setTimeout(() => {
      fn();
    }, delay)
  }
}

export function throttle(fn: Function,delay: number = 1000){
  let flag: boolean = true;
  return function(...rest: any[]){
    if(flag){
      setTimeout(() => {
        fn(...rest);
        flag = true;
      },delay);
      flag = false;
    }
  }
}