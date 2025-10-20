import { Maybe, Position } from '@michess/common-utils';
import { create } from 'zustand';

type DragDropStoreState = {
  pressedAt: Maybe<Date>;
  isDragging: boolean;
  previousDraggingId: Maybe<string>;
  draggingId: Maybe<string>;
};

type DragDropStoreActions = {
  handlePress: (id: Maybe<string>) => void;
  handleMove: (position: Position) => void;
  handleRelease: () => void;
};

const hasPassedMs = (start: Date, ms: number): boolean => {
  return new Date().getTime() - start.getTime() >= ms;
};

type DragDropStore = DragDropStoreState & DragDropStoreActions;

export const useDragDropStore = create<DragDropStore>()((set) => ({
  pressedAt: undefined,
  isDragging: false,
  draggingId: undefined,
  previousDraggingId: undefined,
  handlePress: (id) => {
    set((state) => ({
      pressedAt: new Date(),
      isDragging: false,
      draggingId: id,
      previousDraggingId: state.draggingId,
    }));
  },
  handleMove: () =>
    set((state) => ({
      isDragging:
        state.pressedAt &&
        hasPassedMs(state.pressedAt, 80) &&
        !!state.draggingId,
    })),
  handleRelease: () =>
    set((state) => ({
      pressedAt: undefined,
      isDragging: false,
      draggingId: state.isDragging
        ? undefined
        : state.previousDraggingId === state.draggingId
          ? undefined
          : state.draggingId,
    })),
}));

useDragDropStore.subscribe((store) =>
  console.debug({
    isPressing: store.pressedAt,
    isDragging: store.isDragging,
    draggingId: store.draggingId,
    previousDraggingId: store.previousDraggingId,
  }),
);
