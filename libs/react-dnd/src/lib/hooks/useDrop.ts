import { assertDefined, Position } from '@michess/common-utils';
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
  const elementRef = useRef<SVGGraphicsElement | null>(null);
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;
  const { state, enterDroppable, leaveDroppable } = useDragDropContext();

  const handleStart = useCallback(
    (evt: MouseEvent | TouchEvent) => {
      assertDefined(
        elementRef.current,
        'drop zone not defined in eventhandler'
      );
      const svg = elementRef.current.ownerSVGElement;
      if (!svg) {
        throw new Error('Must register svg elements');
      }

      if (mouseEventWithinElement(evt, elementRef.current)) {
        enterDroppable(id);
        console.debug('dragging from: ', id);
      }
    },
    [enterDroppable, id]
  );

  const isOverMe = state.overDroppableId === id;
  const handleDrop = useCallback(
    (evt: MouseEvent | TouchEvent) => {
      assertDefined(
        elementRef.current,
        'drop zone not defined in eventhandler'
      );
      if (
        state.draggingId &&
        mouseEventWithinElement(evt, elementRef.current)
      ) {
        console.debug('dropped on ', id);
        leaveDroppable(id);
        onDropRef.current?.(state.draggingId);
      }
    },
    [id, leaveDroppable, state.draggingId]
  );

  const handleDrag = useCallback(
    (evt: MouseEvent | TouchEvent) => {
      assertDefined(
        elementRef.current,
        'drop zone not defined in eventhandler'
      );
      const svg = elementRef.current.ownerSVGElement;
      if (!svg) {
        throw new Error('Must register svg elements');
      }
      if (isOverMe && state.draggingId) {
        if (!mouseEventWithinElement(evt, elementRef.current)) {
          leaveDroppable(id);
          console.debug('leaving: ', id);
        }
      } else if (state.draggingId) {
        if (mouseEventWithinElement(evt, elementRef.current)) {
          enterDroppable(id);
          console.debug('entering: ', id);
        }
      }
    },
    [enterDroppable, id, isOverMe, leaveDroppable, state.draggingId]
  );

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      if (element) {
        element.ownerSVGElement?.addEventListener('mousedown', handleStart);
        element.ownerSVGElement?.addEventListener('mousemove', handleDrag);
        element.ownerDocument.addEventListener('mouseup', handleDrop);

        element.ownerSVGElement?.addEventListener('touchstart', handleStart);
        element.ownerSVGElement?.addEventListener('touchmove', handleDrag);
        element.ownerDocument.addEventListener('touchend', handleDrop);
        element.ownerDocument.addEventListener('touchcancel', handleDrop);
        elementRef.current = element;
      } else {
        elementRef.current?.ownerSVGElement?.removeEventListener(
          'mousedown',
          handleStart
        );
        elementRef.current?.ownerSVGElement?.removeEventListener(
          'mousemove',
          handleDrag
        );
        elementRef.current?.ownerDocument?.removeEventListener(
          'mouseup',
          handleDrop
        );

        elementRef.current?.ownerSVGElement?.removeEventListener(
          'touchstart',
          handleStart
        );
        elementRef.current?.ownerSVGElement?.removeEventListener(
          'touchmove',
          handleDrag
        );
        elementRef.current?.ownerDocument?.removeEventListener(
          'touchend',
          handleDrop
        );
        elementRef.current?.ownerDocument?.removeEventListener(
          'touchcancel',
          handleDrop
        );

        elementRef.current = null;
      }
    },
    [handleStart, handleDrag, handleDrop]
  );

  return {
    register,
    isHovering: isOverMe,
  };
};
