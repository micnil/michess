import { PlayerGameInfoPageResponseV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { GameResultType } from '@michess/react-chessboard';
import { Box, Button, Card, Flex, Skeleton, Text } from '@radix-ui/themes';
import { MinusSquare, PlusSquare } from 'lucide-react';
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
          console.log(game.result?.type);
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
                    <Flex align="center" gap="1">
                      <PlusSquare size={'14px'} color="var(--grass-9)" />
                      <Text size="2" color={'gray'}>
                        Win
                      </Text>
                    </Flex>
                  ) : game.result?.type === 'draw' ? (
                    <Text size="2" color={'gray'}>
                      Draw
                    </Text>
                  ) : (
                    <Flex align="center" gap="1">
                      <MinusSquare size={'14px'} color="var(--tomato-9)" />
                      <Text size="2" color={'gray'}>
                        Lose
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Button
                  size="1"
                  onClick={() => onJoinGame?.(game.id)}
                  variant="soft"
                >
                  View
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
