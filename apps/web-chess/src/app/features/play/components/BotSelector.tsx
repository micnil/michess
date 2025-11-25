import { Flex, Select, Skeleton, Text } from '@radix-ui/themes';
import { use } from 'react';
import { ApiContext } from '../../../api/context/ApiContext';
import { Alert } from '../../../components/Alert';
import { useQuery } from '../../../util/useQuery';

type BotId = string;

type Props = {
  value?: BotId;
  onChange?: (value: BotId) => void;
};

export const BotSelector = ({ value, onChange }: Props) => {
  const api = use(ApiContext);

  const {
    data: bots,
    isPending,
    error,
  } = useQuery({
    queryKey: ['bots'],
    queryFn: () => api.bots.listBots(),
  });

  const selectedValue = value ?? bots?.[0]?.id;

  return (
    <Flex direction="column" gap="2">
      <Text size="2" weight="medium" color="gray">
        Select Bot
      </Text>
      {error && <Alert text={`Error loading bots: ${error.message}`} />}
      <Skeleton loading={isPending}>
        <Select.Root value={selectedValue} onValueChange={onChange}>
          <Select.Trigger style={{ width: '100%' }} />
          <Select.Content>
            {bots?.map((bot) => (
              <Select.Item key={bot.id} value={bot.id}>
                {bot.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Skeleton>
    </Flex>
  );
};
