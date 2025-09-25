import { LobbyPageResponseV1 } from '@michess/api-schema';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse, server } from '../../../../test/mocks/node-chess';
import { render } from '../../../../test/utils/custom-testing-library';
import { GameLobby } from '../GameLobby';

describe('GameLobby', () => {
  it('should render the game lobby header', () => {
    const { getByText } = render(<GameLobby />);

    expect(getByText('Game Lobby')).toBeTruthy();
    expect(getByText('+ Create Game')).toBeTruthy();
  });

  it('should call onCreateGame when create button is clicked', async () => {
    const user = userEvent.setup();
    const onCreateGame = vitest.fn();

    const { getByText } = render(<GameLobby onCreateGame={onCreateGame} />);

    const createButton = getByText('+ Create Game');
    expect(createButton).toBeTruthy();

    await user.click(createButton);

    expect(onCreateGame).toHaveBeenCalledTimes(1);
  });

  it('should render join buttons for available games', async () => {
    server.use(
      http.get('api/games/lobby', () => {
        return HttpResponse.json<LobbyPageResponseV1>({
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          items: [
            {
              id: 'game-1',
              opponent: { name: 'Alice', id: 'alice-id' },
              availableColor: 'white',
              variant: 'standard',
              createdAt: new Date().toISOString(),
            },
          ],
        });
      })
    );

    const { findByText } = render(<GameLobby />);

    const aliceGame = await findByText('Alice');
    const joinButton = await findByText('Join');

    expect(aliceGame).toBeTruthy();
    expect(joinButton).toBeTruthy();
  });
});
