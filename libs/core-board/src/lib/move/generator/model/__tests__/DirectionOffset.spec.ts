import { Coordinate } from '../../../../common/Coordinate';
import { DirectionOffset } from '../DirectionOffset';

describe('DirectionOffset', () => {
  describe('fromCoordinates', () => {
    it('returns correct offset for north (up one rank)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('e3')
        )
      ).toBe(DirectionOffset.N);
    });
    it('returns correct offset for south (down one rank)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e3'),
          Coordinate.toIndex('e2')
        )
      ).toBe(DirectionOffset.S);
    });
    it('returns correct offset for east (right one file)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('f2')
        )
      ).toBe(DirectionOffset.E);
    });
    it('returns correct offset for west (left one file)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('d2')
        )
      ).toBe(DirectionOffset.W);
    });
    it('returns correct offset for north-east (up and right)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('g4')
        )
      ).toBe(DirectionOffset.NE);
    });
    it('returns correct offset for north-west (up and left)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('d3')
        )
      ).toBe(DirectionOffset.NW);
    });
    it('returns correct offset for south-east (down and right)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('d3'),
          Coordinate.toIndex('f1')
        )
      ).toBe(DirectionOffset.SE);
    });
    it('returns correct offset for south-west (down and left)', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('d1')
        )
      ).toBe(DirectionOffset.SW);
    });
    it('returns 0 for same square', () => {
      expect(
        DirectionOffset.fromCoordinates(
          Coordinate.toIndex('e2'),
          Coordinate.toIndex('e2')
        )
      ).toBe(0);
    });
  });
});
