import React, { useCallback, useState } from 'react';
import { Maybe } from '../../util/types/Maybe';
import {
  DragDropContext,
  DragDropState,
} from './DragDropContext';

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
  const [dragDropState, setDragDropState] = useState<DragDropState>({
    draggingId: undefined,
    overDroppableId: undefined,
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

  // Logging
  // useEffect(() => {
  //   if (dragDropState.draggingId) {
  //     console.log({
  //       id: dragDropState.draggingId,
  //       ...dragDropState.draggables[dragDropState.draggingId],
  //     });
  //   } else {
  //     console.log(dragDropState.draggables);
  //   }
  // }, [dragDropState]);

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
