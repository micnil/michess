import { assertDefined, Position } from '@michess/common-utils';
import { useCallback, useEffect, useRef } from 'react';
import { getMousePosition } from '../utils/getMousePosition';
import { useDragDropContext } from './useDragDropContext';

type Drag = {
  register(ref: Element | null): void;
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
  const elementRef = useRef<SVGGraphicsElement | null>(null);
  const { state, startDragging, stopDragging } = useDragDropContext();

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
      if (state.draggingId === id && elementRef.current) {
        const element = elementRef.current;
        assertDefined(element, 'No elements registered 1');
        const svg = element.ownerSVGElement;
        assertDefined(svg, 'Must register svg elements');

        const mousePos = getMousePosition(svg, evt);
        setTranslate(element, mousePos);
      }
    },
    [id, state.draggingId]
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
      if (state.draggingId === id) {
        console.debug('stopDragging: ', id);
        stopDragging(id);
      }
    },
    [id, state.draggingId, stopDragging]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const register = useCallback((element: SVGGraphicsElement | null) => {
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
    } else {
      elementRef.current?.removeEventListener('mousedown', handleMouseDown);
    }
    elementRef.current = element;
  }, [handleMouseDown]);

  return {
    register,
    isDragging: state.draggingId === id,
  };
};
