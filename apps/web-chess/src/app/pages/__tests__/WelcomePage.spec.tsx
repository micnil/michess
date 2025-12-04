import { render, screen } from '../../../test/utils/custom-testing-library';
import { WelcomePage } from '../WelcomePage';

describe('WelcomePage', () => {
  it('should render welcome message with user name', async () => {
    render(<WelcomePage type={undefined} />);

    expect(
      await screen.findByText('Welcome to Chessmonky Test User!'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Complete the steps below or skip for now'),
    ).toBeInTheDocument();
    expect(screen.getByText('Start playing')).toBeInTheDocument();
  });

  it('should render username form when type is social', async () => {
    render(<WelcomePage type="social" />);

    expect(
      await screen.findByText('Welcome to Chessmonky Test User!'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should render email verification message when type is email', async () => {
    render(<WelcomePage type="email" />);

    expect(
      await screen.findByText('Welcome to Chessmonky Test User!'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We sent a verification link/i),
    ).toBeInTheDocument();
  });

  it('should render start playing link', async () => {
    render(<WelcomePage type={undefined} />);

    const startLink = await screen.findByText('Start playing');
    expect(startLink).toBeInTheDocument();
    expect(startLink.closest('a')).toHaveAttribute('href', '/');
  });
});
