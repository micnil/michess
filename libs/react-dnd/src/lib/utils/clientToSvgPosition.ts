import { Position } from "@michess/common-utils";

export const clientToSvgPosition = (
  svg: SVGSVGElement,
  pos: Position
): Position => {
  const ctm = svg.getScreenCTM();
  if (!ctm) throw new Error('No Current Transformation Matrix (CTM) found');
  return {
    x: (pos.x - ctm.e) / ctm.a,
    y: (pos.y - ctm.f) / ctm.d,
  };
};