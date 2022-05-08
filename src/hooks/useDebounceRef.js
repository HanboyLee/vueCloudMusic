import { customRef } from "vue";

export const useDebouncedRef = (value = "", delay = 200) => {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
};

export const useThrottle = (fn, delay = 2000) => {
  let prevTime = 0;
  return function (e) {
    let currentTime = Date.now();
    if (currentTime - prevTime > delay) {
      fn(e);
      prevTime = currentTime;
    }
  };
};
