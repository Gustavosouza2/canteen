export const debounce = (func: Function, delay: number) => {
  let timeOutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
