import { render, screen } from '../../../test/utils/custom-testing-library';
import { SignInPage } from '../SignInPage';

describe('SignInPage', () => {
  it('should render the sign in form', async () => {
    render(<SignInPage />);

    expect(await screen.findByText('Sign in')).toBeTruthy();
    expect(
      screen.getByText('Welcome back! Please enter your details.'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it('should show success message when referer is reset-password', async () => {
    render(<SignInPage referer="reset-password" />);

    expect(
      await screen.findByText(
        'Your password has been reset successfully. You can now login.',
      ),
    ).toBeTruthy();
    expect(
      screen.queryByText('Welcome back! Please enter your details.'),
    ).toBeFalsy();
  });

  it('should render sign up link', async () => {
    render(<SignInPage />);

    const signUpLink = await screen.findByText('Sign up');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink.closest('a')).toHaveAttribute('href', '/sign-up');
  });
});
