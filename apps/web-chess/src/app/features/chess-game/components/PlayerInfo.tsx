import { Color } from '@michess/core-board';
import { Avatar, Badge, Card, Flex, Text } from '@radix-ui/themes';
import React from 'react';

type PlayerInfoProps = {
  username?: string;
  color: Color;
  avatar?: string; // Optional avatar URL/image
  size?: number; // Width to match chessboard
  isPlayerTurn?: boolean; // Pass this from parent since we don't have chessboard context
};

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  username,
  color,
  avatar,
  size,
  isPlayerTurn = false,
}) => {
  // Generate avatar initials from username
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
    <Card
      variant="surface"
      size="2"
      style={{
        width: size ? `${size}px` : 'auto',
      }}
    >
      <Flex align="center" gap="3" p="3">
        {/* Avatar */}
        <Avatar
          size="3"
          src={avatar}
          fallback={isWaiting ? '?' : getInitials(username)}
          alt={`${displayUsername} avatar`}
        />

        {/* Player Details */}
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
    </Card>
  );
};
