import { InfoMessage } from '../../../components/InfoMessage';

export const VerifyEmailMessage = () => {
  return (
    // <Card variant="surface">
    //   <Text align="center" size="2" color="gold" wrap="pretty" highContrast>
    //     We sent a verification link to your email address. Click the link to
    //     verify your account and start playing chess.
    //   </Text>
    // </Card>
    <InfoMessage
      message="We sent a verification link to your email. Click the link to verify your
      account and start playing chess."
    />
  );
};
