import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web-chess!</title>
      </Head>
      <div className='container flex flex-col min-h-screen mx-auto px-4'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default CustomApp;
