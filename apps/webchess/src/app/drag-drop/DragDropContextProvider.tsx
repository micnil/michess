import React, { useCallback, useEffect, useState } from 'react';
import { Maybe } from '../../common-types/Maybe';
import { Position } from '../Position';
import {
  DragDropContext,
  DragDropContextState,
  DragDropState,
  UpdatePositionCb,
} from './DragDropContext';

const updateDraggable = (
  state: DragDropState,
  id: string,
  position: Position
): DragDropState => {
  return {
    ...state,
    draggables: {
      ...state.draggables,
      [id]: {
        position,
      },
    },
  };
};

const updateDraggingId = (
  state: DragDropState,
  id: Maybe<string>
): DragDropState => ({
  ...state,
  draggingId: id,
});

const getPosition = (state: DragDropState, id: string) =>
  state.draggables[id].position;

export const DragDropContextProvider: React.FC = ({ children }) => {
  const [dragDropState, setDragDropState] = useState<DragDropState>({
    draggables: {},
    draggingId: undefined,
  });

  const setDraggable = useCallback((id: string, position: Position) => {
    setDragDropState((prevState) => updateDraggable(prevState, id, position));
  }, []);

  const updatePosition = useCallback((id: string, cb: UpdatePositionCb) => {
    setDragDropState((prevState) =>
      updateDraggable(prevState, id, cb(getPosition(prevState, id)))
    );
  }, []);

  const startDragging = useCallback((id: string) => {
    setDragDropState((prevState) => updateDraggingId(prevState, id));
  }, []);

  const stopDragging = useCallback((id: string) => {
    setDragDropState((prevState) => updateDraggingId(prevState, undefined));
  }, []);

  useEffect(() => {
    if (dragDropState.draggingId) {
      console.log({
        id: dragDropState.draggingId,
        ...dragDropState.draggables[dragDropState.draggingId],
      });
    } else {
      console.log(dragDropState.draggables);
    }
  }, [dragDropState]);

  return (
    <DragDropContext.Provider
      value={{
        state: dragDropState,
        setDraggable,
        updatePosition,
        startDragging,
        stopDragging,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};
