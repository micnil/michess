import { useEffect, useState } from 'react';

type UseResponsiveBoardSizeOptions = {
  maxSize: number;
};

const calculateBoardSize = (maxSize: number): number => {
  if (typeof window === 'undefined') return maxSize;

  const viewportWidth = window.innerWidth;
  const padding = 16;

  // On mobile, use most of the viewport width
  if (viewportWidth < maxSize) {
    const mobileSize = Math.min(viewportWidth - padding, maxSize);
    return Math.floor(mobileSize);
  } else {
    return maxSize;
  }
};

export const useResponsiveBoardSize = ({
  maxSize,
}: UseResponsiveBoardSizeOptions) => {
  const [boardSize, setBoardSize] = useState(() => calculateBoardSize(maxSize));

  useEffect(() => {
    const handleResize = () => {
      setBoardSize(calculateBoardSize(maxSize));
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Listen for viewport changes (helps with DevTools)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [maxSize]);

  return boardSize;
};
