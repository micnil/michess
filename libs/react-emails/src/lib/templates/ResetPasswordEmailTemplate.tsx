import {
  Body,
  Container,
  Heading,
  Html,
  Link,
  Preview,
  render,
  Text,
  toPlainText,
} from '@react-email/components';
import { FC } from 'react';
type Props = {
  url: string;
};
const Component: FC<Props> = (props) => {
  return (
    <Html>
      <Preview>Reset your password</Preview>
      <Body>
        <Container>
          <Heading>Reset your password</Heading>
          <Text>Click the link below to reset your password:</Text>
          <Link href={props.url}>Reset Password</Link>
          <Text>
            If you did not request a password reset, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const ResetPasswordEmailTemplate = {
  async compile(props: Props): Promise<{
    html: string;
    text: string;
  }> {
    const rendered = await render(<Component url={props.url} />);
    return {
      html: rendered,
      text: toPlainText(rendered),
    };
  },
};
