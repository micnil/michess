import { Flex, Separator, Text } from '@radix-ui/themes';

export const OrSeparator: React.FC = () => (
  <Flex align="center" gap="3">
    <Separator size="4" style={{ flex: 1 }} />
    <Text size="1" color="gray">
      OR
    </Text>
    <Separator size="4" style={{ flex: 1 }} />
  </Flex>
);
