import { Color } from '@michess/core-board';
import React from 'react';
import styled from 'styled-components';

const PlayerInfoContainer = styled.div<{ $color: Color; $size?: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: ${(props) => (props.$size ? `${props.$size}px` : 'auto')};
  max-width: 100%;
  box-sizing: border-box;

  /* Color accent based on player color */
  border-left: 4px solid
    ${(props) => (props.$color === 'white' ? '#f0f0f0' : '#2c2c2c')};
`;

const Avatar = styled.div<{ $color: Color }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$color === 'white'
      ? 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
      : 'linear-gradient(135deg, #495057, #212529)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.$color === 'white' ? '#495057' : '#f8f9fa')};
  border: 2px solid
    ${(props) => (props.$color === 'white' ? '#dee2e6' : '#495057')};
  flex-shrink: 0;
`;

const PlayerDetails = styled.div`
  flex: 1;
  min-width: 0; /* Allow text to truncate */
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ColorLabel = styled.div<{ $color: Color }>`
  font-size: 12px;
  color: #666;
  text-transform: capitalize;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$color === 'white' ? '#f8f9fa' : '#2c2c2c'};
    border: 1px solid
      ${(props) => (props.$color === 'white' ? '#dee2e6' : '#495057')};
    margin-right: 6px;
  }
`;

type PlayerInfoProps = {
  username: string;
  color: Color;
  avatar?: string; // Optional avatar URL/image
  size?: number; // Width to match chessboard
};

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  username,
  color,
  avatar,
  size,
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

  return (
    <PlayerInfoContainer $color={color} $size={size}>
      <Avatar $color={color}>
        {avatar ? (
          <img
            src={avatar}
            alt={`${username} avatar`}
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        ) : (
          getInitials(username)
        )}
      </Avatar>
      <PlayerDetails>
        <Username title={username}>{username}</Username>
        <ColorLabel $color={color}>Playing {color}</ColorLabel>
      </PlayerDetails>
    </PlayerInfoContainer>
  );
};
