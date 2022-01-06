import { useCallback, useEffect, useRef } from 'react';
import { useDragDropContext } from './useDragDropContext';
import { assertDefined, Position } from '@michess/common-utils';

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

const mouseEventWithinElement = (evt: MouseEvent, element: SVGElement) => {
  const mousePos: Position = { x: evt.clientX, y: evt.clientY };
  const elementDomRect = element.getBoundingClientRect();

  return positionWithinDomRect(mousePos, elementDomRect);
};

export const useDrop = ({ id, onDrop }: Options): Drop => {
  const elementRef = useRef<SVGGraphicsElement>();
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;
  const { state, enterDroppable, leaveDroppable } = useDragDropContext();

  const handleMouseDown = useCallback(
    (evt: MouseEvent) => {
      assertDefined(
        elementRef.current,
        'drop zone not defined in eventhandler'
      );
      const svg = elementRef.current.ownerSVGElement;
      if (!svg) {
        throw new Error('Must register svg elements');
      }
      const mousePos: Position = { x: evt.clientX, y: evt.clientY };
      const elementDomRect = elementRef.current.getBoundingClientRect();

      if (positionWithinDomRect(mousePos, elementDomRect)) {
        enterDroppable(id);
        console.debug('dragging from: ', id);
      }
    },
    [enterDroppable, id]
  );

  const isOverMe = state.overDroppableId === id;
  const handleMouseUp = useCallback(
    (_: MouseEvent) => {
      if (isOverMe && state.draggingId) {
        console.debug('dropped on ', id);
        leaveDroppable(id);
        onDropRef.current?.(state.draggingId);
      }
    },
    [id, leaveDroppable, state.draggingId, isOverMe]
  );

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
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
        element.ownerSVGElement?.addEventListener('mousedown', handleMouseDown);
        element.ownerSVGElement?.addEventListener('mousemove', handleMouseMove);
        element.ownerDocument.addEventListener('mouseup', handleMouseUp);
        elementRef.current = element;
      } else {
        elementRef.current?.ownerSVGElement?.removeEventListener(
          'mousedown',
          handleMouseDown
        );
        elementRef.current?.ownerSVGElement?.removeEventListener(
          'mousemove',
          handleMouseMove
        );
        elementRef.current?.ownerDocument?.removeEventListener(
          'mouseup',
          handleMouseUp
        );
        elementRef.current = undefined;
      }
    },
    [handleMouseDown, handleMouseMove, handleMouseUp]
  );

  return {
    register,
    isHovering: state.overDroppableId === id,
  };
};
