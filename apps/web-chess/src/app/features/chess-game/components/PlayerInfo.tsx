import { Color } from '@michess/core-board';
import { Avatar, Badge, Flex, Skeleton, Text } from '@radix-ui/themes';
import React from 'react';

type PlayerInfoProps = {
  username?: string;
  color: Color;
  playerSide: Color | 'spectator';
  isPlayerAnonymous: boolean;
  avatar?: string;
  isPlayerTurn?: boolean;
  isLoading?: boolean;
};

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  username,
  isPlayerAnonymous,
  playerSide,
  color,
  avatar,
  isPlayerTurn = false,
  isLoading,
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayUsername = username
    ? username + (isPlayerAnonymous && playerSide === color ? ' (You)' : '')
    : 'Waiting for player';
  const isWaiting = !username;

  return (
    <Flex align="center" gap="2" p="2">
      <Skeleton loading={isLoading}>
        <Avatar
          size="4"
          src={avatar}
          fallback={isWaiting ? '?' : getInitials(username)}
          alt={`${displayUsername} avatar`}
        />
      </Skeleton>
      <Flex direction="column" gap="2">
        <Skeleton loading={isLoading}>
          <Text
            size="3"
            weight="bold"
            color="gray"
            highContrast
            trim="both"
            title={displayUsername}
          >
            {displayUsername}
          </Text>
        </Skeleton>

        <Flex align="center" gap="1">
          <Skeleton loading={isLoading}>
            <Badge
              color="gray"
              variant={color === 'white' ? 'outline' : 'solid'}
              size="1"
            >
              {color}
            </Badge>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <Text
              size="2"
              weight={isPlayerTurn ? 'bold' : 'medium'}
              color={isPlayerTurn ? 'amber' : 'gray'}
            >
              {isPlayerTurn ? 'Turn to play' : 'Waiting'}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </Flex>
  );
};
