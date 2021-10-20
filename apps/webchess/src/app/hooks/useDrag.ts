import { useCallback, useEffect, useRef, useState } from 'react';
import { Position } from '../Position';

type Drag = {
  register(ref: Element | null): void;
  position: Position;
};

type Options = {
  initialPosition: Position;
};

export const useDrag = ({ initialPosition }: Options): Drag => {
  const elementRef = useRef<Element | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && elementRef.current) {
        setPosition((pos) => ({ x: pos.x + e.movementX, y: pos.y + e.movementY }));
      }
    },
    [isDragging]
  );

  const handleMouseDown = useCallback((_: Event) => {
    setIsDragging(true);
  }, []);
  const handleMouseUp = useCallback((_: Event) => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const register = (element: Element | null) => {
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
    } else {
      elementRef.current?.removeEventListener('mousedown', handleMouseDown);
    }
    elementRef.current = element;
  };

  return {
    register,
    position,
  };
};
