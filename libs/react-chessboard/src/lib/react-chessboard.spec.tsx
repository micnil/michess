import { render } from '@testing-library/react';

import ReactChessboard from './react-chessboard';

describe('ReactChessboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactChessboard />);
    expect(baseElement).toBeTruthy();
  });
});
