import { render, screen } from '../../../test/utils/custom-testing-library';
import { SignUpPage } from '../SignUpPage';

describe('SignUpPage', () => {
  it('should render the sign up form', async () => {
    render(<SignUpPage />);

    expect(await screen.findByText('Sign up')).toBeInTheDocument();
    expect(
      screen.getByText('Create your account to get started'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it('should render social sign in option', async () => {
    render(<SignUpPage />);

    expect(
      await screen.findByRole('button', { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it('should render sign in link', async () => {
    render(<SignUpPage />);

    const signInLink = await screen.findByText('Sign in');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in');
  });
});
