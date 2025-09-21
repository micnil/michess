import { Position } from '@michess/common-utils';

export const eventToPosition = (evt: MouseEvent | TouchEvent): Position => {
  if ('changedTouches' in evt && evt.changedTouches.length > 0) {
    return {
      x: evt.changedTouches[0].clientX,
      y: evt.changedTouches[0].clientY,
    };
  } else if ('touches' in evt && evt.touches.length > 0) {
    return { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
  } else if ('clientX' in evt && 'clientY' in evt) {
    // Fallback for mouse events
    return { x: evt.clientX, y: evt.clientY };
  } else {
    throw new Error('Unsupported event type');
  }
};
