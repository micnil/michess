import React from 'react';
import styled from 'styled-components';
import { Position } from '@michess/common-utils';
import { ColoredPieceType, PieceType, Color } from '@michess/core-models';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';

const DEFAULT_SPRITE_SIZE = 40;

const DialogOverlay = styled.div`
  position: absolute;
  z-index: 1000;
  pointer-events: all;
`;

const DialogContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const PieceButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background: rgba(139, 69, 19, 0.1);
    border-color: #8b4513;
  }

  &:active {
    background: rgba(139, 69, 19, 0.2);
  }
`;

const CancelOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent;
  cursor: pointer;
`;

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
      <CancelOverlay onClick={handleCancelClick} />

      <DialogOverlay style={dialogStyle}>
        <DialogContainer>
          {promotionPieces.map((pieceType) => {
            const coloredPieceType = ColoredPieceType.fromPiece({
              type: pieceType,
              color,
            });

            return (
              <PieceButton
                key={pieceType}
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
                    href={`${pieceSprite.src}#${coloredPieceType}`}
                    transform={`scale(${scaling} ${scaling})`}
                  />
                </svg>
              </PieceButton>
            );
          })}
        </DialogContainer>
      </DialogOverlay>
    </>
  );
};
