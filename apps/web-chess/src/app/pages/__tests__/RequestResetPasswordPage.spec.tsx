import { render, screen } from '../../../test/utils/custom-testing-library';
import { RequestResetPasswordPage } from '../RequestResetPasswordPage';

describe('RequestResetPasswordPage', () => {
  it('should render the request reset password form', async () => {
    render(<RequestResetPasswordPage />);

    expect(await screen.findByText('Reset Password')).toBeInTheDocument();
    expect(
      screen.getByText('Enter your email to reset your password'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should render sign in link', async () => {
    render(<RequestResetPasswordPage />);

    const signInLink = await screen.findByText('Sign in');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in');
  });

  it('should render OR separator', async () => {
    render(<RequestResetPasswordPage />);

    expect(await screen.findByText('OR')).toBeInTheDocument();
  });
});
