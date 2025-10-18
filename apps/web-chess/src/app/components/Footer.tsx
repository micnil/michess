import { Box, Flex, Link, Text } from '@radix-ui/themes';
import { Link as RouterLink } from '@tanstack/react-router';
import { FC } from 'react';

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
          <Link asChild size="2" color="gray">
            <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
