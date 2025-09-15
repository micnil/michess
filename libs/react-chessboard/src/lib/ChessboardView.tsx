import { Coordinate } from '@michess/core-board';
import { useDragDropContext } from '@michess/react-dnd';
import React from 'react';
import styled from 'styled-components';
import { PieceView } from './PieceView';
import { SquareView } from './SquareView';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { PromotionDialog } from './promotion-dialog/components/PromotionDialog';
import { usePromotionDialog } from './promotion-dialog/hooks/usePromotionDialog';

const Board = styled.svg`
  overflow: visible;
`;
const Squares = styled.g``;
const Pieces = styled.g``;

const BoardContainer = styled.div`
  position: relative;
`;

type Props = {
  size: number;
};

export const ChessboardView: React.FC<Props> = ({ size = 500 }) => {
  const { chessboard, squares } = useChessboardContext();
  const { state } = useDragDropContext();

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
      <Board width={size} height={size}>
        <Squares>
          {squares.map((square) => {
            return (
              <SquareView
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
            const square = squares[Coordinate.toIndex(coord as Coordinate)];
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
        {state.draggingId && <use href={`#${state.draggingId}`} />}
      </Board>

      {promotionDialog.isOpen &&
        promotionDialog.coordinate &&
        promotionDialog.color && (
          <PromotionDialog
            color={promotionDialog.color}
            squareSize={squareSize}
            position={
              squares[Coordinate.toIndex(promotionDialog.coordinate)].position
            }
            onClick={handlePromotionSelect}
            onCancel={handlePromotionCancel}
          />
        )}
    </BoardContainer>
  );
};
