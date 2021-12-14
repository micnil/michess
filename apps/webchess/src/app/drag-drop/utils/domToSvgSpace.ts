import { Position } from '../../../util/types/Position';

export const domToSvgSpace = (
  svg: SVGSVGElement,
  position: Position
): Position => {
  const pt = svg.createSVGPoint();

  pt.x = position.x;
  pt.y = position.y;

  const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
  return {
    x: svgP.x,
    y: svgP.y,
  };
};
