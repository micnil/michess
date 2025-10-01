import { PlayerGameInfoPageResponseV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { GameResultType } from '@michess/react-chessboard';
import { Box, Button, Card, Flex, Skeleton, Text } from '@radix-ui/themes';
import { FC } from 'react';

type Props = {
  isPending: boolean;
  gamesPage: Maybe<PlayerGameInfoPageResponseV1>;
  error: Error | null;
  onJoinGame?: (gameId: string) => void;
};
export const EndedGameList: FC<Props> = ({
  isPending,
  gamesPage,
  error,
  onJoinGame,
}) => {
  return (
    <Skeleton loading={isPending}>
      <Flex direction="column" gap="2">
        {gamesPage?.items.map((game) => {
          const isPlayerWinner =
            GameResultType.toColor(game.result?.type) === game.ownSide;
          return (
            <Card key={game.id} variant="surface" size="1">
              <Flex align="center" gap="4">
                <Box minWidth={'120px'}>
                  <Text weight="medium" size="3">
                    {game.opponent.name}
                  </Text>
                </Box>
                <Box minWidth={'120px'}>
                  <Text size="2" color="gray">
                    {game.variant}
                  </Text>
                </Box>
                <Box flexGrow="1">
                  {isPlayerWinner ? (
                    <Text size="2" color={'amber'}>
                      {'You lost'}
                    </Text>
                  ) : game.result?.type === 'draw' ? (
                    <Text size="2" color={'gray'}>
                      {'Draw'}
                    </Text>
                  ) : (
                    <Text size="2" color={'gray'}>
                      {'You lost'}
                    </Text>
                  )}
                </Box>
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

        {!error && gamesPage?.items.length === 0 && (
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
  );
};
