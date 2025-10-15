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
  mousePos: Position,
): void => {
  const transformList = element?.transform.baseVal;

  const rect = element.getClientRects()[0];
  const elemWidth = rect.width;
  const elemHeight = rect.height;
  const svgTransform = transformList?.getItem(0);
  svgTransform.setTranslate(
    mousePos.x - elemWidth / 2,
    mousePos.y - elemHeight / 2,
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
  const handlePress = useDragDropStore((state) => state.handlePress);

  const isPressing = useDragDropStore((state) => state.isPressing);
  const previewPosition: Maybe<Position> = usePointerStore((state) =>
    draggingId === id && !!previewRef.current ? state.position : undefined,
  );

  useEffect(() => {
    if (previewPosition && previewRef.current) {
      const element = previewRef.current;
      const svg = element.ownerSVGElement;
      assertDefined(svg, 'Must register svg elements');

      const mousePos = clientToSvgPosition(svg, previewPosition);
      setTranslate(element, mousePos);
    }
  }, [previewPosition]);

  const handlePressEvent = useCallback(
    (e: PointerEvent) => {
      e.preventDefault();
      const elements = dragRef.current?.element.ownerDocument.elementsFromPoint(
        e.clientX,
        e.clientY,
      );
      const underlyingDropzone = elements?.find(
        (el) =>
          (el instanceof SVGElement || el instanceof HTMLElement) &&
          !!el.dataset.dropzoneId,
      );
      underlyingDropzone?.dispatchEvent(
        new PointerEvent('pointerdown', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: false,
        }),
      );
      handlePress(id);
    },
    [handlePress, id],
  );

  const register = useCallback(
    (element: SVGGraphicsElement | null) => {
      dragRef.current?.unsubscribeEvents();
      dragRef.current = undefined;
      if (element) {
        const handleTouchStart = (e: TouchEvent) => {
          e.preventDefault();
        };
        const unsubscribeEvents = () => {
          dragRef.current?.element.removeEventListener(
            'pointerdown',
            handlePressEvent,
          );
          element.removeEventListener('touchstart', handleTouchStart);
        };
        element.addEventListener('touchstart', handleTouchStart, {
          passive: false,
        });
        element.addEventListener('pointerdown', handlePressEvent, {
          passive: false,
        });
        dragRef.current = { element, unsubscribeEvents };
      }
    },
    [handlePressEvent],
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
    [draggingId, id],
  );

  return {
    register,
    registerPreview,
    isDragging: draggingId === id && isPressing,
  };
};
