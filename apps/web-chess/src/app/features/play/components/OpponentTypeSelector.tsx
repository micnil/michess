import { Flex, RadioCards, Text } from '@radix-ui/themes';
import { Bot, UserRoundSearch } from 'lucide-react';

type OpponentType = 'random' | 'bot';

type Props = {
  value?: OpponentType;
  onChange?: (value: OpponentType) => void;
};

export const OpponentTypeSelector = ({ value = 'random', onChange }: Props) => {
  return (
    <Flex direction="column" gap="2">
      <Text size="2" weight="medium" color="gray">
        Opponent
      </Text>
      <RadioCards.Root
        value={value}
        onValueChange={(val) => onChange?.(val as OpponentType)}
        columns="2"
        gap="2"
        color={'gray'}
      >
        <RadioCards.Item value="random">
          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <UserRoundSearch size={16} />
              <Text size="2" weight="bold">
                Random
              </Text>
            </Flex>
            <Text size="1" color="gray">
              Play vs human
            </Text>
          </Flex>
        </RadioCards.Item>
        <RadioCards.Item value="bot">
          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <Bot size={16} />
              <Text size="2" weight="bold">
                Bot
              </Text>
            </Flex>
            <Text size="1" color="gray">
              Play vs AI
            </Text>
          </Flex>
        </RadioCards.Item>
      </RadioCards.Root>
    </Flex>
  );
};
