import { Position } from '@michess/common-utils';

export const eventToPosition = (evt: PointerEvent): Position => {
  return { x: evt.clientX, y: evt.clientY };
};
