import { Position } from '@michess/common-utils';

export const positionWithinElement = (
  position: Position,
  element: SVGElement
) => {
  const domRect = element.getBoundingClientRect();
  return domRect.left < position.x && position.x < domRect.right
    ? domRect.top < position.y && position.y < domRect.bottom
    : false;
};
