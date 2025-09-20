import { assertDefined, Maybe, Position } from '@michess/common-utils';
import { useCallback, useRef } from 'react';
import { useDragDropContext } from './useDragDropContext';

type Drop = {
  register(ref: Element | null): void;
  isHovering: boolean;
};

type Options = {
  id: string;
  onDrop?: (id: string) => void;
};

const positionWithinDomRect = (position: Position, domRect: DOMRect) => {
  return domRect.left < position.x && position.x < domRect.right
    ? domRect.top < position.y && position.y < domRect.bottom
    : false;
};

const mouseEventWithinElement = (
  evt: MouseEvent | TouchEvent,
  element: SVGElement
) => {
  const mousePos: Position =
    'touches' in evt
      ? { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
      : { x: evt.clientX, y: evt.clientY };
  const elementDomRect = element.getBoundingClientRect();

  return positionWithinDomRect(mousePos, elementDomRect);
};

export const useDrop = ({ id, onDrop }: Options): Drop => {
  const dropzoneRef =
    useRef<
      Maybe<{ element: SVGGraphicsElement; unsubscribeEvents: () => void }>
    >(undefined);
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;
  const { state, enterDroppable, leaveDroppable } = useDragDropContext();

  const isOverMe = state.overDroppableId === id;

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      dropzoneRef.current?.unsubscribeEvents();
      dropzoneRef.current = undefined;
      if (element) {
        const ownerSVGElement = element.ownerSVGElement;
        assertDefined(ownerSVGElement, 'Must register svg elements');
        const handlePress = (evt: MouseEvent | TouchEvent) => {
          if (mouseEventWithinElement(evt, element)) {
            enterDroppable(id);
            console.debug('dragging from: ', id);
          }
        };

        const handleDrag = (evt: MouseEvent | TouchEvent) => {
          if (isOverMe && state.draggingId) {
            if (!mouseEventWithinElement(evt, element)) {
              leaveDroppable(id);
              console.debug('leaving: ', id);
            }
          } else if (state.draggingId) {
            if (mouseEventWithinElement(evt, element)) {
              enterDroppable(id);
              console.debug('entering: ', id);
            }
          }
        };

        const handleRelease = (evt: MouseEvent | TouchEvent) => {
          if (
            state.draggingId &&
            positionWithinDomRect(
              state.mousePosRef.current,
              element.getBoundingClientRect()
            )
          ) {
            console.debug('dropped on ', id);
            leaveDroppable(id);
            onDropRef.current?.(state.draggingId);
          }
        };

        const unsubscribeEvents = () => {
          console.debug('unsubscribing drop events');
          ownerSVGElement.removeEventListener('mousedown', handlePress);
          ownerSVGElement.removeEventListener('mousemove', handleDrag);
          element.ownerDocument.removeEventListener('mouseup', handleRelease);

          ownerSVGElement.removeEventListener('touchstart', handlePress);
          ownerSVGElement.removeEventListener('touchmove', handleDrag);
          element.ownerDocument.removeEventListener(
            'touchend',
            handleRelease,
            true
          );
          element.ownerDocument.removeEventListener(
            'touchcancel',
            handleRelease
          );
        };

        ownerSVGElement.addEventListener('mousedown', handlePress);
        ownerSVGElement.addEventListener('mousemove', handleDrag);
        element.ownerDocument.addEventListener('mouseup', handleRelease);

        ownerSVGElement.addEventListener('touchstart', handlePress);
        ownerSVGElement.addEventListener('touchmove', handleDrag);
        element.ownerDocument.addEventListener('touchend', handleRelease, true);
        element.ownerDocument.addEventListener('touchcancel', handleRelease);
        dropzoneRef.current = { element, unsubscribeEvents };
      }
    },
    [
      enterDroppable,
      id,
      isOverMe,
      state.draggingId,
      state.mousePosRef,
      leaveDroppable,
    ]
  );

  return {
    register,
    isHovering: isOverMe,
  };
};
