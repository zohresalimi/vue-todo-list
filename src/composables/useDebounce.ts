import { onUnmounted } from 'vue';

/**
 * Creates a debounced function that delays invoking the provided function
 * until after `delay` milliseconds have elapsed since the last time it was invoked.
 */
function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Debounced function that will invoke the original function after a delay.
   */
  const debounced = (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  /**
   * Cancels the pending debounce operation if there is one.
   */
  const cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  // Automatically cancel the debounce when the component is unmounted.
  onUnmounted(cancel);

  return { debounced, cancel };
}

export default useDebounce;
