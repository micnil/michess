import { Button, Flex, SegmentedControl, Switch, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { TimeControlRadioCards } from './TimeControlRadioGroup';

export const CreateGameForm = () => {
  const [timeControl, setTimeControl] = useState<'realtime' | 'no_clock'>(
    'realtime',
  );
  return (
    <form
      onSubmit={(formEvent) => {
        formEvent.preventDefault();
        const form = formEvent.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.forEach((v, k) => console.log(k, v));
      }}
    >
      <Flex direction="column" gap="4">
        <SegmentedControl.Root
          defaultValue="realtime"
          onValueChange={(value) => {
            setTimeControl(value as 'realtime' | 'no_clock');
          }}
        >
          <SegmentedControl.Item value="realtime">
            Realtime
          </SegmentedControl.Item>
          <SegmentedControl.Item value="no_clock">
            Unlimited
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        {timeControl === 'realtime' && (
          <>
            <TimeControlRadioCards name="timeControl" />
          </>
        )}
        <Text as="label" size="3">
          <Flex gap="3">
            <Switch name="public" size="3" defaultChecked /> Public
          </Flex>
        </Text>
        <Button type="submit" size="3">
          Create Game
        </Button>
      </Flex>
    </form>
  );
};
