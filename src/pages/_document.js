import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createAppTheme from "@/theme/theme";
import createEmotionCache from "../utils/createEmotionCache";

// Create a default theme instance
const defaultTheme = createAppTheme("light");

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Open Graph Meta Tags */}
          <meta
            property="og:title"
            content="Delivering transparent and actionable Content and intelligence."
          />
          <meta property="og:url" content="https://www.moneytv.live/" />
          <meta
            property="og:description"
            content="Money TV is a visionary platform that bridges the gap between companies, investors and market intermediaries by delivering transparent, actionable and one-of-its-kind - Content and intelligence."
          />
          <meta
            property="og:image"
            content="https://www.moneytv.live/about/img/shared_image.jfif"
          />
          <meta property="og:type" content="website" />

          {/* Inline script to prevent FOUC - runs before React */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    // Set initial background to prevent white flash
                    const savedMode = localStorage.getItem('darkMode');
                    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const isDarkMode = savedMode !== null ? savedMode === 'true' : prefersDarkMode;
                    
                    // Set body background immediately
                    document.body.style.backgroundColor = isDarkMode ? '#040C38' : '#ffffff';
                    document.documentElement.style.backgroundColor = isDarkMode ? '#040C38' : '#ffffff';
                    
                    document.documentElement.classList.add('fonts-loading');
                    
                    // Check if critical fonts are already cached
                    if ('fonts' in document && document.fonts.check('400 16px Montserrat')) {
                      document.documentElement.classList.remove('fonts-loading');
                      document.documentElement.classList.add('fonts-loaded');
                    }
                  } catch(e) {
                    // Fallback - assume fonts are loaded after a short delay
                    setTimeout(function() {
                      document.documentElement.classList.remove('fonts-loading');
                      document.documentElement.classList.add('fonts-loaded');
                    }, 100);
                  }
                })();
              `,
            }}
          />

          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={defaultTheme.palette.primary.main}
          />

          {/* Preload critical fonts to reduce FOUC */}
          <link
            rel="preload"
            href="/fonts/Montserrat/Montserrat-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat/Montserrat-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat/Montserrat-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SFPro/SFProText-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans+Kannada:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Telugu:wght@400;700&family=Noto+Sans+Gujarati:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
