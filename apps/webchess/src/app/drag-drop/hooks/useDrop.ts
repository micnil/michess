import { useCallback, useEffect, useRef } from 'react';
import { useDragDropContext } from './useDragDropContext';

type Drop = {
  register(ref: Element | null): void;
};

type Options = {
  id: string;
  onDrop?: (id: string) => void;
};

export const useDrop = ({ id, onDrop }: Options): Drop => {
  const elementRef = useRef<Element | null>(null);
  const { state, enterDroppable, leaveDroppable } = useDragDropContext();

  const handleMouseEnter = useCallback(
    (_: Event) => {
      console.log('enter ', id)
      enterDroppable(id);
    },
    [enterDroppable, id]
  );

  const handleMouseLeave = useCallback(
    (_: Event) => {
      console.log('leave ', id)
      leaveDroppable(id);
    },
    [id, leaveDroppable]
  );

  const handleMouseUp = useCallback(
    (_: Event) => {
      console.log(state.draggingId, ' ', state.overDroppableId)
      if (state.overDroppableId === id && state.draggingId) {
        console.log('dropped on ', id);
        onDrop?.(state.draggingId);
      }
    },
    [id, onDrop, state.draggingId, state.overDroppableId]
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const register = (element: Element | null) => {
    if (element) {
      element.addEventListener('mouseover', handleMouseEnter);
      element.addEventListener('mouseout', handleMouseLeave);
    } else {
      elementRef.current?.removeEventListener('mouseover', handleMouseEnter);
      elementRef.current?.removeEventListener('mouseout', handleMouseLeave);
    }
    elementRef.current = element;
  };

  return {
    register,
  };
};
