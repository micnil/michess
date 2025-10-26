import { Flex, FlexProps, Separator, Text } from '@radix-ui/themes';

type Props = FlexProps &
  React.RefAttributes<HTMLDivElement> & {
    text: string;
  };
export const TextSeparator: React.FC<Props> = ({ text, ...flexProps }) => (
  <Flex align="center" gap="3" {...flexProps}>
    <Separator size="4" style={{ flex: 1 }} />
    <Text size="1" color="gray">
      {text}
    </Text>
    <Separator size="4" style={{ flex: 1 }} />
  </Flex>
);
