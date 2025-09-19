import { assertDefined, Maybe, Position } from '@michess/common-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const dragRef = useRef<
    Maybe<{
      element: SVGGraphicsElement;
      unsubscribeEvents: () => void;
    }>
  >(undefined);
  const previewRef = useRef<SVGGraphicsElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const { state, startDragging, stopDragging } = useDragDropContext();
  const { mousePosRef, draggingId } = state;

  const handleDragMove = useCallback(
    (_: MouseEvent | TouchEvent) => {
      if (draggingId === id && previewRef.current) {
        setIsDragging(true);
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

  const handlePress = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      setIsPressing(true);
      if (draggingId === id) {
        console.debug('stopDragging (click): ', id);
        stopDragging(id);
      } else {
        console.debug('startDragging');
        startDragging(id);
      }
    },
    [draggingId, id, startDragging, stopDragging]
  );

  const handleDragEnd = useCallback(
    (_: Event | TouchEvent) => {
      setIsPressing(false);
      if (draggingId === id && isDragging) {
        console.debug('stopDragging: ', id);
        setIsDragging(false);
        stopDragging(id);
      }
    },
    [draggingId, id, isDragging, stopDragging]
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
      dragRef.current?.unsubscribeEvents();
      dragRef.current = undefined;
      if (element) {
        const unsubscribeEvents = () => {
          dragRef.current?.element.removeEventListener(
            'mousedown',
            handlePress
          );
          dragRef.current?.element.removeEventListener(
            'touchstart',
            handlePress
          );
        };
        element.addEventListener('mousedown', handlePress);
        element.addEventListener('touchstart', handlePress, {
          passive: false,
        });
        dragRef.current = { element, unsubscribeEvents };
      }
    },
    [handlePress]
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
    isDragging: draggingId === id && isPressing,
  };
};
