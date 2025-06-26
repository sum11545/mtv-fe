import * as React from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../utils/createEmotionCache";
import { MainProvider } from "../context/MainContext";
import Layout from "../components/Layout";
import { initFontLoading } from "../utils/fontLoader";
import "../../styles/global.css";
import "../../styles/font.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    // Initialize font loading detection to minimize FOUC
    initFontLoading();
  }, []);

  return (
    <MainProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/assets/icons/favicon.png" />
        </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CacheProvider>
    </MainProvider>
  );
}
