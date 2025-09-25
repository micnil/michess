import { Maybe } from '@michess/common-utils';
import { Coordinate } from '@michess/core-board';
import { useDragDropBounds } from '@michess/react-dnd';
import React from 'react';
import styles from './ChessboardView.module.css';
import { PieceView } from './PieceView';
import { SquareView } from './SquareView';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { PromotionDialog } from './promotion-dialog/components/PromotionDialog';
import { usePromotionDialog } from './promotion-dialog/hooks/usePromotionDialog';

type Props = {
  size: number;
  isLoading?: boolean;
};

export const ChessboardView: React.FC<Props> = ({ size = 500, isLoading }) => {
  const { chessboard, squares, gameResult } = useChessboardContext();
  const { register, draggingId } = useDragDropBounds();

  const {
    promotionDialog,
    showPromotionDialog,
    handlePromotionSelect,
    handlePromotionCancel,
  } = usePromotionDialog();

  const boardState = chessboard.position;
  const squareSize = size / 8;
  return (
    <div
      className={styles.boardContainer}
      style={{ width: size, height: size }}
    >
      {isLoading ? (
        <div
          className={styles.boardLoading}
          style={{ backgroundSize: `${squareSize * 2}px ${squareSize * 2}px` }}
        />
      ) : (
        <svg className={styles.board} width={size} height={size} ref={register}>
          <g>
            {Object.values(squares).map((square) => {
              return (
                <SquareView
                  hasPiece={!!boardState.pieces.get(square.coordinate)}
                  draggingFromCoord={draggingId as Maybe<Coordinate>}
                  showPromotionDialog={showPromotionDialog}
                  coordinate={square.coordinate}
                  key={square.coordinate}
                  position={square.position}
                  size={square.size}
                  color={square.color}
                />
              );
            })}
          </g>
          <g>
            {Array.from(boardState.pieces.entries()).map(([coord, piece]) => {
              const square = squares[coord as Coordinate];
              return (
                <PieceView
                  key={coord}
                  coord={coord as Coordinate}
                  piece={piece}
                  position={square.position}
                  gameResult={gameResult}
                  squareSize={square.size}
                />
              );
            })}
          </g>
          {draggingId && <use href={`#${draggingId}`} />}
        </svg>
      )}

      {promotionDialog.isOpen &&
        promotionDialog.coordinate &&
        promotionDialog.color && (
          <PromotionDialog
            color={promotionDialog.color}
            squareSize={squareSize}
            position={squares[promotionDialog.coordinate].position}
            onClick={handlePromotionSelect}
            onCancel={handlePromotionCancel}
          />
        )}
    </div>
  );
};
