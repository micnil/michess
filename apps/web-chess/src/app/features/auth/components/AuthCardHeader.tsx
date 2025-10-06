import { Box, Heading, Text } from '@radix-ui/themes';

type Props = {
  title: string;
  subtitle?: string;
};

export const AuthCardHeader = ({ title, subtitle }: Props) => {
  return (
    <Box style={{ textAlign: 'center' }}>
      <Heading size="6" mb="2">
        {title}
      </Heading>
      {subtitle && (
        <Text color="gray" size="2">
          {subtitle}
        </Text>
      )}
    </Box>
  );
};
