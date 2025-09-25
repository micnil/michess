import { render } from '@testing-library/react';
import { useContext } from 'react';
import { ChessboardContext } from '../ChessboardContext';
import { ChessboardContextProvider } from '../ChessboardContextProvider';

const TestComponent = () => {
  const context = useContext(ChessboardContext);

  if (!context) {
    return <div data-testid="no-context">No context</div>;
  }

  const squaresList = Object.values(context.squares);

  return (
    <div>
      <div data-testid="squares-count">{squaresList.length}</div>
      <div data-testid="first-square-coord">{squaresList[0]?.coordinate}</div>
      <div data-testid="last-square-coord">{squaresList[63]?.coordinate}</div>
    </div>
  );
};

describe('ChessboardContextProvider', () => {
  describe('orientation', () => {
    it('should default to white orientation', () => {
      const { getByTestId } = render(
        <ChessboardContextProvider size={400}>
          <TestComponent />
        </ChessboardContextProvider>
      );

      expect(getByTestId('squares-count').textContent).toBe('64');
      expect(getByTestId('first-square-coord').textContent).toBe('a8');
      expect(getByTestId('last-square-coord').textContent).toBe('h1');
    });

    it('should support white orientation explicitly', () => {
      const { getByTestId } = render(
        <ChessboardContextProvider size={400} orientation="white">
          <TestComponent />
        </ChessboardContextProvider>
      );

      expect(getByTestId('squares-count').textContent).toBe('64');
      expect(getByTestId('first-square-coord').textContent).toBe('a8');
      expect(getByTestId('last-square-coord').textContent).toBe('h1');
    });

    it('should support black orientation', () => {
      const { getByTestId } = render(
        <ChessboardContextProvider size={400} orientation="black">
          <TestComponent />
        </ChessboardContextProvider>
      );

      expect(getByTestId('squares-count').textContent).toBe('64');
      expect(getByTestId('first-square-coord').textContent).toBe('h1');
      expect(getByTestId('last-square-coord').textContent).toBe('a8');
    });

    it('should calculate correct square positions for white orientation', () => {
      const { getByTestId } = render(
        <ChessboardContextProvider size={400} orientation="white">
          <TestComponent />
        </ChessboardContextProvider>
      );

      expect(getByTestId('first-square-coord').textContent).toBe('a8');
      expect(getByTestId('last-square-coord').textContent).toBe('h1');
    });

    it('should calculate correct square positions for black orientation', () => {
      const { getByTestId } = render(
        <ChessboardContextProvider size={400} orientation="black">
          <TestComponent />
        </ChessboardContextProvider>
      );

      expect(getByTestId('first-square-coord').textContent).toBe('h1');
      expect(getByTestId('last-square-coord').textContent).toBe('a8');
    });
  });
});
