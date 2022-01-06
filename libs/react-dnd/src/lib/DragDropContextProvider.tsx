import { Maybe } from '@michess/common-utils';
import React, { useCallback, useState } from 'react';
import { DragDropContext, DragDropState } from './DragDropContext';
import { useMousePosRef } from './hooks/useMousePosRef';

const updateDraggingId = (
  state: DragDropState,
  id: Maybe<string>
): DragDropState => ({
  ...state,
  draggingId: id,
});

const updateOverDroppableId = (
  state: DragDropState,
  id: Maybe<string>
): DragDropState => ({
  ...state,
  overDroppableId: id,
});

export const DragDropContextProvider: React.FC = ({ children }) => {
  const mousePosRef = useMousePosRef();
  const [dragDropState, setDragDropState] = useState<DragDropState>({
    draggingId: undefined,
    overDroppableId: undefined,
    mousePosRef,
  });

  const startDragging = useCallback((id: string) => {
    setDragDropState((prevState) => updateDraggingId(prevState, id));
  }, []);

  const stopDragging = useCallback((id: string) => {
    setDragDropState((prevState) => updateDraggingId(prevState, undefined));
  }, []);

  const enterDroppable = useCallback((id: string) => {
    setDragDropState((prevState) => updateOverDroppableId(prevState, id));
  }, []);

  const leaveDroppable = useCallback((id: string) => {
    setDragDropState((prevState) =>
      updateOverDroppableId(prevState, undefined)
    );
  }, []);

  return (
    <DragDropContext.Provider
      value={{
        state: dragDropState,
        startDragging,
        stopDragging,
        enterDroppable,
        leaveDroppable,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};
