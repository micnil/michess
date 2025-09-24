import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import React from 'react';

type StatsData = {
  activePlayers: number;
  gamesInLobby: number;
  gamesToday: number;
};

type Props = {
  stats?: StatsData;
};

const defaultStats: StatsData = {
  activePlayers: 1247,
  gamesInLobby: 23,
  gamesToday: 8492,
};

export const StatsSection: React.FC<Props> = ({ stats = defaultStats }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <Card variant="surface" size="3">
      <Box p="6">
        <Grid
          columns={{ initial: '1', sm: '3' }}
          gap={{ initial: '3', sm: '4' }}
        >
          <Flex direction="column" align="center" p="4">
            <Text
              as="div"
              size="8"
              weight="bold"
              color="gray"
              highContrast
              mb="2"
            >
              {formatNumber(stats.activePlayers)}
            </Text>
            <Text size="2" weight="medium" color="gray">
              Active Players
            </Text>
          </Flex>

          <Flex direction="column" align="center" p="4">
            <Text
              as="div"
              size="8"
              weight="bold"
              color="gray"
              highContrast
              mb="2"
            >
              {formatNumber(stats.gamesInLobby)}
            </Text>
            <Text size="2" weight="medium" color="gray">
              Games in Lobby
            </Text>
          </Flex>

          <Flex direction="column" align="center" p="4">
            <Text
              as="div"
              size="8"
              weight="bold"
              color="gray"
              highContrast
              mb="2"
            >
              {formatNumber(stats.gamesToday)}
            </Text>
            <Text size="2" weight="medium" color="gray">
              Games Today
            </Text>
          </Flex>
        </Grid>
      </Box>
    </Card>
  );
};
