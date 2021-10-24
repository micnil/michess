import React from 'react';
import { Maybe } from '../../common-types/Maybe';
import { Position } from '../Position';

export type UpdatePositionCb = (pos: Position) => Position;
export type DragDropState = {
  draggables: {
    [id: string]: {
      position: Position;
    }
  },
  overDroppableId: Maybe<string>
  draggingId: Maybe<string>;
}

export type DragDropContextState = {
  state: DragDropState,
  setDraggable(id: string, pos: Position): void,
  updatePosition(id: string, cb: UpdatePositionCb): void,
  startDragging(id: string): void,
  stopDragging(id: string): void,
  enterDroppable(id: string): void,
  leaveDroppable(id: string): void
}

export const DragDropContext = React.createContext<Maybe<DragDropContextState>>(
  undefined
);
