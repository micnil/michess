import { GameResultV1, GameVariantV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
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
import { Alert } from '../../components/Alert';

type Props = {
  onJoinGame?: (gameId: string) => void;
};

type GameInfoItem = {
  id: string;
  opponent: {
    name: string;
  };
  ownSide?: Color | 'spectator';
  turn: Color;
  variant: GameVariantV1;
  result?: GameResultV1;
};

export const GameRecordsContainer: React.FC<Props> = ({ onJoinGame }) => {
  const isPending = false;
  const ongoingQueryError: Maybe<Error> = undefined as Maybe<Error>;
  const ongoingGames: GameInfoItem[] = [
    {
      id: 'game1',
      opponent: { name: 'Alice' },
      ownSide: 'white',
      turn: 'black',
      variant: 'standard',
    },
    {
      id: 'game2',
      opponent: { name: 'Bob' },
      ownSide: 'white',
      turn: 'white',
      variant: 'standard',
    },
    {
      id: 'game3',
      opponent: { name: 'Charlie' },
      ownSide: 'black',
      turn: 'black',
      variant: 'standard',
    },
  ];

  const isNoOngoingGames =
    !isPending && ongoingGames.length === 0 && !ongoingQueryError;
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
            {ongoingGames.map((game) => {
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
            {!ongoingQueryError && ongoingGames.length === 0 && (
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
