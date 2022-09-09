import { AppProps } from 'next/app';
import Head from 'next/head';
import { Container } from '../lib/components/Container';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web-chess!</title>
      </Head>
      <Container as="main">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default CustomApp;
