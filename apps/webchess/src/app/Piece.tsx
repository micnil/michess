import React from 'react';
import { Color } from './Color';
import { Coordinate } from './Coordinate';
import { PieceType } from './PieceType';
import { ReactComponent as PieceSprite } from '../assets/chessboard-sprite-staunty.svg';

type Props = {
  piece: PieceType;
  color: Color;
  coordinates: Coordinate;
};

export const Piece: React.FC<Props> = ({ piece, color, coordinates }) => {
  const colorPrefix = color === Color.Black ? 'b' : 'w';
  return <PieceSprite href={colorPrefix + piece} {...coordinates} />;
};
