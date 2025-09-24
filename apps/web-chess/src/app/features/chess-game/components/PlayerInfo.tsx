import { Color } from '@michess/core-board';
import { Avatar, Badge, Flex, Text } from '@radix-ui/themes';
import React from 'react';

type PlayerInfoProps = {
  username?: string;
  color: Color;
  avatar?: string;
  isPlayerTurn?: boolean;
};

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  username,
  color,
  avatar,
  isPlayerTurn = false,
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayUsername = username || 'Waiting for player';
  const isWaiting = !username;

  return (
    <Flex align="center" gap="3" p="3">
      <Avatar
        size="3"
        src={avatar}
        fallback={isWaiting ? '?' : getInitials(username)}
        alt={`${displayUsername} avatar`}
      />
      <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
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

        <Flex align="center" gap="2">
          <Badge
            color={color === 'white' ? 'gray' : 'blue'}
            variant="soft"
            size="1"
          >
            {color}
          </Badge>
          <Text
            size="2"
            weight={isPlayerTurn ? 'bold' : 'medium'}
            color={isPlayerTurn ? 'amber' : 'gray'}
          >
            {isPlayerTurn ? 'Turn to play' : 'Waiting'}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
