import { Box, Card, Flex, Grid, Skeleton, Text } from '@radix-ui/themes';
import React from 'react';
import { useApi } from '../../api/hooks/useApi';
import { Alert } from '../../components/Alert';
import { useQuery } from '../../util/useQuery';

export const StatsSection: React.FC = () => {
  const api = useApi();
  const {
    data: stats,
    isPending,
    error,
  } = useQuery({
    queryKey: ['metrics', 'usage'],
    queryFn: () => api.metrics.getUsage(),
    refetchInterval: 10000,
  });
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const displayActivePlayers = stats?.connectionCount
    ? formatNumber(stats.connectionCount)
    : '?';

  const displayActiveGames = stats?.activeGameCount
    ? formatNumber(stats.activeGameCount)
    : '?';

  const displayGamesToday = stats?.todaysCompletedGameCount
    ? formatNumber(stats.todaysCompletedGameCount)
    : '?';

  return (
    <Card variant="surface" size="3">
      <Box>
        <Grid columns={'1'} gap={{ initial: '3' }}>
          <Alert text={error?.message} />
          <Flex direction="column" align="center" p="4">
            <Skeleton loading={isPending}>
              <Text
                as="div"
                size="8"
                weight="bold"
                color="gray"
                highContrast
                mb="2"
              >
                {displayActivePlayers}
              </Text>
              <Text size="2" weight="medium" color="gray">
                Active Players
              </Text>
            </Skeleton>
          </Flex>

          <Flex direction="column" align="center" p="4">
            <Skeleton loading={isPending}>
              <Text
                as="div"
                size="8"
                weight="bold"
                color="gray"
                highContrast
                mb="2"
              >
                {displayActiveGames}
              </Text>
              <Text size="2" weight="medium" color="gray">
                Games in progress
              </Text>
            </Skeleton>
          </Flex>

          <Flex direction="column" align="center" p="4">
            <Skeleton loading={isPending}>
              <Text
                as="div"
                size="8"
                weight="bold"
                color="gray"
                highContrast
                mb="2"
              >
                {displayGamesToday}
              </Text>
              <Text size="2" weight="medium" color="gray">
                Games Today
              </Text>
            </Skeleton>
          </Flex>
        </Grid>
      </Box>
    </Card>
  );
};
