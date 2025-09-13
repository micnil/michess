import { AppProps } from 'next/app';
import Head from 'next/head';
import { useMemo } from 'react';
import { Api } from '../lib/api/Api';
import { ApiContext } from '../lib/api/context/ApiContext';
import { authClient } from '../lib/api/infra/authClient';
import { restClient } from '../lib/api/infra/restClient';
import { FooterArea } from '../lib/components/layout/FooterArea';
import { HeaderArea } from '../lib/components/layout/HeaderArea';
import { MainArea } from '../lib/components/layout/MainArea';
import { PageLayout } from '../lib/components/layout/PageLayout';
import { Logo } from '../lib/components/Logo';
import { Navbar } from '../lib/components/Navbar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const api = useMemo(() => Api.create(restClient, authClient), []);
  return (
    <>
      <Head>
        <title>Welcome to web-chess!</title>
      </Head>
      <PageLayout>
        <ApiContext.Provider value={api}>
          <HeaderArea>
            <Navbar>
              <Logo />
            </Navbar>
          </HeaderArea>
          <MainArea>
            <Component {...pageProps} />
          </MainArea>
          <FooterArea></FooterArea>
        </ApiContext.Provider>
      </PageLayout>
    </>
  );
}

export default CustomApp;
