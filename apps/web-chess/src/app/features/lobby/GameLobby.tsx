import { noop } from '@michess/common-utils';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Skeleton,
  Text,
} from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import React, { use } from 'react';
import { ApiContext } from '../../api/context/ApiContext';
import { Alert } from '../../components/Alert';
import { useQuery } from '../../util/useQuery';

const ColorIndicator: React.FC<{ color: 'white' | 'black' | 'spectator' }> = ({
  color,
}) => {
  const getStyle = () => {
    const baseStyle = {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: '2px solid #333',
    };

    if (color === 'white') {
      return { ...baseStyle, backgroundColor: '#ffffff' };
    } else if (color === 'black') {
      return { ...baseStyle, backgroundColor: '#111111' };
    } else {
      return {
        ...baseStyle,
        background: 'linear-gradient(45deg, #333 50%, #fff 50%)',
        backgroundColor: 'transparent',
      };
    }
  };

  return <div style={getStyle()} />;
};

type Props = {
  onCreateGame?: (gameId: string) => void;
  onJoinGame?: (gameId: string) => void;
};

export const GameLobby: React.FC<Props> = ({ onCreateGame, onJoinGame }) => {
  const api = use(ApiContext);

  const {
    data: lobbyData,
    isPending,
    error: queryError,
  } = useQuery({
    queryKey: ['lobby-games'],
    queryFn: () => api.games.getLobbyGames(1),
    refetchInterval: 5000,
  });

  const { mutateAsync: createAndJoinGame, error: createError } = useMutation({
    mutationFn: async () => {
      const gameDetails = await api.games.createGame(false);
      await api.games.joinGame(gameDetails.id);
      return gameDetails;
    },
  });

  const handleCreateGame = () => {
    createAndJoinGame()
      .then((gameDetails) => {
        if (onCreateGame) {
          onCreateGame(gameDetails.id);
        }
      })
      .catch(noop);
  };

  const renderHeader = () => (
    <Flex justify="between" align="center" mb="4">
      <Heading size="4" weight="medium">
        Lobby
      </Heading>
      <Skeleton loading={isPending}>
        <Button onClick={handleCreateGame}>+ Create Game</Button>
      </Skeleton>
    </Flex>
  );

  const games = lobbyData?.items || [];

  return (
    <Card size="3" style={{ padding: '24px' }}>
      {renderHeader()}
      <Alert text={createError?.message ?? queryError?.message} />

      <Skeleton loading={isPending}>
        <Flex direction="column" gap="2">
          {games.map((game) => (
            <Card key={game.id} variant="surface" size="1">
              <Flex align="center" gap="4">
                <Box style={{ minWidth: '120px' }}>
                  <Text weight="medium" size="3">
                    {game.opponent.name}
                  </Text>
                </Box>
                <Flex align="center" gap="2" style={{ minWidth: '100px' }}>
                  <ColorIndicator color={game.availableColor} />
                  <Text
                    size="2"
                    color="gray"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {game.availableColor}
                  </Text>
                </Flex>
                <Box flexGrow="1">
                  <Text size="2" color="gray">
                    {game.variant}
                  </Text>
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
          ))}
          {!queryError && games.length === 0 && (
            <Box
              style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}
            >
              <Text>No games available. Create one to get started!</Text>
            </Box>
          )}
        </Flex>
      </Skeleton>
    </Card>
  );
};
