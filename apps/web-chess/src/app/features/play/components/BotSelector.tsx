import { Flex, Select, Text } from '@radix-ui/themes';

type BotId = string;

type Props = {
  value?: BotId;
  onChange?: (value: BotId) => void;
  bots?: Array<{ id: string; name: string }>;
};

export const BotSelector = ({
  value = 'gemini-1',
  onChange,
  bots = [{ id: 'gemini-1', name: 'Gemini' }],
}: Props) => {
  return (
    <Flex direction="column" gap="2">
      <Text size="2" weight="medium" color="gray">
        Select Bot
      </Text>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger style={{ width: '100%' }} />
        <Select.Content>
          {bots.map((bot) => (
            <Select.Item key={bot.id} value={bot.id}>
              {bot.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
