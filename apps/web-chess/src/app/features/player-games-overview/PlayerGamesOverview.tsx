import { Card, Flex, Heading, Tabs } from '@radix-ui/themes';
import React from 'react';
import { useApi } from '../../api/hooks/useApi';
import { Alert } from '../../components/Alert';
import { TabNotification } from '../../components/TabNotification';
import { useQuery } from '../../util/useQuery';
import { EndedGameList } from './component/EndedGameList';
import { OngoingGameList } from './component/OngoingGameList';

type Props = {
  onJoinGame?: (gameId: string) => void;
};

export const PlayerGamesOverview: React.FC<Props> = ({ onJoinGame }) => {
  const api = useApi();
  const {
    isPending: ongoingIsPending,
    data: ongoingGamesPage,
    error: ongoingQueryError,
  } = useQuery({
    queryKey: ['games', 'my', 'IN_PROGRESS'],
    queryFn: async () => {
      return api.games.getMyGames({ status: 'IN_PROGRESS', page: 1 });
    },
  });

  const {
    isPending: endedIsPending,
    data: endedGamesPage,
    error: endedQueryError,
  } = useQuery({
    queryKey: ['games', 'my', 'ENDED'],
    queryFn: async () => {
      return api.games.getMyGames({ status: 'ENDED', page: 1 });
    },
  });

  const isNoOngoingGames =
    !ongoingIsPending &&
    ongoingGamesPage?.items.length === 0 &&
    !ongoingQueryError;

  // Check if there are any ongoing games where it's the player's turn
  const hasPlayerTurnGames =
    ongoingGamesPage?.items.some((game) => game.turn === game.ownSide) ?? false;
  return (
    <Card size="3" style={{ padding: '24px' }}>
      <Tabs.Root defaultValue={isNoOngoingGames ? 'completed' : 'ongoing'}>
        <Flex justify="between" align="center" mb="4">
          <Heading size="4" weight="medium">
            My Games
          </Heading>
          <Tabs.List>
            <Tabs.Trigger value="ongoing">
              <Flex align="center" gap="1">
                Ongoing
                {hasPlayerTurnGames && <TabNotification />}
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
          </Tabs.List>
        </Flex>
        <Alert text={ongoingQueryError?.message} />

        <Tabs.Content value="ongoing">
          <OngoingGameList
            error={ongoingQueryError}
            isPending={ongoingIsPending}
            gamesPage={ongoingGamesPage}
            onJoinGame={onJoinGame}
          />
        </Tabs.Content>

        <Tabs.Content value="completed">
          <EndedGameList
            error={endedQueryError}
            isPending={endedIsPending}
            gamesPage={endedGamesPage}
            onJoinGame={onJoinGame}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  );
};
