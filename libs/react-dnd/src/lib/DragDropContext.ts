import { Maybe, Position } from '@michess/common-utils';
import React, { MutableRefObject } from 'react';

export type UpdatePositionCb = (pos: Position) => Position;
export type DragDropState = {
  overDroppableId: Maybe<string>;
  draggingId: Maybe<string>;
  mousePosRef: MutableRefObject<Position>;
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
