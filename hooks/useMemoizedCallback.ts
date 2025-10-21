import { useCallback, useRef } from 'react';

/**
 * 메모이제이션된 콜백 훅
 * 의존성 배열이 변경되지 않는 한 동일한 함수 참조를 유지
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ callback: T; deps: React.DependencyList }>();
  
  if (!ref.current || deps.some((dep, index) => dep !== ref.current.deps[index])) {
    ref.current = { callback, deps };
  }
  
  return ref.current.callback;
}

/**
 * 디바운스된 콜백 훅
 * 연속된 호출을 지연시켜 성능을 최적화
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay, ...deps]
  );
}

/**
 * 쓰로틀된 콜백 훅
 * 일정 시간 간격으로만 함수 실행을 허용
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList
): T {
  const lastCallRef = useRef<number>(0);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    }) as T,
    [callback, delay, ...deps]
  );
}
