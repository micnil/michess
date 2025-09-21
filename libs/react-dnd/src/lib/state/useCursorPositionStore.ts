import { Position } from '@michess/common-utils';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type CursorPositionStoreState = { position: Position };

type PositionStoreActions = {
  setPosition: (nextPosition: CursorPositionStoreState['position']) => void;
};

type CursorPositionStore = CursorPositionStoreState & PositionStoreActions;

export const useCursorPositionStore = create<CursorPositionStore>()(
  subscribeWithSelector((set) => ({
    position: { x: 0, y: 0 },
    setPosition: (nextPosition) => set({ position: nextPosition }),
  }))
);
