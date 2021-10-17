import React from 'react';
import { Color } from './Color';
import { Coordinate } from './Coordinate';
import { PieceType } from './PieceType';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';

type Props = {
  piece: PieceType;
  color: Color;
  coordinates: Coordinate;
};

export const Piece: React.FC<Props> = ({ piece, color, coordinates }) => {
  const colorPrefix = color === Color.Black ? 'b' : 'w';
  return <use  {...coordinates} href={`${pieceSprite}#${colorPrefix + piece}`} />
};
