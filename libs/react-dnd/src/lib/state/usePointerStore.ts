import { Position } from '@michess/common-utils';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type PointerStoreState = { position: Position };

type PointerStoreActions = {
  setPosition: (nextPosition: PointerStoreState['position']) => void;
};

type PointerStore = PointerStoreState & PointerStoreActions;

export const usePointerStore = create<PointerStore>()(
  subscribeWithSelector((set) => ({
    position: { x: 0, y: 0 },
    setPosition: (nextPosition) => set({ position: nextPosition }),
  })),
);
