import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import { PokemonProvider } from '../context/PokemonContext';
import Global from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <PokemonProvider>
        <Component {...pageProps} />
      </PokemonProvider>
      <Global />
    </Fragment>
  );
}

export default MyApp;
