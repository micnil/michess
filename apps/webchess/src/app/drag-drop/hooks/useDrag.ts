import { useCallback, useEffect, useRef, useState } from 'react';
import { useDragDropContext } from './useDragDropContext';
import { Position } from '../../types/Position';

type Drag = {
  register(ref: Element | null): void;
  position: Position;
  isDragging: boolean;
};

type Options = {
  id: string;
  initialPosition: Position;
};

export const useDrag = ({ id, initialPosition }: Options): Drag => {
  const elementRef = useRef<Element | null>(null);
  const [position, setPosition] = useState<Position>(initialPosition);
  const { state, startDragging, stopDragging } = useDragDropContext();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (state.draggingId === id && elementRef.current) {
        setPosition((pos) => ({
          x: pos.x + e.movementX,
          y: pos.y + e.movementY,
        }));
      }
    },
    [id, state.draggingId]
  );

  const handleMouseDown = useCallback(
    (_: Event) => {
      startDragging(id);
    },
    [id, startDragging]
  );

  const handleMouseUp = useCallback(
    (_: Event) => {
      stopDragging(id);
    },
    [id, stopDragging]
  );

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
    isDragging: state.draggingId === id,
    position: position,
  };
};
