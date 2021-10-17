import React from 'react';
import { Color } from '../common-types/Color';
import { Position } from './Position';
import { PieceType } from '../common-types/PieceType';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';

type Props = {
  piece: PieceType;
  color: Color;
  position: Position;
};

export const Piece: React.FC<Props> = ({ piece, color, position }) => {
  const colorPrefix = color === Color.Black ? 'b' : 'w';
  return <use  {...position} href={`${pieceSprite}#${colorPrefix + piece}`} />
};
