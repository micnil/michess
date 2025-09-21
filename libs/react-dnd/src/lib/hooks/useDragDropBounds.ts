import { assertDefined, Maybe } from '@michess/common-utils';
import { useCallback, useRef } from 'react';
import { useCursorPositionStore } from '../state/useCursorPositionStore';
import { useDragDropStore } from '../state/useDragDropStore';
import { eventToPosition } from '../utils/eventToPosition';
import { positionWithinElement } from '../utils/positionWithinElement';

type DragDropBounds = {
  draggingId: Maybe<string>;
  register(ref: Element | null): void;
};

export const useDragDropBounds = (): DragDropBounds => {
  const dropzoneRef =
    useRef<
      Maybe<{ element: SVGGraphicsElement; unsubscribeEvents: () => void }>
    >(undefined);

  const setPosition = useCursorPositionStore((state) => state.setPosition);
  const draggingId = useDragDropStore((state) => state.draggingId);
  const handleRelease = useDragDropStore((state) => state.handleRelease);
  const handlePress = useDragDropStore((state) => state.handlePress);
  const handleMove = useDragDropStore((state) => state.handleMove);

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      dropzoneRef.current?.unsubscribeEvents();
      dropzoneRef.current = undefined;
      if (element) {
        assertDefined(element, 'Must register svg element');
        const handlePressEvent = (evt: MouseEvent | TouchEvent) => {
          const pos = eventToPosition(evt);
          setPosition(pos);
          if (!positionWithinElement(pos, element)) {
            console.log('not within element');
            handlePress(undefined);
          }
        };

        const handleMoveEvent = (evt: MouseEvent | TouchEvent) => {
          const pos = eventToPosition(evt);
          setPosition(pos);
          handleMove(pos);
        };

        const handleReleaseEvent = (evt: MouseEvent | TouchEvent) => {
          setPosition(eventToPosition(evt));
          handleRelease();
        };

        const unsubscribeEvents = () => {
          console.debug('unsubscribing drop events');
          element.ownerDocument.removeEventListener(
            'mousedown',
            handlePressEvent
          );
          element.ownerDocument.removeEventListener(
            'mousemove',
            handleMoveEvent
          );
          element.ownerDocument.removeEventListener(
            'mouseup',
            handleReleaseEvent
          );

          element.ownerDocument.removeEventListener(
            'touchstart',
            handlePressEvent
          );
          element.ownerDocument.removeEventListener(
            'touchmove',
            handleMoveEvent
          );
          element.ownerDocument.removeEventListener(
            'touchend',
            handleReleaseEvent
          );
          element.ownerDocument.removeEventListener(
            'touchcancel',
            handleReleaseEvent
          );
        };

        element.ownerDocument.addEventListener('mousedown', handlePressEvent);
        element.ownerDocument.addEventListener('mousemove', handleMoveEvent);
        element.ownerDocument.addEventListener('mouseup', handleReleaseEvent);

        element.ownerDocument.addEventListener('touchstart', handlePressEvent);
        element.ownerDocument.addEventListener('touchmove', handleMoveEvent);
        element.ownerDocument.addEventListener('touchend', handleReleaseEvent);
        element.ownerDocument.addEventListener(
          'touchcancel',
          handleReleaseEvent
        );
        dropzoneRef.current = { element, unsubscribeEvents };
      }
    },
    [handleMove, handlePress, handleRelease, setPosition]
  );

  return {
    draggingId,
    register,
  };
};
