import { Position } from '@michess/common-utils';
import { Color, ColoredPieceType, PieceType } from '@michess/core-board';
import React from 'react';
import pieceSprite from '../../../assets/chessboard-sprite-staunty.svg';
import styles from './PromotionDialog.module.css';

const DEFAULT_SPRITE_SIZE = 40;

type Props = {
  color: Color;
  squareSize: number;
  position: Position;
  onClick: (pieceType: PieceType) => void;
  onCancel: () => void;
};

export const PromotionDialog: React.FC<Props> = ({
  color,
  squareSize,
  position,
  onClick,
  onCancel,
}) => {
  const scaling = squareSize / DEFAULT_SPRITE_SIZE;

  const promotionPieces: PieceType[] = [
    PieceType.Queen,
    PieceType.Rook,
    PieceType.Bishop,
    PieceType.Knight,
  ];

  const handlePieceClick = (pieceType: PieceType) => {
    onClick(pieceType);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  const dialogWidth = squareSize;
  const dialogHeight = squareSize * 4;

  const dialogStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
    width: dialogWidth,
    height: dialogHeight,
  };

  return (
    <>
      <div className={styles.cancelOverlay} onClick={handleCancelClick} />

      <div className={styles.dialogOverlay} style={dialogStyle}>
        <div className={styles.dialogContainer}>
          {promotionPieces.map((pieceType) => {
            const coloredPieceType = ColoredPieceType.fromPiece({
              type: pieceType,
              color,
            });

            return (
              <button
                key={pieceType}
                className={styles.pieceButton}
                onClick={() => handlePieceClick(pieceType)}
                style={{
                  width: squareSize,
                  height: squareSize,
                }}
                title={`Promote to ${pieceType}`}
              >
                <svg
                  width={squareSize}
                  height={squareSize}
                  viewBox={`0 0 ${squareSize} ${squareSize}`}
                >
                  <use
                    href={`${pieceSprite}#${coloredPieceType}`}
                    transform={`scale(${scaling} ${scaling})`}
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
