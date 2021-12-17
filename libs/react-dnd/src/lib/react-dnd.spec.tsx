import { render } from '@testing-library/react';

import ReactDnd from './react-dnd';

describe('ReactDnd', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDnd />);
    expect(baseElement).toBeTruthy();
  });
});
