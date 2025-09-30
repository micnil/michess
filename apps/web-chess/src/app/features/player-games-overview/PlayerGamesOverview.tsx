import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Skeleton,
  Tabs,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import { useApi } from '../../api/hooks/useApi';
import { Alert } from '../../components/Alert';
import { useQuery } from '../../util/useQuery';

type Props = {
  onJoinGame?: (gameId: string) => void;
};

export const PlayerGamesOverview: React.FC<Props> = ({ onJoinGame }) => {
  const api = useApi();
  const {
    isPending,
    data: ongoingGamesPage,
    error: ongoingQueryError,
  } = useQuery({
    queryKey: ['games', 'my', 'IN_PROGRESS'],
    queryFn: async () => {
      return api.games.getMyGames({ status: 'IN_PROGRESS', page: 1 });
    },
  });

  const isNoOngoingGames =
    !isPending && ongoingGamesPage?.items.length === 0 && !ongoingQueryError;
  return (
    <Card size="3" style={{ padding: '24px' }}>
      <Tabs.Root defaultValue={isNoOngoingGames ? 'completed' : 'ongoing'}>
        <Flex justify="between" align="center" mb="4">
          <Heading size="4" weight="medium">
            My Games
          </Heading>
          <Tabs.List>
            <Tabs.Trigger value="ongoing">Ongoing</Tabs.Trigger>
            <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
          </Tabs.List>
        </Flex>
        <Alert text={ongoingQueryError?.message} />

        <Skeleton loading={isPending}>
          <Flex direction="column" gap="2">
            <Tabs.Content value="ongoing"></Tabs.Content>

            <Tabs.Content value="completed"></Tabs.Content>
            {ongoingGamesPage?.items.map((game) => {
              const isPlayerTurn = game.turn === game.ownSide;
              return (
                <Card key={game.id} variant="surface" size="1">
                  <Flex align="center" gap="4">
                    <Box minWidth={'120px'}>
                      <Text weight="medium" size="3">
                        {game.opponent.name}
                      </Text>
                    </Box>
                    <Box flexGrow={isPlayerTurn ? undefined : '1'}>
                      <Text size="2" color="gray">
                        {game.variant}
                      </Text>
                    </Box>
                    {isPlayerTurn ? (
                      <Box flexGrow="1">
                        <Text size="2" color={'amber'}>
                          {'Your turn'}
                        </Text>
                      </Box>
                    ) : undefined}
                    <Button
                      size="1"
                      onClick={() => onJoinGame?.(game.id)}
                      variant="soft"
                    >
                      Join
                    </Button>
                  </Flex>
                </Card>
              );
            })}
            {!ongoingQueryError && ongoingGamesPage?.items.length === 0 && (
              <Box
                style={{
                  textAlign: 'center',
                  padding: '32px',
                  color: '#6b7280',
                }}
              >
                <Text>No games available. Create one to get started!</Text>
              </Box>
            )}
          </Flex>
        </Skeleton>
      </Tabs.Root>
    </Card>
  );
};
