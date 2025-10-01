import { PlayerGameInfoPageResponseV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { Box, Button, Card, Flex, Skeleton, Text } from '@radix-ui/themes';
import { FC } from 'react';

type Props = {
  isPending: boolean;
  gamesPage: Maybe<PlayerGameInfoPageResponseV1>;
  error: Error | null;
  onJoinGame?: (gameId: string) => void;
};
export const OngoingGameList: FC<Props> = (props) => {
  return (
    <Skeleton loading={props.isPending}>
      <Flex direction="column" gap="2">
        {props.gamesPage?.items.map((game) => {
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
                  onClick={() => props.onJoinGame?.(game.id)}
                  variant="soft"
                >
                  Join
                </Button>
              </Flex>
            </Card>
          );
        })}

        {!props.error && props.gamesPage?.items.length === 0 && (
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
