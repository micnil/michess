import { useCallback, useEffect, useRef } from 'react';
import { useDragDropContext } from '../drag-drop/useDragDropContext';
import { Position } from '../Position';

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
  const { state, setDraggable, updatePosition, startDragging, stopDragging } =
    useDragDropContext();

  useEffect(() => {
    setDraggable(id, initialPosition);
  }, [setDraggable, id, initialPosition]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (state.draggingId === id && elementRef.current) {
        updatePosition(id, (pos) => ({
          x: pos.x + e.movementX,
          y: pos.y + e.movementY,
        }));
      }
    },
    [id, state.draggingId, updatePosition]
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
    position: state.draggables[id]?.position ?? initialPosition,
  };
};
