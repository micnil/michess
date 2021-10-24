import React, {
  DragEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Color } from '../common-types/Color';
import { Position } from './Position';
import { PieceType } from '../common-types/PieceType';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import { useDrag } from './hooks/useDrag';
import { randomString } from '../util/random-string';

type Props = {
  piece: PieceType;
  color: Color;
  position: Position;
  scaling: number;
};

export const Piece: React.FC<Props> = ({
  piece,
  color,
  position: initialPosition,
  scaling,
}) => {
  const [idSuffix] = useState(() => randomString(5));
  const colorPrefix = color === Color.Black ? 'b' : 'w';
  const pieceAndColor = colorPrefix + piece
  const id = pieceAndColor + '-' + idSuffix;
  const { register, position } = useDrag({ initialPosition, id });

  return (
    <use
      ref={register}
      href={`${pieceSprite}#${pieceAndColor}`}
      transform={`translate(${position.x} ${position.y}) scale(${scaling} ${scaling})`}
    />
  );
};
