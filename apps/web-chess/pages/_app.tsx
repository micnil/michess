import { AppProps } from 'next/app';
import Head from 'next/head';
import { FooterArea } from '../lib/components/layout/FooterArea';
import { HeaderArea } from '../lib/components/layout/HeaderArea';
import { MainArea } from '../lib/components/layout/MainArea';
import { PageLayout } from '../lib/components/layout/PageLayout';
import { Logo } from '../lib/components/Logo';
import { Navbar } from '../lib/components/Navbar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web-chess!</title>
      </Head>
      <PageLayout>
        <HeaderArea>
          <Navbar>
            <Logo />
          </Navbar>
        </HeaderArea>
        <MainArea>
          <Component {...pageProps} />
        </MainArea>
        <FooterArea></FooterArea>
      </PageLayout>
    </>
  );
}

export default CustomApp;
