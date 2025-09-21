import { assertDefined, Maybe, Position } from '@michess/common-utils';
import { useCallback, useEffect, useRef } from 'react';
import { useDragDropStore } from '../state/useDragDropStore';
import { usePointerStore } from '../state/usePointerStore';
import { clientToSvgPosition } from '../utils/clientToSvgPosition';

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

  const draggingId = useDragDropStore((state) => state.draggingId);
  //const handlePress = useDragDropStore((state) => state.handlePress);

  const isPressing = useDragDropStore((state) => state.isPressing);
  const cursorPosition = usePointerStore((state) => state.position);

  useEffect(() => {
    if (draggingId === id && previewRef.current) {
      const element = previewRef.current;
      assertDefined(element, 'No elements registered 1');
      const svg = element.ownerSVGElement;
      assertDefined(svg, 'Must register svg elements');

      const mousePos = clientToSvgPosition(svg, cursorPosition);
      setTranslate(element, mousePos);
    }
  }, [draggingId, id, cursorPosition]);

  const handlePressEvent = useCallback((e: MouseEvent | TouchEvent) => {
    // e.preventDefault();
    // e.stopPropagation();
    // handlePress(id);
  }, []);

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      dragRef.current?.unsubscribeEvents();
      dragRef.current = undefined;
      if (element) {
        const unsubscribeEvents = () => {
          dragRef.current?.element.removeEventListener(
            'pointerdown',
            handlePressEvent
          );
        };
        element.addEventListener('pointerdown', handlePressEvent);
        dragRef.current = { element, unsubscribeEvents };
      }
    },
    [handlePressEvent]
  );

  const registerPreview = useCallback(
    (element: SVGGraphicsElement | null) => {
      previewRef.current = element;
      if (draggingId === id && previewRef.current) {
        const element = previewRef.current;
        assertDefined(element, 'No elements registered 2');
        const svg = element.ownerSVGElement;
        assertDefined(svg, 'Must register svg elements');
      }
    },
    [draggingId, id]
  );

  return {
    register,
    registerPreview,
    isDragging: draggingId === id && isPressing,
  };
};
