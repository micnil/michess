import React from 'react';
import styled from 'styled-components';
import { Coordinate } from '@michess/core-models';
import { PieceView } from './PieceView';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { SquareView } from './SquareView';
import { PromotionDialog } from './PromotionDialog';
import { usePromotionDialog } from './context/hooks/usePromotionDialog';
import { useDragDropContext } from '@michess/react-dnd';

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

  const boardState = chessboard.getState();
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
          {Object.entries(boardState.pieces).map(([coord, piece]) => {
            const square = squares[chessboard.getIndex(coord as Coordinate)];
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
              squares[chessboard.getIndex(promotionDialog.coordinate)].position
            }
            onClick={handlePromotionSelect}
            onCancel={handlePromotionCancel}
          />
        )}
    </BoardContainer>
  );
};
