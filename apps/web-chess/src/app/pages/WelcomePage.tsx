import { Maybe } from '@michess/common-utils';
import { Card, Flex, Text } from '@radix-ui/themes';
import { FC } from 'react';
import { useAuth } from '../api/hooks/useAuth';
import { Link } from '../components/Link';
import { AuthCardHeader } from '../features/auth/components/AuthCardHeader';
import { VerifyEmailMessage } from '../features/auth/components/VerifyEmailMessage';
import { UsernameFormContainer } from '../features/auth/container/UsernameFormContainer';
type Props = {
  type: Maybe<'social' | 'email'>;
};
export const WelcomePage: FC<Props> = ({ type }) => {
  const { auth } = useAuth();
  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="6">
          <AuthCardHeader
            title={
              auth?.user?.name
                ? `Welcome to Chessmonky ${auth.user.name}!`
                : 'Welcome to Chessmonky!'
            }
            subtitle="Complete the steps below or skip for now"
          />
          {type === 'social' && (
            <Flex direction="column" gap="2">
              <Text as={'label'} color="gray">
                Change username
              </Text>
              <UsernameFormContainer />
            </Flex>
          )}
          {type === 'email' && <VerifyEmailMessage />}
          <Link to="/">Start playing</Link>
        </Flex>
      </Card>
    </Flex>
  );
};
