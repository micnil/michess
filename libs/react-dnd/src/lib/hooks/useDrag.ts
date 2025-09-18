import { assertDefined, Position } from '@michess/common-utils';
import { useCallback, useEffect, useRef } from 'react';
import { clientToSvgPosition } from '../utils/clientToSvgPosition';
import { useDragDropContext } from './useDragDropContext';

type Drag = {
  register(ref: Element | null): void;
  registerPreview(ref: Element | null): void;
  isDragging: boolean;
};

type Options = {
  id: string;
};

const setTranslate = (
  element: SVGGraphicsElement,
  mousePos: Position
): void => {
  const transformList = element?.transform.baseVal;

  const rect = element.getClientRects()[0];
  const elemWidth = rect.width;
  const elemHeight = rect.height;
  const svgTransform = transformList?.getItem(0);
  svgTransform.setTranslate(
    mousePos.x - elemWidth / 2,
    mousePos.y - elemHeight / 2
  );
};

export const useDrag = ({ id }: Options): Drag => {
  const dragRef = useRef<SVGGraphicsElement | null>(null);
  const previewRef = useRef<SVGGraphicsElement | null>(null);
  const { state, startDragging, stopDragging } = useDragDropContext();
  const { mousePosRef, draggingId } = state;

  const handleDragMove = useCallback(
    (_: MouseEvent | TouchEvent) => {
      if (draggingId === id && previewRef.current) {
        const element = previewRef.current;
        assertDefined(element, 'No elements registered 1');
        const svg = element.ownerSVGElement;
        assertDefined(svg, 'Must register svg elements');

        const mousePos = clientToSvgPosition(svg, mousePosRef.current);
        setTranslate(element, mousePos);
      }
    },
    [draggingId, id, mousePosRef]
  );

  const handleStartDragging = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      console.debug('startDragging');
      startDragging(id);
    },
    [id, startDragging]
  );

  const handleDragEnd = useCallback(
    (_: Event | TouchEvent) => {
      if (draggingId === id) {
        console.debug('stopDragging: ', id);
        stopDragging(id);
      }
    },
    [id, draggingId, stopDragging]
  );

  useEffect(() => {
    const unregister = () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('touchcancel', handleDragEnd);
    };
    if (draggingId === id) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
      window.addEventListener('touchcancel', handleDragEnd);
    } else {
      unregister();
    }
    return unregister;
  }, [draggingId, handleDragEnd, handleDragMove, id]);

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      if (element) {
        element.addEventListener('mousedown', handleStartDragging);
        element.addEventListener('touchstart', handleStartDragging, {
          passive: false,
        });
      } else {
        dragRef.current?.removeEventListener('mousedown', handleStartDragging);
        dragRef.current?.removeEventListener('touchstart', handleStartDragging);
      }
      dragRef.current = element;
    },
    [handleStartDragging]
  );

  const registerPreview = useCallback(
    (element: SVGGraphicsElement | null) => {
      previewRef.current = element;
      if (draggingId === id && previewRef.current) {
        const element = previewRef.current;
        assertDefined(element, 'No elements registered 2');
        const svg = element.ownerSVGElement;
        assertDefined(svg, 'Must register svg elements');

        const mousePos = clientToSvgPosition(svg, mousePosRef.current);
        setTranslate(element, mousePos);
      }
    },
    [draggingId, id, mousePosRef]
  );

  return {
    register,
    registerPreview,
    isDragging: draggingId === id,
  };
};
