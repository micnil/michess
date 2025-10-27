import { Maybe } from '@michess/common-utils';
import { Button, Flex, SegmentedControl, Switch, Text } from '@radix-ui/themes';
import { FC, useState } from 'react';
import { CreateGameInput } from '../../../api/model/CreateGameInput';
import { Alert } from '../../../components/Alert';
import { TimeControlRadioCards } from './TimeControlRadioGroup';

type Props = {
  onSubmit: (formInput: CreateGameInput) => void;
  loading: boolean;
  error: Maybe<string>;
};
export const CreateGameForm: FC<Props> = ({ onSubmit, loading, error }) => {
  const [timeControl, setTimeControl] = useState<'realtime' | 'no_clock'>(
    'realtime',
  );
  return (
    <form
      onSubmit={(formEvent) => {
        formEvent.preventDefault();
        const form = formEvent.target as HTMLFormElement;
        const formData = new FormData(form);
        const timeControlValue = formData.get('timeControl') as Maybe<string>;
        const [initialSec, incrementSec] =
          timeControlValue?.split('|').map(Number) || [];

        onSubmit({
          realtime:
            timeControl === 'realtime'
              ? {
                  initialSec: initialSec || 300,
                  incrementSec: incrementSec || 0,
                }
              : undefined,
          public: formData.get('public') === 'on',
        });
      }}
    >
      <Flex direction="column" gap="4">
        <Alert text={error} />
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
        <Text as="label" size="3" mt="2">
          <Flex gap="3">
            <Switch name="public" size="3" defaultChecked /> Public
          </Flex>
        </Text>
        <Button type="submit" size="3" loading={loading}>
          Create Game
        </Button>
      </Flex>
    </form>
  );
};
