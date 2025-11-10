import { GameDetailsV1, LobbyPageResponseV1 } from '@michess/api-schema';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse, server } from '../../../../test/mocks/node-chess';
import {
  render,
  socketClient,
  within,
} from '../../../../test/utils/custom-testing-library';
import { GameLobby } from '../GameLobby';

describe('GameLobby', () => {
  it('should render the game lobby header', async () => {
    const { getByText, findByText } = render(<GameLobby />);

    expect(await findByText('Lobby')).toBeTruthy();
    expect(getByText('+ Create Game')).toBeTruthy();
  });

  it('should call onCreateGame when a game is created', async () => {
    const user = userEvent.setup();
    const onCreateGame = vi.fn();
    const gameDetailsMockV1: GameDetailsV1 = {
      actionOptions: [],
      clock: undefined,
      timeControl: {
        classification: 'no_clock',
      },
      id: 'new-game-id',
      variant: 'standard',
      status: 'READY',
      moves: [],
      players: { white: undefined, black: undefined },

      isPrivate: false,
    };
    socketClient.emitWithAck = vi.fn().mockResolvedValue({
      status: 'success',
      data: gameDetailsMockV1,
    });

    const { findByRole } = render(<GameLobby onCreateGame={onCreateGame} />);

    const createButton = await findByRole('button', { name: '+ Create Game' });

    await user.click(createButton);

    const dialog = await findByRole('dialog');
    const createGameButton = within(dialog).getByRole('button', {
      name: 'Create Game',
    });
    await user.click(createGameButton);
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
      }),
    );

    const { findByText } = render(<GameLobby />);

    const aliceGame = await findByText('Alice');
    const joinButton = await findByText('Join');

    expect(aliceGame).toBeTruthy();
    expect(joinButton).toBeTruthy();
  });
});
