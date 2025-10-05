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
      <Preview>Verify your email</Preview>
      <Body>
        <Container>
          <Heading>Verify your email</Heading>
          <Text>Click the link below to verify your email address:</Text>
          <Link href={props.url}>Verify Email</Link>
        </Container>
      </Body>
    </Html>
  );
};

export const VerifyEmailTemplate = {
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
