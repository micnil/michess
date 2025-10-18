import { Box, Flex, Text } from '@radix-ui/themes';
import { FC } from 'react';
import { Link } from '../../components/Link';

export const Footer: FC = () => {
  return (
    <Box p="4" mt="4">
      <Flex
        justify="center"
        align="center"
        gap="4"
        direction={{ initial: 'column', sm: 'row' }}
      >
        <Text size="2" color="gray">
          © {new Date().getFullYear()} micnil
        </Text>

        <Flex gap="3" align="center">
          <Link to="/privacy-policy" size="2" color="gray">
            Privacy Policy
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
