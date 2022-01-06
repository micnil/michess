import { Position } from '@michess/common-utils';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useMousePosRef = (): MutableRefObject<Position> => {
  const mousePosRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useCallback((evt: MouseEvent) => {
    mousePosRef.current = {
      x: evt.clientX,
      y: evt.clientY,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return mousePosRef;
};
