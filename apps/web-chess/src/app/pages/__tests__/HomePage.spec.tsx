import { render, screen } from '../../../test/utils/custom-testing-library';
import { HomePage } from '../HomePage';

describe('HomePage', () => {
  it('should render all main sections without loading spinners', async () => {
    render(<HomePage />);

    // Check that main card headers are present
    expect(
      await screen.findByRole('heading', { name: 'Play' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Lobby' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'My Games' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Active Players')).toBeInTheDocument();

    // Verify no loading spinners are present
    expect(screen.queryByRole('status')).toBeFalsy();
  });

  it('should render privacy policy link in footer', async () => {
    render(<HomePage />);

    const privacyLink = await screen.findByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy-policy');
  });
});
