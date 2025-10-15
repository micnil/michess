import { Position } from '@michess/common-utils';

export const getMousePosition = (
  svg: SVGSVGElement,
  evt: MouseEvent,
): Position => {
  const ctm = svg.getScreenCTM();
  if (!ctm) throw new Error('No Current Transformation Matrix (CTM) found');
  return {
    x: (evt.clientX - ctm.e) / ctm.a,
    y: (evt.clientY - ctm.f) / ctm.d,
  };
};
