import { assertDefined, Maybe, Position } from '@michess/common-utils';
import { useCallback, useMemo, useRef } from 'react';
import { useDragDropStore } from '../state/useDragDropStore';
import { usePointerStore } from '../state/usePointerStore';
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

const eventWithinElement = (evt: PointerEvent, element: SVGElement) => {
  const mousePos: Position = eventToPosition(evt);

  return positionWithinElement(mousePos, element);
};

export const useDrop = ({ id, onDrop }: Options): Drop => {
  const dropzoneRef =
    useRef<
      Maybe<{ element: SVGGraphicsElement; unsubscribeEvents: () => void }>
    >(undefined);
  const cursorPosition = usePointerStore((state) => state.position);
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
        element.dataset.dropzoneId = id;
        const ownerSVGElement = element.ownerSVGElement;
        assertDefined(ownerSVGElement, 'Must register svg elements');
        const handlePressEvent = (evt: PointerEvent) => {
          evt.preventDefault();
          if (draggingId) {
            onDropRef.current?.(draggingId);
          }
          if (evt.isTrusted) {
            handlePress(undefined);
          }
        };

        const handleReleaseEvent = (evt: PointerEvent) => {
          if (draggingId && eventWithinElement(evt, element)) {
            onDropRef.current?.(draggingId);
          }
        };

        const unsubscribeEvents = () => {
          element.removeEventListener('pointerdown', handlePressEvent);
          ownerSVGElement.removeEventListener('pointerup', handleReleaseEvent);
          ownerSVGElement.removeEventListener(
            'pointercancel',
            handleReleaseEvent
          );
        };

        element.addEventListener('pointerdown', handlePressEvent);
        ownerSVGElement.addEventListener('pointerup', handleReleaseEvent);
        ownerSVGElement.addEventListener('pointercancel', handleReleaseEvent);
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
