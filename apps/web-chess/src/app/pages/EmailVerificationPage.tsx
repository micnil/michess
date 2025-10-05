import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { CircleCheckBigIcon } from 'lucide-react';
import { Alert } from '../components/Alert';

type Props = {
  verificationError?: string;
};

const toErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'invalid_token':
      return 'The verification link is invalid.';
    case 'token_expired':
      return 'The verification link has expired.';
    case 'user_not_found':
      return 'No user found for this verification link.';
    default:
      return 'An error occurred during verification.';
  }
};

export const EmailVerificationPage = ({ verificationError }: Props) => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Card size="4" style={{ width: '100%', maxWidth: '400px' }}>
        <Flex direction="column" gap="4" align="center" p="6">
          <Heading size="6" mb="2">
            Email Verification
          </Heading>
          {verificationError ? (
            <Alert text={toErrorMessage(verificationError)} />
          ) : (
            <>
              <CircleCheckBigIcon color="green" size={48} />
              <Text size="2" color="gray">
                Your email has been successfully verified.
              </Text>
            </>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
