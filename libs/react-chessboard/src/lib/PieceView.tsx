import { Position } from '@michess/common-utils';
import {
  Color,
  ColoredPieceType,
  Coordinate,
  Piece,
  PieceType,
} from '@michess/core-board';
import { useDrag } from '@michess/react-dnd';
import { Handshake, Skull, Trophy } from 'lucide-react';
import React, { ReactNode } from 'react';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import styles from './PieceView.module.css';
import { GameResultType } from './model/GameResultType';

const DEFAULT_SPRITE_SIZE = 40;

const IconBackground = ({
  size,
  offset,
  children,
  fill,
}: {
  size: number;
  offset: number;
  children: ReactNode;
  fill: string;
}) => (
  <g className={styles.resultIcon}>
    <circle
      cx={offset + size / 2}
      cy={offset + size / 2}
      r={size / 2 + 4}
      fill={fill}
    />
    {children}
  </g>
);

const SkullIcon: React.FC<{ size: number; offset: number }> = ({
  size,
  offset,
}) => (
  <IconBackground fill="#dc2626" size={size} offset={offset}>
    <Skull x={offset} y={offset} width={size} height={size} color="white" />
  </IconBackground>
);

const TrophyIcon: React.FC<{ size: number; offset: number }> = ({
  size,
  offset,
}) => (
  <IconBackground fill="#16a34a" size={size} offset={offset}>
    <Trophy x={offset} y={offset} width={size} height={size} color="white" />
  </IconBackground>
);

const HandshakeIcon: React.FC<{ size: number; offset: number }> = ({
  size,
  offset,
}) => (
  <IconBackground fill="#bf8c00" size={size} offset={offset}>
    <Handshake x={offset} y={offset} width={size} height={size} color="white" />
  </IconBackground>
);

const GameResultIndicator: React.FC<{
  resultType?: GameResultType;
  piece: Piece;
  iconSize: number;
  iconOffset: number;
}> = ({ resultType, piece, iconSize, iconOffset }) => (
  <>
    {resultType === 'black_win' &&
      piece.type === PieceType.King &&
      piece.color === Color.Black && (
        <TrophyIcon size={iconSize} offset={iconOffset} />
      )}
    {resultType === 'black_win' &&
      piece.type === PieceType.King &&
      piece.color === Color.White && (
        <SkullIcon size={iconSize} offset={iconOffset} />
      )}
    {resultType === 'white_win' &&
      piece.type === PieceType.King &&
      piece.color === Color.White && (
        <TrophyIcon size={iconSize} offset={iconOffset} />
      )}
    {resultType === 'white_win' &&
      piece.type === PieceType.King &&
      piece.color === Color.Black && (
        <SkullIcon size={iconSize} offset={iconOffset} />
      )}
    {resultType === 'draw' && piece.type === PieceType.King && (
      <HandshakeIcon size={iconSize} offset={iconOffset} />
    )}
  </>
);

type Props = {
  piece: Piece;
  squareSize: number;
  position: Position;
  gameResult?: GameResultType;
  coord: Coordinate;
};

export const PieceView: React.FC<Props> = ({
  piece,
  position: initialPosition,
  squareSize,
  gameResult,
  coord,
}) => {
  const scaling = squareSize / DEFAULT_SPRITE_SIZE;
  const pieceAndColor = ColoredPieceType.fromPiece(piece);
  const { register, registerPreview, isDragging } = useDrag({
    id: coord,
  });
  const iconSize = squareSize * 0.4;
  const iconOffset = (squareSize - iconSize) / 2;
  return (
    <>
      <g
        className={styles.pieceGroup}
        ref={register}
        transform={`translate(${initialPosition.x} ${initialPosition.y})`}
      >
        <use
          href={`${pieceSprite}#${pieceAndColor}`}
          transform={`scale(${scaling} ${scaling})`}
        />
        <GameResultIndicator
          resultType={gameResult}
          piece={piece}
          iconSize={iconSize}
          iconOffset={iconOffset}
        />
        <rect
          width={squareSize}
          height={squareSize}
          fill={isDragging ? '#ffffff60' : '#ffffff00'}
        />
      </g>
      {isDragging && (
        <g
          className={styles.pieceGroup}
          id={coord}
          ref={registerPreview}
          transform={`translate(${initialPosition.x} ${initialPosition.y})`}
        >
          <use
            href={`${pieceSprite}#${pieceAndColor}`}
            transform={`scale(${scaling} ${scaling})`}
          />
          <GameResultIndicator
            resultType={gameResult}
            piece={piece}
            iconSize={iconSize}
            iconOffset={iconOffset}
          />
          <rect width={squareSize} height={squareSize} fill="#ffffff00" />
        </g>
      )}
    </>
  );
};
