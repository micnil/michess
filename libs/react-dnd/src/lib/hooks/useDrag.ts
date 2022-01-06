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

  const handleMouseMove = useCallback(
    (_: MouseEvent) => {
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

  const handleMouseDown = useCallback(
    (_: MouseEvent) => {
      console.debug('startDragging');
      startDragging(id);
    },
    [id, startDragging]
  );

  const handleMouseUp = useCallback(
    (_: Event) => {
      if (draggingId === id) {
        console.debug('stopDragging: ', id);
        stopDragging(id);
      }
    },
    [id, draggingId, stopDragging]
  );

  useEffect(() => {
    const unregister = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    if (draggingId === id) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      unregister();
    }
    return unregister;
  }, [draggingId, handleMouseMove, handleMouseUp, id]);

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      if (element) {
        element.addEventListener('mousedown', handleMouseDown);
      } else {
        dragRef.current?.removeEventListener('mousedown', handleMouseDown);
      }
      dragRef.current = element;
    },
    [handleMouseDown]
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
