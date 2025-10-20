import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../api/hooks/useAuth';

export const WelcomeCard: React.FC = () => {
  const { auth, isLoading } = useAuth();
  const [isDismissed, setIsDismissed] = useState(() => {
    // Only check localStorage initially
    return localStorage.getItem('welcome-card-dismissed') === 'true';
  });

  useEffect(() => {
    // Once auth is loaded, check if user is not anonymous
    if (!isLoading) {
      const isManuallyDismissed =
        localStorage.getItem('welcome-card-dismissed') === 'true';
      const isLoggedIn = auth?.user && !auth.user.isAnonymous;

      if (isManuallyDismissed || isLoggedIn) {
        setIsDismissed(true);
      }
    }
  }, [isLoading, auth]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('welcome-card-dismissed', 'true');
  };

  // Don't show while loading to avoid UI jump
  if (isLoading || isDismissed) {
    return null;
  }

  return (
    <Card size="5" mb="4">
      <Flex align="center" justify="between" mb="3">
        <Box />
        <Button
          variant="ghost"
          size="1"
          onClick={handleDismiss}
          style={{ color: 'var(--gray-11)' }}
        >
          <XIcon />
        </Button>
      </Flex>

      <Grid
        columns={{ initial: '1', sm: '1fr 2fr' }}
        gap="8"
        mx={{ initial: '0', sm: '9' }}
        align="center"
      >
        <Flex justify="center" align="center">
          <Box style={{ fontSize: '4rem' }}>
            <img
              src="/chess-monky-v3.svg"
              width={300}
              alt="monky with rook piece"
            />
          </Box>
        </Flex>

        <Box>
          <Heading size="7" mb="2">
            Welcome to{' '}
            <span style={{ color: 'var(--amber-11)', whiteSpace: 'nowrap' }}>
              chess monky
            </span>
            !
          </Heading>
          <Text size="4" color="gray">
            Play chess with friends online or find new opponents to challenge.
            Start a game, join an existing match, or spectate ongoing games.
            Perfect chess skills and have fun!
          </Text>
        </Box>
      </Grid>
    </Card>
  );
};
