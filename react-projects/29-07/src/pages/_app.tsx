
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Floor Plan</title>
      </Head>
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
