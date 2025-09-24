import { Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes';
import React from 'react';

const TimeControlCard: React.FC<{
  type: 'bullet' | 'blitz' | 'rapid';
  children: React.ReactNode;
  onClick: () => void;
}> = ({ type, children, onClick }) => {
  const getCardStyle = () => {
    const baseStyle = {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center' as const,
    };

    switch (type) {
      case 'bullet':
        return {
          ...baseStyle,
          backgroundColor: '#fef2f2',
          borderColor: '#fecaca',
        };
      case 'blitz':
        return {
          ...baseStyle,
          backgroundColor: '#fffbeb',
          borderColor: '#fed7aa',
        };
      case 'rapid':
        return {
          ...baseStyle,
          backgroundColor: '#f0fdf4',
          borderColor: '#bbf7d0',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Card variant="surface" size="3" style={getCardStyle()} onClick={onClick}>
      <Box p="4">{children}</Box>
    </Card>
  );
};

type TimeControlOption = {
  id: string;
  label: string;
  time: string;
  type: 'bullet' | 'blitz' | 'rapid';
};

const timeControls: TimeControlOption[] = [
  { id: 'bullet-1+0', label: 'bullet', time: '1+0', type: 'bullet' },
  { id: 'blitz-3+2', label: 'blitz', time: '3+2', type: 'blitz' },
  { id: 'rapid-10+0', label: 'rapid', time: '10+0', type: 'rapid' },
];

type Props = {
  onTimeControlSelect?: (timeControl: TimeControlOption) => void;
};

export const QuickPairing: React.FC<Props> = ({ onTimeControlSelect }) => {
  const handleTimeControlClick = (timeControl: TimeControlOption) => {
    onTimeControlSelect?.(timeControl);
  };

  return (
    <Card variant="surface" size="3" style={{ padding: '1.5rem' }}>
      <Text size="4" weight="bold" mb="4" style={{ color: '#374151' }}>
        Quick Pairing
      </Text>
      <Grid columns={{ initial: '1', md: '3' }} gap="4">
        {timeControls.map((timeControl) => (
          <TimeControlCard
            key={timeControl.id}
            type={timeControl.type}
            onClick={() => handleTimeControlClick(timeControl)}
          >
            <Flex direction="column" align="center" justify="center" gap="3">
              <Flex align="center" justify="center" gap="2">
                <Text
                  size="2"
                  weight="medium"
                  style={{
                    textTransform: 'uppercase',
                    color: '#6b7280',
                  }}
                >
                  {timeControl.label}
                </Text>
                <Text size="4" weight="bold" style={{ color: '#374151' }}>
                  {timeControl.time}
                </Text>
              </Flex>
              <Button
                size="3"
                variant="solid"
                style={{ width: '100%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTimeControlClick(timeControl);
                }}
              >
                Play
              </Button>
            </Flex>
          </TimeControlCard>
        ))}
      </Grid>
    </Card>
  );
};
