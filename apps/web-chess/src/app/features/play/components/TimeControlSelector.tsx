import { Button, Flex, Popover, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { TimeControlRadioCards } from '../../lobby/components/TimeControlRadioGroup';

type TimeControlStr = `${number}|${number}`;

type Props = {
  value?: TimeControlStr;
  onChange?: (value: TimeControlStr) => void;
};

export const TimeControlSelector = ({ value = '3|2', onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const handleTimeControlChange = (newValue: TimeControlStr) => {
    onChange?.(newValue);
    setOpen(false);
  };

  const formatTimeControl = (tc: TimeControlStr) => {
    const [initial, increment] = tc.split('|');
    return `${initial}+${increment}`;
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button variant="soft" size="2" style={{ minWidth: '120px' }}>
          <Flex
            gap="2"
            align="center"
            justify="between"
            style={{ width: '100%' }}
          >
            <Text size="2" color="gray">
              Time:
            </Text>
            <Text size="2" weight="bold">
              {formatTimeControl(value)}
            </Text>
          </Flex>
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: '380px' }}>
        <TimeControlRadioCards
          name="play-time-control"
          onValueChange={handleTimeControlChange}
        />
      </Popover.Content>
    </Popover.Root>
  );
};
