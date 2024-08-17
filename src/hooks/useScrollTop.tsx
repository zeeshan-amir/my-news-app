import { useEffect, useRef, MutableRefObject } from 'react';

const useScrollToTop = <T extends HTMLElement>(dependency:number): MutableRefObject<T | null> => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTo(0, 0);
    }
  }, [dependency]);

  return elementRef;
};

export default useScrollToTop;
