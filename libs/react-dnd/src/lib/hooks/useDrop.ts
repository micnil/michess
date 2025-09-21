import { assertDefined, Maybe, Position } from '@michess/common-utils';
import { useCallback, useMemo, useRef } from 'react';
import { useCursorPositionStore } from '../state/useCursorPositionStore';
import { useDragDropStore } from '../state/useDragDropStore';
import { eventToPosition } from '../utils/eventToPosition';
import { positionWithinElement } from '../utils/positionWithinElement';

type Drop = {
  register(ref: Element | null): void;
  isHovering: boolean;
};

type Options = {
  id: string;
  onDrop?: (id: string) => void;
};

const eventWithinElement = (
  evt: MouseEvent | TouchEvent,
  element: SVGElement
) => {
  const mousePos: Position = eventToPosition(evt);

  return positionWithinElement(mousePos, element);
};

export const useDrop = ({ id, onDrop }: Options): Drop => {
  const dropzoneRef =
    useRef<
      Maybe<{ element: SVGGraphicsElement; unsubscribeEvents: () => void }>
    >(undefined);
  const cursorPosition = useCursorPositionStore((state) => state.position);
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;
  const draggingId = useDragDropStore((state) => state.draggingId);
  const handlePress = useDragDropStore((state) => state.handlePress);

  const isOverMe = useMemo(() => {
    const element = dropzoneRef.current?.element;
    return element ? positionWithinElement(cursorPosition, element) : false;
  }, [cursorPosition]);

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      dropzoneRef.current?.unsubscribeEvents();
      dropzoneRef.current = undefined;
      if (element) {
        const ownerSVGElement = element.ownerSVGElement;
        assertDefined(ownerSVGElement, 'Must register svg elements');
        const handlePressEvent = (evt: MouseEvent | TouchEvent) => {
          if (eventWithinElement(evt, element)) {
            if (draggingId && eventWithinElement(evt, element)) {
              console.debug('dropped on ', id);
              onDropRef.current?.(draggingId);
            }
            console.log(evt);
            console.log('pressed on ', id);
            handlePress(id === draggingId ? undefined : id);
          }
        };

        const handleReleaseEvent = (evt: MouseEvent | TouchEvent) => {
          if (draggingId && eventWithinElement(evt, element)) {
            console.debug('dropped on ', id);
            onDropRef.current?.(draggingId);
          }
        };

        const unsubscribeEvents = () => {
          console.debug('unsubscribing drop events');
          ownerSVGElement.removeEventListener('mousedown', handlePressEvent);
          ownerSVGElement.removeEventListener('mouseup', handleReleaseEvent);

          ownerSVGElement.removeEventListener('touchstart', handlePressEvent);
          ownerSVGElement.removeEventListener('touchend', handleReleaseEvent);
          ownerSVGElement.removeEventListener(
            'touchcancel',
            handleReleaseEvent
          );
        };

        ownerSVGElement.addEventListener('mousedown', handlePressEvent);
        ownerSVGElement.addEventListener('mouseup', handleReleaseEvent);

        ownerSVGElement.addEventListener('touchstart', handlePressEvent);
        ownerSVGElement.addEventListener('touchend', handleReleaseEvent);
        ownerSVGElement.addEventListener('touchcancel', handleReleaseEvent);
        dropzoneRef.current = { element, unsubscribeEvents };
      }
    },
    [handlePress, id, draggingId]
  );

  return {
    register,
    isHovering: isOverMe,
  };
};
