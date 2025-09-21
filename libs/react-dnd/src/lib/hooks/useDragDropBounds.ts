import { assertDefined, Maybe } from '@michess/common-utils';
import { useCallback, useRef } from 'react';
import { useDragDropStore } from '../state/useDragDropStore';
import { usePointerStore } from '../state/usePointerStore';
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

  const setPosition = usePointerStore((state) => state.setPosition);
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
        const handlePressEvent = (evt: PointerEvent) => {
          const pos = eventToPosition(evt);
          setPosition(pos);
          if (!positionWithinElement(pos, element)) {
            console.log('not within element');
            handlePress(undefined);
          }
        };

        const handleMoveEvent = (evt: PointerEvent) => {
          const pos = eventToPosition(evt);
          setPosition(pos);
          handleMove(pos);
        };

        const handleReleaseEvent = (evt: PointerEvent) => {
          setPosition(eventToPosition(evt));
          handleRelease();
        };

        const unsubscribeEvents = () => {
          console.debug('unsubscribing drop events');
          element.ownerDocument.removeEventListener(
            'pointerdown',
            handlePressEvent
          );
          element.ownerDocument.removeEventListener(
            'pointermove',
            handleMoveEvent
          );
          element.ownerDocument.removeEventListener(
            'pointerup',
            handleReleaseEvent
          );

          element.ownerDocument.removeEventListener(
            'pointercancel',
            handleReleaseEvent
          );
        };

        element.ownerDocument.addEventListener('pointerdown', handlePressEvent);
        element.ownerDocument.addEventListener('pointermove', handleMoveEvent);
        element.ownerDocument.addEventListener('pointerup', handleReleaseEvent);
        element.ownerDocument.addEventListener(
          'pointercancel',
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
