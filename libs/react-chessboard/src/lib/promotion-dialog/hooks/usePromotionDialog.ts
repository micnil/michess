import { useState, useCallback, useRef } from 'react';
import { Coordinate, PieceType, Color } from '@michess/core-board';

export type PromotionDialogState = {
  isOpen: boolean;
  coordinate?: Coordinate;
  color?: Color;
};

type PromotionResolver = {
  resolve: (pieceType: PieceType) => void;
  reject: (reason?: Error) => void;
};

export type UsePromotionDialogReturn = {
  promotionDialog: PromotionDialogState;
  showPromotionDialog: (
    coordinate: Coordinate,
    color: Color
  ) => Promise<PieceType>;
  hidePromotionDialog: () => void;
  handlePromotionSelect: (pieceType: PieceType) => void;
  handlePromotionCancel: () => void;
};

export const usePromotionDialog = (): UsePromotionDialogReturn => {
  const [promotionDialog, setPromotionDialog] = useState<PromotionDialogState>({
    isOpen: false,
  });

  const resolverRef = useRef<PromotionResolver | null>(null);

  const showPromotionDialog = useCallback(
    (coordinate: Coordinate, color: Color): Promise<PieceType> => {
      return new Promise<PieceType>((resolve, reject) => {
        resolverRef.current = { resolve, reject };
        setPromotionDialog({
          isOpen: true,
          coordinate,
          color,
        });
      });
    },
    []
  );

  const hidePromotionDialog = useCallback(() => {
    setPromotionDialog({
      isOpen: false,
      coordinate: undefined,
      color: undefined,
    });
    resolverRef.current = null;
  }, []);

  const handlePromotionSelect = useCallback(
    (pieceType: PieceType) => {
      if (resolverRef.current) {
        resolverRef.current.resolve(pieceType);
      }
      hidePromotionDialog();
    },
    [hidePromotionDialog]
  );

  const handlePromotionCancel = useCallback(() => {
    if (resolverRef.current) {
      resolverRef.current.reject(new Error('Promotion cancelled'));
    }
    hidePromotionDialog();
  }, [hidePromotionDialog]);

  return {
    promotionDialog,
    showPromotionDialog,
    hidePromotionDialog,
    handlePromotionSelect,
    handlePromotionCancel,
  };
};
