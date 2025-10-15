import { Position } from '@michess/common-utils';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useMousePosRef = (): MutableRefObject<Position> => {
  const mousePosRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  const updatePosition = useCallback((x: number, y: number) => {
    mousePosRef.current = {
      x,
      y,
    };
  }, []);

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
      updatePosition(evt.clientX, evt.clientY);
    },
    [updatePosition],
  );

  const handleTouchMove = useCallback(
    (evt: TouchEvent) => {
      // Use the first touch point
      const touch = evt.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    },
    [updatePosition],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, true);
    window.addEventListener('touchstart', handleTouchMove, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove, true);
      window.removeEventListener('touchstart', handleTouchMove, true);
    };
  }, [handleMouseMove, handleTouchMove]);

  return mousePosRef;
};
