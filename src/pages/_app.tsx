import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Global from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <Global />
    </Fragment>
  );
}

export default MyApp;
