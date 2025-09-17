import { useEffect, useState } from 'react';

type UseResponsiveBoardSizeOptions = {
  maxSize: number;
};

export const useResponsiveBoardSize = ({
  maxSize,
}: UseResponsiveBoardSizeOptions) => {
  const [boardSize, setBoardSize] = useState(maxSize);

  useEffect(() => {
    const calculateSize = () => {
      if (typeof window === 'undefined') return;

      const viewportWidth = window.innerWidth;
      const padding = 8; // Account for page padding

      // On mobile, use most of the viewport width
      if (viewportWidth < 768) {
        const mobileSize = Math.min(viewportWidth - padding, maxSize);
        setBoardSize(Math.floor(mobileSize));
      } else {
        setBoardSize(maxSize);
      }
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [maxSize]);

  return boardSize;
};
