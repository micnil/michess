import { useCallback, useEffect, useRef } from 'react';
import { useDragDropContext } from './useDragDropContext';

type Drop = {
  register(ref: Element | null): void;
};

type Options = {
  id: string;
};

export const useDrop = ({ id }: Options): Drop => {
  const elementRef = useRef<Element | null>(null);
  const { state, enterDroppable, leaveDroppable } = useDragDropContext();

  const handleMouseEnter = useCallback(
    (evt: Event) => {
      enterDroppable(id);
    },
    [enterDroppable, id]
  );

  const handleMouseLeave = useCallback(
    (_: Event) => {
      leaveDroppable(id);
    },
    [id, leaveDroppable]
  );

  const handleMouseUp = useCallback(
    (_: Event) => {
      if (state.overDroppableId === id) {
        console.log('dropped on ', id);
      }
    },
    [id, state.overDroppableId]
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  const register = (element: Element | null) => {
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    } else {
      elementRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      elementRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    }
    elementRef.current = element;
  };

  return {
    register,
  };
};
