import { render, screen } from '../../../test/utils/custom-testing-library';
import { ResetPasswordPage } from '../ResetPasswordPage';

describe('ResetPasswordPage', () => {
  it('should render the reset password form when token is provided', async () => {
    render(<ResetPasswordPage token="valid-token-123" />);

    expect(await screen.findByText('Reset Password')).toBeInTheDocument();
    expect(
      screen.getByText('Complete the form to reset your password'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should show error message when token is not provided', async () => {
    render(<ResetPasswordPage />);

    expect(
      await screen.findByText(
        'Something went wrong. Please try resetting your password again.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Password')).toBeFalsy();
  });

  it('should render sign in link', async () => {
    render(<ResetPasswordPage token="valid-token-123" />);

    const signInLink = await screen.findByText('Sign in');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in');
  });
});
