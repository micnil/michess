import React from 'react';
import { Maybe } from '../../common-types/Maybe';
import { Position } from '../types/Position';

export type UpdatePositionCb = (pos: Position) => Position;
export type DragDropState = {
  overDroppableId: Maybe<string>;
  draggingId: Maybe<string>;
};

export type DragDropContextState = {
  state: DragDropState;
  startDragging(id: string): void;
  stopDragging(id: string): void;
  enterDroppable(id: string): void;
  leaveDroppable(id: string): void;
};

export const DragDropContext =
  React.createContext<Maybe<DragDropContextState>>(undefined);
