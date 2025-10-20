import {
  render,
  screen,
} from '../../../../../test/utils/custom-testing-library';
import { UsernameFormContainer } from '../UsernameFormContainer';

describe('UsernameFormContainer', () => {
  it('should render correctly with default value', async () => {
    render(<UsernameFormContainer />);

    const usernameInput = await screen.findByLabelText('Username');
    expect(usernameInput).toBeEnabled();
    expect(usernameInput).toHaveValue('');
    await screen.findByDisplayValue('testuser');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeEnabled();
  });
});
