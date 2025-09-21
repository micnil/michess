import { Maybe } from '@michess/common-utils';
import { Coordinate } from '@michess/core-board';
import { useDragDropBounds } from '@michess/react-dnd';
import React from 'react';
import styled from 'styled-components';
import { PieceView } from './PieceView';
import { SquareView } from './SquareView';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { PromotionDialog } from './promotion-dialog/components/PromotionDialog';
import { usePromotionDialog } from './promotion-dialog/hooks/usePromotionDialog';

const Board = styled.svg`
  overflow: visible;
  max-width: 100vw;
  height: auto;
`;
const Squares = styled.g``;
const Pieces = styled.g``;

const BoardContainer = styled.div`
  position: relative;
  touch-action: none;
  max-width: 100vw;
  overflow: hidden;
`;

type Props = {
  size: number;
};

export const ChessboardView: React.FC<Props> = ({ size = 500 }) => {
  const { chessboard, squares } = useChessboardContext();
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
    <BoardContainer>
      <Board width={size} height={size} ref={register}>
        <Squares>
          {Object.values(squares).map((square) => {
            return (
              <SquareView
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
        </Squares>
        <Pieces>
          {Array.from(boardState.pieces.entries()).map(([coord, piece]) => {
            const square = squares[coord as Coordinate];
            return (
              <PieceView
                key={coord}
                coord={coord as Coordinate}
                piece={piece}
                position={square.position}
                squareSize={square.size}
              />
            );
          })}
        </Pieces>
        {draggingId && <use href={`#${draggingId}`} />}
      </Board>

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
    </BoardContainer>
  );
};
