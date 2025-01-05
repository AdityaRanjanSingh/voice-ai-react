import "@/src/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

// pages/_app.js
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}

export default MyApp;
