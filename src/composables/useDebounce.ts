import { onUnmounted } from 'vue';

function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      console.log('calling')
      fn(...args);
    }, delay);
  };

  const cancel = () => {
    console.log('cancelling', timeout)
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  onUnmounted(cancel);

  return { debounced, cancel };
}

export default useDebounce;
