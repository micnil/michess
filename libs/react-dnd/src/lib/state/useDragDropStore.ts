import { Maybe, Position } from '@michess/common-utils';
import { create } from 'zustand';

type DragDropStoreState = {
  isPressing: boolean;
  isDragging: boolean;
  previousDraggingId: Maybe<string>;
  draggingId: Maybe<string>;
};

type DragDropStoreActions = {
  handlePress: (id: Maybe<string>) => void;
  handleMove: (position: Position) => void;
  handleRelease: () => void;
};

type DragDropStore = DragDropStoreState & DragDropStoreActions;

export const useDragDropStore = create<DragDropStore>()((set) => ({
  isPressing: false,
  isDragging: false,
  draggingId: undefined,
  previousDraggingId: undefined,
  handlePress: (id) => {
    set((state) => ({
      isPressing: true,
      isDragging: false,
      draggingId: id,
      previousDraggingId: state.draggingId,
    }));
  },
  handleMove: () =>
    set((state) => ({ isDragging: state.isPressing && !!state.draggingId })),
  handleRelease: () =>
    set((state) => ({
      isPressing: false,
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
    isPressing: store.isPressing,
    isDragging: store.isDragging,
    draggingId: store.draggingId,
    previousDraggingId: store.previousDraggingId,
  }),
);
