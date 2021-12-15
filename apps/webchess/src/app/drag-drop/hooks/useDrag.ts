import { useCallback, useEffect, useRef } from 'react';
import { Position } from '../../../util/types/Position';
import { useDragDropContext } from './useDragDropContext';

type Drag = {
  register(ref: Element | null): void;
  isDragging: boolean;
};

type Options = {
  id: string;
};

const getMousePosition = (svg: SVGSVGElement, evt: MouseEvent): Position => {
  const ctm = svg.getScreenCTM();
  if (!ctm) throw new Error('No Current Transformation Matrix (CTM) found');
  return {
    x: (evt.clientX - ctm.e) / ctm.a,
    y: (evt.clientY - ctm.f) / ctm.d,
  };
};

export const useDrag = ({ id }: Options): Drag => {
  const elementRef = useRef<SVGGraphicsElement | null>(null);
  const { state, startDragging, stopDragging } = useDragDropContext();

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
      if (state.draggingId === id && elementRef.current) {
        const svg = elementRef.current?.ownerSVGElement;
        if (!svg) {
          throw new Error('Must register svg elements');
        }
        const mousePos = getMousePosition(svg, evt);
        const transformList = elementRef.current?.transform.baseVal;
        const rect = elementRef.current.getClientRects()[0];
        const elemWidth = rect.width;
        const elemHeight = rect.height;
        const svgTransform = transformList?.getItem(0);
        svgTransform.setTranslate(
          mousePos.x - elemWidth / 2,
          mousePos.y - elemHeight / 2
        );
      }
    },
    [id, state.draggingId]
  );

  const handleMouseDown = useCallback(
    (_: Event) => {
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

  const register = (element: SVGGraphicsElement | null) => {
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
    } else {
      elementRef.current?.removeEventListener('mousedown', handleMouseDown);
    }
    elementRef.current = element;
  };

  return {
    register,
    isDragging: state.draggingId === id,
  };
};
