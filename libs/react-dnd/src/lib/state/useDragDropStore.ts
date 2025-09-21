import { Maybe, Position } from '@michess/common-utils';
import { create } from 'zustand';

type DragDropStoreState = {
  isPressing: boolean;
  isDragging: boolean;
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
  handlePress: (id) => {
    console.log('handlePress', { id });
    set({
      isPressing: true,
      isDragging: false,
      draggingId: id,
    });
  },
  handleMove: () =>
    set((state) => ({ isDragging: state.isPressing && !!state.draggingId })),
  handleRelease: () =>
    set((state) => ({
      isPressing: false,
      isDragging: false,
      draggingId: state.isDragging ? undefined : state.draggingId,
    })),
}));
useDragDropStore.subscribe((store) =>
  console.log({
    isPressing: store.isPressing,
    isDragging: store.isDragging,
    draggingId: store.draggingId,
  })
);
